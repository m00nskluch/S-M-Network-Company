'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from 'framer-motion';
import {
  ArrowRight,
  Globe,
  Smartphone,
  ShoppingBag,
  Users,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Clock,
  X,
  Send,
  Loader2,
  Sparkles,
  ChevronRight,
  Heart,
} from 'lucide-react';

import { GlassSurface, SpotlightCard } from './components/GlassSurface';
import { MagneticButton } from './components/MagneticButton';
import { SectionReveal, StaggerReveal, StaggerItem } from './components/SectionReveal';

/* ─── Mock Server Action ─────────────────────────────────────── */
async function sendLeadEmail(data: {
  name: string;
  businessName: string;
  whatsapp: string;
}) {
  await new Promise((r) => setTimeout(r, 1500));
  console.log('Lead submitted to S&M Network Company:', data);
  return { success: true };
}

/* ─── Shared transition presets ─────────────────────────────── */
const liquid = { ease: [0.16, 1, 0.3, 1] as const, duration: 0.45 };
const spring = {
  type: 'spring' as const,
  stiffness: 360,
  damping: 26,
  mass: 0.8,
};

/* ─── Word-stagger headline component ───────────────────────── */
function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const prefersReduced = useReducedMotion();
  const words = text.split(' ');

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.28em]"
          initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ ...liquid, delay: 0.35 + i * 0.038 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Animated count-up for CLP total ──────────────────────── */
