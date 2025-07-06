import React, { useState } from "react";
import Header from "../../components/shared/header";
import StepProgress from "../../components/StepProgress";
import NextButton from "../../components/next-btn";
export default function TripFormStep4() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background text-text-primary px-6 md:px-32 py-8">
        <StepProgress step={4} />

        <h1 className="text-2xl font-bold mb-2">Verify your company</h1>
        <p className="text-sm text-text-secondary mb-8">
          Upload documents to verify your company's legitimacy. This step is
          crucial for accessing all features and ensuring a secure experience.
        </p>

        <div className="border-2 border-dashed border-input p-12 rounded-xl bg-input text-center">
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            className="hidden"
            id="file-upload"
          />

          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-block px-6 py-2 bg-btn-primary hover:bg-btn-primary-hover text-white rounded-md font-medium"
          >
            Browse Files
          </label>

          <p className="mt-4 text-sm text-text-secondary">
            Drag and drop or browse to upload documents. Supported formats: PDF,
            DOCX, PNG, JPG. Max file size: 10MB.
          </p>

          {files.length > 0 && (
            <ul className="mt-4 text-sm text-left">
              {files.map((file, idx) => (
                <li key={idx} className="text-text-primary">
                  • {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-center mt-30">
          <NextButton>Complete registration</NextButton>
        </div>
      </div>
    </>
  );
}
