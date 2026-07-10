interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number;
  priceUnit?: string;
  freeLabel?: boolean;
  align?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  priceColor?: string;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export default function PriceDisplay({
  price,
  compareAtPrice,
  priceUnit,
  freeLabel = false,
  align = 'left',
  size = 'md',
  priceColor = 'text-gray-900',
}: PriceDisplayProps) {
  const hasDiscount = compareAtPrice !== undefined && compareAtPrice > price;

  return (
    <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
      {hasDiscount && (
        <span className="text-xs text-error line-through">${compareAtPrice!.toFixed(2)}</span>
      )}
      <span className={`font-bold ${priceColor} ${sizeClasses[size]}`}>
        {freeLabel && price === 0 ? 'FREE' : `$${price.toFixed(2)}`}
        {priceUnit && !freeLabel && <span className="ml-0.5 text-xs font-normal text-gray-500">{priceUnit}</span>}
      </span>
    </div>
  );
}
