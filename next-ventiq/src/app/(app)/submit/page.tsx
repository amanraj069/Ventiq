'use client';

import { usePitchStore } from '@/stores/usePitchStore';
import { Step1Idea } from '@/components/pitch/Step1Idea';
import { Step2Team } from '@/components/pitch/Step2Team';
import { Step3Traction } from '@/components/pitch/Step3Traction';
import { Step4Funding } from '@/components/pitch/Step4Funding';
import { Step5Review } from '@/components/pitch/Step5Review';
import { Button, BackButton } from '@/components/ui';
import { AnimatePresence } from 'framer-motion';
import { IconCheck } from '@tabler/icons-react';

const STEPS = [
  { id: 1, name: 'Idea' },
  { id: 2, name: 'Team' },
  { id: 3, name: 'Traction' },
  { id: 4, name: 'Funding' },
  { id: 5, name: 'Review' },
];

export default function SubmitPage() {
  const { currentStep, nextStep, prevStep } = usePitchStore();

  const isLastStep = currentStep === 5;
  const isFirstStep = currentStep === 1;

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 pt-12 pb-24">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-10">
          <BackButton />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Submit Your Idea
          </h1>
        </div>

      {/* Progress Bar */}
      <nav aria-label="Progress" className="mb-12">
        <ol role="list" className="flex items-center">
          {STEPS.map((step, stepIdx) => (
            <li key={step.name} className={`relative ${stepIdx !== STEPS.length - 1 ? 'flex-1 pr-4' : ''}`}>
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div
                  className={`h-0.5 w-full ${
                    step.id < currentStep ? 'bg-accent' : 'bg-border'
                  }`}
                />
              </div>
              <div
                className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  step.id < currentStep
                    ? 'bg-accent hover:bg-accent/90'
                    : step.id === currentStep
                    ? 'border-2 border-accent bg-bg'
                    : 'border-2 border-border bg-bg'
                }`}
              >
                {step.id < currentStep ? (
                  <IconCheck className="h-5 w-5 text-white" aria-hidden="true" />
                ) : (
                  <span
                    className={`text-xs font-semibold ${
                      step.id === currentStep ? 'text-accent' : 'text-fg-muted'
                    }`}
                  >
                    {step.id}
                  </span>
                )}
              </div>
              {/* Optional label underneath */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-fg-muted">
                {step.name}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      {/* Main Content Area */}
      <div className="bg-bg rounded-2xl shadow-sm border border-border p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && <Step1Idea key="step1" />}
          {currentStep === 2 && <Step2Team key="step2" />}
          {currentStep === 3 && <Step3Traction key="step3" />}
          {currentStep === 4 && <Step4Funding key="step4" />}
          {currentStep === 5 && <Step5Review key="step5" />}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between border-t border-border pt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep}
            className={isFirstStep ? 'opacity-0 cursor-default' : ''}
          >
            Back
          </Button>
          {!isLastStep && (
            <Button onClick={nextStep}>
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
