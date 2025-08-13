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
      wilaya?: string;
      commune?: string;
      landmark?: string;
    };
    dateOfBirth?: string;
    memberSince: string;
    nationalId?: string; // Algerian national ID
    profession?: string;
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

// Mock users for demo - Algerian market
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@shopsage.dz',
    name: 'محمد بن علي',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    role: 'admin',
    preferences: {
      theme: 'light',
      language: 'ar',
      currency: 'DZD',
      notifications: true,
    },
    profile: {
      phone: '+213 555 123 456',
      address: {
        street: 'شارع الاستقلال رقم 123',
        city: 'الجزائر العاصمة',
        state: 'الجزائر',
        zipCode: '16000',
        country: 'الجزائر',
        wilaya: '16',
        commune: 'باب الوادي',
        landmark: 'بالقرب من مسجد الجامعة',
      },
      memberSince: '2020-01-15',
      nationalId: '1234567890123456',
      profession: 'مدير تقني',
    },
  },
  {
    id: '2',
    email: 'user@example.dz',
    name: 'فاطمة بن صالح',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b278?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    role: 'user',
    preferences: {
      theme: 'light',
      language: 'ar',
      currency: 'DZD',
      notifications: true,
    },
    profile: {
      phone: '+213 555 987 654',
      address: {
        street: 'حي النصر، بلوك C، شقة 15',
        city: 'وهران',
        state: 'وهران',
        zipCode: '31000',
        country: 'الجزائر',
        wilaya: '31',
        commune: 'السانية',
        landmark: 'قريب من جامعة وهران',
      },
      memberSince: '2023-06-20',
      profession: 'مهندسة',
    },
  },
  {
    id: '3',
    email: 'ahmed@gmail.com',
    name: 'Ahmed Benali',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80',
    role: 'user',
    preferences: {
      theme: 'dark',
      language: 'fr',
      currency: 'DZD',
      notifications: false,
    },
    profile: {
      phone: '+213 770 123 456',
      address: {
        street: 'Cité 1000 Logements, Bât 12, App 45',
        city: 'Constantine',
        state: 'Constantine',
        zipCode: '25000',
        country: 'Algérie',
        wilaya: '25',
        commune: 'El Khroub',
        landmark: 'Près de l\'université Mentouri',
      },
      memberSince: '2022-03-10',
      profession: 'Enseignant',
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
          language: 'ar',
          currency: 'DZD',
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
