import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '../i18n';

export type PaymentMethod = 'cib' | 'eddahabia' | 'flexy' | 'goldcard' | 'cod' | 'bankTransfer';

export interface PaymentCard {
  id: string;
  type: PaymentMethod;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  holderName: string;
  isDefault: boolean;
  bankName?: string;
  createdAt: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  rib: string; // Relevé d'Identité Bancaire (Algerian bank identifier)
  holderName: string;
  isDefault: boolean;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  amount: number;
  currency: 'DZD' | 'USD' | 'EUR';
  method: PaymentMethod;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  reference?: string;
  bankReference?: string;
  errorMessage?: string;
  securityCode?: string; // For verification
}

export interface PaymentSecurity {
  twoFactorEnabled: boolean;
  smsVerificationEnabled: boolean;
  emailVerificationEnabled: boolean;
  maxDailyLimit: number;
  maxTransactionLimit: number;
  ipWhitelist: string[];
  lastActivity: string;
  failedAttempts: number;
  lockedUntil?: string;
}

interface PaymentStore {
  // Payment Methods
  savedCards: PaymentCard[];
  savedBankAccounts: BankAccount[];
  currentPaymentMethod: PaymentMethod | null;
  
  // Transactions
  transactions: PaymentTransaction[];
  currentTransaction: PaymentTransaction | null;
  
  // Security
  security: PaymentSecurity;
  
  // Actions
  addPaymentCard: (card: Omit<PaymentCard, 'id' | 'createdAt'>) => void;
  removePaymentCard: (cardId: string) => void;
  setDefaultCard: (cardId: string) => void;
  
  addBankAccount: (account: Omit<BankAccount, 'id' | 'createdAt'>) => void;
  removeBankAccount: (accountId: string) => void;
  setDefaultBankAccount: (accountId: string) => void;
  
  createTransaction: (transaction: Omit<PaymentTransaction, 'id' | 'createdAt' | 'status'>) => string;
  updateTransactionStatus: (transactionId: string, status: PaymentTransaction['status'], reference?: string) => void;
  getTransaction: (transactionId: string) => PaymentTransaction | null;
  
  setCurrentPaymentMethod: (method: PaymentMethod) => void;
  
  // Security Actions
  updateSecurity: (security: Partial<PaymentSecurity>) => void;
  verifyTransaction: (transactionId: string, code: string) => boolean;
  recordFailedAttempt: () => void;
  resetFailedAttempts: () => void;
  isAccountLocked: () => boolean;
  
  // Payment Processing
  processPayment: (orderId: string, amount: number, method: PaymentMethod) => Promise<{ success: boolean; transactionId?: string; error?: string }>;
  validatePaymentMethod: (method: PaymentMethod, details: any) => boolean;
}

// Algerian payment method validation
const validateCIBCard = (cardNumber: string, cvv: string, expiry: string): boolean => {
  // CIB cards start with specific prefixes
  const cibPrefixes = ['4267', '4277', '5456', '5457'];
  const prefix = cardNumber.substring(0, 4);
  return cibPrefixes.includes(prefix) && cardNumber.length === 16;
};

const validateEddahabiaCard = (cardNumber: string, cvv: string): boolean => {
  // Eddahabia cards have specific format
  return cardNumber.startsWith('507806') && cardNumber.length === 16;
};

const validateFlexyAccount = (accountNumber: string, pin: string): boolean => {
  // Flexy account validation
  return accountNumber.length >= 8 && accountNumber.length <= 12;
};

const validateRIB = (rib: string): boolean => {
  // Algerian RIB validation (Relevé d'Identité Bancaire)
  const ribPattern = /^[0-9]{20}$/;
  return ribPattern.test(rib.replace(/\s/g, ''));
};

// Security features
const generateSecurityCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const encryptSensitiveData = (data: string): string => {
  // Simple encryption for demo - in production, use proper encryption
  return btoa(data);
};

