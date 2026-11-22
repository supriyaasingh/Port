import { MotionConfig } from 'framer-motion';
import { About } from './components/About';
import { Appointment } from './components/Appointment';
import { Contact } from './components/Contact';
import { Expertise } from './components/Expertise';
import { FAQ } from './components/FAQ';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Testimonials } from './components/Testimonials';
import { WhyChoose } from './components/WhyChoose';

export default function App() {
  return (
    // Respect the visitor's OS-level "reduce motion" preference.
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-ivory">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Expertise />
        <WhyChoose />
        <Testimonials />
        <FAQ />
        <Appointment />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </MotionConfig>
  );
}
