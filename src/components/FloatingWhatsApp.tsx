import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile, whatsappLink } from '../data/profile';

export function FloatingWhatsApp() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 600));

  // Step aside while the appointment form is on screen so it never covers the submit button.
  useEffect(() => {
    const el = document.getElementById('appointment');
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const show = scrolled && !formVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappLink(`Hello ${profile.name}, I'd like to request an appointment.`)}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.06 }}
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-navy py-3 pl-3 pr-3 text-ivory shadow-lift sm:bottom-8 sm:right-8 sm:pr-5"
          aria-label="Message Dr. Simar Kaur on WhatsApp"
        >
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-[#25D366]">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
            <MessageCircle className="relative h-5 w-5 text-white" />
          </span>
          <span className="hidden text-sm font-semibold sm:inline">WhatsApp Dr. Simar</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
