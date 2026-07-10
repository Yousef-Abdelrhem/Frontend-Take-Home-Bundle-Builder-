import type { Product } from '../data/catalog';
import ProductImage from './ProductImage';
import PriceDisplay from './PriceDisplay';
import QuantityStepper from './QuantityStepper';

interface ReviewLineItemProps {
  product: Product;
  quantity: number;
  total: number;
  onQuantityChange: (qty: number) => void;
}

export default function ReviewLineItem({
  product,
  quantity,
  total,
  onQuantityChange,
}: ReviewLineItemProps) {
  const compareAtTotal =
    product.compareAtPrice !== undefined ? product.compareAtPrice * quantity : undefined;

  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div className="flex items-center gap-2">
        <ProductImage src={product.image} alt={product.title} className="h-12 w-12 flex-shrink-0" />
        <p className="text-sm font-semibold text-gray-900">{product.title}</p>
      </div>
      <div className="flex items-center gap-3">
        <QuantityStepper value={quantity} onChange={onQuantityChange} />
        <PriceDisplay price={total} compareAtPrice={compareAtTotal} freeLabel align="right" size="sm" />
      </div>
    </div>
  );
}
