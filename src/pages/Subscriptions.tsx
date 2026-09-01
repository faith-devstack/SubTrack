import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Subscription } from '../types/subscription';
import SubscriptionTable from '../components/subscriptions/SubscriptionTable';
import SubscriptionModal from '../components/subscriptions/SubscriptionModal';
import { Plus, Loader2 } from 'lucide-react';

export default function Subscriptions() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  const fetchSubscriptions = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const q = query(collection(db, 'subscriptions'), where('user_id', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Subscription[];
      data.sort((a, b) => new Date(a.next_renewal_date).getTime() - new Date(b.next_renewal_date).getTime());
      setSubscriptions(data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [user]);

  const handleEdit = (sub: Subscription) => {
    setEditingSubscription(sub);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout 
      breadcrumb="Subscriptions"
      action={
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-primary text-background-primary px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm shadow-lg shadow-accent-primary-from/20"
        >
          <Plus className="w-4 h-4" /> Add Subscription
        </button>
      }
    >
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-accent-primary-from" />
        </div>
      ) : (
        <div className="bg-background-card border border-border-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">All Subscriptions</h2>
          </div>
          <SubscriptionTable 
            subscriptions={subscriptions} 
            onEdit={handleEdit}
            onRefresh={fetchSubscriptions}
          />
        </div>
      )}

      <SubscriptionModal
        isOpen={isModalOpen}
        editingSubscription={editingSubscription}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSubscription(null);
        }}
        onSuccess={fetchSubscriptions}
      />
    </DashboardLayout>
  );
}
