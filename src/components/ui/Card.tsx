import React from 'react';
import { cn } from '../../utils/cn';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div
    className={cn('bg-[#0f172a]/80 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md', className)}
    {...props}
  >
    {children}
  </div>
);
