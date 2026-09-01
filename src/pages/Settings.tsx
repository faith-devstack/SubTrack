import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { User, Bell, Shield, CreditCard, HelpCircle } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();

  return (
    <DashboardLayout breadcrumb="Settings">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Section */}
        <section className="bg-background-card border border-border-card rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background-secondary rounded-lg border border-border-card text-text-secondary">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-text-primary">Profile</h2>
            </div>
            <p className="text-sm text-text-secondary mt-2">Manage your personal information and preferences.</p>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                disabled 
                className="w-full bg-background-secondary border border-border-card rounded-xl px-4 py-3 text-text-muted cursor-not-allowed"
              />
              <p className="text-xs text-text-muted mt-2">Your email address is connected to your authentication provider.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Display Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                className="w-full bg-background-primary border border-border-card rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary-from focus:ring-1 focus:ring-accent-primary-from transition-shadow"
              />
            </div>
            <button className="bg-background-secondary border border-border-card text-text-primary px-6 py-2.5 rounded-xl font-medium hover:bg-background-tertiary transition-colors text-sm">
              Save Changes
            </button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-background-card border border-border-card rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border-card">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background-secondary rounded-lg border border-border-card text-text-secondary">
                <Bell className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-text-primary">Notifications</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Renewal Reminders</p>
                <p className="text-sm text-text-secondary">Get notified 3 days before a subscription renews.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-background-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-primary after:border-border-card after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary-from"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-primary">Weekly Reports</p>
                <p className="text-sm text-text-secondary">Receive a weekly summary of your active subscriptions.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-background-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-primary after:border-border-card after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary-from"></div>
              </label>
            </div>
          </div>
        </section>
        
        {/* Help & Support */}
        <section className="bg-background-card border border-border-card rounded-2xl overflow-hidden">
          <div className="p-6 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-background-secondary rounded-lg border border-border-card text-text-secondary">
                 <HelpCircle className="w-5 h-5" />
               </div>
               <div>
                 <h2 className="text-lg font-bold text-text-primary">Help & Support</h2>
                 <p className="text-sm text-text-secondary">Contact our team for assistance.</p>
               </div>
             </div>
             <button className="text-accent-primary-from text-sm font-medium hover:underline">
               Visit Help Center
             </button>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
