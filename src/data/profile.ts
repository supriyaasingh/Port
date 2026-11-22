/**
 * Verified information — sourced from Dr. Simar Kaur's visiting card.
 * Anything not on the card is marked as a placeholder and must be
 * confirmed by the doctor before going live.
 */
export const profile = {
  name: 'Dr. Simar Kaur',
  firstName: 'Simar',
  qualifications: ['BDS', 'MDS (Gold Medalist)'],
  specialization: 'Conservative Dentistry & Endodontics',
  title: 'Root Canal Specialist',
  phoneDisplay: '+91 78984 13844',
  phoneHref: 'tel:+917898413844',
  whatsappNumber: '917898413844',
  email: 'mydentistbysimar@gmail.com',

  // ---- PLACEHOLDERS (awaiting confirmation from the doctor) ----
  addressPlaceholder: 'Clinic address to be confirmed',
  hoursPlaceholder: 'Consultation hours to be confirmed',
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'why', label: 'Why Dr. Simar' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
] as const;
