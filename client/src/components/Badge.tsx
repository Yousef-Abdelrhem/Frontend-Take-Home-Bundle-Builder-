interface BadgeProps {
  children: React.ReactNode;
  variant?: 'solid' | 'text';
  className?: string;
}

export default function Badge({ children, variant = 'solid', className = '' }: BadgeProps) {
  const base = 'inline-block rounded-full px-3 py-1 text-xs font-semibold';
  const variantClasses =
    variant === 'solid' ? 'bg-purple-01 text-white' : 'text-purple-01';

  return <span className={`${base} ${variantClasses} ${className}`}>{children}</span>;
}
