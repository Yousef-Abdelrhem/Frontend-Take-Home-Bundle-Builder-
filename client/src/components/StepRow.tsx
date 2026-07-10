import type { Step as StepType } from '../data/catalog';
import { useBundleStore } from '../store/useBundleStore';
import StepLabel from './StepLabel';

interface StepRowProps {
  step: StepType;
  onToggle: () => void;
}

export default function StepRow({ step, onToggle }: StepRowProps) {
  const bundleStore = useBundleStore();
  const selectedCount = bundleStore.getSelectedProductIds(step.id).length;

  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-[5px] border-t-[0.5px] border-gray-300 py-5"
    >
      <div className="flex items-center gap-3 text-left">
        <span className="text-2xl">{step.icon}</span>
        <div className="flex flex-col gap-[5px]">
          <StepLabel order={step.order} />
          <h2 className="text-lg font-bold text-gray-900">{step.title}</h2>
        </div>
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
  );
}
