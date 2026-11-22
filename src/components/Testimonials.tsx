import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquareQuote, Quote } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

/**
 * PLACEHOLDERS ONLY. Replace each entry with a genuine patient review,
 * shared with the patient's written consent. Never invent reviews or ratings.
 */
const slots = [
  { id: 1, treatment: 'Root Canal Treatment' },
  { id: 2, treatment: 'Conservative Dentistry' },
  { id: 3, treatment: 'Endodontic Consultation' },
];

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((d: number) => setState(([i]) => [(i + d + slots.length) % slots.length, d]), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go, paused]);

  const slot = slots[index];

  return (
    <section id="experiences" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Patient Experiences"
          title={
            <>
              Stories from the <em className="text-gold">chair</em>.
            </>
          }
          intro="This space is reserved for genuine words from Dr. Simar's patients, shared with their consent."
        />

        <Reveal delay={0.15}>
          <div
            className="relative mx-auto mt-14 max-w-4xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="Patient experiences"
          >
            <div className="absolute -inset-2 -z-10 rotate-[-1.5deg] sm:-inset-4 rounded-[2.5rem] bg-gradient-to-br from-mint/50 to-champagne/50" />
            <div className="relative min-h-[360px] overflow-hidden rounded-[2.25rem] border border-navy/[0.06] bg-white p-8 shadow-soft sm:p-14">
              <Quote className="absolute right-8 top-8 h-20 w-20 text-champagne/60" strokeWidth={1} />
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={slot.id}
                  custom={dir}
                  initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  aria-live="polite"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-gold/60 bg-champagne/25 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-dark">
                    <MessageSquareQuote className="h-3.5 w-3.5" /> Placeholder · Testimonial {slot.id}
                  </span>
                  <p className="mt-8 font-serif text-2xl italic leading-snug text-navy/40 sm:text-[2rem]">
                    “A verified patient review will appear here. Only genuine feedback, shared with the patient's written permission,
                    will be published.”
                  </p>
                  <div className="mt-10 flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-dashed border-navy/15 font-serif text-lg text-navy/30">
                      ?
                    </span>
                    <span>
                      <span className="block font-semibold text-navy/50">Patient name — placeholder</span>
                      <span className="block text-sm text-navy/40">Treatment: {slot.treatment}</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between px-2">
              <div className="flex gap-2" role="tablist">
                {slots.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setState([i, i > index ? 1 : -1])}
                    className="relative h-2 overflow-hidden rounded-full bg-navy/10 transition-all duration-500"
                    style={{ width: i === index ? 40 : 10 }}
                    aria-label={`Show testimonial placeholder ${s.id}`}
                    aria-selected={i === index}
                    role="tab"
                  >
                    {i === index && (
                      <motion.span
                        key={`${index}-${paused}`}
                        className="absolute inset-y-0 left-0 bg-gold"
                        initial={{ width: paused ? '100%' : '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: paused ? 0 : 6, ease: 'linear' }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-navy/15 transition hover:border-navy hover:bg-navy hover:text-ivory" aria-label="Previous">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full bg-navy text-ivory transition hover:bg-gold hover:text-navy" aria-label="Next">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