const decryptSensitiveData = (encryptedData: string): string => {
  try {
    return atob(encryptedData);
  } catch {
    return '';
  }
};

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set, get) => ({
      // Initial state
      savedCards: [],
      savedBankAccounts: [],
      currentPaymentMethod: null,
      transactions: [],
      currentTransaction: null,
      security: {
        twoFactorEnabled: false,
        smsVerificationEnabled: true,
        emailVerificationEnabled: true,
        maxDailyLimit: 500000, // 500,000 DZD
        maxTransactionLimit: 100000, // 100,000 DZD
        ipWhitelist: [],
        lastActivity: new Date().toISOString(),
        failedAttempts: 0,
      },
      
      // Payment Methods Management
      addPaymentCard: (card) => {
        const newCard: PaymentCard = {
          ...card,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          last4: card.last4 || '****',
        };
        
        set((state) => ({
          savedCards: state.savedCards.map(c => ({ ...c, isDefault: false })).concat(newCard)
        }));
      },
      
      removePaymentCard: (cardId) => {
        set((state) => ({
          savedCards: state.savedCards.filter(card => card.id !== cardId)
        }));
      },
      
      setDefaultCard: (cardId) => {
        set((state) => ({
          savedCards: state.savedCards.map(card => ({
            ...card,
            isDefault: card.id === cardId
          }))
        }));
      },
      
      addBankAccount: (account) => {
        const newAccount: BankAccount = {
          ...account,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          savedBankAccounts: state.savedBankAccounts.map(a => ({ ...a, isDefault: false })).concat(newAccount)
        }));
      },
      
      removeBankAccount: (accountId) => {
        set((state) => ({
          savedBankAccounts: state.savedBankAccounts.filter(account => account.id !== accountId)
        }));
      },
      
      setDefaultBankAccount: (accountId) => {
        set((state) => ({
          savedBankAccounts: state.savedBankAccounts.map(account => ({
            ...account,
            isDefault: account.id === accountId
          }))
        }));
      },
      
      // Transaction Management
      createTransaction: (transaction) => {
        const newTransaction: PaymentTransaction = {
          ...transaction,
          id: Math.random().toString(36).substr(2, 9),
          status: 'pending',
          createdAt: new Date().toISOString(),
          securityCode: generateSecurityCode(),
        };
        
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
          currentTransaction: newTransaction,
        }));
        
        return newTransaction.id;
      },
      
      updateTransactionStatus: (transactionId, status, reference) => {
        set((state) => ({
          transactions: state.transactions.map(transaction => 
            transaction.id === transactionId 
              ? { 
                  ...transaction, 
                  status, 
                  reference,
                  completedAt: status === 'completed' ? new Date().toISOString() : undefined
                }
              : transaction
          )
        }));
      },
      
      getTransaction: (transactionId) => {
        return get().transactions.find(t => t.id === transactionId) || null;
      },
      
      setCurrentPaymentMethod: (method) => {
        set({ currentPaymentMethod: method });
      },
      
      // Security Management
      updateSecurity: (security) => {
        set((state) => ({
          security: { ...state.security, ...security }
        }));
      },
      
      verifyTransaction: (transactionId, code) => {
        const transaction = get().getTransaction(transactionId);
        return transaction?.securityCode === code;
      },
      
      recordFailedAttempt: () => {
        const state = get();
        const newAttempts = state.security.failedAttempts + 1;
        const lockedUntil = newAttempts >= 3 
          ? new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes lock
          : undefined;
          
        set({
          security: {
            ...state.security,
            failedAttempts: newAttempts,
            lockedUntil,
          }
        });
      },
      
      resetFailedAttempts: () => {
        set((state) => ({
          security: {
            ...state.security,
            failedAttempts: 0,
            lockedUntil: undefined,
          }
        }));
      },
      
      isAccountLocked: () => {
        const { security } = get();
        if (!security.lockedUntil) return false;
        return new Date() < new Date(security.lockedUntil);
      },
      
      // Payment Processing
      processPayment: async (orderId, amount, method) => {
        const state = get();
        
        // Security checks
        if (state.isAccountLocked()) {
          return { success: false, error: 'Account is temporarily locked' };
        }
        
        if (amount > state.security.maxTransactionLimit) {
          return { success: false, error: 'Amount exceeds transaction limit' };
        }
        
        // Create transaction
        const transactionId = state.createTransaction({
          orderId,
          amount,
          currency: 'DZD',
          method,
        });
        
        // Simulate payment processing
        try {
          set((state) => ({
            transactions: state.transactions.map(t => 
              t.id === transactionId ? { ...t, status: 'processing' } : t
            )
          }));
          
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Simulate payment gateway response
          const success = Math.random() > 0.1; // 90% success rate
          
          if (success) {
            const reference = `ALG${Date.now()}${method.toUpperCase()}`;
            state.updateTransactionStatus(transactionId, 'completed', reference);
            state.resetFailedAttempts();
            return { success: true, transactionId, reference };
          } else {
            state.updateTransactionStatus(transactionId, 'failed');
            state.recordFailedAttempt();
            return { success: false, error: 'Payment processing failed' };
          }
        } catch (error) {
          state.updateTransactionStatus(transactionId, 'failed');
          return { success: false, error: 'Network error occurred' };
        }
      },
      
      validatePaymentMethod: (method, details) => {
        switch (method) {
          case 'cib':
            return validateCIBCard(details.cardNumber, details.cvv, details.expiry);
          case 'eddahabia':
            return validateEddahabiaCard(details.cardNumber, details.cvv);
          case 'flexy':
            return validateFlexyAccount(details.accountNumber, details.pin);
          case 'bankTransfer':
            return validateRIB(details.rib);
          case 'cod':
            return true; // Always valid for cash on delivery
          default:
            return false;
        }
      },
    }),
    {
      name: 'payment-storage',
      // Don't persist sensitive security data
      partialize: (state) => ({
        savedCards: state.savedCards.map(card => ({
          ...card,
          // Remove sensitive data from persistence
        })),
        savedBankAccounts: state.savedBankAccounts,
        currentPaymentMethod: state.currentPaymentMethod,
        transactions: state.transactions.map(t => ({
          ...t,
          securityCode: undefined, // Don't persist security codes
        })),
        security: {
          ...state.security,
          failedAttempts: 0, // Reset on app restart
          lockedUntil: undefined,
        },
      }),
    }
  )
);

