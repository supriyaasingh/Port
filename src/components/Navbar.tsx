import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { CalendarHeart, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navLinks, profile } from '../data/profile';

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = [...navLinks.map((l) => l.id), 'appointment'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id === 'appointment' ? 'contact' : e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold via-champagne to-mint" style={{ scaleX: scrollYProgress }} />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-ivory/80 py-3 shadow-[0_10px_40px_-20px_rgba(20,43,59,0.25)] backdrop-blur-xl' : 'py-5'
        }`}
      >
        <nav className="container-x flex items-center justify-between gap-6" aria-label="Primary">
          <a href="#home" className="group flex items-center gap-3" aria-label="Dr. Simar Kaur — home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-serif text-lg italic text-champagne transition-transform duration-500 group-hover:rotate-[360deg]">
              SK
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-xl font-semibold tracking-tight text-navy">{profile.name}</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">{profile.title}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                    active === l.id ? 'text-navy' : 'text-navy/55 hover:text-navy'
                  }`}
                >
                  {active === l.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-champagne/60" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.phoneHref}
              className="hidden h-11 w-11 place-items-center rounded-full border border-navy/15 text-navy transition hover:border-gold hover:text-gold sm:grid"
              aria-label={`Call ${profile.phoneDisplay}`}
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="#appointment"
              className="hidden items-center gap-2 rounded-full bg-navy px-5 py-3 text-[13px] font-semibold text-ivory transition hover:bg-navy-700 md:inline-flex"
            >
              <CalendarHeart className="h-4 w-4 text-champagne" /> Book Appointment
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-navy text-ivory xl:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-navy text-ivory xl:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="container-x flex items-center justify-between py-5">
              <span className="font-serif text-xl text-champagne">{profile.name}</span>
              <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-ivory/10" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="container-x mt-6 flex flex-1 flex-col gap-1">
              {[...navLinks, { id: 'appointment', label: 'Book Appointment' }].map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-ivory/10 py-4 font-serif text-3xl transition hover:text-champagne"
                  >
                    <span className="font-sans text-xs text-gold">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-x space-y-1 py-8 text-sm text-ivory/60">
              <a href={profile.phoneHref} className="block hover:text-champagne">{profile.phoneDisplay}</a>
              <a href={`mailto:${profile.email}`} className="block break-all hover:text-champagne">{profile.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
