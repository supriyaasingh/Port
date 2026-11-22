import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';

type Variant = 'primary' | 'ghost' | 'gold' | 'light';

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
  external?: boolean;
  strength?: number;
  ariaLabel?: string;
};

const styles: Record<Variant, string> = {
  primary: 'bg-navy text-ivory hover:bg-navy-700 shadow-lift',
  gold: 'bg-gold text-navy-900 hover:bg-champagne shadow-lift',
  ghost: 'border border-navy/20 text-navy hover:border-navy/50 bg-white/40 backdrop-blur',
  light: 'border border-ivory/25 text-ivory hover:border-ivory/60 bg-white/5 backdrop-blur',
};

/**
 * A button that gently follows the cursor (a "magnetic" pull).
 * Disabled automatically on touch devices since there is no hover there.
 */
export function MagneticButton({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  external,
  strength = 0.3,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const ix = useTransform(sx, (v) => v * 0.35);
  const iy = useTransform(sy, (v) => v * 0.35);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base = `group relative inline-flex whitespace-nowrap items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-4 text-[14px] font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40 ${styles[variant]} ${className}`;

  const inner = (
    <motion.span style={{ x: ix, y: iy }} className="relative z-10 inline-flex items-center gap-2.5">
      {children}
    </motion.span>
  );

  const common = {
    onMouseMove: onMove,
    onMouseLeave: reset,
    style: { x: sx, y: sy },
    whileTap: { scale: 0.96 },
    className: base,
    'aria-label': ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...common}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} type={type} onClick={onClick} {...common}>
      {inner}
    </motion.button>
  );
}
