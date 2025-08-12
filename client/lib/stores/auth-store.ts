import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  preferences: {
    theme: 'light' | 'dark';
    language: 'en' | 'fr' | 'ar';
    currency: 'USD' | 'EUR' | 'DZD';
    notifications: boolean;
  };
  profile: {
    phone?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    dateOfBirth?: string;
    memberSince: string;
  };
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@shopsage.com',
    name: 'Admin User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    preferences: {
      theme: 'light',
      language: 'en',
      currency: 'USD',
      notifications: true,
    },
    profile: {
      phone: '+1 (555) 123-4567',
      address: {
        street: '123 Tech Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        country: 'United States',
      },
      memberSince: '2020-01-15',
    },
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    preferences: {
      theme: 'dark',
      language: 'en',
      currency: 'USD',
      notifications: false,
    },
    profile: {
      phone: '+1 (555) 987-6543',
      memberSince: '2023-06-20',
    },
  },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email);
        
        if (user && password === 'password') {
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },
      
      register: async (userData) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: userData.email || '',
          name: userData.name || '',
          avatar: userData.avatar,
          role: 'user',
          preferences: {
            theme: 'light',
            language: 'en',
            currency: 'USD',
            notifications: true,
          },
          profile: {
            memberSince: new Date().toISOString().split('T')[0],
          },
        };
        
        set({ 
          user: newUser, 
          isAuthenticated: true, 
          isLoading: false 
        });
        return true;
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },
      
      updateProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { 
              ...currentUser, 
              ...updates 
            } 
          });
        }
      },
      
      updatePreferences: (preferences) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { 
              ...currentUser, 
              preferences: {
                ...currentUser.preferences,
                ...preferences,
              }
            } 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
