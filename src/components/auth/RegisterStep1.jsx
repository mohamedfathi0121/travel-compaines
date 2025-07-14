import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyStep1Schema } from '../../validations/auth.schema';
import Input from '../../components/shared/Input';

const CompanyStep1 = ({ nextStep, updateFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companyStep1Schema),
  });

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
      <h1 className="text-3xl font-bold text-text-primary">Company Information</h1>

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
        <Input
          name="companyLogo"
          label="Company Logo"
          type="file"
          register={register}
          error={errors.companyLogo}
        />
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
