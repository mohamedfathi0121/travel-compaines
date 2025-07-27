import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyStep2Schema } from '../../validations/auth.schema';
import Input from '../../components/shared/Input';
import supabase from '../../utils/supabase'; // Adjust path as needed

const CompanyStep2 = ({ nextStep, prevStep, updateFormData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(companyStep2Schema),
  });

  const [checkingEmail, setCheckingEmail] = useState(false);

  const onSubmit = async (data) => {
    setCheckingEmail(true);

    const { data: result, error } = await supabase.functions.invoke('check-email-exists', {
      body: { email: data.email },
    });

    setCheckingEmail(false);

    if (error) {
      console.error('Function error:', error);
      setError('email', {
        type: 'manual',
        message: 'Server error, please try again later.',
      });
      return;
    }

    if (result?.exists) {
      setError('email', {
        type: 'manual',
        message: 'Email already exists.',
      });
    } else {
      clearErrors('email');
      updateFormData(data);
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Create Your Account</h1>

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
          label="Confirm Password"
          type="password"
          register={register}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
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
          disabled={checkingEmail}
          className="py-3 px-8 rounded-2xl bg-button-primary text-white text-sm font-semibold hover:bg-btn-primary-hover transition disabled:opacity-50"
        >
          {checkingEmail ? 'Checking...' : 'Next'}
        </button>
      </div>
    </form>
  );
};

export default CompanyStep2;
