import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, LayoutDashboard, List, PieChart, Settings, LogOut, X, User, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { user, isAdmin, signOut } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Subscriptions', icon: List, path: '/subscriptions' },
    { name: 'Analytics', icon: PieChart, path: '/analytics' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background-card border-r border-border-card flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border-card">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-background-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">SubTrack</span>
          </div>
          <button 
            className="ml-auto lg:hidden text-text-secondary hover:text-text-primary"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-accent-secondary/30 text-accent-primary-from" 
                  : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}

          {/* Privileged Admin Link (Visible only to verified administrators) */}
          {isAdmin && (
            <div className="pt-3 mt-3 border-t border-border-card/60">
              <NavLink
                to="/admin"
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                  isActive 
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" 
                    : "text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10"
                )}
              >
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span>Admin Console</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* User / Logout */}
        <div className="p-4 border-t border-border-card">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-background-secondary flex items-center justify-center border border-border-card">
              <User className="w-5 h-5 text-text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {user?.email}
              </p>
              <p className="text-xs text-text-muted truncate flex items-center gap-1">
                {isAdmin ? (
                  <span className="text-amber-400 font-semibold">Administrator</span>
                ) : (
                  <span>Standard Plan</span>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
