import { AnimatePresence, motion } from 'framer-motion';
import { Info, Plus } from 'lucide-react';
import { useState } from 'react';
import { profile, whatsappLink } from '../data/profile';
import { Reveal } from './Reveal';

// General dental education only — not personalised medical advice.
const faqs = [
  {
    q: 'What is a root canal treatment?',
    a: "A root canal treatment removes inflamed or infected pulp — the soft tissue inside the tooth — then cleans, disinfects, shapes and seals the canals. The goal is to keep your natural tooth rather than extract it. The tooth usually needs a suitable final restoration, such as a filling or crown, afterwards.",
  },
  {
    q: 'How do I know if I might need a root canal?',
    a: 'Common warning signs include lingering sensitivity to hot or cold, persistent or spontaneous toothache, pain on biting, swelling of the gum near a tooth, or darkening of a tooth. Some problems show no symptoms at all and are only found on examination and X-rays — which is why a specialist assessment matters.',
  },
  {
    q: 'Is root canal treatment painful?',
    a: 'Root canal treatment is carried out under local anaesthesia, and many patients find it comparable to having a filling. Some tenderness for a few days afterwards is common. The treatment is often what relieves the pain caused by an infected or inflamed tooth.',
  },
  {
    q: 'What is Conservative Dentistry?',
    a: 'Conservative Dentistry is the branch of dentistry concerned with restoring teeth damaged by decay, wear or trauma while conserving as much healthy natural tooth structure as possible.',
  },
  {
    q: 'What does an Endodontist do?',
    a: "Endodontics deals with the dental pulp and the tissues around the root of a tooth. An endodontic specialist diagnoses tooth pain and treats conditions of the pulp — most commonly through root canal treatment — with the aim of saving the natural tooth.",
  },
  {
    q: 'Why save a natural tooth instead of extracting it?',
    a: "Your natural tooth helps you chew efficiently, keeps neighbouring teeth from drifting and supports the jawbone. When a tooth can be predictably saved, retaining it is often preferable — but the right option always depends on the individual tooth, which is assessed at consultation.",
  },
  {
    q: 'How can I keep my teeth healthy between visits?',
    a: 'Brush twice daily with a fluoride toothpaste, clean between your teeth every day, limit sugary snacks and drinks, avoid using your teeth to open things, and attend regular dental check-ups so problems are found early.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-gradient-to-b from-ivory to-[#f3eee4] py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="eyebrow">Frequently Asked</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
                Questions, <em className="text-gold">answered</em> simply.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-navy/65">
                Clear, general information about root canals and conservative dentistry. Have a question about your own teeth?
              </p>
              <a
                href={whatsappLink(`Hello ${profile.name}, I have a question about my dental health.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 border-b border-gold pb-1 text-sm font-semibold text-navy transition hover:text-gold"
              >
                Ask Dr. Simar on WhatsApp →
              </a>
              <div className="mt-10 flex gap-3 rounded-2xl bg-mint/40 p-4 text-xs leading-relaxed text-navy/70">
                <Info className="h-4 w-4 shrink-0" />
                This information is educational and does not replace a personal clinical examination and diagnosis.
              </div>
            </Reveal>
          </div>
        </div>

        <ul className="space-y-3 lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <li
                  className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${
                    isOpen ? 'border-gold/40 bg-white shadow-soft' : 'border-navy/[0.07] bg-white/60 hover:bg-white'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-5 p-5 text-left sm:p-6"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-btn-${i}`}
                  >
                    <span className={`font-serif text-lg italic transition-colors ${isOpen ? 'text-gold' : 'text-navy/30'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-[17px] font-semibold text-navy">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0, backgroundColor: isOpen ? '#142B3B' : 'rgba(20,43,59,0)', color: isOpen ? '#E9D6B8' : '#142B3B' }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-navy/15"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <motion.p
                          initial={{ y: -8 }}
                          animate={{ y: 0 }}
                          className="px-5 pb-6 pl-[3.75rem] text-[15px] leading-relaxed text-navy/65 sm:px-6 sm:pl-[4.25rem]"
                        >
                          {f.a}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
