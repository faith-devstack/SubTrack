import React, { useState, useEffect } from 'react';
import { Subscription, NewSubscription } from '../../types/subscription';
import { db } from '../../lib/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingSubscription?: Subscription | null;
}

const CATEGORIES = [
  'Streaming', 'Software', 'Utilities', 'Gaming', 
  'Productivity', 'Education', 'Health', 'Other'
];

export default function SubscriptionModal({ isOpen, onClose, onSuccess, editingSubscription }: SubscriptionModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<NewSubscription>({
    name: '',
    cost: 0,
    billing_cycle: 'monthly',
    category: 'Streaming',
    next_renewal_date: new Date().toISOString().split('T')[0],
    status: 'active',
  });

  useEffect(() => {
    if (editingSubscription) {
      setFormData({
        name: editingSubscription.name,
        cost: editingSubscription.cost,
        billing_cycle: editingSubscription.billing_cycle,
        category: editingSubscription.category,
        next_renewal_date: editingSubscription.next_renewal_date,
        status: editingSubscription.status,
      });
    } else {
      setFormData({
        name: '',
        cost: 0,
        billing_cycle: 'monthly',
        category: 'Streaming',
        next_renewal_date: new Date().toISOString().split('T')[0],
        status: 'active',
      });
    }
  }, [editingSubscription, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!user) throw new Error("Not authenticated");

      if (editingSubscription) {
        const updateData = {
          ...formData,
          user_id: user.uid,
          created_at: editingSubscription.created_at
        };
        await updateDoc(doc(db, 'subscriptions', editingSubscription.id), updateData);
      } else {
        const insertData = {
          ...formData,
          user_id: user.uid,
          created_at: new Date().toISOString()
        };
        await addDoc(collection(db, 'subscriptions'), insertData);
      }
      
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save subscription');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cost' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-background-card border border-border-card rounded-2xl w-full max-w-md overflow-hidden flex flex-col max-h-full">
        <div className="flex items-center justify-between p-6 border-b border-border-card">
          <h2 className="text-xl font-bold text-text-primary">
            {editingSubscription ? 'Edit Subscription' : 'Add Subscription'}
          </h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="subscription-form" onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-background-secondary border border-border-card rounded-lg px-3 py-2 text-text-primary focus:ring-accent-primary-from focus:border-accent-primary-from outline-none"
                placeholder="e.g., Netflix"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Cost</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-text-muted">$</span>
                  <input
                    type="number"
                    name="cost"
                    required
                    min="0"
                    step="0.01"
                    value={formData.cost || ''}
                    onChange={handleChange}
                    className="w-full bg-background-secondary border border-border-card rounded-lg pl-8 pr-3 py-2 text-text-primary focus:ring-accent-primary-from focus:border-accent-primary-from outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Billing Cycle</label>
                <select
                  name="billing_cycle"
                  value={formData.billing_cycle}
                  onChange={handleChange}
                  className="w-full bg-background-secondary border border-border-card rounded-lg px-3 py-2 text-text-primary focus:ring-accent-primary-from focus:border-accent-primary-from outline-none"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-background-secondary border border-border-card rounded-lg px-3 py-2 text-text-primary focus:ring-accent-primary-from focus:border-accent-primary-from outline-none"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Next Renewal Date</label>
              <input
                type="date"
                name="next_renewal_date"
                required
                value={formData.next_renewal_date}
                onChange={handleChange}
                className="w-full bg-background-secondary border border-border-card rounded-lg px-3 py-2 text-text-primary focus:ring-accent-primary-from focus:border-accent-primary-from outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-background-secondary border border-border-card rounded-lg px-3 py-2 text-text-primary focus:ring-accent-primary-from focus:border-accent-primary-from outline-none"
              >
                <option value="active">Active</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </form>
        </div>
        
        <div className="p-6 border-t border-border-card flex justify-end gap-3 bg-background-secondary/30">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium bg-background-card border border-border-card text-text-primary hover:bg-border-card transition-colors"
          >
            Cancel
          </button>
          <button
            form="subscription-form"
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg font-medium bg-gradient-primary text-background-primary flex items-center justify-center disabled:opacity-50 min-w-[100px]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
