import { motion } from 'framer-motion';
import { Award, GraduationCap, HeartHandshake, Microscope } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { FloatingTooth } from './ToothArt';

// Each card is grounded in the verified credentials on the visiting card.
const reasons = [
  {
    icon: Award,
    kicker: 'Verified credential',
    title: 'MDS Gold Medalist',
    body: 'Dr. Simar completed her Master of Dental Surgery as a Gold Medalist.',
  },
  {
    icon: GraduationCap,
    kicker: 'Verified credential',
    title: 'BDS + MDS Qualified',
    body: 'Undergraduate and postgraduate degrees in dental surgery — a specialist, not only a general practitioner.',
  },
  {
    icon: Microscope,
    kicker: 'Specialization',
    title: 'Conservative Dentistry & Endodontics',
    body: 'Postgraduate specialization in the diagnosis and treatment of the tooth pulp and in restoring natural teeth.',
  },
  {
    icon: HeartHandshake,
    kicker: 'Clinical focus',
    title: 'Root Canal Specialist',
    body: 'Root canal treatment is the core of her practice — a procedure designed to retain a tooth that might otherwise be lost.',
  },
];

export function WhyChoose() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="why" className="relative overflow-hidden bg-navy py-24 text-ivory sm:py-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-gold/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-mint/10 blur-[120px]" />
      <FloatingTooth className="right-[8%] top-20 h-16 w-16 text-champagne/10" />
      <FloatingTooth className="bottom-16 left-[6%] h-10 w-10 text-mint/10" delay={1.5} duration={9} />

      <div className="container-x relative">
        <SectionHeading
          tone="dark"
          eyebrow="Why Choose Dr. Simar"
          title={
            <>
              Credentials you can <em className="text-champagne">trust</em>.
            </>
          }
          intro="Every point below comes straight from Dr. Simar's verified qualifications — nothing more, nothing embellished."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, kicker, title, body }, i) => {
            const on = active === i;
            return (
              <Reveal key={title} delay={i * 0.1}>
                <motion.article
                  onHoverStart={() => setActive(i)}
                  onHoverEnd={() => setActive(null)}
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ivory/10 bg-gradient-to-b from-ivory/[0.07] to-ivory/[0.02] p-7 backdrop-blur"
                >
                  <motion.div
                    className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-gold via-champagne to-mint"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: on ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    animate={{ rotate: on ? -8 : 0, scale: on ? 1.08 : 1 }}
                    className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-dark text-navy-900 shadow-[0_10px_30px_-10px_rgba(196,155,99,0.7)]"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-mint/80">{kicker}</p>
                  <h3 className="mt-2 font-serif text-2xl font-medium leading-snug text-ivory">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/60">{body}</p>
                  <span className="pointer-events-none absolute -bottom-6 -right-2 font-serif text-[7rem] italic leading-none text-ivory/[0.04] transition-colors duration-500 group-hover:text-gold/10">
                    {i + 1}
                  </span>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
