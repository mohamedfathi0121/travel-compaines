import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyStep4Schema } from '../../validations/auth.schema'; // Import your validationSchemas';
import supabase  from '../../utils/supabase.js';
import toast from 'react-hot-toast';

// Helper function remains the same






const CompanyStep4 = ({ prevStep, formData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(companyStep4Schema)
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            fd.append('companyAddress', JSON.stringify({ street: finalData.companyAddress, city: "Anytown", country: "USA" }));
            fd.append('phoneNumbers', JSON.stringify([`${finalData.countryCode} ${finalData.phoneNumber}`]));
            fd.append('socialProfiles', JSON.stringify({ linkedin1: finalData.linkedin1, linkedin2: finalData.linkedin2, facebook: finalData.facebook }));

            if (finalData.companyLogo?.length > 0) {
                fd.append('companyLogo', finalData.companyLogo[0]);
            }
            if (finalData.documents?.length > 0) {
                for (const doc of finalData.documents) {
                    fd.append('documents', doc);
                }
            }

            const { error: functionError } = await supabase.functions.invoke('company-register', {
                body: fd,
            });

            if (functionError) throw functionError;

            toast.success('Registration successful! Please check your email to verify your account.', { id: toastId });

        } catch (error) {
            console.error('Full error details:', error);
            
            // *** FIX: Improved error handling logic ***
            let errorMessage = "An unknown server error occurred.";
            const functionErrorData = error.context?.data;

            if (functionErrorData) {
                // Check for specific error codes returned from our Edge Function
                if (functionErrorData.code === 'email_exists') {
                    errorMessage = "This email address is already registered. Please use a different one.";
                } else {
                    // Use the message from the function if it exists
                    errorMessage = functionErrorData.error || error.message;
                }
            } else {
                errorMessage = error.message;
            }

            toast.error(errorMessage, { id: toastId, duration: 6000 });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* The JSX for the form remains exactly the same */}
            <h1 className="text-3xl font-bold text-center" style={{ color: 'var(--color-text-primary)' }}>Verify your company</h1>
            <p className="text-center" style={{ color: 'var(--color-text-secondary)' }}>Upload documents to verify your company's legitimacy...</p>
            
            <div className="w-full p-8 border-2 border-dashed rounded-lg text-center" style={{ borderColor: 'var(--color-input)' }}>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Upload documents</h3>
                <p style={{ color: 'var(--color-text-secondary)' }} className="mt-2">Drag and drop or browse to upload...</p>
                <p className="text-xs text-gray-400 mt-1">Accepted formats: PDF, JPG, PNG. Maximum file size: 10MB.</p>
                <input 
                    id="documents" 
                    type="file" 
                    {...register('documents')} 
                    multiple 
                    className="mt-4"
                />
                {errors.documents && <p className="text-red-500 text-xs mt-1">{errors.documents.message}</p>}
            </div>

            <div className="flex justify-between items-center">
                <button type="button" onClick={prevStep} style={{ color: 'var(--color-text-secondary)' }} className="font-medium hover:underline" disabled={isSubmitting}>Back</button>
                <button type="submit" style={{ backgroundColor: 'var(--color-button-primary)', color: 'var(--color-button-text)' }} className="font-bold py-3 px-8 rounded-lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Complete registration'}
                </button>
            </div>
        </form>
    );
};

export default CompanyStep4;



