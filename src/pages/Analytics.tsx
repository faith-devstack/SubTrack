import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Subscription } from '../types/subscription';
import CategoryChart from '../components/dashboard/CategoryChart';
import SpendingBarChart from '../components/dashboard/SpendingBarChart';
import MetricCards from '../components/dashboard/MetricCards';
import { Loader2 } from 'lucide-react';

export default function Analytics() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const q = query(collection(db, 'subscriptions'), where('user_id', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Subscription[];
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

  return (
    <DashboardLayout breadcrumb="Analytics">
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-accent-primary-from" />
        </div>
      ) : (
        <div className="space-y-6 lg:space-y-8">
          <MetricCards subscriptions={subscriptions} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <CategoryChart subscriptions={subscriptions} />
            <SpendingBarChart subscriptions={subscriptions} />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
