import type { Product } from '../data/catalog';
import { useBundleStore } from '../store/useBundleStore';
import QuantityStepper from './QuantityStepper';
import VariantSelector from './VariantSelector';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const bundleStore = useBundleStore();
  const activeVariantId = bundleStore.activeVariant[product.id];
  const currentVariantId = activeVariantId || product.variants?.[0]?.id;
  const currentQty = bundleStore.getQuantity(product.id, currentVariantId);

  // Compute badge if compareAtPrice is available
  const badgePercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleVariantChange = (variantId: string) => {
    bundleStore.setActiveVariant(product.id, variantId);
  };

  const handleQuantityChange = (qty: number) => {
    bundleStore.setQuantity(product.id, currentVariantId, qty);
  };

  return (
    <div
      className={`rounded-lg border-2 p-4 transition ${
        currentQty > 0 ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Badge */}
      {badgePercent > 0 && (
        <div className="mb-2 inline-block rounded-full bg-purple-600 px-3 py-1 text-sm font-semibold text-white">
          Save {badgePercent}%
        </div>
      )}

      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className="mb-3 h-48 w-full rounded-lg border border-gray-200 object-cover"
      />

      {/* Title and description */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{product.title}</h3>
      <p className="mb-3 text-sm text-gray-600">{product.description}</p>

      {/* Learn More link */}
      {product.learnMoreUrl && (
        <a href={product.learnMoreUrl} className="text-sm text-purple-600 hover:underline">
          Learn More
        </a>
      )}

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="my-3">
          <VariantSelector
            variants={product.variants}
            activeVariantId={currentVariantId}
            onSelectVariant={handleVariantChange}
          />
        </div>
      )}

      {/* Quantity stepper */}
      <div className="my-3">
        <QuantityStepper value={currentQty} onChange={handleQuantityChange} />
      </div>

      {/* Pricing */}
      <div className="flex items-baseline gap-2">
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <span className="text-sm text-gray-500 line-through">
            ${product.compareAtPrice.toFixed(2)}
          </span>
        )}
        <span className="text-lg font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
        {product.priceUnit && <span className="text-sm text-gray-600">{product.priceUnit}</span>}
      </div>
    </div>
  );
}
