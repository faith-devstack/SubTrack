import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  KeyRound, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Calendar,
  Lock,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

export default function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Profile State
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');

  // Password Reset State
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetError, setResetError] = useState('');

  // Sign out confirmation dialog
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  // Handle Profile Update
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess('');
    setProfileError('');

    if (!auth.currentUser) {
      setProfileError('You must be signed in to update your profile.');
      return;
    }

    try {
      setIsSavingProfile(true);
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim() || null
      });
      setProfileSuccess('Profile display name updated successfully.');
      setTimeout(() => setProfileSuccess(''), 4000);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setProfileError(err?.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handle Password Reset Email
  const handleSendPasswordReset = async () => {
    if (!user?.email) {
      setResetError('No email associated with this account.');
      return;
    }

    setResetSuccess('');
    setResetError('');

    try {
      setIsSendingReset(true);
      await sendPasswordResetEmail(auth, user.email);
      setResetSuccess(`A password reset link has been sent to ${user.email}. Please check your inbox.`);
      setTimeout(() => setResetSuccess(''), 6000);
    } catch (err: any) {
      console.error('Error sending password reset email:', err);
      setResetError(err?.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setIsSendingReset(false);
    }
  };

  // Handle Safe Sign Out
  const handleConfirmSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
    } finally {
      setIsSigningOut(false);
      setShowSignOutConfirm(false);
    }
  };

  const accountCreated = user?.metadata?.creationTime 
    ? format(new Date(user.metadata.creationTime), 'MMMM d, yyyy')
    : null;

  return (
    <DashboardLayout 
      breadcrumb="Settings"
      title="Settings"
      subtitle="Manage your account and customise your SubTrack experience."
    >
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-12">
        
        {/* Page Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Manage your account and customise your SubTrack experience.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1. ACCOUNT PROFILE */}
        {/* ========================================================================= */}
        <section className="bg-background-card border border-border-card rounded-2xl overflow-hidden shadow-xs">
          <div className="p-5 sm:p-6 border-b border-border-card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-background-secondary rounded-xl border border-border-card flex items-center justify-center text-accent-primary-from shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-text-primary">Account Profile</h2>
                <p className="text-xs text-text-muted mt-0.5">Your personal credentials and account details</p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-secondary/30 text-accent-primary-from border border-accent-primary-from/20">
              <Sparkles className="w-3.5 h-3.5" />
              Standard Plan Active
            </span>
          </div>

          <form onSubmit={handleSaveProfile} className="p-5 sm:p-6 space-y-5">
            {/* Feedback Banners */}
            {profileSuccess && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-accent-secondary/30 border border-accent-primary-from/30 text-accent-primary-from text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{profileSuccess}</span>
              </div>
            )}
            {profileError && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{profileError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Email Address (Read-only / Authenticated) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input 
                    type="email" 
                    value={user?.email || ''} 
                    disabled 
                    aria-label="Email address"
                    className="w-full bg-background-secondary/80 border border-border-card rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-muted cursor-not-allowed select-all"
                  />
                </div>
                <p className="text-[11px] text-text-muted mt-1.5 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-text-muted shrink-0" />
                  Verified identity via Firebase Authentication
                </p>
              </div>

              {/* Display Name (Editable) */}
              <div>
                <label 
                  htmlFor="displayNameInput"
                  className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2"
                >
                  Display Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                    <User className="w-4 h-4" />
                  </div>
                  <input 
                    id="displayNameInput"
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name" 
                    className="w-full bg-background-primary border border-border-card rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary-from focus:ring-1 focus:ring-accent-primary-from transition-colors"
                  />
                </div>
                <p className="text-[11px] text-text-muted mt-1.5">
                  Used for personalized greetings and activity logging
                </p>
              </div>
            </div>

            {/* Account Metadata Row */}
            <div className="pt-4 border-t border-border-card/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-muted">
              {accountCreated && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-accent-primary-from shrink-0" />
                  <span>Member since: <strong className="text-text-secondary">{accountCreated}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-accent-primary-from shrink-0" />
                <span>Account ID: <code className="text-text-secondary font-mono text-[11px]">{user?.uid?.slice(0, 12)}...</code></span>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex justify-start">
              <button 
                type="submit"
                disabled={isSavingProfile}
                className="bg-gradient-primary text-background-primary px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isSavingProfile ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* ========================================================================= */}
        {/* 2. NOTIFICATIONS & ALERTS (Clarified & Accurately Framed) */}
        {/* ========================================================================= */}
        <section className="bg-background-card border border-border-card rounded-2xl overflow-hidden shadow-xs">
          <div className="p-5 sm:p-6 border-b border-border-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-background-secondary rounded-xl border border-border-card flex items-center justify-center text-accent-primary-from shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-text-primary">Alerts & Notifications</h2>
                <p className="text-xs text-text-muted mt-0.5">How SubTrack alerts you about recurring renewals</p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {/* Informational Item 1 */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-background-secondary/40 border border-border-card/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">In-App Renewal Timelines</span>
                  <span className="text-[10px] font-semibold text-accent-primary-from bg-accent-secondary/40 border border-accent-primary-from/30 px-2 py-0.5 rounded-full">
                    Always On
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Active subscriptions renewing within the next 14 days are dynamically calculated and highlighted on your Dashboard and Subscriptions views.
                </p>
              </div>
            </div>

            {/* Informational Item 2 */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-background-secondary/40 border border-border-card/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">Urgent Renewal Alerts (3-Day Flagging)</span>
                  <span className="text-[10px] font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Renewals due within 3 days are highlighted with red warning indicators to prevent unexpected auto-charges before you review them.
                </p>
              </div>
            </div>

            {/* Informational Notice regarding external emails */}
            <div className="p-3.5 rounded-xl bg-background-primary/60 border border-border-card/50 text-xs text-text-muted leading-relaxed">
              <strong className="text-text-secondary">Privacy notice: </strong>
              SubTrack does not connect to external mailing lists or scrape bank statements. All calculations run client-side on your verified account data.
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SECURITY & AUTHENTICATION */}
        {/* ========================================================================= */}
        <section className="bg-background-card border border-border-card rounded-2xl overflow-hidden shadow-xs">
          <div className="p-5 sm:p-6 border-b border-border-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-background-secondary rounded-xl border border-border-card flex items-center justify-center text-accent-primary-from shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-text-primary">Security & Access</h2>
                <p className="text-xs text-text-muted mt-0.5">Password management and session controls</p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* Feedback Banners for Password Reset */}
            {resetSuccess && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-accent-secondary/30 border border-accent-primary-from/30 text-accent-primary-from text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{resetSuccess}</span>
              </div>
            )}
            {resetError && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{resetError}</span>
              </div>
            )}

            {/* Password Management */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-background-secondary/40 border border-border-card/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-accent-primary-from shrink-0" />
                  <span className="text-sm font-semibold text-white">Password Recovery</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Send a secure password reset link to your authenticated email address.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSendPasswordReset}
                disabled={isSendingReset}
                className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold bg-background-card hover:bg-border-card border border-border-card text-text-primary transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {isSendingReset ? 'Sending link...' : 'Send Reset Link'}
              </button>
            </div>

            {/* Data Ownership & Erasure Notice */}
            <div className="p-4 rounded-xl bg-background-secondary/40 border border-border-card/60 space-y-1">
              <span className="text-sm font-semibold text-white">Data Isolation & Erasure</span>
              <p className="text-xs text-text-secondary leading-relaxed">
                Your subscription entries are strictly isolated to your account identifier in Cloud Firestore. You can modify or permanently delete individual subscription records directly from your Subscriptions view at any time.
              </p>
            </div>

            {/* Sign Out Action */}
            <div className="pt-4 border-t border-border-card/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">Sign Out of SubTrack</p>
                <p className="text-xs text-text-muted mt-0.5">End your current session on this browser</p>
              </div>
              <button
                type="button"
                onClick={() => setShowSignOutConfirm(true)}
                className="self-start sm:self-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>
        </section>

      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-background-card border border-border-card rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <LogOut className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Sign Out?</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-text-secondary mb-6 leading-relaxed">
              Are you sure you want to sign out of your SubTrack account? You will need to sign in again to access your dashboard.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSignOutConfirm(false)}
                disabled={isSigningOut}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-background-secondary border border-border-card text-text-primary hover:bg-border-card transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSignOut}
                disabled={isSigningOut}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {isSigningOut ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Signing out...</span>
                  </>
                ) : (
                  <span>Yes, Sign Out</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
