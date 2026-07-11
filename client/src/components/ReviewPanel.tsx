import type { Product } from "../data/catalog";
import { useBundleStore } from "../store/useBundleStore";
import ReviewSection from "./ReviewSection";
import TotalSummary from "./TotalSummary";
import PriceDisplay from "./PriceDisplay";
import { useState } from "react";
import camUnlimitedIcon from "../assets/icons/cam-unlimited-icon.png";
import fastShippingIcon from "../assets/icons/fast-shipping-icon.png";

interface ReviewPanelProps {
  products: Product[];
}

interface LineItem {
  productId: string;
  variantId: string | undefined;
  product: Product;
  quantity: number;
  total: number;
}

export default function ReviewPanel({ products }: ReviewPanelProps) {
  const bundleStore = useBundleStore();
  const [savedToast, setSavedToast] = useState(false);

  const lineItems: LineItem[] = [];
  Object.entries(bundleStore.quantities).forEach(([key, qty]) => {
    if (qty > 0) {
      const [productId, variantId] = key.split(":");
      const product = products.find((p) => p.id === productId);
      if (product) {
        lineItems.push({
          productId,
          variantId: variantId === "default" ? undefined : variantId,
          product,
          quantity: qty,
          total: product.price * qty,
        });
      }
    }
  });

  const categories = {
    Cameras: lineItems.filter((item) => item.product.category === "Cameras"),
    Sensors: lineItems.filter((item) => item.product.category === "Sensors"),
    Accessories: lineItems.filter(
      (item) => item.product.category === "Accessories",
    ),
  };
  const planItem = lineItems.find((item) => item.product.category === "Plan");

  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const preDiscountTotal = lineItems.reduce((sum, item) => {
    const compareAtPrice = item.product.compareAtPrice ?? item.product.price;
    return sum + compareAtPrice * item.quantity;
  }, 0);
  const shippingListPrice = 5.99;
  const shipping = 0;
  const savings = preDiscountTotal - subtotal + (shippingListPrice - shipping);
  const total = subtotal + shipping;
  const preDiscountGrandTotal = preDiscountTotal + shippingListPrice;

  const handleQuantityChange = (
    productId: string,
    variantId: string | undefined,
    qty: number,
  ) => {
    bundleStore.setQuantity(productId, variantId, qty);
  };

  const handleSaveSystem = async () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleCheckout = () => {
    alert(
      "Checkout not implemented in this prototype. In a real app, you would proceed to payment here.",
    );
  };

  return (
    <div className="sticky top-[var(--space-panel-top-offset)] rounded-panel bg-lavender pt-5 pr-5 pb-[var(--space-panel-bottom-pad)] pl-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
        Review
      </p>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">
        Your security system
      </h2>
      <p className="mb-2 text-sm text-gray-600">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>

      <ReviewSection
        title="Cameras"
        items={categories.Cameras}
        onQuantityChange={handleQuantityChange}
      />
      <ReviewSection
        title="Sensors"
        items={categories.Sensors}
        onQuantityChange={handleQuantityChange}
      />
      <ReviewSection
        title="Accessories"
        items={categories.Accessories}
        onQuantityChange={handleQuantityChange}
      />

      {planItem && (
        <div className="border-t border-gray-200 py-3">
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Plan
          </h3>
          <div className="flex items-center justify-between gap-2 py-2">
            <div className="flex items-center gap-2">
              <img src={camUnlimitedIcon} alt="" className="h-6 w-6" />
              <p className="text-sm font-semibold text-gray-900">
                Cam <span className="text-purple-01">Unlimited</span>
              </p>
            </div>
            <PriceDisplay
              price={planItem.product.price}
              compareAtPrice={planItem.product.compareAtPrice}
              priceUnit={planItem.product.priceUnit}
              align="right"
              size="sm"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 border-t border-gray-200 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 ">
          <div className="flex items-center justify-center bg-white rounded-btn px-2 py-1">
            <img src={fastShippingIcon} alt="" className="h-6 w-6 " />
          </div>
          Fast Shipping
        </div>
        <PriceDisplay
          price={shipping}
          compareAtPrice={shippingListPrice}
          freeLabel
          align="right"
          size="sm"
        />
      </div>

      <TotalSummary
        total={total}
        preDiscountTotal={preDiscountGrandTotal}
        savings={savings}
      />

      <button
        onClick={handleCheckout}
        className="mb-3 w-full rounded-xl bg-purple-01 px-4 py-3 font-semibold text-white hover:opacity-90"
      >
        Checkout
      </button>

      <button
        onClick={handleSaveSystem}
        className="w-full text-center text-sm italic text-gray-600 underline hover:text-gray-900"
      >
        Save my system for later
      </button>

      {savedToast && (
        <div className="mt-2 rounded-lg bg-green-100 px-3 py-2 text-center text-sm font-semibold text-green-700">
          ✓ System saved!
        </div>
      )}
    </div>
  );
}
