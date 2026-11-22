import { motion, type Variants } from 'framer-motion';

export const TOOTH_PATH =
  'M100 32 C 72 12, 30 20, 28 62 C 26 96, 44 116, 50 150 C 56 186, 62 206, 76 206 C 90 206, 89 172, 100 152 C 111 172, 110 206, 124 206 C 138 206, 144 186, 150 150 C 156 116, 174 96, 172 62 C 170 20, 128 12, 100 32 Z';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (d: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 2, delay: d, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.3, delay: d } },
  }),
} as unknown as Variants;

/** The hero's signature animated tooth: draws itself, then floats with orbiting accents. */
export function HeroTooth() {
  return (
    <div className="relative aspect-square w-full">
      {/* orbit rings */}
      <motion.div
        className="absolute inset-[6%] rounded-full border border-gold/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_20px_4px_rgba(196,155,99,0.5)]" />
      </motion.div>
      <motion.div
        className="absolute inset-[18%] rounded-full border border-dashed border-navy/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute -bottom-1 left-[20%] h-2 w-2 rounded-full bg-mint" />
      </motion.div>
      <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-mint/60 via-champagne/40 to-transparent blur-2xl" />

      <motion.svg
        viewBox="0 0 200 240"
        className="absolute inset-[20%] h-[60%] w-[60%] drop-shadow-[0_30px_40px_rgba(20,43,59,0.18)]"
        initial="hidden"
        animate="show"
        aria-hidden
      >
        <defs>
          <linearGradient id="toothFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.55" stopColor="#FAF9F5" />
            <stop offset="1" stopColor="#E9D6B8" />
          </linearGradient>
          <linearGradient id="toothStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#C49B63" />
            <stop offset="1" stopColor="#142B3B" />
          </linearGradient>
        </defs>
        <motion.g
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <motion.path
            d={TOOTH_PATH}
            fill="url(#toothFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.4 }}
          />
          <motion.path d={TOOTH_PATH} fill="none" stroke="url(#toothStroke)" strokeWidth="2.2" strokeLinecap="round" variants={draw} custom={0.2} />
          {/* root canals — the specialist's signature detail */}
          <motion.path d="M84 70 C 82 110, 80 150, 76 192" fill="none" stroke="#C49B63" strokeWidth="1.6" strokeLinecap="round" variants={draw} custom={1.6} />
          <motion.path d="M116 70 C 118 110, 120 150, 124 192" fill="none" stroke="#C49B63" strokeWidth="1.6" strokeLinecap="round" variants={draw} custom={1.8} />
          <motion.path d="M84 70 C 92 58, 108 58, 116 70" fill="none" stroke="#C49B63" strokeWidth="1.6" strokeLinecap="round" variants={draw} custom={1.5} />
          {/* highlight */}
          <motion.path
            d="M52 58 C 56 40, 72 32, 86 36"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 2.2, duration: 1 }}
          />
        </motion.g>
      </motion.svg>

      {/* sparkles */}
      {[
        { top: '16%', left: '70%', s: 18, d: 2.4 },
        { top: '64%', left: '14%', s: 12, d: 2.8 },
        { top: '30%', left: '20%', s: 10, d: 3.2 },
      ].map((sp, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute text-gold"
          style={{ top: sp.top, left: sp.left, width: sp.s, height: sp.s }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0.3, 1], scale: [0, 1, 0.8, 1], rotate: [0, 90] }}
          transition={{ delay: sp.d, duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          aria-hidden
        >
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="currentColor" />
        </motion.svg>
      ))}
    </div>
  );
}

type Variant = 'conservative' | 'endo' | 'rct';

const grow = (from: number) => ({ off: { pathLength: from }, on: { pathLength: 1 } }) as unknown as Variants;

/** Small illustrations for the expertise cards. Animate on hover via the `active` flag. */
export function ExpertiseArt({ variant, active }: { variant: Variant; active: boolean }) {
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
      <path d={TOOTH_PATH} fill="#FAF9F5" stroke="#142B3B" strokeWidth="2.5" />
      {variant === 'conservative' && (
        <>
          {/* a restoration being placed on the crown */}
          <motion.path
            d="M70 52 C 85 44, 115 44, 130 52 C 126 70, 112 78, 100 78 C 88 78, 74 70, 70 52 Z"
            fill="#C49B63"
            initial={false}
            animate={{ opacity: active ? 1 : 0.35, scale: active ? 1 : 0.85 }}
            style={{ originX: '100px', originY: '60px' }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          />
          <motion.path
            d="M60 100 C 80 112, 120 112, 140 100"
            fill="none"
            stroke="#B9E4DC"
            strokeWidth="5"
            strokeLinecap="round"
            initial={false}
            variants={grow(0.2)}
            animate={active ? 'on' : 'off'}
            transition={{ duration: 0.8 }}
          />
        </>
      )}
      {variant === 'endo' && (
        <>
          {/* the pulp chamber, glowing */}
          <motion.path
            d="M80 72 C 80 60, 120 60, 120 72 C 120 100, 116 120, 112 150 C 108 170, 92 170, 88 150 C 84 120, 80 100, 80 72 Z"
            fill="#B9E4DC"
            initial={false}
            animate={{ opacity: active ? 1 : 0.5 }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="44"
            fill="none"
            stroke="#C49B63"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            initial={false}
            animate={{ rotate: active ? 180 : 0, opacity: active ? 1 : 0.4 }}
            style={{ originX: '100px', originY: '100px' }}
            transition={{ duration: 1.2 }}
          />
        </>
      )}
      {variant === 'rct' && (
        <>
          {['M86 70 C 84 110, 82 150, 78 194', 'M114 70 C 116 110, 118 150, 122 194'].map((d) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="#C49B63"
              strokeWidth="6"
              strokeLinecap="round"
              initial={false}
              variants={grow(0.25)}
              animate={active ? 'on' : 'off'}
              transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            />
          ))}
          <motion.path
            d="M76 60 C 90 52, 110 52, 124 60"
            fill="none"
            stroke="#142B3B"
            strokeWidth="2"
            strokeDasharray="3 4"
            initial={false}
            animate={{ opacity: active ? 1 : 0.3 }}
          />
        </>
      )}
    </svg>
  );
}

/** A tiny floating tooth used as decoration. */
export function FloatingTooth({ className = '', delay = 0, duration = 7 }: { className?: string; delay?: number; duration?: number }) {
  return (
    <motion.svg
      viewBox="0 0 200 240"
      className={`pointer-events-none absolute ${className}`}
      animate={{ y: [0, -14, 0], rotate: [-6, 6, -6] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      <path d={TOOTH_PATH} fill="currentColor" />
    </motion.svg>
  );
}
