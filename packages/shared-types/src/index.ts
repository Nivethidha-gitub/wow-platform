// ===== AUTH =====
export type UserRole = 'customer' | 'supplier' | 'rider';

export interface AuthUser {
  id: string;
  phone: string;
  role: UserRole;
}

export interface RequestOtpResponse {
  message: string;
  devOtp?: string; // only present in local/dev mode
}

export interface VerifyOtpResponse {
  accessToken: string;
  user: AuthUser;
}

// ===== CUSTOMER =====
export interface Customer {
  id: string;
  phone: string;
  name: string;
  language: 'ta' | 'en';
  whatsappOptIn: boolean;
  createdAt: string;
}

// ===== SUPPLIER =====
export type SupplierPlan = 'starter' | 'growth' | 'network';
export type SupplierStatus = 'active' | 'closed' | 'pending_verification';

export interface Supplier {
  id: string;
  name: string;
  plan: SupplierPlan;
  status: SupplierStatus;
  acceptanceWindowMinutes: number;
  refillEnabled: boolean;
  reliabilityScore: number;
  createdAt: string;
}

// ===== ADDRESS =====
export interface Address {
  id: string;
  customerId: string;
  latitude: number;
  longitude: number;
  flatNumber?: string;
  floor?: string;
  liftAvailable?: boolean;
  gateNotes?: string;
  createdAt: string;
}

// ===== ORDER (Member 1's domain — defined here so Member 2's screens can
// already build against the real shape without waiting) =====
export enum OrderStatus {
  PLACED = 'PLACED',
  ACCEPTED = 'ACCEPTED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  SETTLED = 'SETTLED',
  CANCELLED = 'CANCELLED',
  EXCEPTION = 'EXCEPTION',
}

export interface Order {
  id: string;
  customerId: string;
  supplierId: string;
  quantity: number;
  status: OrderStatus;
  createdAt: string;
}
