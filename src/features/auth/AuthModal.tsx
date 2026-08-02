import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User as UserIcon, Sparkles } from 'lucide-react';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signUp } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        toast.success('Welcome back to Mariana Gallo Atelier');
      } else {
        await signUp(email, password, fullName);
        toast.success('Your VIP Atelier account has been created');
      }
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-[#090d16] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-white transition"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-3">
              <Sparkles size={20} />
            </div>
            <h3 className="text-2xl font-serif text-white">
              {mode === 'login' ? 'Private Atelier Sign In' : 'Join VIP Atelier'}
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Access bespoke high-jewelry collections & concierge services
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 text-neutral-500" size={16} />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Lady Mariana Gallo"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-neutral-800 focus:border-amber-400 rounded-lg text-sm text-white placeholder-neutral-600 outline-none transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-neutral-500" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mariana@mangatagallo.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-neutral-800 focus:border-amber-400 rounded-lg text-sm text-white placeholder-neutral-600 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-neutral-500" size={16} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-neutral-800 focus:border-amber-400 rounded-lg text-sm text-white placeholder-neutral-600 outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-lg text-sm transition shadow-lg disabled:opacity-50"
            >
              {loading ? 'Processing...' : mode === 'login' ? 'Sign In to Atelier' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-neutral-400">
            {mode === 'login' ? (
              <p>
                Don&apos;t have a VIP account?{' '}
                <button onClick={() => setMode('signup')} className="text-amber-400 hover:underline ml-1">
                  Register Now
                </button>
              </p>
            ) : (
              <p>
                Already a member?{' '}
                <button onClick={() => setMode('login')} className="text-amber-400 hover:underline ml-1">
                  Sign In
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
