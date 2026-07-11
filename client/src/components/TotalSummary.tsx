import Badge from "./Badge";
import satisfactionBadge from "../assets/icons/satisfactionBadge.png";

interface TotalSummaryProps {
  total: number;
  preDiscountTotal: number;
  savings: number;
}

export default function TotalSummary({
  total,
  preDiscountTotal,
  savings,
}: TotalSummaryProps) {
  return (
    <div>
      <div className="mb-3 flex items-end justify-between gap-3">
        <img
          src={satisfactionBadge}
          alt="100% Wyze satisfaction guarantee"
          className="h-[var(--size-badge)] w-[var(--size-badge)] flex-shrink-0"
        />
        <div className="flex flex-col items-end">
          <Badge variant="solid" className="mb-2">
            as low as ${(total / 12).toFixed(2)}/mo
          </Badge>
          <div className="flex gap-2  items-center">
            {preDiscountTotal > total && (
              <span className="text-lg text-price-strikethrough line-through">
                ${preDiscountTotal.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-bold text-purple-01">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {savings > 0 && (
        <p className="mt-2 text-xs text-center font-normal tracking-price text-success">
          Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
        </p>
      )}
    </div>
  );
}
