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

import { GlassSurface, SpotlightCard, StatusBadge } from './components/GlassSurface';
import { MagneticButton } from './components/MagneticButton';
import { SectionReveal, StaggerReveal, StaggerItem } from './components/SectionReveal';
import { LogoIsotype } from './components/LogoIsotype';

/* ─── Mock server action ─────────────────────────────────────── */
async function sendLeadEmail(data: {
  name: string;
  businessName: string;
  whatsapp: string;
}) {
  await new Promise((r) => setTimeout(r, 1500));
  console.log('Lead submitted to S&M Network Company:', data);
  return { success: true };
}

/* ─── Motion presets ─────────────────────────────────────────── */
const liquid = { ease: [0.16, 1, 0.3, 1] as const, duration: 0.45 };
const spring = { type: 'spring' as const, stiffness: 360, damping: 26, mass: 0.8 };

/* ─── Word-stagger headline ──────────────────────────────────── */
function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const prefersReduced = useReducedMotion();
  const words = text.split(' ');
  if (prefersReduced) return <span className={className}>{text}</span>;
  return (
    <span className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.26em]"
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ ...liquid, delay: 0.3 + i * 0.036 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Animated CLP count-up ──────────────────────────────────── */
function AnimatedNumber({ value }: { value: number }) {
  const prefersReduced = useReducedMotion();
  const springVal = useSpring(value, { stiffness: 180, damping: 18 });
  const [display, setDisplay] = useState(value);

  useEffect(() => { springVal.set(value); }, [value, springVal]);
  useEffect(() => {
    const unsub = springVal.on('change', (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [springVal]);

  if (prefersReduced) return <>{value.toLocaleString('es-CL')}</>;
  return <>{display.toLocaleString('es-CL')}</>;
}

/* ─── Santiago Time Capsule (reused in nav + hero) ───────────── */
function TimeCapsule({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(112,161,215,0.28)] bg-[rgba(255,255,255,0.55)] backdrop-blur-sm shadow-[var(--sm-shadow-xs)]">
      <Clock className="w-3 h-3 shrink-0" style={{ color: 'var(--sm-sky)' }} />
      <span className="font-mono text-[10px] font-bold tabular-nums" style={{ color: 'var(--sm-slate)' }}>
        {time}
      </span>
      <span className="font-mono text-[9px]" style={{ color: 'var(--sm-slate-mid)' }}>Santiago CL</span>
    </div>
  );
}

/* ─── Scroll progress bar ────────────────────────────────────── */
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

/* ─── Floating Navbar ────────────────────────────────────────── */
function FloatingNav({ santiagoTime }: { santiagoTime: string }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 48));

  return (
    <motion.nav
      initial={prefersReduced ? {} : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...liquid, delay: 0.1 }}
      className={`fixed top-4 left-4 right-4 max-w-6xl mx-auto z-50 rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between transition-all duration-500 will-change-transform ${
        scrolled ? 'glass-surface glass-surface-strong' : 'glass-surface'
      }`}
      style={{ overflow: 'visible' }}
    >
      <ScrollProgressBar />

      {/* Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <div
          className="relative px-2 py-1 rounded-xl flex items-center justify-center shadow-sm border transition-transform duration-300 hover:scale-105"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            borderColor: 'rgba(112, 161, 215, 0.35)',
            boxShadow: '0 2px 10px rgba(112, 161, 215, 0.15)',
          }}
        >
          <LogoIsotype className="w-8 h-5" />
          <span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-white animate-pulse"
            style={{ background: 'var(--sm-sage)' }}
          />
        </div>
        <div className="hidden sm:block leading-none">
          <span className="block text-xs font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--sm-slate)' }}>
            S&M Network
          </span>
          <span className="block font-mono text-[7px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--sm-sky)' }}>
            Company
          </span>
        </div>
      </div>

      {/* Center links */}
      <div className="hidden md:flex items-center gap-6">
        {['Servicios', 'Proceso', 'Nosotros', 'Contacto'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="relative text-[11px] font-medium uppercase tracking-wider py-1 group transition-colors duration-200"
            style={{ color: 'var(--sm-slate-mid)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sm-slate)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--sm-slate-mid)')}
          >
            {link}
            <span
              className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full transition-[width] duration-300 w-0 group-hover:w-full"
              style={{ background: 'var(--sm-sky)' }}
            />
          </a>
        ))}
      </div>

      {/* Right */}
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

