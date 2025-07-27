
import React from 'react';

export default function StepProgress({ step, totalSteps = 4 }) {
  const progressWidth = `${(step / totalSteps) * 100}%`;

  return (
    <div className="mb-6">
      <p className="text-sm text-text-primary font-medium mb-1">
        Step {step} of {totalSteps}
      </p>
      <div className="w-full h-3 bg-input rounded-full overflow-hidden">
        <div
          className="h-full bg-button-primary rounded-full transition-all duration-300"
          style={{ width: progressWidth }}
        ></div>
      </div>
    </div>
  );
}
