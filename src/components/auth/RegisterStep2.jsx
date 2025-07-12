import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyStep2Schema } from '../../validations/auth.schema';
import Input from '../../components/shared/Input';

const CompanyStep2 = ({ nextStep, prevStep, updateFormData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(companyStep2Schema)
    });

    const onSubmit = (data) => {
        updateFormData(data);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Create your account</h1>
            <div className="space-y-4">
                <Input name="email" label="Email" type="email" register={register} error={errors.email} placeholder="Enter your email" />
                <Input name="password" label="Password" type="password" register={register} error={errors.password} placeholder="Enter your password" />
                <Input name="confirmPassword" label="Confirm password" type="password" register={register} error={errors.confirmPassword} placeholder="Confirm your password" />
            </div>
            <div className="flex justify-between items-center">
                <button type="button" onClick={prevStep} className="text-gray-600 font-medium hover:underline">Back</button>
                <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors">
                    Next
                </button>
            </div>
        </form>
    );
};

export default CompanyStep2;
