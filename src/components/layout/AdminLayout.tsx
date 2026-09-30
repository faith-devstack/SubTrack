import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Users, 
  FileText, 
  ArrowLeft, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck,
  Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumb?: string;
  action?: React.ReactNode;
}

export default function AdminLayout({ children, title, breadcrumb = 'Overview', action }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/admin' },
    { name: 'User Management', icon: Users, path: '/admin/users' },
    { name: 'Activity Logs', icon: FileText, path: '/admin/logs' },
  ];

  return (
    <div className="min-h-screen bg-background-primary flex text-text-primary">
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#14161B] border-r border-border-card/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-xl",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Brand / Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border-card/80 bg-[#161920]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white block leading-none">SubTrack</span>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Admin Portal</span>
            </div>
          </div>
          <button 
            className="ml-auto lg:hidden text-text-secondary hover:text-text-primary cursor-pointer"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-bold text-text-muted uppercase tracking-wider">
            Administration
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive 
                  ? "bg-accent-secondary/30 text-accent-primary-from border border-accent-primary-from/20 shadow-xs" 
                  : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Quick Exit to User App */}
          <div className="pt-6 px-1">
            <div className="px-3 pb-2 text-[10px] font-bold text-text-muted uppercase tracking-wider">
              Application
            </div>
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-background-secondary border border-border-card/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-accent-primary-from" />
              <span>Back to User App</span>
            </Link>
          </div>
        </div>

        {/* Admin Account & Sign Out */}
        <div className="p-4 border-t border-border-card/80 bg-[#161920]/60">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate" title={user?.email || ''}>
                {user?.email}
              </p>
              <span className="inline-flex items-center text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 mt-0.5">
                Verified Admin
              </span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <header className="h-16 px-4 sm:px-6 lg:px-8 border-b border-border-card/80 bg-background-primary/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <button 
              className="lg:hidden text-text-secondary hover:text-text-primary cursor-pointer p-1"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-text-muted">
              <span className="font-semibold text-amber-400">Admin</span>
              <span>/</span>
              <span className="text-white font-medium">{breadcrumb}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {action && <div>{action}</div>}
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-background-secondary hover:bg-border-card text-text-primary border border-border-card transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-accent-primary-from" />
              <span>User App</span>
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
