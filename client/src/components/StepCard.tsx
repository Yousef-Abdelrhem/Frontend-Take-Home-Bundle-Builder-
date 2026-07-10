import type { Product, Step as StepType } from '../data/catalog';
import { useBundleStore } from '../store/useBundleStore';
import ProductCard from './ProductCard';
import StepLabel from './StepLabel';
import camerIcon from '../assets/icons/camerIcon.png';

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
  const selectedCount = bundleStore.getSelectedProductIds(step.id).length;

  return (
    <div>
      <StepLabel order={step.order} />
      <div className="mt-2 w-full  bg-lavender  pb-5 pl-[15px] pr-[15px] pt-5">
        <button onClick={onToggle} className="flex w-full items-center justify-between text-left">
          <div className="flex items-center gap-3">
            {step.id === 'cameras' ? (
              <img src={camerIcon} alt="" className="h-8 w-8" />
            ) : (
              <span className="text-2xl">{step.icon}</span>
            )}
            <h2 className="text-[22px]  text-gray-900">{step.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {selectedCount > 0 && (
              <span className="text-sm font-semibold text-purple-01">{selectedCount} selected</span>
            )}
            <span className="text-sm text-purple-01">▲</span>
          </div>
        </button>

        <div className="mt-4 grid grid-cols-1 gap-[15px] sm:grid-cols-2">
          {stepProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!isLastStep && (
          <button
            onClick={onNext}
            className="mt-5 w-full rounded-xl border-2 border-purple-01 bg-white px-6 py-3 font-semibold text-purple-01 hover:bg-purple-01-light"
          >
            Next: {nextStepTitle || 'Continue'}
          </button>
        )}
      </div>
    </div>
  );
}
