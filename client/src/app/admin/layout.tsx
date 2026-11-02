'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  UtensilsCrossed,
  Image as ImageIcon,
  Settings,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        if (!res.ok) {
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center text-gold">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mr-3" />
        <span className="text-sm">Verifying admin session...</span>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Enquiries', href: '/admin/enquiries', icon: Calendar },
    { label: 'Menu Management', href: '/admin/menu', icon: UtensilsCrossed },
    { label: 'Gallery Media', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Business Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-charcoal flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-charcoal-900 border-b border-gold/30 p-4 flex items-center justify-between z-30">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-gold" />
          <span className="font-serif font-bold text-ivory text-sm">VYC Admin</span>
        </div>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-1.5 text-ivory/80 hover:text-gold"
          aria-label="Toggle menu"
        >
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileNavOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-charcoal-900 border-r border-gold/30 flex flex-col justify-between p-6 z-20 flex-shrink-0`}
      >
        <div className="space-y-8">
          {/* Brand Header */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-sm bg-maroon border border-gold/40 flex items-center justify-center text-gold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-ivory text-base tracking-wide">
                Admin Portal
              </span>
            </div>
            <p className="text-[10px] text-gold uppercase tracking-wider pl-10">
              Venky Yadav Caterings
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-sm text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-maroon text-gold border border-gold/40 shadow-md'
                      : 'text-ivory/70 hover:bg-white/5 hover:text-ivory'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area with User Profile & Logout */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-2 text-xs text-gold hover:text-gold-light"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Website</span>
          </Link>

          {user && (
            <div className="text-xs">
              <span className="text-[10px] uppercase text-ivory/40 block">Logged in as</span>
              <p className="font-semibold text-ivory truncate">{user.name}</p>
              <p className="text-[10px] text-gold/80 truncate">{user.email}</p>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 text-xs font-semibold text-red-400 hover:text-red-300 py-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
