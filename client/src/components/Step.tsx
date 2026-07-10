import type { Product, Step as StepType } from '../data/catalog';
import { useBundleStore } from '../store/useBundleStore';
import ProductCard from './ProductCard';

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
  const bundleStore = useBundleStore();
  const stepProducts = products.filter((p) => p.stepId === step.id);

  // Count distinct products with qty > 0
  const selectedCount = bundleStore.getSelectedProductIds(step.id).length;

  return (
    <div className="mb-4 rounded-lg border border-gray-200">
      {/* Header */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-3 hover:bg-purple-100"
      >
        <div className="flex items-center gap-3 text-left">
          <span className="text-2xl">{step.icon}</span>
          <div>
            <p className="text-sm font-semibold text-gray-600">STEP {step.order} OF 4</p>
            <h2 className="text-lg font-bold text-gray-900">{step.title}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <span className="rounded-full bg-purple-600 px-3 py-1 text-sm font-semibold text-white">
              {selectedCount} selected
            </span>
          )}
          <span className="text-2xl">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4">
          {/* Product grid */}
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stepProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Next button */}
          {!isLastStep && (
            <button
              onClick={onNext}
              className="mt-4 rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white hover:bg-purple-700"
            >
              Next: {nextStepTitle || 'Continue'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
