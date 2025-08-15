import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'fr' | 'ar';
export type Theme = 'light' | 'dark';

interface AppStore {
  language: Language;
  theme: Theme;
  searchQuery: string;
  selectedCategory: string | null;
  priceRange: [number, number];
  ratingFilter: number | null;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setPriceRange: (range: [number, number]) => void;
  setRatingFilter: (rating: number | null) => void;
  resetFilters: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'light',
      searchQuery: '',
      selectedCategory: null,
      priceRange: [0, 100000], // Updated for DZD currency
      ratingFilter: null,
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setPriceRange: (priceRange) => set({ priceRange }),
      setRatingFilter: (ratingFilter) => set({ ratingFilter }),
      resetFilters: () => set({
        searchQuery: '',
        selectedCategory: null,
        priceRange: [0, 100000], // Updated for DZD currency
        ratingFilter: null,
      }),
    }),
    {
      name: 'app-storage',
    }
  )
);
