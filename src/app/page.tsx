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
  MessageCircle,
  Zap,
  Shield,
  Star,
  Phone,
  MapPin,
} from 'lucide-react';

import { GlassSurface, SpotlightCard, StatusBadge } from './components/GlassSurface';
import { MagneticButton } from './components/MagneticButton';
import { SectionReveal, StaggerReveal, StaggerItem } from './components/SectionReveal';
import { LogoIsotype } from './components/LogoIsotype';
import { FloatingOrbs } from './components/FloatingOrbs';
import { GlassInput } from './components/GlassInput';

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
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ ...liquid, delay: 0.3 + i * 0.04 }}
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

/* ─── Santiago Time Capsule ──────────────────────────────────── */
function TimeCapsule({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(132,182,244,0.28)] bg-[rgba(255,255,255,0.55)] backdrop-blur-sm shadow-[var(--sm-shadow-xs)]">
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
      num: '01', label: 'Conexión', cy: 80, icon: <Phone className="w-4 h-4" />,
      desc: 'Andri escucha la historia y visión de tu negocio. Analizamos tus necesidades reales y definimos un presupuesto transparente sin sorpresas.',
    },
    {
      num: '02', label: 'Creación', cy: 240, icon: <Zap className="w-4 h-4" />,
      desc: 'Jeshua desarrolla código a medida en Next.js. Prototipamos la interfaz y te enviamos demos para revisar cada detalle contigo.',
    },
    {
      num: '03', label: 'Lanzamiento', cy: 400, icon: <Star className="w-4 h-4" />,
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
    <div ref={containerRef} className="relative h-[260vh]">
      <div className="sticky top-24 h-screen flex items-start pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl mx-auto items-start">

          {/* Left text panels */}
          <div className="space-y-6 lg:space-y-0 lg:h-[480px] lg:relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className={`lg:absolute lg:left-0 lg:right-0 p-6 rounded-2xl glass-surface ${
                  i === 0 ? 'lg:top-0' : i === 1 ? 'lg:top-[160px]' : 'lg:top-[320px]'
                }`}
                animate={{
                  opacity: activeStep === i ? 1 : 0.22,
                  scale: activeStep === i ? 1 : 0.965,
                  y: activeStep === i ? 0 : 8,
                }}
                transition={liquid}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center border"
                    style={{
                      background: activeStep === i ? 'rgba(132,182,244,0.12)' : 'rgba(132,182,244,0.04)',
                      borderColor: activeStep === i ? 'rgba(132,182,244,0.35)' : 'rgba(132,182,244,0.12)',
                      color: 'var(--sm-sky)',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    {step.icon}
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--sm-sky)' }}>
                    Paso {step.num}
                  </span>
                  <div className="h-px flex-1" style={{ background: 'rgba(132,182,244,0.18)' }} />
                </div>
                <h4 className="font-display font-bold text-2xl mb-3" style={{ color: 'var(--sm-slate)' }}>
                  {step.label}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: SVG network timeline */}
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
                      cx="100" cy={step.cy} r="30"
                      fill={activeStep >= i ? 'rgba(132,182,244,0.10)' : 'rgba(255,255,255,0.4)'}
                      stroke={activeStep >= i ? '#70A1D7' : 'rgba(132,182,244,0.18)'}
                      strokeWidth="1.5"
                      animate={{
                        opacity: activeStep >= i ? 1 : 0.3,
                        scale: activeStep === i ? 1.12 : 1,
                      }}
                      transition={spring}
                      className={activeStep === i ? 'node-active-glow' : ''}
                    />
                    {/* Outer ring for active */}
                    {activeStep === i && (
                      <motion.circle
                        cx="100" cy={step.cy} r="38"
                        fill="none"
                        stroke="rgba(132,182,244,0.25)"
                        strokeWidth="1"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    <motion.text
                      x="100" y={step.cy + 1}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="11" fontFamily="var(--font-mono)" fontWeight="700"
                      fill={activeStep >= i ? '#1E293B' : 'rgba(30,41,59,0.28)'}
                      animate={{ opacity: activeStep >= i ? 1 : 0.28 }}
                      transition={liquid}
                    >
                      {step.num}
                    </motion.text>
                    <motion.text
                      x="100" y={step.cy + 46}
                      textAnchor="middle" fontSize="9"
                      fontFamily="var(--font-body)" fontWeight="600"
                      fill="rgba(30,41,59,0.42)"
                      animate={{ opacity: activeStep >= i ? 0.75 : 0.18 }}
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
        boxShadow: '0 0 14px 3px rgba(132,182,244,0.25)',
        filter: 'blur(1px)',
        mixBlendMode: 'multiply',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}

/* ─── Stat Pill ──────────────────────────────────────────────── */
function StatPill({
  icon,
  value,
  label,
  delay = 0,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      className="stat-pill"
      initial={prefersReduced ? {} : { opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...liquid, delay }}
    >
      <span style={{ color: 'var(--sm-sky)' }}>{icon}</span>
      <div className="leading-none">
        <span className="block font-mono text-xs font-black" style={{ color: 'var(--sm-slate)' }}>{value}</span>
        <span className="block font-mono text-[8px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--sm-slate-mid)' }}>{label}</span>
      </div>
    </motion.div>
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

      {/* Desktop cursor halo */}
      <CursorHalo />

      {/* ── Floating Nav ── */}
      <FloatingNav santiagoTime={santiagoTime} />

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">

        {/* Atmospheric background */}
        <FloatingOrbs palette="mixed" intensity="medium" />

        {/* Dot grid pattern */}
        <div className="hero-dot-grid" aria-hidden="true" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── Left: Value Prop ─────────────────────────── */}
          <motion.div
            className="lg:col-span-7"
            initial={prefersReduced ? {} : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...liquid, delay: 0.15 }}
          >
            <GlassSurface variant="strong" className="p-8 lg:p-12 flex flex-col justify-between min-h-[500px]">
              <div className="space-y-7">
                {/* Badge chips */}
                <div className="flex flex-wrap gap-2">
                  <StatusBadge color="sky" dot shimmer>React / Next.js</StatusBadge>
                  <StatusBadge color="lavender">Tailored Code</StatusBadge>
                  <StatusBadge color="neutral">Santiago, CL 🇨🇱</StatusBadge>
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-[54px] font-black leading-[1.06]"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--sm-slate)', letterSpacing: '-0.035em' }}
                >
                  <WordReveal text="Impulsamos el crecimiento digital de tu PYME con" />
                  {' '}
                  <span className="text-gradient-sky">
                    <WordReveal text="empatía y transparencia" />
                  </span>
                </h1>

                <motion.p
                  className="text-sm md:text-base leading-relaxed max-w-xl"
                  style={{ color: 'var(--sm-slate-mid)' }}
                  initial={prefersReduced ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...liquid, delay: 1.0 }}
                >
                  Desarrollamos soluciones web únicas y rápidas para restaurantes, comercios locales y distribuidoras en Santiago. Sin cobros mensuales amarrados, con presupuesto justo y comunicación cercana.
                </motion.p>

                {/* Stat pills */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={prefersReduced ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...liquid, delay: 1.15 }}
                >
                  <StatPill icon={<Zap className="w-3 h-3" />} value="12+" label="PYMEs impulsadas" delay={1.2} />
                  <StatPill icon={<Shield className="w-3 h-3" />} value="100%" label="Código propio" delay={1.28} />
                  <StatPill icon={<Star className="w-3 h-3" />} value="$0" label="Cobros mensuales" delay={1.36} />
                </motion.div>
              </div>

              <motion.div
                className="pt-8 flex flex-col sm:flex-row gap-4"
                initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...liquid, delay: 1.18 }}
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

          {/* ── Right: Dona Flor Device ──── */}
          <motion.div
            className="lg:col-span-5"
            initial={prefersReduced ? {} : { opacity: 0, y: 28, rotateY: -8 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ ...liquid, delay: 0.32 }}
            style={{ perspective: 1200 }}
          >
            <GlassSurface variant="default" className="p-6 lg:p-8 flex flex-col items-center justify-center min-h-[500px]">

              {/* Lavender glow behind device */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
                style={{
                  background: 'radial-gradient(ellipse 60% 55% at 55% 45%, rgba(224,195,252,0.18) 0%, rgba(142,197,252,0.08) 55%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Phone frame */}
              <motion.div
                className="border-sky-lavender relative w-full max-w-[280px] rounded-[36px]"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  boxShadow: '0 28px 72px rgba(132,182,244,0.26), 0 10px 24px rgba(30,41,59,0.12)',
                }}
                whileHover={prefersReduced ? {} : { y: -6, scale: 1.02 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="rounded-[35px] overflow-hidden border border-[rgba(132,182,244,0.18)]">

                  {/* Dynamic Island / notch capsule */}
                  <div className="bg-white pt-2.5 pb-2 px-5 flex items-center justify-between border-b border-[rgba(132,182,244,0.08)]">
                    <div
                      className="absolute top-2 left-1/2 -translate-x-1/2 h-6 px-4 rounded-full z-20 flex items-center gap-2 shadow-sm"
                      style={{ background: 'rgba(248,249,250,0.95)', border: '1px solid rgba(132,182,244,0.2)' }}
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
                  <div className="px-4 pt-2 pb-3 border-b border-[rgba(132,182,244,0.08)]" style={{ background: 'white' }}>
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
                        style={{ background: 'white', border: '1px solid rgba(132,182,244,0.12)' }}
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
                          style={{ background: 'rgba(248,249,250,0.9)', border: '1px solid rgba(132,182,244,0.15)' }}
                        >
                          <button
                            onClick={() => handleDecrement(item.id)}
                            className="w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-bold transition-colors focus-visible:ring-1 focus-visible:ring-[#70A1D7]"
                            style={{ background: 'rgba(132,182,244,0.1)', color: 'var(--sm-slate)', border: '1px solid rgba(132,182,244,0.2)' }}
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
                  <div className="border-t border-[rgba(132,182,244,0.12)] px-4 py-3 relative" style={{ background: 'white' }}>
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
                          style={{ background: 'rgba(255,255,255,0.97)', borderTop: '1px solid rgba(132,182,244,0.12)', borderRadius: 'inherit' }}
                        >
                          <div className="flex justify-between items-center pb-2" style={{ borderBottom: '1px solid rgba(132,182,244,0.12)' }}>
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
                              border: '1px solid rgba(132,182,244,0.14)',
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
              </motion.div>

              {/* Tag below device */}
              <div className="mt-5 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" style={{ color: 'var(--sm-sky)' }} />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--sm-slate-mid)' }}>
                  Demo interactiva real · Sin datos reales
                </span>
              </div>
            </GlassSurface>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2: EL PROBLEMA vs. LA SOLUCIÓN
          ══════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-4 md:px-8 max-w-7xl mx-auto"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(245,244,240,0.55) 40%, rgba(245,244,240,0.55) 60%, transparent 100%)',
        }}
      >
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Problem — fogged / desaturated glass */}
          <StaggerItem from="left">
            <div className="glass-surface glass-fogged rounded-3xl p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
              {/* Subtle red tint overlay */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(239,68,68,0.04), transparent 80%)' }}
                aria-hidden="true"
              />
              <div className="space-y-5 relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                  style={{ background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.18)', color: '#DC2626' }}
                  animate={prefersReduced ? {} : { rotate: [0, -3, 3, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <AlertTriangle className="w-5 h-5" />
                </motion.div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--sm-slate)' }}>
                    El Problema de las PYMEs
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>
                    Agencias tradicionales que cobran mensualidades excesivas, o sitios prefabricados lentos, vulnerables y sin optimización para ventas locales en Santiago.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 font-mono text-[9px] font-bold uppercase tracking-wider" style={{ borderTop: '1px solid rgba(30,41,59,0.06)', color: 'rgba(30,41,59,0.35)' }}>
                Sitios lentos · Mensualidades altas · Enredos técnicos
              </div>
            </div>
          </StaggerItem>

          {/* Solution — clean glass + specular sweep active */}
          <StaggerItem from="right">
            <SpotlightCard className="p-8 flex flex-col justify-between min-h-[320px]">
              {/* Sky glow top */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(142,197,252,0.10), transparent 80%)' }}
                aria-hidden="true"
              />
              <div className="space-y-5 relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                  style={{ background: 'rgba(132,182,244,0.10)', borderColor: 'rgba(132,182,244,0.28)', color: 'var(--sm-sky)' }}
                  animate={prefersReduced ? {} : { scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Lightbulb className="w-5 h-5" />
                </motion.div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--sm-slate)' }}>
                    La Solución S&M
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>
                    Presupuesto justo de un único pago inicial, código estático ultrarrápido en Next.js, catálogos interactivos que envían pedidos directo a tu WhatsApp.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 font-mono text-[9px] font-bold uppercase tracking-wider relative z-10" style={{ borderTop: '1px solid rgba(132,182,244,0.18)', color: 'var(--sm-sky)' }}>
                Un único pago · Código propio · Conexión directa
              </div>
            </SpotlightCard>
          </StaggerItem>
        </StaggerReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3: SERVICIOS — Bento Asimétrico
          ══════════════════════════════════════════════════════ */}
      <section
        id="servicios"
        className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative"
      >
        {/* Section background alt-tint */}
        <div
          className="absolute inset-0 rounded-[3rem] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(245,244,240,0.7), transparent 80%)',
          }}
          aria-hidden="true"
        />

        <SectionReveal className="text-center max-w-2xl mx-auto mb-14 space-y-3" from="scale">
          <StatusBadge color="sky" shimmer>
            <Sparkles className="w-3 h-3 inline-block mr-1" />
            Catálogo de Soluciones
          </StatusBadge>
          <h2 className="font-display font-black text-3xl md:text-4xl" style={{ color: 'var(--sm-slate)' }}>
            Servicios Digitales para PYMEs
          </h2>
          <p className="text-sm" style={{ color: 'var(--sm-slate-mid)' }}>
            Soluciones pensadas para el mercado local de Santiago, sin costos ocultos.
          </p>
        </SectionReveal>

        {/* Bento asymmetric grid */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
          {/* Card 1 — Large featured */}
          <StaggerItem className="md:col-span-2" from="left">
            <SpotlightCard className="p-8 lg:p-10 flex flex-col justify-between min-h-[380px] relative">
              {/* Big decorative number */}
              <span
                className="section-num-deco text-[140px] absolute -top-6 -right-4 leading-none"
                aria-hidden="true"
              >
                01
              </span>
              <div className="space-y-5 relative z-10">
                <motion.div
                  className="w-14 h-14 rounded-2xl border flex items-center justify-center"
                  style={{ color: 'var(--sm-sky)', borderColor: 'rgba(132,182,244,0.28)', background: 'rgba(132,182,244,0.08)' }}
                  whileHover={prefersReduced ? {} : { scale: 1.12, rotate: 6 }}
                  transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] as const }}
                >
                  <Globe className="w-7 h-7" />
                </motion.div>
                <div>
                  <h3 className="font-display font-bold text-2xl mb-3" style={{ color: 'var(--sm-slate)' }}>
                    Páginas Web para PYMEs
                  </h3>
                  <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'var(--sm-slate-mid)' }}>
                    Plataformas optimizadas para Google y móviles. Atraen clientes de tu zona geográfica en Santiago de forma fluida y profesional. Código Next.js estático = velocidad máxima.
                  </p>
                </div>
              </div>
              <div className="pt-5 flex items-center justify-between relative z-10" style={{ borderTop: '1px solid rgba(132,182,244,0.14)' }}>
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--sm-sky)' }}>
                  Velocidad + SEO Local
                </span>
                <MagneticButton href="#contacto" variant="secondary" className="px-4 py-2 text-[9px]">
                  Cotizar
                  <ChevronRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>
            </SpotlightCard>
          </StaggerItem>

          {/* Card 2 */}
          <StaggerItem from="right">
            <SpotlightCard className="p-8 flex flex-col justify-between min-h-[380px] relative">
              <span className="section-num-deco text-[120px] absolute -top-4 -right-3 leading-none" aria-hidden="true">02</span>
              <div className="space-y-5 relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-2xl border flex items-center justify-center"
                  style={{ color: 'var(--sm-sky)', borderColor: 'rgba(132,182,244,0.28)', background: 'rgba(132,182,244,0.08)' }}
                  whileHover={prefersReduced ? {} : { scale: 1.10, rotate: -5 }}
                  transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] as const }}
                >
                  <Smartphone className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--sm-slate)' }}>
                    Menús y Catálogos Digitales
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>
                    Catálogos sin comisiones de terceros. Recibe solicitudes detalladas con montos CLP en tu WhatsApp.
                  </p>
                </div>
              </div>
              <div className="pt-5 flex items-center justify-between relative z-10" style={{ borderTop: '1px solid rgba(132,182,244,0.14)' }}>
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--sm-sky)' }}>
                  Precios CLP + WhatsApp
                </span>
                <ChevronRight className="w-4 h-4" style={{ color: 'rgba(30,41,59,0.3)' }} />
              </div>
            </SpotlightCard>
          </StaggerItem>

          {/* Card 3 — Full width bottom */}
          <StaggerItem className="md:col-span-3" from="bottom">
            <SpotlightCard className="p-8 lg:p-10 flex flex-col md:flex-row items-start gap-8 relative">
              <span className="section-num-deco text-[140px] absolute -bottom-8 -left-4 leading-none" aria-hidden="true">03</span>
              <div className="flex-1 space-y-4 relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-2xl border flex items-center justify-center"
                  style={{ color: 'var(--sm-sky)', borderColor: 'rgba(132,182,244,0.28)', background: 'rgba(132,182,244,0.08)' }}
                  whileHover={prefersReduced ? {} : { scale: 1.10, rotate: 4 }}
                  transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] as const }}
                >
                  <ShoppingBag className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--sm-slate)' }}>
                    Distribución y Venta Online
                  </h3>
                  <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--sm-slate-mid)' }}>
                    Sistemas simples para distribuidoras y locales. Recopilación ágil de leads y catálogo de inventarios para clientes recurrentes.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-3 relative z-10 shrink-0">
                <StatusBadge color="sage">Automatización de Ventas</StatusBadge>
                <MagneticButton href="#contacto" variant="primary" className="px-6 py-2.5 text-[9px]">
                  <Zap className="w-3 h-3" />
                  Ver Demo
                </MagneticButton>
              </div>
            </SpotlightCard>
          </StaggerItem>
        </StaggerReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4: PROCESO — Sticky Scroll Storytelling
          ══════════════════════════════════════════════════════ */}
      <section id="proceso" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative">
        <FloatingOrbs palette="sky" intensity="low" />

        <SectionReveal className="text-center max-w-2xl mx-auto mb-16 space-y-3 relative z-10" from="fade">
          <StatusBadge color="sky">
            <Compass className="w-3 h-3 inline-block mr-1" />
            Metodología Ágil
          </StatusBadge>
          <h2 className="font-display font-black text-3xl md:text-4xl" style={{ color: 'var(--sm-slate)' }}>
            Proceso: Conexión → Creación → Lanzamiento
          </h2>
          <p className="text-sm" style={{ color: 'var(--sm-slate-mid)' }}>
            Desplázate para ver cómo construimos tu red digital.
          </p>
        </SectionReveal>

        <div className="relative z-10">
          <ProcesosSection />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5: QUIÉNES SOMOS
          ══════════════════════════════════════════════════════ */}
      <section
        id="nosotros"
        className="py-24 px-4 md:px-8 max-w-7xl mx-auto"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(245,244,240,0.6) 20%, rgba(245,244,240,0.6) 80%, transparent 100%)' }}
      >
        <SectionReveal className="text-center max-w-2xl mx-auto mb-14 space-y-3" from="scale">
          <StatusBadge color="sky">
            <Users className="w-3 h-3 inline-block mr-1" />
            Socios Estratégicos
          </StatusBadge>
          <h2 className="font-display font-black text-3xl md:text-4xl" style={{ color: 'var(--sm-slate)' }}>
            El Equipo Detrás de S&M
          </h2>
          <p className="text-sm" style={{ color: 'var(--sm-slate-mid)' }}>
            Dos especialistas. Una visión. Resultados concretos para tu negocio.
          </p>
        </SectionReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              initials: 'AM', name: 'Andri Manrrique',
              role: 'Liderazgo Comercial & Gestión',
              desc: 'Enfocado en relaciones comerciales empáticas, atención personalizada y presupuestos realistas sin sobrecostos para PYMEs.',
              badgeColor: 'sky' as const,
              iconColor: 'rgba(132,182,244,0.12)',
            },
            {
              initials: 'JU', name: 'Jeshua Useche',
              role: 'Desarrollo Fullstack & UI/UX',
              desc: 'Transforma los requerimientos del cliente en código limpio, rápido y escalable en Next.js y React con estándares UI/UX modernos.',
              badgeColor: 'lavender' as const,
              iconColor: 'rgba(224,195,252,0.18)',
            },
          ].map((member, idx) => (
            <StaggerItem key={member.name} from={idx === 0 ? 'left' : 'right'}>
              <SpotlightCard className="p-8 flex flex-col sm:flex-row items-start gap-6">
                {/* Avatar with animated ring */}
                <div className="relative shrink-0">
                  <motion.div
                    className="border-sky-lavender w-16 h-16 rounded-full flex items-center justify-center font-black text-xl relative z-10"
                    style={{
                      background: member.iconColor,
                      color: 'var(--sm-slate)',
                      fontFamily: 'var(--font-display)',
                    }}
                    whileHover={prefersReduced ? {} : { scale: 1.1, rotate: -4 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as const }}
                  >
                    {member.initials}
                  </motion.div>
                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[rgba(132,182,244,0.3)]"
                    animate={prefersReduced ? {} : { scale: [1, 1.22, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-2.5 relative z-10">
                  <div>
                    <h4 className="font-display font-bold text-base" style={{ color: 'var(--sm-slate)' }}>
                      {member.name}
                    </h4>
                    <StatusBadge color={member.badgeColor} className="mt-1.5">{member.role}</StatusBadge>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>{member.desc}</p>

                  {/* Contact pill */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium transition-all duration-200 hover:shadow-sm"
                      style={{
                        background: 'rgba(132,182,244,0.10)',
                        border: '1px solid rgba(132,182,244,0.24)',
                        color: 'var(--sm-sky)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(132,182,244,0.18)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(132,182,244,0.10)'; }}
                    >
                      <MessageCircle className="w-3 h-3" />
                      Contactar
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6: CONTACTO
          ══════════════════════════════════════════════════════ */}
      <section id="contacto" className="py-24 px-4 md:px-8 max-w-4xl mx-auto relative">
        <FloatingOrbs palette="lavender" intensity="low" />

        <SectionReveal className="relative z-10" from="scale">
          <GlassSurface variant="strong" className="p-8 lg:p-12 relative overflow-hidden">
            {/* Sky glow behind form */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(142,197,252,0.12) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="text-center space-y-3 mb-10 relative z-10">
              <StatusBadge color="sky" shimmer className="mb-3">Contacto Directo</StatusBadge>
              <h2 className="font-display font-black text-2xl md:text-3xl leading-tight" style={{ color: 'var(--sm-slate)' }}>
                ¿Listo para darle a tu negocio<br className="hidden md:block" />
                {' '}la visibilidad que merece?
              </h2>
              <p className="text-sm" style={{ color: 'var(--sm-slate-mid)' }}>
                Completa el formulario y nos contactaremos a tu WhatsApp para coordinar tu propuesta.
              </p>
            </div>


            <div className="relative z-10 flex items-center gap-4 mb-8">
              <div className="h-px flex-1" style={{ background: 'rgba(132,182,244,0.2)' }} />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--sm-slate-mid)' }}>
                O completa el formulario
              </span>
              <div className="h-px flex-1" style={{ background: 'rgba(132,182,244,0.2)' }} />
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
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto border"
                    style={{
                      background: 'rgba(132,182,244,0.10)',
                      borderColor: 'rgba(132,182,244,0.28)',
                      color: 'var(--sm-sky)',
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <h4 className="font-display font-bold text-xl" style={{ color: 'var(--sm-slate)' }}>
                    ¡Mensaje Enviado con Éxito!
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--sm-slate-mid)' }}>
                    Muchas gracias por escribirnos. Nuestro equipo se pondrá en contacto a tu WhatsApp para tu asesoría gratuita.
                  </p>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <GlassInput
                    label="Nombre Completo"
                    value={nameVal}
                    onChange={setNameVal}
                    required
                    icon={<Users className="w-4 h-4" />}
                  />
                  <GlassInput
                    label="Nombre del Negocio"
                    value={bizVal}
                    onChange={setBizVal}
                    required
                    icon={<ShoppingBag className="w-4 h-4" />}
                  />
                  <GlassInput
                    label="Número de WhatsApp"
                    type="tel"
                    value={waVal}
                    onChange={setWaVal}
                    required
                    icon={<Phone className="w-4 h-4" />}
                  />

                  {formStatus === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-semibold p-3 rounded-xl border"
                      style={{ color: '#DC2626', background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.18)' }}
                    >
                      Por favor rellena todos los campos correctamente.
                    </motion.p>
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
      <footer className="mt-4" style={{ borderTop: '1px solid rgba(132,182,244,0.14)' }}>


        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-3">
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
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(30,41,59,0.5)' }}>
                Impulsando el crecimiento digital de PYMEs en Santiago, Chile con tecnología de punta y trato cercano.
              </p>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" style={{ color: 'var(--sm-sky)' }} />
                <span className="font-mono text-[9px]" style={{ color: 'rgba(30,41,59,0.45)' }}>Santiago, Chile</span>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-2.5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--sm-sky)' }}>Servicios</p>
              {['Páginas Web para PYMEs', 'Menús Digitales', 'Catálogos WhatsApp', 'Venta Online'].map((s) => (
                <a
                  key={s}
                  href="#servicios"
                  className="flex items-center gap-1.5 text-xs transition-colors duration-200 group"
                  style={{ color: 'rgba(30,41,59,0.5)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--sm-slate)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(30,41,59,0.5)'; }}
                >
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--sm-sky)' }} />
                  {s}
                </a>
              ))}
            </div>

            {/* Navigation */}
            <div className="space-y-2.5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--sm-sky)' }}>Navegación</p>
              {['Servicios', 'Proceso', 'Nosotros', 'Contacto'].map((s) => (
                <a
                  key={s}
                  href={`#${s.toLowerCase()}`}
                  className="flex items-center gap-1.5 text-xs transition-colors duration-200 group"
                  style={{ color: 'rgba(30,41,59,0.5)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--sm-slate)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(30,41,59,0.5)'; }}
                >
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--sm-sky)' }} />
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(132,182,244,0.12)' }}>
            <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'rgba(30,41,59,0.4)' }}>
              © {new Date().getFullYear()} S&M Network Company. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 font-mono text-[9px]" style={{ color: 'rgba(30,41,59,0.4)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--sm-sage)' }} />
              Sin cobros mensuales · Código propio · Hecho con 💙 en Santiago
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
