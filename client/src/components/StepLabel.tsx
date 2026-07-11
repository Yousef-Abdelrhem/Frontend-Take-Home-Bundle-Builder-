interface StepLabelProps {
  order: number;
  borderBottom?: boolean;
}

export default function StepLabel({
  order,
  borderBottom = true,
}: StepLabelProps) {
  return (
    <p
      className={`text-xs font-semibold  ${borderBottom ? "border-b border-black" : ""} pb-1 pl-4 uppercase tracking-wide text-gray-500`}
    >
      Step {order} of 4
    </p>
  );
}
