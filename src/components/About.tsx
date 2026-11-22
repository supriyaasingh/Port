import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, BookOpenCheck, GraduationCap, PenLine, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';
import { profile } from '../data/profile';
import { PortraitPlaceholder } from './PortraitPlaceholder';
import { Reveal } from './Reveal';

const credentials = [
  { icon: GraduationCap, label: 'BDS', detail: 'Bachelor of Dental Surgery' },
  { icon: Award, label: 'MDS (Gold Medalist)', detail: 'Master of Dental Surgery' },
  { icon: BookOpenCheck, label: 'Conservative Dentistry & Endodontics', detail: 'Postgraduate specialization' },
  { icon: ShieldCheck, label: 'Root Canal Specialist', detail: 'Area of clinical focus' },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yImg = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yTag = useTransform(scrollYProgress, [0, 1], [-30, 50]);

  return (
    <section id="about" ref={ref} className="relative py-24 sm:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Portrait column */}
        <div className="relative lg:col-span-5">
          <motion.div style={{ y: yImg }} className="relative">
            <PortraitPlaceholder tone="champagne" className="aspect-[4/5] w-full shadow-soft" label="Editorial portrait" />
          </motion.div>
          <motion.div
            style={{ y: yTag }}
            className="absolute right-3 bottom-10 rounded-2xl bg-navy p-5 text-ivory shadow-lift sm:-right-8"
          >
            <p className="font-serif text-4xl italic text-champagne">MDS</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/60">Gold Medalist</p>
          </motion.div>
          <div className="absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full bg-mint/60 blur-2xl" />
        </div>

        {/* Biography column */}
        <div className="lg:col-span-7 lg:pl-8">
          <Reveal>
            <span className="eyebrow">About Dr. Simar</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              A specialist devoted to <em className="text-gold">preserving</em> your natural smile.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 grid gap-6 text-[17px] leading-relaxed text-navy/70 sm:grid-cols-2">
              <p>
                <span className="float-left mr-3 mt-1 font-serif text-6xl leading-[0.8] text-gold">S</span>
                imar Kaur is a dental surgeon holding a <strong className="text-navy">BDS</strong> and an{' '}
                <strong className="text-navy">MDS in Conservative Dentistry &amp; Endodontics</strong>, completed as a{' '}
                <strong className="text-navy">Gold Medalist</strong>.
              </p>
              <p>
                Her specialty centres on diagnosing and treating problems of the tooth's inner pulp and on restoring damaged teeth — with
                the aim of keeping your own teeth healthy and functional wherever possible. She practises as a{' '}
                <strong className="text-navy">Root Canal Specialist</strong>.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-dashed border-gold/50 bg-champagne/20 p-5 text-sm text-navy/70">
              <PenLine className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <p>
                <span className="font-semibold text-navy">Biography placeholder — </span>
                years of practice, institutions, clinical affiliations, memberships and a personal note from Dr. Simar can be added here
                once confirmed by her.
              </p>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {credentials.map(({ icon: Icon, label, detail }, i) => (
              <Reveal key={label} delay={0.1 + i * 0.07}>
                <li className="group flex h-full items-center gap-4 rounded-2xl border border-navy/[0.07] bg-white p-4 transition duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-soft">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mint/50 text-navy transition-colors duration-500 group-hover:bg-navy group-hover:text-champagne">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="leading-snug">
                    <span className="block font-semibold text-navy">{label}</span>
                    <span className="block text-sm text-navy/55">{detail}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <p className="mt-10 font-serif text-3xl italic text-navy/80">— {profile.name}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
