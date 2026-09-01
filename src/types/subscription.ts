export type BillingCycle = 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'canceled';

export interface Subscription {
  id: string;
  user_id: string;
  name: string;
  cost: number;
  billing_cycle: BillingCycle;
  category: string;
  next_renewal_date: string;
  status: SubscriptionStatus;
  created_at: string;
}

export type NewSubscription = Omit<Subscription, 'id' | 'user_id' | 'created_at'>;
