import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyStep3Schema } from "../../validations/auth.schema";
import Input from "../../components/shared/Input";
import phoneCodes from "../../data/phone.json"; // ✅ Import local JSON

const CompanyStep3 = ({ nextStep, prevStep, updateFormData }) => {
  // Convert JSON to dropdown-friendly array
  const countryCodes = Object.entries(phoneCodes).map(([iso, code]) => ({
    iso,
    code: `+${code}`,
    label: `${iso} (+${code})`,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companyStep3Schema),
  });

  const onSubmit = data => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">
        Contact Details & Social Media
      </h1>

      {/* ✅ Phone Number with Country Code */}
      <div>
        <label className="block text-sm mb-1 text-text-primary">
          Phone Number
        </label>
        <div className="flex">
          <select
            {...register("countryCode")}
            className="w-1/3 bg-input p-3 rounded-l-md text-text-hard-secondary"
          >
            <option value="">Code</option>
            {countryCodes.map(c => (
              <option key={c.iso} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>

          <input
            type="tel"
            placeholder="5551234567"
            {...register("phoneNumber")}
            className="w-2/3 bg-input p-3 rounded-r-md text-text-primary"
          />
        </div>
        {errors.countryCode && (
          <p className="text-red-500 text-xs">{errors.countryCode.message}</p>
        )}
        {errors.phoneNumber && !errors.countryCode && (
          <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* ✅ Social Media */}
      <Input
        name="tiktok"
        label="TikTok Profile URL"
        register={register}
        error={errors.tiktok}
        placeholder="https://www.tiktok.com/@yourprofile"
      />
      <Input
        name="instagram"
        label="Instagram Profile URL (optional)"
        register={register}
        error={errors.instagram}
        placeholder="https://www.instagram.com/yourprofile"
      />
      <Input
        name="facebook"
        label="Facebook Profile URL (optional)"
        register={register}
        error={errors.facebook}
        placeholder="https://www.facebook.com/yourprofile"
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="border  border-button-primary hover:bg-button-primary  text-button-text px-6 py-3 rounded"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="bg-button-primary text-white px-6 py-3 rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default CompanyStep3;
