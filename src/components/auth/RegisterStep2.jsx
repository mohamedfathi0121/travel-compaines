import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyStep2Schema } from '../../validations/auth.schema';
import Input from '../../components/shared/Input';
import supabase  from '../../utils/supabase'; // Make sure this path is correct

const CompanyStep2 = ({ nextStep, prevStep, updateFormData }) => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm({
        resolver: zodResolver(companyStep2Schema)
    });

    const [checkingEmail, setCheckingEmail] = useState(false);

    const onSubmit = async (data) => {
        setCheckingEmail(true);

        // Call Edge Function to check email
        const { data: result, error } = await supabase.functions.invoke('check-email-exists', {
            body: { email: data.email }
        });

        setCheckingEmail(false);

        if (error) {
            console.error('Function error:', error);
            setError('email', { type: 'manual', message: 'Server error, try again later' });
            return;
        }

        if (result?.exists) {
            setError('email', { type: 'manual', message: 'Email already exists' });
        } else {
            clearErrors('email');
            updateFormData(data);
            nextStep();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Create your account</h1>
            <div className="space-y-4">
                <Input
                    name="email"
                    label="Email"
                    type="email"
                    register={register}
                    error={errors.email}
                    placeholder="Enter your email"
                />
                <Input
                    name="password"
                    label="Password"
                    type="password"
                    register={register}
                    error={errors.password}
                    placeholder="Enter your password"
                />
                <Input
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    register={register}
                    error={errors.confirmPassword}
                    placeholder="Confirm your password"
                />
            </div>

            <div className="flex justify-between items-center">
                <button
                    type="button"
                    onClick={prevStep}
                    className="text-gray-600 font-medium hover:underline"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    disabled={checkingEmail}
                >
                    {checkingEmail ? 'Checking...' : 'Next'}
                </button>
            </div>
        </form>
    );
};

export default CompanyStep2;
