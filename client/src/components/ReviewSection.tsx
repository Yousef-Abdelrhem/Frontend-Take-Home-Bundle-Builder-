import type { Product } from '../data/catalog';
import ReviewLineItem from './ReviewLineItem';

interface LineItem {
  productId: string;
  variantId: string | undefined;
  product: Product;
  quantity: number;
  total: number;
}

interface ReviewSectionProps {
  title: string;
  items: LineItem[];
  onQuantityChange: (productId: string, variantId: string | undefined, qty: number) => void;
}

export default function ReviewSection({ title, items, onQuantityChange }: ReviewSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="border-t border-gray-200 py-3">
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</h3>
      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <ReviewLineItem
            key={`${item.productId}:${item.variantId || 'default'}`}
            product={item.product}
            quantity={item.quantity}
            total={item.total}
            onQuantityChange={(qty) => onQuantityChange(item.productId, item.variantId, qty)}
          />
        ))}
      </div>
    </div>
  );
}
