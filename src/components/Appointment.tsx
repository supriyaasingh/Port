import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CalendarDays, CheckCircle2, Clock, MessageCircle, Phone, Send, Stethoscope, User } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { profile, whatsappLink } from '../data/profile';
import { MagneticButton } from './MagneticButton';
import { Reveal } from './Reveal';

type Form = { name: string; phone: string; date: string; time: string; reason: string };
type Errors = Partial<Record<keyof Form, string>>;

const reasons = ['Tooth pain / sensitivity', 'Root canal consultation', 'Restoration / filling', 'Second opinion', 'General check-up', 'Other'];
const timeSlots = ['Morning (9 AM – 12 PM)', 'Afternoon (12 PM – 4 PM)', 'Evening (4 PM – 8 PM)'];

const empty: Form = { name: '', phone: '', date: '', time: '', reason: '' };

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function formatDate(iso: string) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
}

export function buildMessage(f: Form) {
  return [
    `Hello ${profile.name},`,
    '',
    "I'd like to request an appointment. Details:",
    `• Name: ${f.name.trim()}`,
    `• Phone: ${f.phone.trim()}`,
    `• Preferred date: ${formatDate(f.date)}`,
    `• Preferred time: ${f.time}`,
    `• Reason: ${f.reason.trim()}`,
    '',
    'Please let me know if this slot is available. Thank you!',
  ].join('\n');
}

function validate(f: Form): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
  const digits = f.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 13) e.phone = 'Please enter a valid phone number.';
  if (!f.date) e.date = 'Please choose a preferred date.';
  else if (f.date < todayISO()) e.date = 'Please choose a date from today onwards.';
  if (!f.time) e.time = 'Please choose a preferred time.';
  if (f.reason.trim().length < 3) e.reason = 'Please tell us briefly why you would like to visit.';
  return e;
}

function Field({ label, icon: Icon, error, children, htmlFor }: { label: string; icon: typeof User; error?: string; children: React.ReactNode; htmlFor: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-navy/60">
        <Icon className="h-3.5 w-3.5 text-gold" /> {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700"
            role="alert"
          >
            <AlertCircle className="h-3.5 w-3.5" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Appointment() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const min = useMemo(todayISO, []);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;
    window.open(whatsappLink(buildMessage(form)), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <section id="appointment" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-20 -z-10 h-[500px] w-[500px] rounded-full bg-mint/40 blur-[120px]" />
      <div className="container-x">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-white shadow-lift lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left panel */}
          <div className="relative overflow-hidden bg-navy p-8 text-ivory sm:p-12">
            <div className="grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-champagne/15" />
            <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full border border-champagne/20" />
            <div className="relative">
              <Reveal>
                <span className="eyebrow">Book an Appointment</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.08] sm:text-5xl">
                  Let's take care of your <em className="text-champagne">smile</em>.
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-6 leading-relaxed text-ivory/70">
                  Share your preferred date and time. Your request opens in WhatsApp as a pre-filled message to {profile.name} — you
                  review it and press send.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <ol className="mt-10 space-y-5">
                  {['Fill in your details', 'Send the pre-filled request on WhatsApp', 'Receive a reply confirming availability'].map((s, i) => (
                    <li key={s} className="flex items-center gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-champagne/30 font-serif text-champagne">{i + 1}</span>
                      <span className="text-sm text-ivory/80">{s}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-10 rounded-2xl border border-champagne/20 bg-ivory/5 p-5 text-sm text-ivory/70">
                  <p className="flex items-center gap-2 font-semibold text-champagne">
                    <AlertCircle className="h-4 w-4" /> Please note
                  </p>
                  <p className="mt-2 leading-relaxed">
                    Submitting this form is a <strong className="text-ivory">request</strong>, not a confirmed booking. Your appointment is
                    confirmed only after you hear back directly.
                  </p>
                </div>
                <a href={profile.phoneHref} className="mt-6 inline-flex items-center gap-2 text-sm text-ivory/70 transition hover:text-champagne">
                  <Phone className="h-4 w-4" /> Prefer to call? {profile.phoneDisplay}
                </a>
              </Reveal>
            </div>
          </div>

          {/* Form */}
          <div className="relative p-8 sm:p-12">
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid gap-5 sm:grid-cols-2"
                  aria-label="Appointment request form"
                >
                  <div className="sm:col-span-2">
                    <Field label="Patient name" icon={User} error={errors.name} htmlFor="name">
                      <input id="name" className="field" placeholder="Full name" value={form.name} onChange={set('name')} autoComplete="name" />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Phone number" icon={Phone} error={errors.phone} htmlFor="phone">
                      <input id="phone" type="tel" inputMode="tel" className="field" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={set('phone')} autoComplete="tel" />
                    </Field>
                  </div>
                  <Field label="Preferred date" icon={CalendarDays} error={errors.date} htmlFor="date">
                    <input id="date" type="date" min={min} className="field" value={form.date} onChange={set('date')} />
                  </Field>
                  <Field label="Preferred time" icon={Clock} error={errors.time} htmlFor="time">
                    <select id="time" className="field appearance-none" value={form.time} onChange={set('time')}>
                      <option value="">Select a time</option>
                      {timeSlots.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Reason for appointment" icon={Stethoscope} error={errors.reason} htmlFor="reason">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {reasons.map((r) => (
                          <button
                            type="button"
                            key={r}
                            onClick={() => {
                              setForm((f) => ({ ...f, reason: r === 'Other' ? '' : r }));
                              setErrors((er) => ({ ...er, reason: undefined }));
                              if (r === 'Other') document.getElementById('reason')?.focus();
                            }}
                            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                              form.reason === r ? 'border-navy bg-navy text-ivory' : 'border-navy/15 text-navy/70 hover:border-gold hover:text-navy'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                      <textarea id="reason" rows={3} className="field resize-none" placeholder="Briefly describe your concern…" value={form.reason} onChange={set('reason')} />
                    </Field>
                  </div>
                  <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-xs leading-relaxed text-navy/50">
                      Opens WhatsApp with your request pre-filled. Nothing is sent until you press send.
                    </p>
                    <MagneticButton type="submit" variant="primary" strength={0.2}>
                      <MessageCircle className="h-4 w-4 text-mint" /> Request via WhatsApp <Send className="h-3.5 w-3.5" />
                    </MagneticButton>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full flex-col items-center justify-center py-10 text-center"
                  role="status"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-mint"
                  >
                    <CheckCircle2 className="h-9 w-9 text-navy" />
                  </motion.span>
                  <h3 className="mt-6 font-serif text-3xl">Your request is ready to send</h3>
                  <p className="mt-3 max-w-md text-navy/65">
                    WhatsApp should have opened with your details pre-filled. Press <strong>send</strong> there to share your request. This
                    is <strong>not yet a confirmed appointment</strong> — you'll receive a reply confirming availability.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <MagneticButton href={whatsappLink(buildMessage(form))} external variant="primary">
                      <MessageCircle className="h-4 w-4 text-mint" /> Open WhatsApp again
                    </MagneticButton>
                    <MagneticButton
                      variant="ghost"
                      onClick={() => {
                        setForm(empty);
                        setSent(false);
                      }}
                    >
                      New request
                    </MagneticButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
