import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyStep3Schema } from '../../validations/auth.schema';
import Input from '../../components/shared/Input';



const CompanyStep3 = ({ nextStep, prevStep, updateFormData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(companyStep3Schema)
    });

    const onSubmit = (data) => {
        updateFormData(data);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>Contact details and social media</h1>
            <div className="space-y-4">
                {/* --- Phone Number Input with Country Code --- */}
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
                        Phone number
                    </label>
                    <div className="flex">
                        <select
                            {...register('countryCode')}
                            defaultValue=""
                            className="w-1/3 rounded-l-lg border-r-0 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ 
                                backgroundColor: 'var(--color-input)', 
                                color: 'var(--color-text-primary)',
                                borderColor: errors.countryCode ? '#fb2c36' : 'transparent'
                            }}
                        >
                            <option value="" disabled>Code</option>
                            <option value="+1">USA (+1)</option>
                            <option value="+44">UK (+44)</option>
                            <option value="+91">IN (+91)</option>
                            <option value="+20">EG (+20)</option>
                            <option value="+61">AUS (+61)</option>
                        </select>
                        <input
                            id="phoneNumber"
                            type="tel"
                            placeholder="5551234567"
                            {...register('phoneNumber')}
                            className="w-2/3 rounded-r-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ 
                                backgroundColor: 'var(--color-input)', 
                                color: 'var(--color-text-primary)',
                                borderColor: errors.phoneNumber ? '#fb2c36' : 'transparent'
                            }}
                        />
                    </div>
                    {errors.countryCode && <p className="text-red-500 text-xs mt-1">{errors.countryCode.message}</p>}
                    {errors.phoneNumber && !errors.countryCode && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
                </div>
                {/* --- End Phone Number Input --- */}
                
                <Input name="ticktok" label="Ticktok profile URL" register={register} error={errors.linkedin1} placeholder="https://www.linkedin.com/in/yourprofile" />
                <Input name="instagram" label="Instegram profile URL (optional)" register={register} error={errors.linkedin2} placeholder="https://www.linkedin.com/in/anotherprofile" />
                <Input name="facebook" label="Facebook profile URL (optional)" register={register} error={errors.facebook} placeholder="https://www.facebook.com/yourprofile" />
            </div>
            <div className="flex justify-between items-center">
                <button type="button" onClick={prevStep} style={{ color: 'var(--color-text-secondary)' }} className="font-medium hover:underline">Back</button>
                <button type="submit" style={{ backgroundColor: 'var(--color-button-primary)', color: 'var(--color-button-text)' }} className="font-bold py-3 px-8 rounded-lg transition-colors hover:bg-[var(--color-button-primary-hover)]">
                    Next
                </button>
            </div>
        </form>
    );
};

export default CompanyStep3;
