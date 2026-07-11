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
  priceColor = 'text-price',
}: PriceDisplayProps) {
  const hasDiscount = compareAtPrice !== undefined && compareAtPrice > price;

  return (
    <div className={`flex gap-1
     flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
      {hasDiscount && (
        <span className="text-base font-normal tracking-price leading-none text-price-strikethrough line-through">
          ${compareAtPrice!.toFixed(2)}
        </span>
      )}
      {freeLabel && price === 0 ? (
        <span className="font-bold tracking-price leading-none text-purple-01 text-md">FREE</span>
      ) : (
        <span className={`font-bold tracking-price leading-none ${priceColor} text-md`}>
          ${price.toFixed(2)}
          {priceUnit && <span className="ml-0.5 text-xs font-normal text-gray-500">{priceUnit}</span>}
        </span>
      )}
    </div>
  );
}