// Payment method information for UI
export const paymentMethodInfo = {
  cib: {
    name: 'CIB Bank Card',
    icon: '💳',
    description: 'Crédit Industriel et Commercial bank cards',
    fees: '0%',
    processingTime: 'Instant',
    supportedCurrencies: ['DZD'],
  },
  eddahabia: {
    name: 'Eddahabia',
    icon: '🏛️',
    description: 'Algeria Post electronic payment card',
    fees: '0%',
    processingTime: 'Instant',
    supportedCurrencies: ['DZD'],
  },
  flexy: {
    name: 'Flexy',
    icon: '📱',
    description: 'Mobile money transfer service',
    fees: '1%',
    processingTime: 'Instant',
    supportedCurrencies: ['DZD'],
  },
  goldcard: {
    name: 'Gold Card',
    icon: '🏆',
    description: 'Premium bank card',
    fees: '0%',
    processingTime: 'Instant',
    supportedCurrencies: ['DZD', 'USD', 'EUR'],
  },
  cod: {
    name: 'Cash on Delivery',
    icon: '💵',
    description: 'Pay when you receive your order',
    fees: '50 DZD',
    processingTime: 'On delivery',
    supportedCurrencies: ['DZD'],
  },
  bankTransfer: {
    name: 'Bank Transfer',
    icon: '🏦',
    description: 'Direct bank to bank transfer',
    fees: '0%',
    processingTime: '1-3 business days',
    supportedCurrencies: ['DZD'],
  },
};

// Popular Algerian banks
export const algerianBanks = [
  { code: 'CIB', name: 'Crédit Industriel et Commercial', nameAr: 'القرض الصناعي والتجاري' },
  { code: 'BEA', name: 'Banque Extérieure d\'Algérie', nameAr: 'البنك الخارجي الجزائري' },
  { code: 'BNA', name: 'Banque Nationale d\'Algérie', nameAr: 'البنك الوطني الجزائري' },
  { code: 'BADR', name: 'Banque de l\'Agriculture et du Développement Rural', nameAr: 'بنك الفلاحة والتنمية الريفية' },
  { code: 'CNEP', name: 'Caisse Nationale d\'Épargne et de Prévoyance', nameAr: 'الصندوق الوطني للتوفير والاحتياط' },
  { code: 'BDL', name: 'Banque de Développement Local', nameAr: 'بنك التنمية المحلية' },
  { code: 'CPA', name: 'Crédit Populaire d\'Algérie', nameAr: 'القرض الشعبي الجزائري' },
  { code: 'HOUSING', name: 'Housing Bank', nameAr: 'بنك السكن' },
  { code: 'AL_BARAKA', name: 'Al Baraka Bank', nameAr: 'بنك البركة' },
  { code: 'GULF', name: 'Gulf Bank Algeria', nameAr: 'بنك الخليج الجزائر' },
  { code: 'AGB', name: 'Arab Gulf Bank', nameAr: 'المصرف العربي الخليجي' },
  { code: 'NATIXIS', name: 'Natixis Algérie', nameAr: 'ناتيكسيس الجزائر' },
  { code: 'SOCIETE_GENERALE', name: 'Société Générale Algérie', nameAr: 'سوسيتيه جنرال الجزائر' },
  { code: 'BNP_PARIBAS', name: 'BNP Paribas El Djazair', nameAr: 'بي إن بي باريباس الجزائر' },
  { code: 'FRANSABANK', name: 'Fransabank Al-Djazair', nameAr: 'فرنسابنك الجزائر' },
];
