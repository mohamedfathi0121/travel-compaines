import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyStep4Schema } from '../../validations/auth.schema';
import supabase from '../../utils/supabase.js';
import toast from 'react-hot-toast';

const CompanyStep4 = ({ prevStep, formData }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(companyStep4Schema),
  });

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    setValue('documents', fileArray); // For react-hook-form
    setSelectedFiles(fileArray); // For UI display
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Submitting registration...');
    const finalData = { ...formData, ...data };

    try {
      const fd = new FormData();
      fd.append('email', finalData.email);
      fd.append('password', finalData.password);
      fd.append('companyName', finalData.companyName);
      fd.append('companyUrl', finalData.companyUrl);
      fd.append('companyAddress', JSON.stringify({
        street: finalData.companyAddress,
        city: 'Anytown',
        country: 'USA',
      }));
      fd.append('phoneNumbers', JSON.stringify([
        `${finalData.countryCode} ${finalData.phoneNumber}`,
      ]));
      fd.append('socialProfiles', JSON.stringify({
        linkedin1: finalData.linkedin1,
        linkedin2: finalData.linkedin2,
        facebook: finalData.facebook,
      }));

      if (finalData.companyLogo?.length > 0) {
        fd.append('companyLogo', finalData.companyLogo[0]);
      }

      if (data.documents?.length > 0) {
        for (const doc of data.documents) {
          fd.append('documents', doc);
        }
      }

      const { error: functionError } = await supabase.functions.invoke('company-register', {
        body: fd,
      });

      if (functionError) throw functionError;

      toast.success('Registration successful! Please check your email.', { id: toastId });
    } catch (error) {
      console.error('Full error details:', error);
      let msg = error.message || 'Unexpected error.';
      toast.error(msg, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary text-center">
        Verify Your Company
      </h1>
      <p className="text-center text-text-secondary">
        Upload documents to verify your company’s legitimacy.
      </p>

      <div
        className={`w-full p-8 border-2 border-dashed rounded-lg text-center space-y-3 bg-input cursor-pointer transition
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={onDrop}
      >
        <h3 className="text-lg font-semibold text-text-primary">Upload Documents</h3>
        <p className="text-text-secondary">Drag and drop or click to browse</p>
        <p className="text-xs text-gray-400">Accepted: PDF, JPG, PNG · Max size: 10MB</p>

        <input
          id="documents"
          type="file"
          {...register('documents')}
          ref={fileInputRef}
          onChange={onInputChange}
          multiple
          className="hidden"
        />
        {errors.documents && (
          <p className="text-red-500 text-xs mt-1">{errors.documents.message}</p>
        )}

        {/* ✅ Display selected file names */}
        {selectedFiles.length > 0 && (
          <div className="mt-4 text-sm text-text-primary text-left">
            <strong>Selected Files:</strong>
            <ul className="list-disc list-inside mt-1">
              {selectedFiles.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={isSubmitting}
          className="text-sm text-gray-600 hover:text-blue-600 font-medium transition"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-3 px-8 bg-button-primary text-white text-sm font-semibold rounded-2xl hover:bg-btn-primary-hover transition disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting…' : 'Complete Registration'}
        </button>
      </div>
    </form>
  );
};

export default CompanyStep4;
