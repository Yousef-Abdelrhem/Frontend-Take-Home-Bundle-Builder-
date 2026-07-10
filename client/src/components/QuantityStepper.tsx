interface QuantityStepperProps {
  value: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 999,
  disabled = false,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        −
      </button>
      <span className="w-8 text-center font-medium">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}
