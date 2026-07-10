interface StepLabelProps {
  order: number;
}

export default function StepLabel({ order }: StepLabelProps) {
  return <p className="text-xs font-semibold border-b border-black pb-1 pl-4 uppercase tracking-wide text-gray-500">Step {order} of 4</p>;
}
