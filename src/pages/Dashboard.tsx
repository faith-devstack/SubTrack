import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Subscription } from '../types/subscription';
import { Plus, Loader2, ListPlus } from 'lucide-react';
import MetricCards from '../components/dashboard/MetricCards';
import UpcomingRenewals from '../components/dashboard/UpcomingRenewals';
import CategoryChart from '../components/dashboard/CategoryChart';
import SubscriptionTable from '../components/subscriptions/SubscriptionTable';
import SubscriptionModal from '../components/subscriptions/SubscriptionModal';
import RightSidebar from '../components/dashboard/RightSidebar';

export default function Dashboard() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  
  const fetchSubscriptions = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const q = query(
        collection(db, 'subscriptions'),
        where('user_id', '==', user.uid)
      );
      
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Subscription[];
      
      // Sort in memory to avoid needing a composite index
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSubscription(null);
  };

  return (
    <DashboardLayout 
      action={
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-primary text-background-primary px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm shadow-sm hover:shadow-[0_0_20px_rgba(0,245,160,0.25)] cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Subscription
        </button>
      }
    >
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-accent-primary-from" />
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="flex-1 w-full min-w-0 space-y-6 lg:space-y-8">
            {subscriptions.length > 0 ? (
              <>
                {/* 1. Summary Metric Cards with Readable Headers & Unclipped Gauge */}
                <MetricCards subscriptions={subscriptions} />
                
                {/* 2. Middle Row: Spending Category Breakdown + Upcoming Renewals */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                  <div className="lg:col-span-7 min-w-0">
                    <CategoryChart subscriptions={subscriptions} />
                  </div>
                  <div className="lg:col-span-5 min-w-0">
                    <UpcomingRenewals subscriptions={subscriptions} />
                  </div>
                </div>

                {/* 3. Subscription List (Full width of main dashboard area) */}
                <div className="bg-background-card border border-border-card rounded-2xl overflow-hidden shadow-xs">
                  <div className="px-5 py-4 border-b border-border-card flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-text-primary">
                        Subscription List
                      </h2>
                      <p className="text-xs text-text-muted mt-0.5">
                        Manage, filter, and track all your active and recurring commitments
                      </p>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-xs font-semibold text-accent-primary-from hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                  
                  <SubscriptionTable 
                    subscriptions={subscriptions} 
                    onEdit={handleEdit}
                    onRefresh={fetchSubscriptions}
                  />
                </div>
              </>
            ) : (
              <div className="bg-background-card border border-border-card rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-background-secondary rounded-full flex items-center justify-center mb-4">
                  <ListPlus className="w-8 h-8 text-text-muted" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">No subscriptions yet</h3>
                <p className="text-text-secondary max-w-sm mb-8 leading-relaxed">
                  Start tracking your recurring expenses and take control of your spending.
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-gradient-primary text-background-primary px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                >
                  <Plus className="w-5 h-5" /> Add Your First Subscription
                </button>
              </div>
            )}
          </div>
          
          {/* Right Sidebar Area (Notifications, Activities, SubTrack Plan) */}
          <RightSidebar subscriptions={subscriptions} />
          
        </div>
      )}
      
      <SubscriptionModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSuccess={fetchSubscriptions}
        editingSubscription={editingSubscription}
      />
    </DashboardLayout>
  );
}
