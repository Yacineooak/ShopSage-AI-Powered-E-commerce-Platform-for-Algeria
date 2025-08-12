import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './cart-store';

interface ComparisonStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearComparison: () => void;
  isInComparison: (id: string) => boolean;
  getTotalItems: () => number;
}

export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);
        
        if (!existingItem && items.length < 4) { // Max 4 items for comparison
          set({
            items: [...items, product],
          });
        }
      },
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },
      clearComparison: () => {
        set({ items: [] });
      },
      isInComparison: (id) => {
        return get().items.some((item) => item.id === id);
      },
      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: 'comparison-storage',
    }
  )
);
