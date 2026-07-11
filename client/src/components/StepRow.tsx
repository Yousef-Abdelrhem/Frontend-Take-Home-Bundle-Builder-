import type { Product, Step as StepType } from "../data/catalog";
import { useBundleStore } from "../store/useBundleStore";
import StepLabel from "./StepLabel";
import StepIcon from "./StepIcon";

interface StepRowProps {
  step: StepType;
  products: Product[];
  onToggle: () => void;
}

export default function StepRow({ step, products, onToggle }: StepRowProps) {
  const bundleStore = useBundleStore();
  const stepProducts = products.filter((p) => p.stepId === step.id);
  const selectedCount = bundleStore.getSelectedProductIds(
    stepProducts.map((p) => p.id),
  ).length;

  return (
    <>
      <div className="py-2 bg-white">
        <StepLabel order={step.order} borderBottom={false} />
      </div>

      <div className=" flex min-h-[var(--size-step-row-min-h)] w-full flex-col gap-0 border-t-[var(--border-hairline)] border-step-divider bg-white pt-5 pb-5">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <StepIcon stepId={step.id} />
            <h2 className="text-step-title text-gray-900">{step.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {selectedCount > 0 && (
              <span className="text-sm font-semibold text-purple-01 lg:hidden">
                {selectedCount} selected
              </span>
            )}
            <span className="text-sm text-purple-01">▼</span>
          </div>
        </button>
      </div>
    </>
  );
}
