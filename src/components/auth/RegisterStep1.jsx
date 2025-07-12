import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyStep1Schema } from '../../validations/auth.schema';
import Input from '../../components/shared/Input';


const CompanyStep1 = ({ nextStep, updateFormData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(companyStep1Schema)
    });

    const onSubmit = (data) => {
        updateFormData(data);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Company information</h1>
            <div className="space-y-4">
                <Input name="companyName" label="Company name" register={register} error={errors.companyName} placeholder="Acme Corp" />
                <Input name="companyAddress" label="Company address" register={register} error={errors.companyAddress} placeholder="123 Main Street, Anytown, USA" />
                <Input name="companyUrl" label="Company location URL" register={register} error={errors.companyUrl} placeholder="www.acmecorp.com" />
                <Input name="companyLogo" label="Company logo" type="file" register={register} error={errors.companyLogo} />
            </div>
            <div className="flex justify-end">
                <button type="submit" style={{ backgroundColor: 'var(--color-button-primary)', color: 'var(--color-button-text)' }} className="font-bold py-3 px-8 rounded-lg transition-colors hover:bg-[var(--color-button-primary-hover)]">
                    Continue
                </button>
            </div>
        </form>
    );
};

export default CompanyStep1;

