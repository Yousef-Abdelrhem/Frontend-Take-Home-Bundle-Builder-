import type { Product } from '../data/catalog';
import { useBundleStore } from '../store/useBundleStore';
import QuantityStepper from './QuantityStepper';
import { useState } from 'react';

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

  // Build line items from quantities
  const lineItems: LineItem[] = [];
  Object.entries(bundleStore.quantities).forEach(([key, qty]) => {
    if (qty > 0) {
      const [productId, variantId] = key.split(':');
      const product = products.find((p) => p.id === productId);
      if (product) {
        lineItems.push({
          productId,
          variantId: variantId === 'default' ? undefined : variantId,
          product,
          quantity: qty,
          total: product.price * qty,
        });
      }
    }
  });

  // Group by category
  const categories = {
    Cameras: lineItems.filter((item) => item.product.category === 'Cameras'),
    Sensors: lineItems.filter((item) => item.product.category === 'Sensors'),
    Accessories: lineItems.filter((item) => item.product.category === 'Accessories'),
    Plan: lineItems.filter((item) => item.product.category === 'Plan'),
  };

  // Calculate totals
  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const preDiscountTotal = lineItems.reduce((sum, item) => {
    const compareAtPrice = item.product.compareAtPrice || item.product.price;
    return sum + compareAtPrice * item.quantity;
  }, 0);
  const savings = preDiscountTotal - subtotal;
  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleQuantityChange = (
    productId: string,
    variantId: string | undefined,
    qty: number
  ) => {
    bundleStore.setQuantity(productId, variantId, qty);
  };

  const handleSaveSystem = async () => {
    // Save to localStorage via Zustand (already automatic)
    // Also attempt to save to backend
    try {
      // const systemData = {
      //   quantities: bundleStore.quantities,
      //   activeVariant: bundleStore.activeVariant,
      // };
      // await saveSystem(bundleStore.clientId, systemData);
    } catch (error) {
      console.error('Error saving system:', error);
    }

    // Show confirmation toast
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleCheckout = () => {
    alert('Checkout not implemented in this prototype. In a real app, you would proceed to payment here.');
  };

  return (
    <div className="sticky top-4 rounded-lg border border-gray-200 bg-blue-50 p-4">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Your security system</h2>
      <p className="mb-4 text-sm text-gray-600">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      {/* Line items by category */}
      <div className="mb-4 space-y-4 border-b border-gray-300 pb-4">
        {Object.entries(categories).map(([category, items]) => {
          if (items.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="mb-2 text-sm font-semibold uppercase text-gray-500">{category}</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={`${item.productId}:${item.variantId || 'default'}`}
                    className="flex items-center justify-between rounded-lg bg-white p-2"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="h-12 w-12 rounded border border-gray-200 object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.product.title}</p>
                        {item.variantId && (
                          <p className="text-xs text-gray-500">Variant: {item.variantId}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(qty) =>
                          handleQuantityChange(item.productId, item.variantId, qty)
                        }
                      />
                      <span className="w-16 text-right text-sm font-semibold">
                        ${item.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Satisfaction guarantee badge */}
      <div className="mb-4 flex items-center gap-2 rounded-lg bg-white p-2">
        <div className="text-2xl">✓</div>
        <div>
          <p className="text-sm font-semibold text-gray-900">100% Satisfaction Guaranteed</p>
          <p className="text-xs text-gray-600">If you're not totally in love with the product, we will refund you 100%.</p>
        </div>
      </div>

      {/* Financing line */}
      <div className="mb-4 flex justify-between text-sm">
        <span className="text-gray-600">As low as ${(total / 12).toFixed(2)}/mo</span>
      </div>

      {/* Shipping row */}
      <div className="mb-4 flex justify-between border-b border-gray-300 pb-2 text-sm">
        <span className="text-gray-600">Fast Shipping</span>
        <span className="font-semibold">${shipping.toFixed(2)}</span>
      </div>

      {/* Total */}
      <div className="mb-4 space-y-1">
        {preDiscountTotal > subtotal && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="line-through">${preDiscountTotal.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-2xl font-bold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Savings callout */}
      {savings > 0 && (
        <div className="mb-4 rounded-lg bg-purple-600 px-3 py-2 text-center">
          <p className="text-sm font-semibold text-white">
            Congratulations! You're saving ${savings.toFixed(2)} on your security bundle!
          </p>
        </div>
      )}

      {/* Checkout button */}
      <button
        onClick={handleCheckout}
        className="mb-3 w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700"
      >
        Checkout
      </button>

      {/* Save for later link */}
      <button
        onClick={handleSaveSystem}
        className="w-full text-center text-sm text-purple-600 hover:underline"
      >
        Save my system for later
      </button>

      {/* Toast notification */}
      {savedToast && (
        <div className="mt-2 rounded-lg bg-green-100 px-3 py-2 text-center text-sm font-semibold text-green-700">
          ✓ System saved!
        </div>
      )}
    </div>
  );
}
