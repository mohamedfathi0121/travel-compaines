import React, { useState } from 'react';
import CompanyStep1 from '../../components/auth/RegisterStep1';
import CompanyStep2 from '../../components/auth/RegisterStep2';
import CompanyStep3 from '../../components/auth/RegisterStep3';
import CompanyStep4 from '../../components/auth/RegisterStep4';
import StepProgress from '../../components/StepProgress';
import { Link } from 'react-router-dom';

export default function CompanyRegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CompanyStep1 nextStep={nextStep} updateFormData={updateFormData} />;
      case 2:
        return (
          <CompanyStep2
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <CompanyStep3
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return <CompanyStep4 prevStep={prevStep} formData={formData} />;
      default:
        return <CompanyStep1 nextStep={nextStep} updateFormData={updateFormData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-12 pb-16">
      <div className="w-full max-w-2xl space-y-8">
        <div>
          <StepProgress step={step} totalSteps={4} />
        </div>

        <div className=" border border-gray-200 p-8 rounded-lg shadow-md shadow-text-hard-secondary space-y-6">
          {renderStep()}

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <Link to="/" className="text-blue-600 hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
