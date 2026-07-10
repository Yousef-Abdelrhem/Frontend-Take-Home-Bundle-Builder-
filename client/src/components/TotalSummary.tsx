import Badge from './Badge';

interface TotalSummaryProps {
  total: number;
  preDiscountTotal: number;
  savings: number;
}

export default function TotalSummary({ total, preDiscountTotal, savings }: TotalSummaryProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3 rounded-xl bg-white p-3">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-purple-01-light text-2xl">
          🛡️
        </div>
        <div className="mr-auto">
          <p className="text-sm font-semibold text-gray-900">100% Satisfaction Guaranteed</p>
          <p className="text-xs text-gray-600">
            If you're not totally in love with the product, we will refund you 100%.
          </p>
        </div>
      </div>

      <div className="mb-2 flex justify-end">
        <Badge variant="solid">as low as ${(total / 12).toFixed(2)}/mo</Badge>
      </div>

      <div className="mb-1 flex flex-col items-end">
        {preDiscountTotal > total && (
          <span className="text-sm text-gray-400 line-through">${preDiscountTotal.toFixed(2)}</span>
        )}
        <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
      </div>

      {savings > 0 && (
        <p className="mb-4 text-right text-sm font-semibold text-success">
          Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
        </p>
      )}
    </div>
  );
}
