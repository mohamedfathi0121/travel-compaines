import React, { useState } from 'react';

import CompanyStep1 from '../../components/auth/RegisterStep1';
import CompanyStep2 from '../../components/auth/RegisterStep2';
import CompanyStep3 from '../../components/auth/RegisterStep3';
import CompanyStep4 from '../../components/auth/RegisterStep4';
import StepProgress from '../../components/StepProgress';

export default function CompanyRegisterPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <CompanyStep1 nextStep={nextStep} updateFormData={updateFormData} />;
            case 2:
                return <CompanyStep2 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />;
            case 3:
                return <CompanyStep3 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />;
            case 4:
                return <CompanyStep4 prevStep={prevStep} formData={formData} />;
            default:
                return <CompanyStep1 nextStep={nextStep} updateFormData={updateFormData} />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-xl px-4 sm:px-6 lg:px-8 py-12">
                    <StepProgress step={step} totalSteps={4} />
                    <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
                        {renderStep()}
                    </div>
                </div>
            </main>
        </div>
    );
}