/* ─── Proceso Sticky Scroll ──────────────────────────────────── */
function ProcesosSection() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
  const smoothPath = useSpring(pathLength, { stiffness: 60, damping: 18 });

  const [activeStep, setActiveStep] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveStep(v < 0.3 ? 0 : v < 0.65 ? 1 : 2);
  });

  const steps = [
    {
      num: '01', label: 'Conexión', cy: 80,
      desc: 'Andri escucha la historia y visión de tu negocio. Analizamos tus necesidades reales y definimos un presupuesto transparente sin sorpresas.',
    },
    {
      num: '02', label: 'Creación', cy: 240,
      desc: 'Jeshua desarrolla código a medida en Next.js. Prototipamos la interfaz y te enviamos demos para revisar cada detalle contigo.',
    },
    {
      num: '03', label: 'Lanzamiento', cy: 400,
      desc: 'Publicamos tu web en el dominio definitivo y capacitamos a tu equipo para autogestionar el sitio con facilidad.',
    },
  ];

  if (prefersReduced) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((step) => (
          <SpotlightCard key={step.num} className="p-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--sm-sky)' }}>
                Paso {step.num}
              </span>
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--sm-sky)' }} />
            </div>
            <h4 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--sm-slate)' }}>
              {step.num}. {step.label}
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>{step.desc}</p>
          </SpotlightCard>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[280vh]">
      <div className="sticky top-24 h-screen flex items-start pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl mx-auto items-start">

          {/* Left text panels */}
          <div className="space-y-6 lg:space-y-0 lg:h-[480px] lg:relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className={`lg:absolute lg:left-0 lg:right-0 p-6 rounded-2xl ${
                  i === 0 ? 'lg:top-0' : i === 1 ? 'lg:top-[160px]' : 'lg:top-[320px]'
                }`}
                animate={{
                  opacity: activeStep === i ? 1 : 0.28,
                  scale: activeStep === i ? 1 : 0.97,
                  y: activeStep === i ? 0 : 6,
                }}
                transition={liquid}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--sm-sky)' }}>
                    Paso {step.num}
                  </span>
                  <div className="h-px flex-1" style={{ background: 'rgba(112,161,215,0.2)' }} />
                </div>
                <h4 className="font-display font-bold text-2xl mb-3" style={{ color: 'var(--sm-slate)' }}>
                  {step.num}. {step.label}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: SVG network */}
          <div className="hidden lg:flex justify-center items-center">
            <GlassSurface variant="subtle" className="p-8 w-full max-w-[280px]">
              <svg viewBox="0 0 200 480" className="w-full" fill="none">
                <motion.path
                  d="M100 80 C100 120, 100 160, 100 240 C100 280, 100 320, 100 400"
                  stroke="url(#lineGradLight)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="1 0"
                  style={{ pathLength: smoothPath }}
                />
                <defs>
                  <linearGradient id="lineGradLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#70A1D7" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#8EC5FC" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#70A1D7" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {steps.map((step, i) => (
                  <g key={step.num}>
                    <motion.circle
                      cx="100" cy={step.cy} r="28"
                      fill="rgba(255,255,255,0.6)"
                      stroke={activeStep >= i ? '#70A1D7' : 'rgba(112,161,215,0.2)'}
                      strokeWidth="1.5"
                      animate={{
                        opacity: activeStep >= i ? 1 : 0.35,
                        scale: activeStep === i ? 1.08 : 1,
                      }}
                      transition={spring}
                    />
                    <motion.text
                      x="100" y={step.cy + 1}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="11" fontFamily="var(--font-mono)" fontWeight="700"
                      fill={activeStep >= i ? '#1E293B' : 'rgba(30,41,59,0.3)'}
                      animate={{ opacity: activeStep >= i ? 1 : 0.3 }}
                      transition={liquid}
                    >
                      {step.num}
                    </motion.text>
                    <motion.text
                      x="100" y={step.cy + 44}
                      textAnchor="middle" fontSize="9"
                      fontFamily="var(--font-body)" fontWeight="600"
                      fill="rgba(30,41,59,0.45)"
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

/* ─── Floating label input ───────────────────────────────────── */
function FloatInput({
  id, label, type = 'text', value, onChange, required,
}: {
  id: string; label: string; type?: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div className="float-label-group">
      <input
        id={id} type={type} required={required} placeholder=" "
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 backdrop-blur-sm"
        style={{
          border: '1px solid rgba(112,161,215,0.3)',
          background: 'rgba(255,255,255,0.62)',
          color: 'var(--sm-slate)',
        }}
        aria-label={label}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

/* ─── Desktop cursor halo ────────────────────────────────────── */
function CursorHalo() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

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
    return () => { window.removeEventListener('mousemove', move); if (rafId) cancelAnimationFrame(rafId); };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999]"
      style={{
        background: 'rgba(142,197,252,0.55)',
        boxShadow: '0 0 14px 3px rgba(112,161,215,0.25)',
        filter: 'blur(1px)',
        mixBlendMode: 'multiply',    /* multiply on light bg, not screen */
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

  /* ── Santiago Time ───────────────────────────────────────── */
  const [santiagoTime, setSantiagoTime] = useState('--:--:--');
  useEffect(() => {
    const tick = () => {
      try {
        setSantiagoTime(new Intl.DateTimeFormat('es-CL', {
          timeZone: 'America/Santiago',
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
        }).format(new Date()));
      } catch {
        const n = new Date();
        setSantiagoTime(`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')}`);
      }
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  /* ── Dona Flor Menu ─────────────────────────────────────── */
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Empanadas Pino Horno', price: 2800, count: 1 },
    { id: 2, name: 'Arepa Reina Pepiada',  price: 4500, count: 1 },
    { id: 3, name: 'Arepa Pabellón',       price: 5000, count: 0 },
  ]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [springKeys, setSpringKeys] = useState<Record<number, number>>({});

  const handleIncrement = useCallback((id: number) => {
    setMenuItems((items) => items.map((i) => (i.id === id ? { ...i, count: i.count + 1 } : i)));
    setSpringKeys((k) => ({ ...k, [id]: (k[id] ?? 0) + 1 }));
  }, []);

  const handleDecrement = useCallback((id: number) => {
    setMenuItems((items) => items.map((i) => (i.id === id && i.count > 0 ? { ...i, count: i.count - 1 } : i)));
    setSpringKeys((k) => ({ ...k, [id]: (k[id] ?? 0) + 1 }));
  }, []);

  const total = menuItems.reduce((acc, i) => acc + i.price * i.count, 0);

  /* ── Contact Form ────────────────────────────────────────── */
  const [nameVal, setNameVal]       = useState('');
  const [bizVal, setBizVal]         = useState('');
  const [waVal, setWaVal]           = useState('');
  const [formStatus, setFormStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameVal || !bizVal || !waVal) { setFormStatus('error'); return; }
    setFormStatus('loading');
    try {
      const res = await sendLeadEmail({ name: nameVal, businessName: bizVal, whatsapp: waVal });
      setFormStatus(res.success ? 'success' : 'error');
    } catch { setFormStatus('error'); }
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--sm-bg)', color: 'var(--sm-slate)' }}>

      {/* Desktop cursor halo (mix-blend-mode: multiply) */}
      <CursorHalo />

      {/* ── Floating Nav ── */}
      <FloatingNav santiagoTime={santiagoTime} />

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="liquid-backdrop rounded-[3rem]" aria-hidden="true" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── Left: Value Prop ─────────────────────────── */}
          <motion.div
            className="lg:col-span-7"
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...liquid, delay: 0.15 }}
          >
            <GlassSurface variant="strong" className="p-8 lg:p-12 flex flex-col justify-between min-h-[480px]">
              <div className="space-y-7">
                {/* Badge chips — pastel bg + slate text, AA verified */}
                <div className="flex flex-wrap gap-2">
                  <StatusBadge color="sky" dot>React / Next.js</StatusBadge>
                  <StatusBadge color="lavender">Tailored Code</StatusBadge>
                  <StatusBadge color="neutral">Santiago, CL 🇨🇱</StatusBadge>
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.07]"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--sm-slate)', letterSpacing: '-0.03em' }}
                >
                  <WordReveal text="Impulsamos el crecimiento digital de tu PYME con" />
                  {' '}
                  <span className="bg-clip-text text-transparent" style={{
                    backgroundImage: 'linear-gradient(135deg, var(--sm-sky) 0%, var(--sm-sky-light) 50%, var(--sm-lavender) 100%)',
                  }}>
                    <WordReveal text="empatía y transparencia" />
                  </span>
                </h1>

                <motion.p
                  className="text-sm md:text-base leading-relaxed max-w-xl"
                  style={{ color: 'var(--sm-slate-mid)' }}
                  initial={prefersReduced ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...liquid, delay: 0.95 }}
                >
                  Desarrollamos soluciones web únicas y rápidas para restaurantes, comercios locales y distribuidoras en Santiago. Sin cobros mensuales amarrados, con presupuesto justo y comunicación cercana.
                </motion.p>
              </div>

              <motion.div
                className="pt-8 flex flex-col sm:flex-row gap-4"
                initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...liquid, delay: 1.1 }}
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

          {/* ── Right: Dona Flor Device (Element Seña) ──── */}
          <motion.div
            className="lg:col-span-5"
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...liquid, delay: 0.28 }}
          >
            <GlassSurface variant="default" className="p-6 lg:p-8 flex flex-col items-center justify-center min-h-[480px]">

              {/* Lavender glow behind device */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
                style={{
                  background: 'radial-gradient(ellipse 60% 55% at 55% 45%, rgba(224,195,252,0.16) 0%, rgba(142,197,252,0.08) 55%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Phone frame — sky+lavender chromatic border */}
              <div
                className="border-sky-lavender relative w-full max-w-[280px] rounded-[36px] shadow-[0_24px_60px_rgba(112,161,215,0.22),0_8px_20px_rgba(30,41,59,0.1)]"
                style={{ background: 'rgba(255,255,255,0.9)' }}
              >
                <div className="rounded-[35px] overflow-hidden border border-[rgba(112,161,215,0.18)]">

                  {/* Dynamic Island / notch capsule */}
                  <div className="bg-white pt-2.5 pb-2 px-5 flex items-center justify-between border-b border-[rgba(112,161,215,0.08)]">
                    <div
                      className="absolute top-2 left-1/2 -translate-x-1/2 h-6 px-4 rounded-full z-20 flex items-center gap-2 shadow-sm"
                      style={{ background: 'rgba(248,249,250,0.95)', border: '1px solid rgba(112,161,215,0.2)' }}
                    >
                      <span className="font-mono text-[8px] font-bold tabular-nums" style={{ color: 'var(--sm-slate)' }}>
                        {santiagoTime.slice(0, 5)}
                      </span>
                      <span className="w-1 h-1 rounded-full" style={{ background: 'var(--sm-sage)' }} />
                      <span className="font-mono text-[8px]" style={{ color: 'var(--sm-slate-mid)' }}>5G</span>
                    </div>
                    <div className="h-6" />
                  </div>

                  {/* App header */}
                  <div className="px-4 pt-2 pb-3 border-b border-[rgba(112,161,215,0.08)]" style={{ background: 'white' }}>
                    <div className="flex items-center justify-between mb-1">
                      <StatusBadge color="sage" dot>Demo Interactiva</StatusBadge>
                      <Heart className="w-3 h-3 fill-current animate-pulse" style={{ color: '#F87171' }} />
                    </div>
                    <h3 className="text-sm font-semibold mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--sm-slate)' }}>
                      Dona Flor Gourmet 🇨🇱
                    </h3>
                    <p className="font-mono text-[9px]" style={{ color: 'var(--sm-slate-mid)' }}>
                      Santiago Centro · Pedidos al WhatsApp
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="px-3 py-2.5 space-y-2 max-h-[190px] overflow-y-auto" style={{ background: '#F8F9FA' }}>
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-2.5 rounded-xl"
                        style={{ background: 'white', border: '1px solid rgba(112,161,215,0.12)' }}
                      >
                        <div className="flex-1 pr-2">
                          <p className="text-[11px] font-semibold leading-tight" style={{ color: 'var(--sm-slate)' }}>
                            {item.name}
                          </p>
                          <p className="font-mono text-[9px] font-bold mt-0.5" style={{ color: 'var(--sm-sky)' }}>
                            ${item.price.toLocaleString('es-CL')} CLP
                          </p>
                        </div>
                        <div
                          className="flex items-center gap-1 rounded-lg p-1 shrink-0"
                          style={{ background: 'rgba(248,249,250,0.9)', border: '1px solid rgba(112,161,215,0.15)' }}
                        >
                          <button
                            onClick={() => handleDecrement(item.id)}
                            className="w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-bold transition-colors focus-visible:ring-1 focus-visible:ring-[#70A1D7]"
                            style={{ background: 'rgba(112,161,215,0.1)', color: 'var(--sm-slate)', border: '1px solid rgba(112,161,215,0.2)' }}
                            aria-label={`Restar ${item.name}`}
                          >
                            −
                          </button>
                          <motion.span
                            key={`${item.id}-${springKeys[item.id] ?? 0}`}
                            className="w-4 text-center font-mono text-[10px] font-black tabular-nums"
                            style={{ color: 'var(--sm-slate)' }}
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.28, 0.9, 1] }}
                            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] as const }}
                          >
                            {item.count}
                          </motion.span>
                          <button
                            onClick={() => handleIncrement(item.id)}
                            className="w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black transition-colors focus-visible:ring-1 focus-visible:ring-[#70A1D7]"
                            style={{ background: 'var(--sm-sky)', color: 'var(--sm-slate)' }}
                            aria-label={`Sumar ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Checkout bar */}
                  <div className="border-t border-[rgba(112,161,215,0.12)] px-4 py-3 relative" style={{ background: 'white' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block font-mono text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--sm-slate-mid)' }}>
                          Total Pedido
                        </span>
                        <span className="font-mono text-xs font-black tabular-nums" style={{ color: 'var(--sm-slate)' }}>
                          $<AnimatedNumber value={total} /> CLP
                        </span>
                      </div>
                      <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="px-3 py-1.5 rounded-lg font-mono text-[9px] font-black uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-[#70A1D7] focus-visible:ring-offset-1"
                        style={{ background: 'var(--sm-sky)', color: 'var(--sm-slate)' }}
                      >
                        Enviar a WhatsApp
                      </button>
                    </div>

                    {/* Checkout summary sheet */}
                    <AnimatePresence>
                      {isCheckoutOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ duration: 0.24, ease: 'easeOut' as const }}
                          className="absolute inset-0 z-40 p-4 flex flex-col justify-between"
                          style={{ background: 'rgba(255,255,255,0.97)', borderTop: '1px solid rgba(112,161,215,0.12)', borderRadius: 'inherit' }}
                        >
                          <div className="flex justify-between items-center pb-2" style={{ borderBottom: '1px solid rgba(112,161,215,0.12)' }}>
                            <StatusBadge color="sage">Resumen Pedido</StatusBadge>
                            <button
                              onClick={() => setIsCheckoutOpen(false)}
                              className="transition-colors rounded focus-visible:ring-1 focus-visible:ring-[#70A1D7]"
                              style={{ color: 'var(--sm-slate-mid)' }}
                              aria-label="Cerrar resumen"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="my-3 space-y-2">
                            <p className="text-[10px] font-semibold" style={{ color: 'var(--sm-slate)' }}>Mensaje para WhatsApp:</p>
                            <p className="font-mono text-[8px] leading-relaxed p-2.5 rounded-lg" style={{
                              color: 'var(--sm-slate-mid)',
                              background: 'rgba(248,249,250,0.9)',
                              border: '1px solid rgba(112,161,215,0.14)',
                            }}>
                              &ldquo;Hola Dona Flor Gourmet, quisiera pedir:{' '}
                              {menuItems.filter((i) => i.count > 0).map((i) => `${i.count}x ${i.name}`).join(', ') || '1x Empanadas'}.{' '}
                              Total: ${total.toLocaleString('es-CL')} CLP&rdquo;
                            </p>
                          </div>
                          <button
                            onClick={() => { alert('¡Redireccionando al WhatsApp comercial!'); setIsCheckoutOpen(false); }}
                            className="w-full py-2 rounded-lg font-mono font-black text-[9px] uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-[#70A1D7]"
                            style={{ background: 'var(--sm-sky)', color: 'var(--sm-slate)' }}
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

          {/* Problem — fogged / desaturated glass */}
          <StaggerItem>
            <div className="glass-surface glass-fogged rounded-3xl p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
              <div className="space-y-5 relative z-10">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center border"
                  style={{ background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.15)', color: '#DC2626' }}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--sm-slate)' }}>
                    El Problema de las PYMEs
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>
                    Agencias tradicionales que cobran mensualidades excesivas, o sitios prefabricados lentos, vulnerables y sin optimización para ventas locales en Santiago.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 font-mono text-[9px] font-bold uppercase tracking-wider" style={{ borderTop: '1px solid rgba(30,41,59,0.06)', color: 'rgba(30,41,59,0.38)' }}>
                Sitios lentos · Mensualidades altas · Enredos técnicos
              </div>
            </div>
          </StaggerItem>

          {/* Solution — clean glass + specular sweep active */}
          <StaggerItem>
            <SpotlightCard className="p-8 flex flex-col justify-between min-h-[300px]">
              <div className="space-y-5 relative z-10">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center border"
                  style={{ background: 'rgba(112,161,215,0.10)', borderColor: 'rgba(112,161,215,0.28)', color: 'var(--sm-sky)' }}
                >
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--sm-slate)' }}>
                    La Solución S&M
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>
                    Presupuesto justo de un único pago inicial, código estático ultrarrápido en Next.js, catálogos interactivos que envían pedidos directo a tu WhatsApp.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 font-mono text-[9px] font-bold uppercase tracking-wider" style={{ borderTop: '1px solid rgba(112,161,215,0.18)', color: 'var(--sm-sky)' }}>
                Un único pago · Código propio · Conexión directa
              </div>
            </SpotlightCard>
          </StaggerItem>
        </StaggerReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3: SERVICIOS — Bento
          ══════════════════════════════════════════════════════ */}
      <section id="servicios" className="py-20 px-4 md:px-8 max-w-7xl mx-auto" style={{ background: 'var(--sm-bg-alt)' }}>
        <SectionReveal className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <StatusBadge color="sky">
            <Sparkles className="w-3 h-3 inline-block mr-1" />
            Catálogo de Soluciones
          </StatusBadge>
          <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--sm-slate)' }}>
            Servicios Digitales para PYMEs
          </h2>
        </SectionReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Globe className="w-6 h-6" />, title: 'Páginas Web para PYMEs', desc: 'Plataformas optimizadas para Google y móviles. Atraen clientes de tu zona geográfica en Santiago de forma fluida y profesional.', badge: 'Velocidad + SEO Local' },
            { icon: <Smartphone className="w-6 h-6" />, title: 'Menús y Catálogos Digitales', desc: 'Catálogos sin comisiones de terceros. Recibe solicitudes detalladas con montos CLP listos para procesar en tu WhatsApp.', badge: 'Precios CLP + WhatsApp' },
            { icon: <ShoppingBag className="w-6 h-6" />, title: 'Distribución y Venta Online', desc: 'Sistemas simples para distribuidoras y locales. Recopilación ágil de leads y catálogo de inventarios para clientes recurrentes.', badge: 'Automatización de Ventas' },
          ].map((service) => (
            <StaggerItem key={service.title}>
              <SpotlightCard className="p-8 flex flex-col justify-between min-h-[340px]">
                <div className="space-y-5 relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-2xl border flex items-center justify-center"
                    style={{ color: 'var(--sm-sky)', borderColor: 'rgba(112,161,215,0.28)', background: 'rgba(112,161,215,0.08)' }}
                    whileHover={prefersReduced ? {} : { scale: 1.10, rotate: 4 }}
                    transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] as const }}
                  >
                    {service.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--sm-slate)' }}>
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>{service.desc}</p>
                  </div>
                </div>
                <div className="pt-5 flex items-center justify-between relative z-10" style={{ borderTop: '1px solid rgba(112,161,215,0.14)' }}>
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--sm-sky)' }}>
                    {service.badge}
                  </span>
                  <ChevronRight className="w-4 h-4" style={{ color: 'rgba(30,41,59,0.3)' }} />
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4: PROCESO — Sticky Scroll Storytelling
          ══════════════════════════════════════════════════════ */}
      <section id="proceso" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <StatusBadge color="sky">
            <Compass className="w-3 h-3 inline-block mr-1" />
            Metodología Ágil
          </StatusBadge>
          <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--sm-slate)' }}>
            Proceso: Conexión → Creación → Lanzamiento
          </h2>
          <p className="text-sm" style={{ color: 'var(--sm-slate-mid)' }}>
            Desplázate para ver cómo construimos tu red digital.
          </p>
        </SectionReveal>
        <ProcesosSection />
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5: QUIÉNES SOMOS
          ══════════════════════════════════════════════════════ */}
      <section id="nosotros" className="py-20 px-4 md:px-8 max-w-7xl mx-auto" style={{ background: 'var(--sm-bg-alt)' }}>
        <SectionReveal className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <StatusBadge color="sky">
            <Users className="w-3 h-3 inline-block mr-1" />
            Socios Estratégicos
          </StatusBadge>
          <h2 className="font-display font-bold text-3xl md:text-4xl" style={{ color: 'var(--sm-slate)' }}>
            El Equipo Detrás de S&M
          </h2>
        </SectionReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              initials: 'AM', name: 'Andri Manrrique',
              role: 'Liderazgo Comercial & Gestión',
              desc: 'Enfocado en relaciones comerciales empáticas, atención personalizada y presupuestos realistas sin sobrecostos para PYMEs.',
              badgeColor: 'sky' as const,
            },
            {
              initials: 'JU', name: 'Jeshua Useche',
              role: 'Desarrollo Fullstack & UI/UX',
              desc: 'Transforma los requerimientos del cliente en código limpio, rápido y escalable en Next.js y React con estándares UI/UX modernos.',
              badgeColor: 'lavender' as const,
            },
          ].map((member) => (
            <StaggerItem key={member.name}>
              <SpotlightCard className="p-8 flex flex-col sm:flex-row items-start gap-6">
                {/* Avatar — circular glass frame, sky border */}
                <motion.div
                  className="border-sky-lavender shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg relative z-10"
                  style={{
                    background: 'rgba(112,161,215,0.10)',
                    color: 'var(--sm-slate)',
                    fontFamily: 'var(--font-display)',
                  }}
                  whileHover={prefersReduced ? {} : { scale: 1.08, rotate: -3 }}
                  transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] as const }}
                >
                  {member.initials}
                </motion.div>
                <div className="space-y-2 relative z-10">
                  <div>
                    <h4 className="font-display font-bold text-base" style={{ color: 'var(--sm-slate)' }}>
                      {member.name}
                    </h4>
                    <StatusBadge color={member.badgeColor} className="mt-1.5">{member.role}</StatusBadge>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>{member.desc}</p>
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
            {/* Sky glow behind form */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[180px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(142,197,252,0.12) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="text-center space-y-3 mb-10 relative z-10">
              <StatusBadge color="sky" className="mb-3">Contacto Directo</StatusBadge>
              <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight" style={{ color: 'var(--sm-slate)' }}>
                ¿Listo para darle a tu negocio la visibilidad que merece?
              </h3>
              <p className="text-sm" style={{ color: 'var(--sm-slate-mid)' }}>
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
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto border"
                    style={{
                      background: 'rgba(112,161,215,0.10)',
                      borderColor: 'rgba(112,161,215,0.28)',
                      color: 'var(--sm-sky)',
                    }}
                  >
                    <CheckCircle2 className="w-7 h-7" />
                  </motion.div>
                  <h4 className="font-display font-bold text-lg" style={{ color: 'var(--sm-slate)' }}>
                    ¡Mensaje Enviado con Éxito!
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>
                    Muchas gracias por escribirnos. Nuestro equipo se pondrá en contacto a tu WhatsApp para tu asesoría gratuita.
                  </p>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <FloatInput id="name" label="Nombre Completo" value={nameVal} onChange={setNameVal} required />
                  <FloatInput id="businessName" label="Nombre del Negocio" value={bizVal} onChange={setBizVal} required />
                  <FloatInput id="whatsapp" label="numero de whatsapp" type="tel" value={waVal} onChange={setWaVal} required />

                  {formStatus === 'error' && (
                    <p className="text-xs font-semibold p-3 rounded-xl border"
                      style={{ color: '#DC2626', background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.15)' }}>
                      Por favor rellena todos los campos correctamente.
                    </p>
                  )}

                  <MagneticButton type="submit" variant="primary" disabled={formStatus === 'loading'} className="w-full py-4 text-xs">
                    {formStatus === 'loading' ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" />Procesando...</>
                    ) : (
                      <><Send className="w-3.5 h-3.5" />Enviar Mensaje</>
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
      <footer className="mt-4" style={{ borderTop: '1px solid rgba(112,161,215,0.14)' }}>
        {/* Marquee over sm-bg-alt */}
        <div className="overflow-hidden py-3" style={{ background: 'var(--sm-bg-alt)', borderBottom: '1px solid rgba(112,161,215,0.10)' }}>
          <div className="marquee-track">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-7 pr-7 font-mono text-[9px] font-bold uppercase tracking-widest shrink-0" style={{ color: 'rgba(30,41,59,0.35)' }}>
                <span>Sin cobros mensuales</span>
                <span style={{ color: 'var(--sm-sky)' }}>·</span>
                <span>Código propio</span>
                <span style={{ color: 'var(--sm-sky)' }}>·</span>
                <span>Conexión directa</span>
                <span style={{ color: 'var(--sm-lavender)' }}>·</span>
                <span>Next.js + WhatsApp</span>
                <span style={{ color: 'var(--sm-lavender)' }}>·</span>
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="px-2 py-1 rounded-xl flex items-center justify-center shadow-sm border"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                borderColor: 'rgba(112, 161, 215, 0.35)',
              }}
            >
              <LogoIsotype className="w-7 h-4.5" />
            </div>
            <div>
              <span className="block font-display font-bold text-xs leading-none" style={{ color: 'var(--sm-slate)' }}>S&M Network</span>
              <span className="block font-mono text-[7px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--sm-sky)' }}>Company</span>
            </div>
          </div>

          <p className="font-mono text-[9px] uppercase tracking-wider text-center" style={{ color: 'rgba(30,41,59,0.4)' }}>
            © {new Date().getFullYear()} S&M Network Company. Todos los derechos reservados. Santiago, Chile.
          </p>

          <div className="flex items-center gap-2 font-mono text-[9px]" style={{ color: 'rgba(30,41,59,0.4)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--sm-sage)' }} />
            Sin cobros mensuales. Código propio.
          </div>
        </div>
      </footer>
    </div>
  );
}
