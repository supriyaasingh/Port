import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

/** Fades + lifts its children into view once, when scrolled into the viewport. */
export function Reveal({ children, delay = 0, y = 28, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
