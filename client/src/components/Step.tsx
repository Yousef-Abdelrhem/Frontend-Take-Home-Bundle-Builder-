import type { Product, Step as StepType } from '../data/catalog';
import StepCard from './StepCard';
import StepRow from './StepRow';

interface StepProps {
  step: StepType;
  isExpanded: boolean;
  onToggle: () => void;
  onNext: () => void;
  products: Product[];
  nextStepTitle?: string;
  isLastStep?: boolean;
}

export default function Step({
  step,
  isExpanded,
  onToggle,
  onNext,
  products,
  nextStepTitle,
  isLastStep = false,
}: StepProps) {
  if (isExpanded) {
    return (
      <StepCard
        step={step}
        products={products}
        onToggle={onToggle}
        onNext={onNext}
        nextStepTitle={nextStepTitle}
        isLastStep={isLastStep}
      />
    );
  }

  return <StepRow step={step} products={products} onToggle={onToggle} />;
}
