import React from 'react';
import { useAuthContext } from './AuthProvider';
import { UserRole } from '../../types/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-amber-400">
        Loading Atelier Access...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center bg-black/80 text-amber-200 border border-amber-500/20 rounded-xl">
        <h3 className="text-xl font-serif mb-2">Exclusive Atelier Access Required</h3>
        <p className="text-sm text-neutral-400">Please sign in to access luxury private features.</p>
      </div>
    );
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return (
      <div className="p-8 text-center bg-black/80 text-rose-400 border border-rose-500/20 rounded-xl">
        <h3 className="text-xl font-serif mb-2">Insufficient VIP Clearance</h3>
        <p className="text-sm text-neutral-400">This section is reserved for {requiredRole.toUpperCase()} members.</p>
      </div>
    );
  }

  return <>{children}</>;
};
