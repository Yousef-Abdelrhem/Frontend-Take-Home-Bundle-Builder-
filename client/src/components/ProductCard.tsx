import type { Product } from "../data/catalog";
import { useBundleStore } from "../store/useBundleStore";
import ProductImage from "./ProductImage";
import PriceDisplay from "./PriceDisplay";
import Badge from "./Badge";
import QuantityStepper from "./QuantityStepper";
import VariantSelector from "./VariantSelector";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const bundleStore = useBundleStore();
  const activeVariantId = bundleStore.activeVariant[product.id];
  const currentVariantId = activeVariantId || product.variants?.[0]?.id;
  const currentQty = bundleStore.getQuantity(product.id, currentVariantId);

  const badgePercent = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100,
      )
    : 0;

  const handleVariantChange = (variantId: string) => {
    bundleStore.setActiveVariant(product.id, variantId);
  };

  const handleQuantityChange = (qty: number) => {
    bundleStore.setQuantity(product.id, currentVariantId, qty);
  };

  return (
    <div
      className={`relative rounded-xl border-2 p-4 transition ${
        currentQty > 0
          ? "border-purple-01 bg-white"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {badgePercent > 0 && (
        <Badge variant="solid" className="absolute left-3 top-3">
          Save {badgePercent}%
        </Badge>
      )}

      <div className="flex gap-4 ">
        <div className="flex flex-shrink-0 items-center justify-center">
          <ProductImage
            src={product.image}
            alt={product.title}
            className="h-[137px] w-[101px] rounded-[5px]"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="mb-1 text-base font-semibold text-gray-900">
            {product.title}
          </h3>
          <p className="mb-2 text-sm text-gray-600">{product.description}</p>
          {product.learnMoreUrl && (
            <a
              href={product.learnMoreUrl}
              className="text-sm text-[##0000EE] underline"
            >
              Learn More
            </a>
          )}

          {product.variants && product.variants.length > 0 && (
            <div className="mt-3">
              <VariantSelector
                variants={product.variants}
                activeVariantId={currentVariantId}
                onSelectVariant={handleVariantChange}
              />
            </div>
          )}

          <div className="mt-auto flex items-center justify-between pt-3">
            <QuantityStepper
              value={currentQty}
              onChange={handleQuantityChange}
            />
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              priceUnit={product.priceUnit}
              align="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
