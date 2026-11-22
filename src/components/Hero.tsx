import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Award, CalendarHeart, GraduationCap, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { profile } from '../data/profile';
import { MagneticButton } from './MagneticButton';
import { FloatingTooth, HeroTooth } from './ToothArt';

const headline = [
  { text: 'Healthy', italic: false },
  { text: 'Smiles', italic: true },
  { text: 'Begin', italic: false },
  { text: 'With', italic: false },
  { text: 'Expert', italic: false },
  { text: 'Care.', italic: true },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yArt = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:min-h-screen lg:pb-28 lg:pt-40">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-mint/40 blur-[120px]" />
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-champagne/50 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(20,43,59,0.07)_1px,transparent_0)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>
      <FloatingTooth className="left-[6%] top-[22%] hidden h-10 w-10 text-gold/25 lg:block" delay={0.5} />
      <FloatingTooth className="bottom-[14%] left-[46%] hidden h-7 w-7 text-navy/10 lg:block" delay={1.2} duration={9} />

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/60 py-1.5 pl-1.5 pr-4 text-[12px] font-medium text-navy/80 backdrop-blur"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-white">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            {profile.specialization}
          </motion.div>

          <h1 className="mt-7 font-serif text-[3.1rem] font-medium leading-[0.98] tracking-tight text-navy sm:text-7xl lg:text-[5.4rem]">
            {headline.map((w, i) => (
              <span key={w.text} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={`inline-block ${w.italic ? 'italic text-gold' : ''}`}
                  initial={{ y: '110%', rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-navy/70"
          >
            I'm <span className="font-semibold text-navy">{profile.name}</span> — a{' '}
            <span className="font-semibold text-navy">{profile.title}</span> with a BDS and an MDS in Conservative Dentistry &amp;
            Endodontics, where I graduated as a <span className="font-semibold text-gold-dark">Gold Medalist</span>. My focus is
            saving and restoring your natural teeth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <MagneticButton href="#appointment">
              <CalendarHeart className="h-4 w-4 text-champagne" /> Book an Appointment
            </MagneticButton>
            <MagneticButton href="#expertise" variant="ghost">
              Explore My Expertise <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </MagneticButton>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } } }}
            className="mt-12 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {[
              { icon: GraduationCap, k: 'BDS', v: 'Dental Surgery' },
              { icon: Award, k: 'MDS', v: 'Gold Medalist' },
              { icon: Sparkles, k: 'RCT', v: 'Root Canal Specialist' },
            ].map(({ icon: Icon, k, v }) => (
              <motion.li
                key={k}
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                className="flex items-center gap-3 rounded-2xl border border-navy/[0.07] bg-white/60 p-3 backdrop-blur"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy text-champagne">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-navy">{k}</span>
                  <span className="block text-xs text-navy/55">{v}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visual column: portrait placeholder + animated tooth */}
        <motion.div style={{ y: yArt }} className="relative mx-auto w-full max-w-[520px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative ml-auto w-[82%] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-gradient-to-b from-navy-700 to-navy-900 shadow-lift"
          >
            <div className="aspect-[4/5]">
              <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(185,228,220,0.25),transparent_60%)]" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <HeroTooth />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-transparent p-6 pb-20 pt-16 text-center sm:pb-24">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-champagne/70">Portrait placeholder</p>
                <p className="mt-1 text-xs text-ivory/50">Replace with a professional photograph of Dr. Simar Kaur</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="absolute -left-2 top-[14%] sm:left-0"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-3 rounded-2xl bg-white/90 p-3.5 pr-5 shadow-soft backdrop-blur"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-gold to-gold-dark text-white">
                <Award className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block font-serif text-lg font-semibold">Gold Medalist</span>
                <span className="block text-xs text-navy/55">MDS · Endodontics</span>
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute -bottom-4 left-[6%] sm:left-[4%]"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="rounded-2xl bg-mint p-4 pr-6 shadow-soft"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy/60">Specialist in</p>
              <p className="mt-0.5 font-serif text-xl font-semibold text-navy">Root Canal Treatment</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-navy/40 lg:flex"
        aria-label="Scroll to About section"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
