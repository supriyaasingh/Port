import { Reveal } from './Reveal';

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
};

export function SectionHeading({ eyebrow, title, intro, align = 'center', tone = 'light' }: Props) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <Reveal>
        <span className={`eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem] ${
            tone === 'dark' ? 'text-ivory' : 'text-navy'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p
            className={`mt-6 text-base leading-relaxed sm:text-lg ${
              tone === 'dark' ? 'text-ivory/70' : 'text-navy/65'
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
