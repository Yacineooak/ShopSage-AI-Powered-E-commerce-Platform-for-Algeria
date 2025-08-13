import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ShippingMethod = 'standard' | 'express' | 'pickup' | 'yalidina_home' | 'yalidina_pickup' | 'aramex_home' | 'aramex_pickup';

export interface ShippingRate {
  method: ShippingMethod;
  name: string;
  nameAr: string;
  nameFr: string;
  price: number;
  currency: 'DZD';
  estimatedDays: number;
  description: string;
  descriptionAr: string;
  descriptionFr: string;
  freeThreshold?: number; // Free shipping above this amount
  maxWeight?: number; // Maximum weight in kg
  maxDimensions?: {
    length: number;
    width: number;
    height: number;
  };
  availableWilayas: string[]; // Wilaya codes where this service is available
  trackingIncluded: boolean;
  insuranceIncluded: boolean;
  requiresSignature: boolean;
}

export interface ShippingAddress {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  streetAddress: string;
  apartment?: string;
  wilaya: string; // Wilaya code
  commune: string;
  postalCode: string;
  phone: string;
  email?: string;
  isDefault: boolean;
  instructions?: string;
  landmark?: string; // Important for Algeria
  createdAt: string;
}

export interface TrackingInfo {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed_delivery' | 'returned';
  statusAr: string;
  statusFr: string;
  statusEn: string;
  updates: TrackingUpdate[];
  estimatedDelivery?: string;
  actualDelivery?: string;
}

export interface TrackingUpdate {
  timestamp: string;
  status: string;
  statusAr: string;
  statusFr: string;
  statusEn: string;
  location: string;
  locationAr: string;
  description: string;
  descriptionAr: string;
  descriptionFr: string;
}

interface ShippingStore {
  // Shipping rates and methods
  shippingRates: ShippingRate[];
  selectedShippingMethod: ShippingMethod | null;
  
  // Addresses
  savedAddresses: ShippingAddress[];
  selectedAddress: ShippingAddress | null;
  
  // Tracking
  trackingInfo: Record<string, TrackingInfo>;
  
  // Actions
  getShippingRates: (wilaya: string, weight?: number, value?: number) => ShippingRate[];
  selectShippingMethod: (method: ShippingMethod) => void;
  calculateShippingCost: (method: ShippingMethod, wilaya: string, weight?: number, value?: number) => number;
  
