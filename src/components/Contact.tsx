import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { profile, whatsappLink } from '../data/profile';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';

const channels = [
  { icon: Phone, label: 'Phone', value: profile.phoneDisplay, href: profile.phoneHref, cta: 'Call now' },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: profile.phoneDisplay,
    href: whatsappLink(`Hello ${profile.name}, I'd like to get in touch.`),
    cta: 'Start chat',
    external: true,
  },
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, cta: 'Write an email' },
];

export function Contact() {
  return (
    <section id="contact" className="relative pb-24 pt-8 sm:pb-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact Dr. Simar"
          title={
            <>
              I'd love to <em className="text-gold">hear</em> from you.
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {channels.map(({ icon: Icon, label, value, href, cta, external }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <motion.a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-navy/[0.07] bg-white p-7 shadow-soft"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-navy transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />
                <span className="relative flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-champagne/60 text-navy transition-colors duration-500 group-hover:bg-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-navy/30 transition-all duration-500 group-hover:rotate-45 group-hover:text-champagne" />
                </span>
                <span className="relative mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">{label}</span>
                <span className="relative mt-1 break-all text-lg font-semibold text-navy transition-colors duration-500 group-hover:text-ivory">{value}</span>
                <span className="relative mt-4 text-sm text-navy/50 transition-colors duration-500 group-hover:text-ivory/60">{cta} →</span>
              </motion.a>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {[
            { icon: MapPin, label: 'Clinic address', value: profile.addressPlaceholder, note: 'Address & map to be added once confirmed by Dr. Simar.' },
            { icon: Clock, label: 'Working hours', value: profile.hoursPlaceholder, note: 'Days and timings to be added once confirmed by Dr. Simar.' },
          ].map(({ icon: Icon, label, value, note }, i) => (
            <Reveal key={label} delay={0.2 + i * 0.1}>
              <div className="flex h-full items-start gap-5 rounded-[1.75rem] border-2 border-dashed border-gold/40 bg-champagne/15 p-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-gold shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    {label}
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[9px] tracking-[0.15em] text-gold-dark">Placeholder</span>
                  </p>
                  <p className="mt-2 text-lg font-semibold text-navy/60">{value}</p>
                  <p className="mt-1 text-sm text-navy/45">{note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
