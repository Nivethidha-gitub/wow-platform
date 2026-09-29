export interface Supplier {
  id: string;
  name: string;
  plan: 'starter' | 'growth' | 'network';
  status: 'active' | 'closed' | 'pending_verification';
  acceptanceWindowMinutes: number;
  refillEnabled: boolean;
  reliabilityScore: number; // 0-100, calculated later from delivery data
  createdAt: Date;
}
