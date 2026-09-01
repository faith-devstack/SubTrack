import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
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
          className="flex items-center gap-2 bg-gradient-primary text-background-primary px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
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
        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-1 space-y-6 lg:space-y-8 min-w-0">
             {subscriptions.length > 0 ? (
               <>
                 <MetricCards subscriptions={subscriptions} />
                 
                 {/* Middle Row: Charts */}
                 <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                   <div className="lg:col-span-2 min-w-0">
                     <CategoryChart subscriptions={subscriptions} />
                   </div>
                   <div className="lg:col-span-1 min-w-0">
                     <UpcomingRenewals subscriptions={subscriptions} />
                   </div>
                 </div>
  
                 {/* Bottom Row: Table and Promo */}
                 <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                   <div className="lg:col-span-2 min-w-0">
                     <div className="bg-background-card border border-border-card rounded-2xl p-6 min-w-0 overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-bold text-text-primary">Subscription list</h2>
                          <button className="text-text-muted hover:text-text-primary">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                          </button>
                        </div>
                        <SubscriptionTable 
                          subscriptions={subscriptions} 
                          onEdit={handleEdit}
                          onRefresh={fetchSubscriptions}
                        />
                     </div>
                   </div>
                   <div className="lg:col-span-1 flex flex-col">
                     <div className="relative overflow-hidden rounded-2xl border border-accent-primary-from/20 bg-background-card p-6 h-full flex flex-col justify-between group">
                        {/* Background glowing effect */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent-primary-from/20 blur-3xl rounded-full pointer-events-none group-hover:bg-accent-primary-from/30 transition-colors duration-500"></div>
                        
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary-from/10 border border-accent-primary-from/20 mb-6">
                            <svg className="w-4 h-4 text-accent-primary-from" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-xs font-bold text-accent-primary-from">Premium Plan</span>
                          </div>
                          
                          <div className="mb-4">
                            <span className="text-5xl font-bold text-text-primary">$30</span>
                            <span className="text-sm text-text-secondary ml-2">Per Month<br/>Per User</span>
                          </div>
                          
                          <p className="text-sm text-text-secondary leading-relaxed mb-8 relative z-10">
                            Improve your workplace, view and analyze your profits and losses
                          </p>
                        </div>
                        
                        <div className="flex gap-3 relative z-10 mt-auto">
                          <button className="flex-1 bg-gradient-primary text-background-primary py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity text-center shadow-lg shadow-accent-primary-from/20">
                            Get Started
                          </button>
                          <button className="w-12 h-12 bg-background-secondary rounded-xl flex items-center justify-center text-text-secondary hover:text-text-primary border border-border-card transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </button>
                        </div>
                     </div>
                   </div>
                 </div>
               </>
             ) : (
               <div className="bg-background-card border border-border-card rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-background-secondary rounded-full flex items-center justify-center mb-4">
                   <ListPlus className="w-8 h-8 text-text-muted" />
                 </div>
                 <h3 className="text-2xl font-bold text-text-primary mb-2">No subscriptions yet</h3>
                 <p className="text-text-secondary max-w-sm mb-8">Start tracking your recurring expenses and take control of your spending.</p>
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-gradient-primary text-background-primary px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    <Plus className="w-5 h-5" /> Add Your First Subscription
                  </button>
               </div>
             )}
          </div>
          
          {/* Right Sidebar Area */}
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

