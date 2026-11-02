'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, AlertCircle, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@venkyyadavcaterings.com');
  const [password, setPassword] = useState('admin123@VenkyYadav');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-900 px-4 py-12">
      <div className="max-w-md w-full bg-charcoal-800 border-2 border-gold/40 rounded-sm p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-maroon to-maroon-900 border border-gold/50 flex items-center justify-center text-gold mx-auto shadow-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-ivory">
            Admin Management Portal
          </h1>
          <p className="text-xs text-gold uppercase tracking-wider">
            Venky Yadav Caterings & Cafe
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-sm text-red-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-ivory/70 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gold/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-charcoal-700 border border-white/15 focus:border-gold px-3.5 pl-10 py-2.5 text-sm text-ivory rounded-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-ivory/70 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-charcoal-700 border border-white/15 focus:border-gold px-3.5 pl-10 py-2.5 text-sm text-ivory rounded-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="gold"
              size="md"
              loading={loading}
              className="w-full font-bold"
            >
              Log In to Dashboard
            </Button>
          </div>
        </form>

        <div className="p-3 bg-charcoal-700/50 border border-white/5 rounded-sm text-center text-[11px] text-ivory/50">
          Default seed credentials filled for convenience. <br />
          Change your password in production settings.
        </div>
      </div>
    </div>
  );
}
