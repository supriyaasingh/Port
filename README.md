# Dr. Simar Kaur — Personal Portfolio

A premium personal portfolio for **Dr. Simar Kaur**, BDS, MDS (Gold Medalist) — Conservative Dentistry & Endodontics, Root Canal Specialist.

**Stack:** React 18 · TypeScript · Tailwind CSS · Framer Motion · Lucide React · Vite

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Content source

All verified details come from Dr. Simar's visiting card and live in one file:
`src/data/profile.ts`.

## Placeholders to replace before launch

| Item | Where |
| --- | --- |
| Professional portrait (hero + about) | `Hero.tsx`, `About.tsx` → `PortraitPlaceholder.tsx` |
| Extended biography (years, institutions, affiliations) | `About.tsx` |
| Patient testimonials (genuine, with written consent only) | `Testimonials.tsx` |
| Clinic address & working hours | `src/data/profile.ts` |
| Any additional treatments | `Expertise.tsx` (only once confirmed by the doctor) |

## Appointment requests

The form validates input and opens WhatsApp (+91 78984 13844) with a pre-filled
message. It's a **request**, not a booking. The site never says an appointment
is confirmed.
