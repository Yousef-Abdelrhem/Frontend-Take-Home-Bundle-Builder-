import type { Product, Step as StepType } from '../data/catalog';
import { useBundleStore } from '../store/useBundleStore';
import ProductCard from './ProductCard';
import StepLabel from './StepLabel';
import StepIcon from './StepIcon';

interface StepCardProps {
  step: StepType;
  products: Product[];
  onToggle: () => void;
  onNext: () => void;
  nextStepTitle?: string;
  isLastStep?: boolean;
}

export default function StepCard({
  step,
  products,
  onToggle,
  onNext,
  nextStepTitle,
  isLastStep = false,
}: StepCardProps) {
  const bundleStore = useBundleStore();
  const stepProducts = products.filter((p) => p.stepId === step.id);
  const selectedCount = bundleStore.getSelectedProductIds(stepProducts.map((p) => p.id)).length;

  return (
    <div>
      <StepLabel order={step.order} />
      <div className="mt-2 w-full  bg-lavender  pb-5 pl-[var(--space-content-gap)] pr-[var(--space-content-gap)] pt-5">
        <button onClick={onToggle} className="flex w-full items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <StepIcon stepId={step.id} />
            <h2 className="text-step-title  text-gray-900">{step.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {selectedCount > 0 && (
              <span className="text-sm font-semibold text-purple-01">{selectedCount} selected</span>
            )}
            <span className="text-sm text-purple-01">▲</span>
          </div>
        </button>

        <div className="mt-4 grid grid-cols-1 gap-[var(--space-content-gap)] sm:grid-cols-2">
          {stepProducts.map((product, index) => {
            const isLastOdd = stepProducts.length % 2 !== 0 && index === stepProducts.length - 1;
            return (
              <div key={product.id} className={isLastOdd ? 'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-var(--space-content-gap)/2)]' : undefined}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>

        {!isLastStep && (
          <button
            onClick={onNext}
            className="mx-auto mt-5 flex h-[var(--size-cta-btn-h)] w-fit items-center justify-center gap-[var(--space-cta-gap)] rounded-btn border border-purple-01 bg-white px-6 py-[var(--space-cta-py)] font-semibold text-purple-01 hover:bg-purple-01-light"
          >
            Next: {nextStepTitle || 'Continue'}
          </button>
        )}
      </div>
    </div>
  );
}
