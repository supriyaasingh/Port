import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { ExpertiseArt } from './ToothArt';

type Item = {
  key: 'conservative' | 'endo' | 'rct';
  no: string;
  title: string;
  lead: string;
  points: string[];
  tint: string;
};

// General, educational descriptions of each discipline — no claims about outcomes.
const items: Item[] = [
  {
    key: 'conservative',
    no: '01',
    title: 'Conservative Dentistry',
    lead: 'Restoring teeth affected by decay, wear or minor fractures while conserving as much healthy natural tooth structure as possible.',
    points: ['Assessment of decay & damage', 'Tooth-coloured restorations', 'Preserving natural structure'],
    tint: 'from-champagne/70 to-champagne-light',
  },
  {
    key: 'endo',
    no: '02',
    title: 'Endodontics',
    lead: "The study and treatment of the dental pulp — the living tissue inside the tooth — and the tissues surrounding the tooth's roots.",
    points: ['Diagnosis of tooth pain', 'Pulp health evaluation', 'Management of infection'],
    tint: 'from-mint/80 to-mint-light',
  },
  {
    key: 'rct',
    no: '03',
    title: 'Root Canal Treatment',
    lead: 'Cleaning, shaping and sealing the infected or inflamed canals inside a tooth so that the tooth itself can be retained.',
    points: ['Canal cleaning & disinfection', 'Sealing of root canals', 'Planning the final restoration'],
    tint: 'from-[#e3d2c0] to-champagne-light',
  },
];

function ExpertiseCard({ item, index }: { item: Item; index: number }) {
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glow = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(400px circle at ${x} ${y}, rgba(196,155,99,0.14), transparent 60%)`,
  );

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <Reveal delay={index * 0.12} className="[perspective:1200px]">
      <motion.article
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
          mx.set(0.5);
          my.set(0.5);
        }}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onClick={() => setHover((h) => !h)}
        tabIndex={0}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full cursor-default flex-col overflow-hidden rounded-[2rem] border border-navy/[0.06] bg-white p-7 shadow-soft outline-none transition-shadow duration-500 hover:shadow-lift focus-visible:ring-4 focus-visible:ring-gold/30 sm:p-8"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glow }}
        />
        <div className="flex items-start justify-between">
          <span className="font-serif text-5xl italic text-navy/15">{item.no}</span>
          <motion.span
            animate={{ rotate: hover ? 45 : 0, backgroundColor: hover ? '#142B3B' : 'rgba(20,43,59,0.05)', color: hover ? '#E9D6B8' : '#142B3B' }}
            className="grid h-11 w-11 place-items-center rounded-full"
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.span>
        </div>

        <div className={`relative mx-auto my-6 grid h-48 w-full place-items-center rounded-3xl bg-gradient-to-br ${item.tint}`} style={{ transform: 'translateZ(30px)' }}>
          <motion.div
            className="h-36 w-32"
            animate={{ y: hover ? -6 : [0, -6, 0], scale: hover ? 1.06 : 1 }}
            transition={hover ? { type: 'spring', stiffness: 200, damping: 15 } : { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
          >
            <ExpertiseArt variant={item.key} active={hover} />
          </motion.div>
        </div>

        <h3 className="font-serif text-3xl font-medium tracking-tight">{item.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-navy/65">{item.lead}</p>

        <motion.ul
          initial={false}
          animate={{ height: hover ? 'auto' : 0, opacity: hover ? 1 : 0, marginTop: hover ? 20 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-2 overflow-hidden"
        >
          {item.points.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-sm text-navy/75">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-mint">
                <Check className="h-3 w-3" />
              </span>
              {p}
            </li>
          ))}
        </motion.ul>
        <p className="mt-auto pt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {hover ? 'Core specialization' : 'Hover or tap to explore'}
        </p>
      </motion.article>
    </Reveal>
  );
}

export function Expertise() {
  return (
    <section id="expertise" className="relative overflow-hidden bg-gradient-to-b from-ivory via-[#f4efe5] to-ivory py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="My Expertise"
          title={
            <>
              Specialist care, focused on <em className="text-gold">saving</em> your teeth.
            </>
          }
          intro="My postgraduate training is in Conservative Dentistry & Endodontics — the branch of dentistry dedicated to treating and restoring natural teeth from the inside out."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <ExpertiseCard key={item.key} item={item} index={i} />
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-navy/50">
            Additional treatments will be listed here once confirmed by Dr. Simar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
