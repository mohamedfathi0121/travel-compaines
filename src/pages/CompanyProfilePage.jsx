import React, { useState, useEffect } from "react";
import CompanyProfileForm from "../components/company/CompanyProfileForm";
import supabase from "../utils/supabase";
import { useAuth } from "../hooks/useAuth";

const CompanyProfilePage = () => {
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const companyId = user?.id; // Assuming the user ID is the company ID

  useEffect(() => {
    const fetchCompanyData = async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("id", companyId)
        .single();

      if (error) {
        console.error("Error fetching company data:", error.message);
      } else {
        setFormData({
          id: data.id,
          name: data.c_name || "",
          email: data.contact_email || "",
          phone: data.phone_numbers || "",
          address: data.address || "",
          website: data.website_url || "",
          logo: data.logo_url || "",
          document: data.verification_document_url || "",
          status: data.status || "",
          isBlocked: data.is_blocked || false,
          social: data.social_profiles || "",
        });
      }
    };

    if (companyId) {
      fetchCompanyData();
    }
  }, [companyId]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("companies")
      .update({
        c_name: formData.name,
        contact_email: formData.email,
        phone_numbers: formData.phone,
        address: formData.address,
        website_url: formData.website,
        logo_url: formData.logo,
        social_profiles: formData.social,
      })
      .eq("id", formData.id);

    if (error) {
      console.error("Error updating data:", error.message);
    } else {
      setIsEditing(false);
    }
  };

  // PDF URL cleaning function (same logic from previous solution)
  const getCleanPdfUrl = (url) => {
    if (!url) return null;
    
    let cleanUrl = url;
    
    // If it's an array, get the first element
    if (Array.isArray(cleanUrl)) {
      cleanUrl = cleanUrl[0];
    }
    
    // If it's a string that looks like an array, parse it
    if (typeof cleanUrl === 'string' && cleanUrl.startsWith('[')) {
      try {
        const parsed = JSON.parse(cleanUrl);
        cleanUrl = Array.isArray(parsed) ? parsed[0] : parsed;
      } catch (e) {
        // If JSON parsing fails, try to extract URL manually
        const match = cleanUrl.match(/\["([^"]+)"/);
        console.log(e);
        if (match) {
          cleanUrl = match[1];
        }
      }
    }
    
    // Remove any trailing quotes or brackets
    cleanUrl = cleanUrl.replace(/["'\]]+$/, '');
    
    return cleanUrl;
  };

  if (!formData)
    return <p className="text-center mt-10">Loading company data...</p>;

  const cleanPdfUrl = getCleanPdfUrl(formData.document);

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-text-primary text-2xl font-semibold mb-6">
          Company Profile
        </h1>

        <CompanyProfileForm
          formData={formData}
          isEditing={isEditing}
          onChange={handleInputChange}
        />

        {/* Integrated PDF Viewer */}
        {formData.document && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-text-primary">
              Verification Document
            </h2>
            
            {cleanPdfUrl && cleanPdfUrl.startsWith('http') ? (
              <div>
                <iframe
                  src={cleanPdfUrl}
                  width="100%"
                  height="600px"
                  title="PDF Document"
                  className="border rounded shadow-lg"
                  style={{ border: 'none' }}
                />
                
                <div className="mt-2 text-center">
                  <a
                    href={cleanPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Open in new tab
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 bg-red-50 dark:bg-red-900 rounded border">
                <p className="text-red-700 dark:text-red-300 mb-2">
                  Unable to load verification document
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                  The document URL appears to be invalid or incomplete
                </p>
                {formData.document && (
                  <a
                    href={formData.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Try to download document
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {/* Show message if no document */}
        {!formData.document && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-text-primary">
              Verification Document
            </h2>
            <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded border">
              <p className="text-gray-600 dark:text-gray-400">
                No verification document uploaded
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 rounded bg-text-hard-secondary hover:bg-text-secondary"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-button-primary text-background hover:bg-button-primary-hover"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;