import { Camera } from 'lucide-react';

type Props = { className?: string; label?: string; tone?: 'navy' | 'champagne' };

/**
 * Elegant placeholder frame for the doctor's professional portrait.
 * Intentionally NOT a generated face — replace with a real photograph.
 */
export function PortraitPlaceholder({ className = '', label = 'Professional portrait', tone = 'navy' }: Props) {
  const isNavy = tone === 'navy';
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] ${
        isNavy ? 'bg-gradient-to-br from-navy-700 via-navy to-navy-900' : 'bg-gradient-to-br from-champagne-light via-champagne to-[#dcc39c]'
      } ${className}`}
      role="img"
      aria-label={`${label} placeholder — photograph of Dr. Simar Kaur to be added`}
    >
      <div className="grain absolute inset-0 opacity-[0.08] mix-blend-overlay" />
      {/* soft arch silhouette */}
      <svg className="absolute inset-x-0 bottom-0 h-[78%] w-full" viewBox="0 0 400 420" preserveAspectRatio="xMidYMax meet" aria-hidden>
        <defs>
          <linearGradient id={`sil-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={isNavy ? '#E9D6B8' : '#142B3B'} stopOpacity="0.16" />
            <stop offset="1" stopColor={isNavy ? '#E9D6B8' : '#142B3B'} stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="150" r="78" fill={`url(#sil-${tone})`} />
        <path d="M40 420 C 50 300, 120 250, 200 250 C 280 250, 350 300, 360 420 Z" fill={`url(#sil-${tone})`} />
      </svg>
      <div className="absolute inset-4 rounded-[1.6rem] border border-dashed opacity-40" style={{ borderColor: isNavy ? '#E9D6B8' : '#142B3B' }} />
      <div className="absolute left-1/2 top-7 -translate-x-1/2">
        <span
          className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${
            isNavy ? 'bg-ivory/10 text-champagne' : 'bg-navy/10 text-navy'
          }`}
        >
          <Camera className="h-3.5 w-3.5" /> Photo placeholder
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-8 text-center">
        <p className={`font-serif text-5xl italic ${isNavy ? 'text-champagne/80' : 'text-navy/70'}`}>SK</p>
        <p className={`mt-1 text-[11px] uppercase tracking-[0.25em] ${isNavy ? 'text-ivory/50' : 'text-navy/50'}`}>{label}</p>
      </div>
    </div>
  );
}