  // Address management
  addAddress: (address: Omit<ShippingAddress, 'id' | 'createdAt'>) => void;
  updateAddress: (id: string, updates: Partial<ShippingAddress>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  selectAddress: (address: ShippingAddress) => void;
  
  // Tracking
  addTrackingInfo: (info: TrackingInfo) => void;
  updateTrackingStatus: (trackingNumber: string, update: TrackingUpdate) => void;
  getTrackingInfo: (trackingNumber: string) => TrackingInfo | null;
}

// Algerian shipping rates and services
const defaultShippingRates: ShippingRate[] = [
  {
    method: 'standard',
    name: 'Standard Delivery',
    nameAr: 'التوصيل العادي',
    nameFr: 'Livraison Standard',
    price: 500,
    currency: 'DZD',
    estimatedDays: 5,
    description: 'Regular delivery within 3-5 business days',
    descriptionAr: 'التوصيل العادي خلال 3-5 أيام عمل',
    descriptionFr: 'Livraison régulière sous 3-5 jours ouvrables',
    freeThreshold: 5000,
    maxWeight: 30,
    availableWilayas: [], // Available everywhere
    trackingIncluded: true,
    insuranceIncluded: false,
    requiresSignature: false,
  },
  {
    method: 'express',
    name: 'Express Delivery',
    nameAr: 'التوصيل السريع',
    nameFr: 'Livraison Express',
    price: 1000,
    currency: 'DZD',
    estimatedDays: 2,
    description: 'Fast delivery within 1-2 business days',
    descriptionAr: 'التوصيل السريع خلال 1-2 أيام عمل',
    descriptionFr: 'Livraison rapide sous 1-2 jours ouvrables',
    maxWeight: 20,
    availableWilayas: ['16', '31', '09', '25', '19', '06', '23'], // Major cities
    trackingIncluded: true,
    insuranceIncluded: true,
    requiresSignature: true,
  },
  {
    method: 'pickup',
    name: 'Store Pickup',
    nameAr: 'الاستلام من المتجر',
    nameFr: 'Retrait en Magasin',
    price: 0,
    currency: 'DZD',
    estimatedDays: 1,
    description: 'Pick up from our store locations',
    descriptionAr: 'الاستلام من مواقع متاجرنا',
    descriptionFr: 'Retrait depuis nos magasins',
    availableWilayas: ['16', '31'], // Only where we have stores
    trackingIncluded: false,
    insuranceIncluded: false,
    requiresSignature: true,
  },
  {
    method: 'yalidina_home',
    name: 'Yalidina Home Delivery',
    nameAr: 'ياليدينا - توصيل منزلي',
    nameFr: 'Yalidina - Livraison à Domicile',
    price: 400,
    currency: 'DZD',
    estimatedDays: 3,
    description: 'Yalidina courier service to your door',
    descriptionAr: 'خدمة ياليدينا للتوصيل إلى باب المنزل',
    descriptionFr: 'Service de livraison Yalidina à domicile',
    freeThreshold: 8000,
    maxWeight: 25,
    availableWilayas: ['16', '31', '09', '25', '19', '06', '23', '13', '14', '15', '35', '42'],
    trackingIncluded: true,
    insuranceIncluded: true,
    requiresSignature: false,
  },
  {
    method: 'yalidina_pickup',
    name: 'Yalidina Pickup Point',
    nameAr: 'ياليدينا - نقطة استلام',
    nameFr: 'Yalidina - Point Relais',
    price: 300,
    currency: 'DZD',
    estimatedDays: 3,
    description: 'Collect from Yalidina pickup points',
    descriptionAr: 'الاستلام من نقاط ياليدينا',
    descriptionFr: 'Retrait depuis les points Yalidina',
    freeThreshold: 6000,
    maxWeight: 25,
    availableWilayas: ['16', '31', '09', '25', '19', '06', '23', '13', '14', '15', '35', '42', '02', '27', '29'],
    trackingIncluded: true,
    insuranceIncluded: false,
    requiresSignature: false,
  },
  {
    method: 'aramex_home',
    name: 'Aramex Home Delivery',
    nameAr: 'أراميكس - توصيل منزلي',
    nameFr: 'Aramex - Livraison à Domicile',
    price: 600,
    currency: 'DZD',
    estimatedDays: 4,
    description: 'Aramex professional courier service',
    descriptionAr: 'خدمة أراميكس المهنية للتوصيل',
    descriptionFr: 'Service professionnel de livraison Aramex',
    maxWeight: 30,
    availableWilayas: ['16', '31', '09', '25', '19', '06', '23'],
    trackingIncluded: true,
    insuranceIncluded: true,
    requiresSignature: true,
  },
  {
    method: 'aramex_pickup',
    name: 'Aramex Pickup Point',
    nameAr: 'أراميكس - نقطة استلام',
    nameFr: 'Aramex - Point Relais',
    price: 450,
    currency: 'DZD',
    estimatedDays: 4,
    description: 'Collect from Aramex service centers',
    descriptionAr: 'الاستلام من مراكز أراميكس',
    descriptionFr: 'Retrait depuis les centres Aramex',
    maxWeight: 30,
    availableWilayas: ['16', '31', '09', '25', '19', '06', '23', '13', '14'],
    trackingIncluded: true,
    insuranceIncluded: true,
    requiresSignature: false,
  },
];

// Algerian wilaya postal codes mapping
const wilayaPostalCodes: Record<string, string[]> = {
  '01': ['01000'], // Adrar
  '02': ['02000'], // Chlef
  '03': ['03000'], // Laghouat
  '04': ['04000'], // Oum El Bouaghi
  '05': ['05000'], // Batna
  '06': ['06000'], // Béjaïa
  '07': ['07000'], // Biskra
  '08': ['08000'], // Béchar
  '09': ['09000'], // Blida
  '10': ['10000'], // Bouira
  '11': ['11000'], // Tamanrasset
  '12': ['12000'], // Tébessa
  '13': ['13000'], // Tlemcen
  '14': ['14000'], // Tiaret
  '15': ['15000'], // Tizi Ouzou
  '16': ['16000', '16001', '16002', '16003', '16004', '16005'], // Algiers (multiple postal codes)
  '17': ['17000'], // Djelfa
  '18': ['18000'], // Jijel
  '19': ['19000'], // Sétif
  '20': ['20000'], // Saïda
  '21': ['21000'], // Skikda
  '22': ['22000'], // Sidi Bel Abbès
  '23': ['23000'], // Annaba
  '24': ['24000'], // Guelma
  '25': ['25000'], // Constantine
  '26': ['26000'], // Médéa
  '27': ['27000'], // Mostaganem
  '28': ['28000'], // M'Sila
  '29': ['29000'], // Mascara
  '30': ['30000'], // Ouargla
  '31': ['31000', '31001', '31002'], // Oran (multiple postal codes)
  '32': ['32000'], // El Bayadh
  '33': ['33000'], // Illizi
  '34': ['34000'], // Bordj Bou Arréridj
  '35': ['35000'], // Boumerdès
  '36': ['36000'], // El Tarf
  '37': ['37000'], // Tindouf
  '38': ['38000'], // Tissemsilt
  '39': ['39000'], // El Oued
  '40': ['40000'], // Khenchela
  '41': ['41000'], // Souk Ahras
  '42': ['42000'], // Tipaza
  '43': ['43000'], // Mila
  '44': ['44000'], // Aïn Defla
  '45': ['45000'], // Naâma
  '46': ['46000'], // Aïn Témouchent
  '47': ['47000'], // Ghardaïa
  '48': ['48000'], // Relizane
};

export const useShippingStore = create<ShippingStore>()(
  persist(
    (set, get) => ({
      // Initial state
      shippingRates: defaultShippingRates,
      selectedShippingMethod: null,
      savedAddresses: [],
      selectedAddress: null,
      trackingInfo: {},
      
      // Get available shipping rates for a wilaya
      getShippingRates: (wilaya, weight = 1, value = 0) => {
        const rates = get().shippingRates.filter(rate => {
          // Check if service is available in this wilaya
          if (rate.availableWilayas.length > 0 && !rate.availableWilayas.includes(wilaya)) {
            return false;
          }
          
          // Check weight restrictions
          if (rate.maxWeight && weight > rate.maxWeight) {
            return false;
          }
          
          return true;
        });
        
        // Apply free shipping thresholds
        return rates.map(rate => ({
          ...rate,
          price: (rate.freeThreshold && value >= rate.freeThreshold) ? 0 : rate.price,
        }));
      },
      
      selectShippingMethod: (method) => {
        set({ selectedShippingMethod: method });
      },
      
      calculateShippingCost: (method, wilaya, weight = 1, value = 0) => {
        const rate = get().shippingRates.find(r => r.method === method);
        if (!rate) return 0;
        
        // Check if service is available
        if (rate.availableWilayas.length > 0 && !rate.availableWilayas.includes(wilaya)) {
          return -1; // Service not available
        }
        
        // Check weight restrictions
        if (rate.maxWeight && weight > rate.maxWeight) {
          return -1; // Weight exceeded
        }
        
        // Apply free shipping threshold
        if (rate.freeThreshold && value >= rate.freeThreshold) {
          return 0;
        }
        
        // Calculate additional fees for heavy items
        let additionalFee = 0;
        if (weight > 5) {
          additionalFee = Math.ceil((weight - 5) / 5) * 100; // 100 DZD per additional 5kg
        }
        
        return rate.price + additionalFee;
      },
      
      // Address management
      addAddress: (address) => {
        const newAddress: ShippingAddress = {
          ...address,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          savedAddresses: state.savedAddresses.map(a => ({ ...a, isDefault: false })).concat(newAddress)
        }));
      },
      
      updateAddress: (id, updates) => {
        set((state) => ({
          savedAddresses: state.savedAddresses.map(address => 
            address.id === id ? { ...address, ...updates } : address
          )
        }));
      },
      
      removeAddress: (id) => {
        set((state) => ({
          savedAddresses: state.savedAddresses.filter(address => address.id !== id),
          selectedAddress: state.selectedAddress?.id === id ? null : state.selectedAddress,
        }));
      },
      
      setDefaultAddress: (id) => {
        set((state) => ({
          savedAddresses: state.savedAddresses.map(address => ({
            ...address,
            isDefault: address.id === id
          }))
        }));
      },
      
      selectAddress: (address) => {
        set({ selectedAddress: address });
      },
      
      // Tracking
      addTrackingInfo: (info) => {
        set((state) => ({
          trackingInfo: {
            ...state.trackingInfo,
            [info.trackingNumber]: info,
          }
        }));
      },
      
      updateTrackingStatus: (trackingNumber, update) => {
        set((state) => {
          const existing = state.trackingInfo[trackingNumber];
          if (!existing) return state;
          
          return {
            trackingInfo: {
              ...state.trackingInfo,
              [trackingNumber]: {
                ...existing,
                updates: [update, ...existing.updates],
                status: update.status as any,
                statusAr: update.statusAr,
                statusFr: update.statusFr,
                statusEn: update.statusEn,
              }
            }
          };
        });
      },
      
      getTrackingInfo: (trackingNumber) => {
        return get().trackingInfo[trackingNumber] || null;
      },
    }),
    {
      name: 'shipping-storage',
    }
  )
);

