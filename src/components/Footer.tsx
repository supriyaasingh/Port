import { ArrowUp } from 'lucide-react';
import { navLinks, profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-ivory">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      <div className="container-x relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-4xl text-champagne sm:text-5xl">{profile.name}</p>
            <p className="mt-3 text-sm text-ivory/60">{profile.qualifications.join(' · ')}</p>
            <p className="text-sm text-ivory/60">{profile.specialization}</p>
            <p className="mt-4 inline-block rounded-full border border-gold/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              {profile.title}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/40">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-ivory/70 transition hover:text-champagne">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/40">Reach out</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={profile.phoneHref} className="text-ivory/70 transition hover:text-champagne">{profile.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`} className="break-all text-ivory/70 transition hover:text-champagne">{profile.email}</a>
              </li>
              <li className="text-ivory/40">{profile.addressPlaceholder}</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="max-w-md">Information on this website is for general education and is not a substitute for a clinical consultation.</p>
          <a href="#home" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20 text-ivory/70 transition hover:border-champagne hover:text-champagne" aria-label="Back to top">
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