function AnimatedNumber({ value }: { value: number }) {
  const prefersReduced = useReducedMotion();
  const springVal = useSpring(value, { stiffness: 180, damping: 18 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    springVal.set(value);
  }, [value, springVal]);

  useEffect(() => {
    const unsub = springVal.on('change', (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [springVal]);

  if (prefersReduced) return <>{value.toLocaleString('es-CL')}</>;
  return <>{display.toLocaleString('es-CL')}</>;
}

/* ─── Santiago Time Capsule ─────────────────────────────────── */
function TimeCapsule({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] backdrop-blur-md">
      <Clock className="w-3 h-3 text-[#2FE6A6] shrink-0" />
      <span className="font-mono text-[10px] font-bold tabular-nums text-[rgba(243,245,244,0.75)] tracking-wider">
        {time}
      </span>
      <span className="text-[9px] text-[rgba(243,245,244,0.45)] font-mono">Santiago CL</span>
    </div>
  );
}

/* ─── Scroll Progress Bar ───────────────────────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="nav-progress"
      style={{ scaleX, width: '100%' }}
    />
  );
}

/* ─── Floating Navbar ───────────────────────────────────────── */
function FloatingNav({ santiagoTime }: { santiagoTime: string }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 48));

  const navLinks = ['Servicios', 'Proceso', 'Nosotros', 'Contacto'];

  return (
    <motion.nav
      initial={prefersReduced ? {} : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...liquid, delay: 0.1 }}
      className={`fixed top-4 left-4 right-4 max-w-6xl mx-auto z-50 rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between transition-all duration-500 will-change-transform ${
        scrolled
          ? 'glass-surface glass-surface-strong shadow-[0_12px_48px_rgba(0,0,0,0.55)]'
          : 'glass-surface'
      }`}
      style={{ overflow: 'visible' }}
    >
      {/* Progress bar */}
      <ScrollProgressBar />

      {/* Logo */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#2FE6A6] to-[#4A7CFB] flex items-center justify-center shadow-sm">
          <span className="font-mono text-[9px] font-black text-[#0B0F14] tracking-tight leading-none">
            S&M
          </span>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#2FE6A6] border-2 border-[#0B0F14] animate-pulse" />
        </div>
        <div className="hidden sm:block leading-none">
          <span className="block text-xs font-black text-[#F3F5F4] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            S&M Network
          </span>
          <span className="block text-[7px] font-mono font-bold text-[#2FE6A6] uppercase tracking-[0.15em]">
            Company
          </span>
        </div>
      </div>

      {/* Center nav links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="relative text-[11px] font-bold text-[rgba(243,245,244,0.6)] uppercase tracking-wider hover:text-[#F3F5F4] transition-colors duration-200 py-1 group"
          >
            {link}
            <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] rounded-full bg-[#2FE6A6] transition-[width] duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* Right: clock + CTA */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden lg:block">
          <TimeCapsule time={santiagoTime} />
        </div>
        <MagneticButton href="#contacto" variant="primary" className="px-5 py-2 text-[10px]">
          Contacto Directo
        </MagneticButton>
      </div>
    </motion.nav>
  );
}

/* ─── Process Sticky Scroll ─────────────────────────────────── */
function ProcesosSection() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // SVG path draw progress
  const pathLength = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
  const smoothPath = useSpring(pathLength, { stiffness: 60, damping: 18 });

  // Active step based on scroll
  const [activeStep, setActiveStep] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v < 0.3) setActiveStep(0);
    else if (v < 0.65) setActiveStep(1);
    else setActiveStep(2);
  });

  const steps = [
    {
      num: '01',
      label: 'Conexión',
      color: '#2FE6A6',
      desc: 'Andri escucha la historia y visión de tu negocio. Analizamos tus necesidades reales y definimos un presupuesto transparente sin sorpresas.',
      cy: 80,
    },
    {
      num: '02',
      label: 'Creación',
      color: '#4A7CFB',
      desc: 'Jeshua desarrolla código a medida en Next.js. Prototipamos la interfaz y te enviamos demos para revisar cada detalle contigo.',
      cy: 240,
    },
    {
      num: '03',
      label: 'Lanzamiento',
      color: '#2FE6A6',
      desc: 'Publicamos tu web en el dominio definitivo y capacitamos a tu equipo para autogestionar el sitio con facilidad.',
      cy: 400,
    },
  ];

  if (prefersReduced) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((step) => (
          <SpotlightCard key={step.num} className="p-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-xs font-black uppercase tracking-widest" style={{ color: step.color }}>
                Paso {step.num}
              </span>
              <span className="w-2 h-2 rounded-full" style={{ background: step.color }} />
            </div>
            <h4 className="font-display font-bold text-lg text-[#F3F5F4] mb-3">{step.num}. {step.label}</h4>
            <p className="text-sm text-[rgba(243,245,244,0.55)] leading-relaxed">{step.desc}</p>
          </SpotlightCard>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[280vh]">
      <div className="sticky top-24 h-screen flex items-start pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl mx-auto items-start">

          {/* Left: Step text panels */}
          <div className="space-y-6 lg:space-y-0 lg:h-[480px] lg:relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className={`lg:absolute lg:left-0 lg:right-0 p-6 rounded-2xl transition-all duration-500 ${
                  i === 0 ? 'lg:top-0' : i === 1 ? 'lg:top-[160px]' : 'lg:top-[320px]'
                }`}
                animate={{
                  opacity: activeStep === i ? 1 : 0.28,
                  scale: activeStep === i ? 1 : 0.96,
                  y: activeStep === i ? 0 : 8,
                }}
                transition={liquid}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-mono text-xs font-black uppercase tracking-widest"
                    style={{ color: step.color }}
                  >
                    Paso {step.num}
                  </span>
                  <div className="h-px flex-1 bg-[rgba(255,255,255,0.08)]" />
                </div>
                <h4 className="font-display font-bold text-2xl text-[#F3F5F4] mb-3">
                  {step.num}. {step.label}
                </h4>
                <p className="text-sm text-[rgba(243,245,244,0.6)] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: SVG Network drawing */}
          <div className="hidden lg:flex justify-center items-center">
            <GlassSurface variant="subtle" className="p-8 w-full max-w-[300px]">
              <svg
                viewBox="0 0 200 480"
                className="w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Path connecting nodes */}
                <motion.path
                  d="M100 80 C100 120, 100 160, 100 240 C100 280, 100 320, 100 400"
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="1 0"
                  style={{ pathLength: smoothPath }}
                />
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2FE6A6" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#4A7CFB" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#2FE6A6" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Nodes */}
                {steps.map((step, i) => (
                  <g key={step.num}>
                    <motion.circle
                      cx="100"
                      cy={step.cy}
                      r="28"
                      fill="rgba(255,255,255,0.06)"
                      stroke={activeStep >= i ? step.color : 'rgba(255,255,255,0.12)'}
                      strokeWidth="1.5"
                      animate={{
                        opacity: activeStep >= i ? 1 : 0.35,
                        scale: activeStep === i ? 1.08 : 1,
                      }}
                      transition={spring}
                    />
                    <motion.text
                      x="100"
                      y={step.cy + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="11"
                      fontFamily="var(--font-mono)"
                      fontWeight="700"
                      fill={activeStep >= i ? step.color : 'rgba(243,245,244,0.3)'}
                      animate={{ opacity: activeStep >= i ? 1 : 0.3 }}
                      transition={liquid}
                    >
                      {step.num}
                    </motion.text>
                    <motion.text
                      x="100"
                      y={step.cy + 44}
                      textAnchor="middle"
                      fontSize="9"
                      fontFamily="var(--font-body)"
                      fontWeight="600"
                      fill="rgba(243,245,244,0.5)"
                      animate={{ opacity: activeStep >= i ? 0.75 : 0.2 }}
                      transition={liquid}
                    >
                      {step.label}
                    </motion.text>
                  </g>
                ))}
              </svg>
            </GlassSurface>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Floating label input ──────────────────────────────────── */
function FloatInput({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="float-label-group">
      <input
        id={id}
        type={type}
        required={required}
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.05)] text-sm font-medium text-[#F3F5F4] placeholder-transparent transition-all duration-200 backdrop-blur-sm"
        aria-label={label}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

/* ─── Custom Cursor Halo (desktop only) ─────────────────────── */
function CursorHalo() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    // Only desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId: number;
    const move = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
        }
      });
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-screen"
      style={{
        background: 'rgba(47,230,166,0.55)',
        boxShadow: '0 0 16px 4px rgba(47,230,166,0.3)',
        filter: 'blur(1px)',
        transition: 'opacity 0.2s',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════ */
export default function Page() {
  const prefersReduced = useReducedMotion();

  /* ── Santiago Time ────────────────────────────────────────── */
  const [santiagoTime, setSantiagoTime] = useState('--:--:--');
  useEffect(() => {
    const tick = () => {
      try {
        setSantiagoTime(
          new Intl.DateTimeFormat('es-CL', {
            timeZone: 'America/Santiago',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false,
          }).format(new Date())
        );
      } catch {
        const n = new Date();
        setSantiagoTime(
          `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')}`
        );
      }
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  /* ── Dona Flor Menu ───────────────────────────────────────── */
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Empanadas Pino Horno', price: 2800, count: 1 },
    { id: 2, name: 'Arepa Reina Pepiada',  price: 4500, count: 1 },
    { id: 3, name: 'Arepa Pabellón',       price: 5000, count: 0 },
  ]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [springKeys, setSpringKeys] = useState<Record<number, number>>({});

  const handleIncrement = useCallback((id: number) => {
    setMenuItems((items) =>
      items.map((i) => (i.id === id ? { ...i, count: i.count + 1 } : i))
    );
    setSpringKeys((k) => ({ ...k, [id]: (k[id] ?? 0) + 1 }));
  }, []);

  const handleDecrement = useCallback((id: number) => {
    setMenuItems((items) =>
      items.map((i) => (i.id === id && i.count > 0 ? { ...i, count: i.count - 1 } : i))
    );
    setSpringKeys((k) => ({ ...k, [id]: (k[id] ?? 0) + 1 }));
  }, []);

  const total = menuItems.reduce((acc, i) => acc + i.price * i.count, 0);

  /* ── Contact Form ─────────────────────────────────────────── */
  const [nameVal, setNameVal]           = useState('');
  const [bizVal, setBizVal]             = useState('');
  const [waVal, setWaVal]               = useState('');
  const [formStatus, setFormStatus]     = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameVal || !bizVal || !waVal) { setFormStatus('error'); return; }
    setFormStatus('loading');
    try {
      const res = await sendLeadEmail({ name: nameVal, businessName: bizVal, whatsapp: waVal });
      setFormStatus(res.success ? 'success' : 'error');
    } catch { setFormStatus('error'); }
  };

  /* ── Grain overlay (static, no animation) ─────────────────── */

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: 'var(--sm-bg)', color: 'var(--sm-bone)' }}
    >
      {/* Grain texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Desktop cursor halo */}
      <CursorHalo />

      {/* ── Floating Nav ── */}
      <FloatingNav santiagoTime={santiagoTime} />

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto">

        {/* Liquid backdrop behind hero */}
        <div className="liquid-backdrop rounded-[3rem]" aria-hidden="true" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── Left: Value Prop ───────────────────────────── */}
          <motion.div
            className="lg:col-span-7"
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...liquid, delay: 0.15 }}
          >
            <GlassSurface variant="strong" className="p-8 lg:p-12 flex flex-col justify-between min-h-[480px]">
              <div className="space-y-7">
                {/* Badge chips */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'React / Next.js', color: '#2FE6A6' },
                    { label: 'Tailored Code',    color: '#4A7CFB' },
                    { label: 'Santiago, CL 🇨🇱', color: 'rgba(243,245,244,0.5)' },
                  ].map(({ label, color }) => (
                    <span
                      key={label}
                      className="font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border"
                      style={{
                        color,
                        borderColor: `${color}33`,
                        background: `${color}0D`,
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* Headline — word stagger */}
                <h1
                  className="text-4xl md:text-5xl lg:text-[52px] font-display font-bold text-[#F3F5F4] leading-[1.06]"
                  style={{ letterSpacing: '-0.035em' }}
                >
                  <WordReveal text="Impulsamos el crecimiento digital de tu PYME con" />
                  {' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2FE6A6] via-[#4A7CFB] to-[#2FE6A6]">
                    <WordReveal text="empatía y transparencia" />
                  </span>
                </h1>

                <motion.p
                  className="text-sm md:text-base text-[rgba(243,245,244,0.58)] leading-relaxed max-w-xl"
                  initial={prefersReduced ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...liquid, delay: 0.9 }}
                >
                  Desarrollamos soluciones web únicas y rápidas para restaurantes, comercios locales y distribuidoras en Santiago. Sin cobros mensuales amarrados, con presupuesto justo y comunicación cercana.
                </motion.p>
              </div>

              <motion.div
                className="pt-8 flex flex-col sm:flex-row gap-4"
                initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...liquid, delay: 1.05 }}
              >
                <MagneticButton href="#contacto" variant="primary" className="px-8 py-3.5 text-xs">
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  Agendar Asesoría Gratuita
                </MagneticButton>
                <MagneticButton href="#servicios" variant="secondary" className="px-7 py-3.5 text-xs">
                  Conocer Soluciones
                </MagneticButton>
              </motion.div>
            </GlassSurface>
          </motion.div>

          {/* ── Right: Dona Flor Device (Element Seña) ────── */}
          <motion.div
            className="lg:col-span-5"
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...liquid, delay: 0.25 }}
          >
            <GlassSurface variant="default" className="p-6 lg:p-8 flex flex-col items-center justify-center min-h-[480px]">

              {/* Ambient glow behind device */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 55% at 55% 45%, rgba(47,230,166,0.07) 0%, rgba(74,124,251,0.05) 50%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Phone frame */}
              <div
                className="border-chromatic relative w-full max-w-[285px] rounded-[38px] shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
                style={{ background: '#0D1117' }}
              >
                <div
                  className="rounded-[37px] overflow-hidden border border-[rgba(255,255,255,0.07)]"
                  style={{ background: '#0D1117' }}
                >
                  {/* Dynamic Island */}
                  <div className="relative bg-[#080B0F] pt-3 pb-2 px-5 flex items-center justify-between">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 flex items-center justify-center gap-2 px-3">
                      <span className="font-mono text-[8px] text-[rgba(243,245,244,0.55)] tabular-nums">{santiagoTime.slice(0,5)}</span>
                      <span className="w-1 h-1 rounded-full bg-[#2FE6A6] inline-block" />
                      <span className="font-mono text-[8px] text-[rgba(243,245,244,0.4)]">5G</span>
                    </div>
                    <div className="h-6" />
                  </div>

                  {/* App header */}
                  <div className="bg-[#0D1117] px-4 pt-2 pb-3 border-b border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[8px] font-black uppercase tracking-widest bg-[rgba(47,230,166,0.12)] text-[#2FE6A6] px-2 py-0.5 rounded border border-[rgba(47,230,166,0.12)]">
                        Demo Interactiva
                      </span>
                      <Heart className="w-3 h-3 text-[#FF6B57] fill-[#FF6B57] animate-pulse" />
                    </div>
                    <h3 className="text-sm font-bold text-[#F3F5F4] mt-1">Dona Flor Gourmet 🇨🇱</h3>
                    <p className="font-mono text-[9px] text-[rgba(243,245,244,0.4)]">Santiago Centro · Pedidos al WhatsApp</p>
                  </div>

                  {/* Menu items */}
                  <div className="px-3 py-2.5 space-y-2 max-h-[190px] overflow-y-auto" style={{ background: '#0B0E12' }}>
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-2.5 rounded-xl border border-[rgba(255,255,255,0.05)]"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        <div className="flex-1 pr-2">
                          <p className="text-[11px] font-bold text-[#F3F5F4] leading-tight">{item.name}</p>
                          <p className="font-mono text-[9px] font-bold text-[#2FE6A6] mt-0.5">
                            ${item.price.toLocaleString('es-CL')} CLP
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.06)] rounded-lg p-1 shrink-0">
                          <button
                            onClick={() => handleDecrement(item.id)}
                            className="w-5 h-5 rounded-md bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] text-[#F3F5F4] flex items-center justify-center text-[11px] font-bold transition-colors border border-[rgba(255,255,255,0.08)] focus-visible:ring-1 focus-visible:ring-[#2FE6A6]"
                            aria-label={`Restar ${item.name}`}
                          >
                            −
                          </button>
                          <motion.span
                            key={`${item.id}-${springKeys[item.id] ?? 0}`}
                            className="w-4 text-center font-mono text-[10px] font-black text-[#F3F5F4] tabular-nums"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.28, 0.9, 1] }}
                            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] as const }}
                          >
                            {item.count}
                          </motion.span>
                          <button
                            onClick={() => handleIncrement(item.id)}
                            className="w-5 h-5 rounded-md bg-[#2FE6A6] hover:bg-[#4ef5b8] text-[#0B0F14] flex items-center justify-center text-[11px] font-black transition-colors focus-visible:ring-1 focus-visible:ring-[#2FE6A6]"
                            aria-label={`Sumar ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Checkout bar */}
                  <div className="border-t border-[rgba(255,255,255,0.05)] px-4 py-3 relative" style={{ background: '#080B0F' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block font-mono text-[8px] text-[rgba(243,245,244,0.4)] uppercase tracking-wider">Total Pedido</span>
                        <span className="font-mono text-xs font-black text-[#2FE6A6] tabular-nums">
                          $<AnimatedNumber value={total} /> CLP
                        </span>
                      </div>
                      <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="px-3 py-1.5 rounded-lg font-mono text-[9px] font-black text-[#0B0F14] bg-[#2FE6A6] hover:bg-[#4ef5b8] transition-colors uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[#2FE6A6] focus-visible:ring-offset-1 focus-visible:ring-offset-[#080B0F]"
                      >
                        Enviar a WhatsApp
                      </button>
                    </div>

                    {/* Checkout summary sheet */}
                    <AnimatePresence>
                      {isCheckoutOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 14 }}
                          transition={{ duration: 0.26, ease: 'easeOut' as const }}
                          className="absolute inset-0 z-40 p-4 flex flex-col justify-between border-t border-[rgba(255,255,255,0.05)]"
                          style={{ background: '#080B0F', borderRadius: 'inherit' }}
                        >
                          <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.06)] pb-2">
                            <span className="font-mono text-[9px] font-black text-[#2FE6A6] uppercase tracking-wider">Resumen Pedido</span>
                            <button
                              onClick={() => setIsCheckoutOpen(false)}
                              className="text-[rgba(243,245,244,0.4)] hover:text-[#F3F5F4] transition-colors focus-visible:ring-1 focus-visible:ring-[#2FE6A6] rounded"
                              aria-label="Cerrar resumen"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="my-3 space-y-2">
                            <p className="text-[10px] font-semibold text-[#F3F5F4]">Mensaje para WhatsApp:</p>
                            <p className="font-mono text-[8.5px] text-[rgba(243,245,244,0.45)] bg-[rgba(255,255,255,0.03)] p-2.5 rounded-lg border border-[rgba(255,255,255,0.06)] leading-relaxed">
                              &ldquo;Hola Dona Flor Gourmet, quisiera pedir:{' '}
                              {menuItems.filter((i) => i.count > 0).map((i) => `${i.count}x ${i.name}`).join(', ') || '1x Empanadas'}.{' '}
                              Total: ${total.toLocaleString('es-CL')} CLP&rdquo;
                            </p>
                          </div>
                          <button
                            onClick={() => { alert('¡Redireccionando al WhatsApp comercial!'); setIsCheckoutOpen(false); }}
                            className="w-full py-2 bg-[#2FE6A6] text-[#0B0F14] font-mono font-black text-[9px] rounded-lg uppercase tracking-wider hover:bg-[#4ef5b8] transition-colors focus-visible:ring-2 focus-visible:ring-[#2FE6A6]"
                          >
                            Confirmar e Ir a WhatsApp
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </GlassSurface>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2: EL PROBLEMA vs. LA SOLUCIÓN
          ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Problem — fogged glass */}
          <StaggerItem>
            <div className="glass-surface glass-fogged rounded-3xl p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
              <div className="crack-overlay" aria-hidden="true" />
              <div className="space-y-5 relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-[rgba(255,107,87,0.1)] border border-[rgba(255,107,87,0.15)] flex items-center justify-center text-[#FF6B57]">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#F3F5F4] mb-2">El Problema de las PYMEs</h3>
                  <p className="text-sm text-[rgba(243,245,244,0.48)] leading-relaxed">
                    Agencias tradicionales que cobran mensualidades excesivas, o sitios prefabricados lentos, vulnerables y sin optimización para ventas locales en Santiago.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.05)] font-mono text-[9px] font-bold uppercase tracking-wider text-[rgba(243,245,244,0.3)]">
                Sitios lentos · Mensualidades altas · Enredos técnicos
              </div>
            </div>
          </StaggerItem>

          {/* Solution — clean glass + active specular */}
          <StaggerItem>
            <SpotlightCard className="p-8 flex flex-col justify-between min-h-[300px]">
              <div className="space-y-5 relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-[rgba(47,230,166,0.1)] border border-[rgba(47,230,166,0.18)] flex items-center justify-center text-[#2FE6A6]">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#F3F5F4] mb-2">La Solución S&M</h3>
                  <p className="text-sm text-[rgba(243,245,244,0.58)] leading-relaxed">
                    Presupuesto justo de un único pago inicial, código estático ultrarrápido en Next.js, catálogos interactivos que envían pedidos directo a tu WhatsApp.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[rgba(47,230,166,0.15)] font-mono text-[9px] font-bold uppercase tracking-wider text-[#2FE6A6]">
                Un único pago · Código propio · Conexión directa
              </div>
            </SpotlightCard>
          </StaggerItem>
        </StaggerReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3: SERVICIOS (Bento)
          ══════════════════════════════════════════════════════ */}
      <section id="servicios" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <SectionReveal className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-widest text-[#4A7CFB] border border-[rgba(74,124,251,0.2)] bg-[rgba(74,124,251,0.08)]">
            <Sparkles className="w-3 h-3" />
            Catálogo de Soluciones
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F3F5F4]">
            Servicios Digitales para PYMEs
          </h2>
        </SectionReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Globe className="w-6 h-6" />,
              accent: '#2FE6A6',
              title: 'Páginas Web para PYMEs',
              desc: 'Plataformas optimizadas para Google y móviles. Atraen clientes de tu zona geográfica en Santiago de forma fluida y profesional.',
              badge: 'Velocidad + SEO Local',
            },
            {
              icon: <Smartphone className="w-6 h-6" />,
              accent: '#4A7CFB',
              title: 'Menús y Catálogos Digitales',
              desc: 'Catálogos sin comisiones de terceros. Recibe solicitudes detalladas con montos CLP listos para procesar en tu WhatsApp.',
              badge: 'Precios CLP + WhatsApp',
            },
            {
              icon: <ShoppingBag className="w-6 h-6" />,
              accent: '#2FE6A6',
              title: 'Distribución y Venta Online',
              desc: 'Sistemas simples para distribuidoras y locales. Recopilación ágil de leads y catálogo de inventarios para clientes recurrentes.',
              badge: 'Automatización de Ventas',
            },
          ].map((service) => (
            <StaggerItem key={service.title}>
              <SpotlightCard className="p-8 flex flex-col justify-between min-h-[340px]">
                <div className="space-y-5 relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-2xl border flex items-center justify-center"
                    style={{
                      color: service.accent,
                      borderColor: `${service.accent}22`,
                      background: `${service.accent}0F`,
                    }}
                    whileHover={prefersReduced ? {} : { scale: 1.1, rotate: 4 }}
                    transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] as const }}
                  >
                    {service.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#F3F5F4] mb-2">{service.title}</h3>
                    <p className="text-sm text-[rgba(243,245,244,0.55)] leading-relaxed">{service.desc}</p>
                  </div>
                </div>
                <div className="pt-5 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between relative z-10">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider" style={{ color: service.accent }}>
                    {service.badge}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[rgba(243,245,244,0.3)]" />
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4: PROCESO (Sticky Scroll Storytelling)
          ══════════════════════════════════════════════════════ */}
      <section id="proceso" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-widest text-[#2FE6A6] border border-[rgba(47,230,166,0.18)] bg-[rgba(47,230,166,0.07)]">
            <Compass className="w-3 h-3" />
            Metodología Ágil
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F3F5F4]">
            Proceso: Conexión → Creación → Lanzamiento
          </h2>
          <p className="text-sm text-[rgba(243,245,244,0.45)]">
            Desplázate para ver cómo construimos tu red digital.
          </p>
        </SectionReveal>

        <ProcesosSection />
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5: QUIÉNES SOMOS
          ══════════════════════════════════════════════════════ */}
      <section id="nosotros" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <SectionReveal className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-widest text-[#2FE6A6] border border-[rgba(47,230,166,0.18)] bg-[rgba(47,230,166,0.07)]">
            <Users className="w-3 h-3" />
            Socios Estratégicos
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#F3F5F4]">El Equipo Detrás de S&M</h2>
        </SectionReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              initials: 'AM',
              name: 'Andri Manrrique',
              role: 'Liderazgo Comercial & Gestión',
              desc: 'Enfocado en relaciones comerciales empáticas, atención personalizada y presupuestos realistas sin sobrecostos para PYMEs.',
              accent: '#2FE6A6',
            },
            {
              initials: 'JU',
              name: 'Jeshua Useche',
              role: 'Desarrollo Fullstack & UI/UX',
              desc: 'Transforma los requerimientos del cliente en código limpio, rápido y escalable en Next.js y React con estándares UI/UX modernos.',
              accent: '#4A7CFB',
            },
          ].map((member) => (
            <StaggerItem key={member.name}>
              <SpotlightCard className="p-8 flex flex-col sm:flex-row items-start gap-6">
                <motion.div
                  className="border-chromatic shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-lg text-[#F3F5F4] relative z-10"
                  style={{
                    background: `${member.accent}18`,
                    boxShadow: `0 0 20px ${member.accent}22`,
                  }}
                  whileHover={prefersReduced ? {} : { scale: 1.08, rotate: -3 }}
                  transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] as const }}
                >
                  <span style={{ color: member.accent }}>{member.initials}</span>
                </motion.div>
                <div className="space-y-2 relative z-10">
                  <div>
                    <h4 className="font-display font-bold text-base text-[#F3F5F4]">{member.name}</h4>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-wider mt-0.5" style={{ color: member.accent }}>
                      {member.role}
                    </p>
                  </div>
                  <p className="text-sm text-[rgba(243,245,244,0.52)] leading-relaxed">{member.desc}</p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6: CONTACTO
          ══════════════════════════════════════════════════════ */}
      <section id="contacto" className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
        <SectionReveal>
          <GlassSurface variant="strong" className="p-8 lg:p-12 relative overflow-hidden">
            {/* Radial backlight */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(47,230,166,0.09) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            <div className="text-center space-y-3 mb-10 relative z-10">
              <h3 className="font-display font-bold text-2xl md:text-3xl text-[#F3F5F4] leading-tight">
                ¿Listo para darle a tu negocio la visibilidad que merece?
              </h3>
              <p className="text-sm text-[rgba(243,245,244,0.5)]">
                Completa el formulario y nos contactaremos a tu WhatsApp para coordinar tu propuesta.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={liquid}
                  className="relative z-10 text-center space-y-4 py-8"
                >
                  <motion.div
                    initial={prefersReduced ? {} : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ ...spring, delay: 0.1 }}
                    className="w-14 h-14 bg-[rgba(47,230,166,0.12)] rounded-full flex items-center justify-center mx-auto border border-[rgba(47,230,166,0.2)] text-[#2FE6A6]"
                  >
                    <CheckCircle2 className="w-7 h-7" />
                  </motion.div>
                  <h4 className="font-display font-bold text-lg text-[#F3F5F4]">¡Mensaje Enviado con Éxito!</h4>
                  <p className="text-sm text-[rgba(47,230,166,0.7)] leading-relaxed">
                    Muchas gracias por escribirnos. Nuestro equipo se pondrá en contacto a tu WhatsApp para tu asesoría gratuita.
                  </p>
                </motion.div>
              ) : (
                <form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5 relative z-10"
                >
                  <FloatInput
                    id="name"
                    label="Nombre Completo"
                    placeholder=" "
                    value={nameVal}
                    onChange={setNameVal}
                    required
                  />
                  <FloatInput
                    id="businessName"
                    label="Nombre del Negocio"
                    placeholder=" "
                    value={bizVal}
                    onChange={setBizVal}
                    required
                  />
                  <FloatInput
                    id="whatsapp"
                    label="numero de whatsapp"
                    type="tel"
                    placeholder=" "
                    value={waVal}
                    onChange={setWaVal}
                    required
                  />

                  {formStatus === 'error' && (
                    <p className="text-xs text-[#FF6B57] font-bold bg-[rgba(255,107,87,0.08)] p-3 rounded-xl border border-[rgba(255,107,87,0.15)]">
                      Por favor rellena todos los campos correctamente.
                    </p>
                  )}

                  <MagneticButton
                    type="submit"
                    variant="primary"
                    disabled={formStatus === 'loading'}
                    className="w-full py-4 text-xs"
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Enviar Mensaje
                      </>
                    )}
                  </MagneticButton>
                </form>
              )}
            </AnimatePresence>
          </GlassSurface>
        </SectionReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════ */}
      <footer className="border-t border-[rgba(255,255,255,0.06)] mt-4">
        {/* Marquee taglines */}
        <div className="overflow-hidden py-3 border-b border-[rgba(255,255,255,0.04)]">
          <div className="marquee-track">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 pr-8 font-mono text-[9px] font-bold uppercase tracking-widest text-[rgba(243,245,244,0.25)] shrink-0">
                <span>Sin cobros mensuales</span>
                <span className="text-[#2FE6A6]">·</span>
                <span>Código propio</span>
                <span className="text-[#2FE6A6]">·</span>
                <span>Conexión directa</span>
                <span className="text-[#4A7CFB]">·</span>
                <span>Next.js + WhatsApp</span>
                <span className="text-[#4A7CFB]">·</span>
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2FE6A6] to-[#4A7CFB] flex items-center justify-center">
              <span className="font-mono text-[9px] font-black text-[#0B0F14]">S&M</span>
            </div>
            <div>
              <span className="block font-display font-bold text-xs text-[#F3F5F4] leading-none">S&M Network</span>
              <span className="block font-mono text-[7px] font-bold text-[#2FE6A6] uppercase tracking-[0.15em]">Company</span>
            </div>
          </div>

          <p className="font-mono text-[9px] text-[rgba(243,245,244,0.3)] uppercase tracking-wider text-center">
            © {new Date().getFullYear()} S&M Network Company. Todos los derechos reservados. Santiago, Chile.
          </p>

          <div className="flex items-center gap-2 font-mono text-[9px] text-[rgba(243,245,244,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2FE6A6] inline-block animate-pulse" />
            Sin cobros mensuales. Código propio.
          </div>
        </div>
      </footer>
    </div>
  );
}
