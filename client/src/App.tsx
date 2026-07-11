import { useEffect, useState } from "react";
import { products as catalogProducts, steps } from "./data/catalog";
import { useBundleStore } from "./store/useBundleStore";
import { fetchProducts } from "./api/client";
import Builder from "./components/Builder";
import ReviewPanel from "./components/ReviewPanel";
import "./index.css";

export default function App() {
  const [products, setProducts] = useState(catalogProducts);
  const [loading, setLoading] = useState(true);
  const bundleStore = useBundleStore();

  useEffect(() => {
    // Initialize with seeded quantities
    products.forEach((product) => {
      if (product.seededQty) {
        bundleStore.setQuantity(product.id, undefined, product.seededQty);
      }
    });

    // Fetch products from API (fallback to local if not available)
    fetchProducts().then((fetchedProducts) => {
      setProducts(fetchedProducts);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900 lg:text-left">
          <span className="hidden lg:inline">Build Your Security System</span>
          <span className="inline lg:hidden">Let's get started!</span>
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_399px]">
          {/* Builder (Left column) */}
          <Builder steps={steps} products={products} />

          {/* Review Panel (Right column) */}
          <ReviewPanel products={products} />
        </div>
      </div>
    </div>
  );
}