// Utility functions
export const validateAlgerianPostalCode = (postalCode: string, wilaya: string): boolean => {
  const codes = wilayaPostalCodes[wilaya];
  return codes ? codes.includes(postalCode) : false;
};

export const formatAlgerianAddress = (address: ShippingAddress, language: 'ar' | 'fr' | 'en' = 'fr'): string => {
  const parts = [
    `${address.firstName} ${address.lastName}`,
    address.company,
    address.streetAddress,
    address.apartment,
    `${address.commune}, ${address.wilaya} ${address.postalCode}`,
    'Algeria',
  ].filter(Boolean);
  
  return parts.join('\n');
};

// Common communes for major wilayas
export const popularCommunes: Record<string, { name: string; nameAr: string; nameFr: string }[]> = {
  '16': [ // Algiers
    { name: 'Bab El Oued', nameAr: 'باب الوادي', nameFr: 'Bab El Oued' },
    { name: 'Belouizdad', nameAr: 'بلوزداد', nameFr: 'Belouizdad' },
    { name: 'Bir Mourad Raïs', nameAr: 'بئر مراد رايس', nameFr: 'Bir Mourad Raïs' },
    { name: 'Hussein Dey', nameAr: 'حسين داي', nameFr: 'Hussein Dey' },
    { name: 'Kouba', nameAr: 'القوبة', nameFr: 'Kouba' },
    { name: 'Dar El Beida', nameAr: 'دار البيضاء', nameFr: 'Dar El Beida' },
  ],
  '31': [ // Oran
    { name: 'Es Senia', nameAr: 'السانية', nameFr: 'Es Senia' },
    { name: 'Bir El Djir', nameAr: 'بئر الجير', nameFr: 'Bir El Djir' },
    { name: 'Arzew', nameAr: 'أرزيو', nameFr: 'Arzew' },
    { name: 'Bethioua', nameAr: 'بطيوة', nameFr: 'Bethioua' },
  ],
  '25': [ // Constantine
    { name: 'El Khroub', nameAr: 'الخروب', nameFr: 'El Khroub' },
    { name: 'Ain Smara', nameAr: 'عين سمارة', nameFr: 'Ain Smara' },
    { name: 'Didouche Mourad', nameAr: 'ديدوش مراد', nameFr: 'Didouche Mourad' },
  ],
};
