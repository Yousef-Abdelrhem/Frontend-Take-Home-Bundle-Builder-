import type { Product, Step as StepType } from '../data/catalog';
import { useBundleStore } from '../store/useBundleStore';
import Step from './Step';

interface BuilderProps {
  steps: StepType[];
  products: Product[];
}

export default function Builder({ steps, products }: BuilderProps) {
  const bundleStore = useBundleStore();
  const expandedStep = bundleStore.expandedStep;

  const handleToggleStep = (stepId: 'cameras' | 'plan' | 'sensors' | 'accessories') => {
    if (expandedStep === stepId) {
      // Close if already open
      // Optionally: bundleStore.setExpandedStep(null)
    } else {
      bundleStore.setExpandedStep(stepId);
    }
  };

  const handleNextStep = (currentStepId: 'cameras' | 'plan' | 'sensors' | 'accessories') => {
    const currentIndex = steps.findIndex((s) => s.id === currentStepId);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      bundleStore.setExpandedStep(nextStep.id as 'cameras' | 'plan' | 'sensors' | 'accessories');
    }
  };

  return (
    <div className="rounded-panel  bg-lavender pt-4 ">
      {steps.map((step, index) => {
        const nextStep = steps[index + 1];
        return (
          <Step
          
            key={step.id}
            step={step}
            isExpanded={expandedStep === step.id}
            onToggle={() => handleToggleStep(step.id)}
            onNext={() => handleNextStep(step.id)}
            products={products}
            nextStepTitle={nextStep?.title}
            isLastStep={index === steps.length - 1}
          />
        );
      })}
    </div>
  );
}
