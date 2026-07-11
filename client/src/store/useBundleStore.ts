import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface CartItem {
  productId: string;
  variantId?: string; // undefined for products without variants
  quantity: number;
}

export interface BundleState {
  clientId: string;
  quantities: Record<string, number>; // key: "${productId}:${variantId || 'default'}"
  activeVariant: Record<string, string>; // key: productId, value: variantId
  expandedStep: 'cameras' | 'plan' | 'sensors' | 'accessories';
}

export interface BundleStore extends BundleState {
  setQuantity: (productId: string, variantId: string | undefined, qty: number) => void;
  setActiveVariant: (productId: string, variantId: string) => void;
  setExpandedStep: (stepId: 'cameras' | 'plan' | 'sensors' | 'accessories') => void;
  getQuantity: (productId: string, variantId?: string) => number;
  getSelectedProductIds: (productIds: string[]) => string[];
  reset: () => void;
}

const initialState: BundleState = {
  clientId: '',
  quantities: {},
  activeVariant: {},
  expandedStep: 'cameras',
};

export const useBundleStore = create<BundleStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      clientId: uuidv4(),

      setQuantity: (productId, variantId, qty) => {
        const key = variantId ? `${productId}:${variantId}` : `${productId}:default`;
        set((state) => ({
          quantities: {
            ...state.quantities,
            [key]: Math.max(0, qty),
          },
        }));
      },

      setActiveVariant: (productId, variantId) => {
        set((state) => ({
          activeVariant: {
            ...state.activeVariant,
            [productId]: variantId,
          },
        }));
      },

      setExpandedStep: (stepId) => {
        set({ expandedStep: stepId });
      },

      getQuantity: (productId, variantId) => {
        const state = get();
        const key = variantId ? `${productId}:${variantId}` : `${productId}:default`;
        return state.quantities[key] || 0;
      },

      getSelectedProductIds: (productIds) => {
        const state = get();
        const idSet = new Set(productIds);
        const selectedProducts = new Set<string>();

        Object.entries(state.quantities).forEach(([key, qty]) => {
          if (qty > 0) {
            const [productId] = key.split(':');
            if (idSet.has(productId)) {
              selectedProducts.add(productId);
            }
          }
        });

        return Array.from(selectedProducts);
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'bundle-store',
      version: 1,
    }
  )
);
