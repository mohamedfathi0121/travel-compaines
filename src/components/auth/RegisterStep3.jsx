import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyStep3Schema } from '../../validations/auth.schema';
import Input from '../../components/shared/Input';

const CompanyStep3 = ({ nextStep, prevStep, updateFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companyStep3Schema),
  });

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">
        Contact Details & Social Media
      </h1>

      <div className="space-y-4">
        {/* --- Phone Number Input with Country Code --- */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Phone Number
          </label>
          <div className="flex">
            <select
              {...register('countryCode')}
              defaultValue=""
              className={`w-1/3 bg-input p-3 rounded-l-md text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="" disabled>
                Code
              </option>
              <option value="+1">USA (+1)</option>
              <option value="+44">UK (+44)</option>
              <option value="+91">India (+91)</option>
              <option value="+20">Egypt (+20)</option>
              <option value="+61">Australia (+61)</option>
            </select>

            <input
              id="phoneNumber"
              type="tel"
              placeholder="5551234567"
              {...register('phoneNumber')}
              className={`text-text-primary placeholder-text-secondary w-2/3 bg-input p-3 rounded-r-md text-sm focus:outline-none focus:ring-2 focus:ring-button-primary`}
            />
          </div>
          {errors.countryCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.countryCode.message}
            </p>
          )}
          {errors.phoneNumber && !errors.countryCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        {/* --- End Phone Number Input --- */}

        <Input
          name="ticktok"
          label="TikTok Profile URL"
          register={register}
          error={errors.ticktok}
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
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="text-sm text-gray-600 hover:text-blue-600 font-medium transition"
        >
          ← Back
        </button>

        <button
          type="submit"
          className="py-3 px-8 bg-button-primary text-white font-semibold text-sm rounded-2xl hover:bg-btn-primary-hover transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default CompanyStep3;
