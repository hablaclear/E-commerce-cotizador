import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10" />
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 -z-10 transition-all duration-500 ease-in-out"
          style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        />
        
        {steps.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex flex-col items-center group">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300
                  ${isCompleted ? 'bg-blue-600 border-blue-600 text-white' : ''}
                  ${isCurrent ? 'bg-white border-blue-600 text-blue-600 scale-110' : ''}
                  ${!isCompleted && !isCurrent ? 'bg-white border-gray-300 text-gray-400' : ''}
                `}
              >
                {isCompleted ? <Check size={16} /> : index + 1}
              </div>
              <span className={`mt-2 text-xs font-medium hidden sm:block ${isCurrent ? 'text-blue-600' : 'text-gray-500'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-center sm:hidden">
        <span className="text-sm font-medium text-gray-700">{steps[currentStep]}</span>
      </div>
    </div>
  );
};
