import React, { useState, useEffect } from "react";
import CompanyProfileForm from "../components/company/CompanyProfileForm";
import PDFViewer from "../components/company/PDFViewer";
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

  if (!formData)
    return <p className="text-center mt-10">Loading company data...</p>;

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

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2 text-text-primary">
            Verification Document
          </h2>
          <PDFViewer fileUrl={formData.document} />
        </div>

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
