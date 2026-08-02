import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider text-xs rounded-xl cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/20 font-semibold',
        outline: 'border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black font-semibold',
        secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/10',
        ghost: 'hover:bg-white/10 text-white/80 hover:text-white',
        danger: 'bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white border border-rose-500/40',
      },
      size: {
        sm: 'py-2 px-3 text-[11px]',
        md: 'py-3 px-5 text-xs',
        lg: 'py-4 px-8 text-sm',
        icon: 'p-2.5 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ className, variant, size, isLoading, children, ...props }) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
};
