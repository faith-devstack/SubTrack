import { Subscription } from '../types/subscription';

export const calculateMonthlySpend = (subscriptions: Subscription[]): number => {
  return subscriptions
    .filter((sub) => sub.status === 'active')
    .reduce((total, sub) => {
      if (sub.billing_cycle === 'monthly') {
        return total + sub.cost;
      } else {
        return total + sub.cost / 12;
      }
    }, 0);
};

export const calculateYearlySpend = (subscriptions: Subscription[]): number => {
  return subscriptions
    .filter((sub) => sub.status === 'active')
    .reduce((total, sub) => {
      if (sub.billing_cycle === 'yearly') {
        return total + sub.cost;
      } else {
        return total + sub.cost * 12;
      }
    }, 0);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
