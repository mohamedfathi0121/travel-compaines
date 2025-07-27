import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyStep1Schema } from "../../validations/auth.schema";
import Input from "../../components/shared/Input";

const CompanyStep1 = ({ nextStep, updateFormData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companyStep1Schema),
  });

  const [preview, setPreview] = useState(null);
  const companyLogo = watch("companyLogo");

  // ✅ Handle image preview
  useEffect(() => {
    let objectUrl;
    if (companyLogo && companyLogo.length > 0) {
      objectUrl = URL.createObjectURL(companyLogo[0]);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [companyLogo]);

  // ✅ Drag and drop handler
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files[0];
      if (file) {
        setValue("companyLogo", [file], { shouldValidate: true });
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">
        Company Information
      </h1>

      <div className="space-y-4">
        <Input
          name="companyName"
          label="Company Name"
          register={register}
          error={errors.companyName}
          placeholder="Acme Corp"
        />
        <Input
          name="companyAddress"
          label="Company Address"
          register={register}
          error={errors.companyAddress}
          placeholder="123 Main Street, Anytown"
        />
        <Input
          name="companyUrl"
          label="Company Location URL"
          register={register}
          error={errors.companyUrl}
          placeholder="https://www.acmecorp.com"
        />

        {/* ✅ Company Logo Drag & Drop */}
        <div className="flex flex-col">
          <label className="text-sm text-text-secondary mb-1">
            Company Logo
          </label>
          <div
            className="w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer
                       bg-input text-text-secondary hover:border-button-primary transition-colors"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {preview ? (
              <div className="flex flex-col items-center">
                <img
                  src={preview}
                  alt="Company Logo Preview"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <label
                  htmlFor="companyLogo"
                  className="cursor-pointer bg-background text-text-primary font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Change Logo
                </label>
              </div>
            ) : (
              <>
                <p className="mb-4">Drag & drop or click below to upload</p>
                <label
                  htmlFor="companyLogo"
                  className="cursor-pointer bg-background border border-gray-300 text-text-primary font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Browse
                </label>
              </>
            )}
            <input
              id="companyLogo"
              type="file"
              {...register("companyLogo")}
              className="hidden"
              accept="image/*"
            />
            {errors.companyLogo && (
              <p className="text-red-500 text-sm mt-2">
                {errors.companyLogo.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="py-3 px-8 bg-button-primary text-white font-semibold text-sm rounded-2xl hover:bg-btn-primary-hover transition disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default CompanyStep1;
