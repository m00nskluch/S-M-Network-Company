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
  CheckCircle2,
  Users,
  ShoppingBag,
  Compass,
} from 'lucide-react';

import { GlassSurface, SpotlightCard, StatusBadge } from './components/GlassSurface';
import { MagneticButton } from './components/MagneticButton';
import { SectionReveal, StaggerReveal, StaggerItem } from './components/SectionReveal';
import { LogoIsotype } from './components/LogoIsotype';
import { FloatingOrbs } from './components/FloatingOrbs';
import { GlassInput } from './components/GlassInput';
import { CustomCursor } from './components/CustomCursor';
import { KineticTicker } from './components/KineticTicker';
import { MetricsBento } from './components/MetricsBento';
import { ComparisonBento } from './components/ComparisonBento';
import { ServicesBento } from './components/ServicesBento';

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
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ ...liquid, delay: 0.2 + i * 0.05 }}
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
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 backdrop-blur-sm shadow-xs">
      <Clock className="w-3.5 h-3.5 shrink-0 text-[#0A5CFF]" />
      <span className="font-mono text-[10px] font-bold tabular-nums text-[var(--text-slate)]">
        {time}
      </span>
      <span className="font-mono text-[9px] text-[var(--text-secondary)]">Santiago CL</span>
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
        scrolled ? 'glass-surface glass-surface-strong shadow-lg' : 'glass-surface'
      }`}
      style={{ overflow: 'visible' }}
    >
      <ScrollProgressBar />

      {/* Logo */}
      <a href="#" className="flex items-center gap-3 shrink-0 group">
        <div
          className="relative px-2 py-1 rounded-xl flex items-center justify-center shadow-xs border transition-transform duration-300 group-hover:scale-105"
          style={{
            background: 'rgba(255, 255, 255, 0.88)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <LogoIsotype className="w-8 h-5" />
          <span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-white animate-pulse"
            style={{ background: '#0A5CFF' }}
          />
        </div>
        <div className="hidden sm:block leading-none">
          <span className="block text-xs font-bold tracking-tight text-[var(--text-slate)] font-display">
            S&M Network
          </span>
          <span className="block font-mono text-[7px] font-bold uppercase tracking-[0.16em] text-[#0A5CFF]">
            Company
          </span>
        </div>
      </a>

      {/* Center links */}
      <div className="hidden md:flex items-center gap-6">
        {['Servicios', 'Proceso', 'Nosotros', 'Contacto'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="relative text-[11px] font-semibold uppercase tracking-wider py-1 group transition-colors duration-200 text-[var(--text-secondary)] hover:text-[var(--text-slate)]"
          >
            {link}
            <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full transition-[width] duration-300 w-0 group-hover:w-full bg-[#0A5CFF]" />
          </a>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden lg:block">
          <TimeCapsule time={santiagoTime} />
        </div>
        <MagneticButton href="#contacto" variant="primary" className="px-5 py-2 text-[10px] font-bold">
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
      desc: 'Andri escucha la historia y visión de tu negocio. Analizamos tus necesidades reales y definimos un presupuesto transparente sin sorpresas ni costos ocultos.',
    },
    {
      num: '02', label: 'Creación', cy: 240, icon: <Zap className="w-4 h-4" />,
      desc: 'Jeshua desarrolla código a medida en Next.js. Prototipamos la interfaz interactiva y te enviamos demos para auditar cada detalle y métrica de velocidad contigo.',
    },
    {
      num: '03', label: 'Lanzamiento', cy: 400, icon: <Star className="w-4 h-4" />,
      desc: 'Publicamos tu web en el dominio definitivo con SSL gratuito y capacitamos a tu equipo para autogestionar y recibir pedidos directo en WhatsApp.',
    },
  ];

  if (prefersReduced) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((step) => (
          <SpotlightCard key={step.num} className="p-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A5CFF]">
                Paso {step.num}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#0A5CFF]" />
            </div>
            <h4 className="font-display font-bold text-lg mb-2 text-[var(--text-slate)]">
              {step.num}. {step.label}
            </h4>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{step.desc}</p>
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
                  opacity: activeStep === i ? 1 : 0.25,
                  scale: activeStep === i ? 1 : 0.965,
                  y: activeStep === i ? 0 : 8,
                }}
                transition={liquid}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300"
                    style={{
                      background: activeStep === i ? 'rgba(10, 92, 255, 0.12)' : 'rgba(10, 92, 255, 0.04)',
                      borderColor: activeStep === i ? 'rgba(10, 92, 255, 0.35)' : 'rgba(10, 92, 255, 0.12)',
                      color: '#0A5CFF',
                    }}
                  >
                    {step.icon}
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0A5CFF]">
                    Paso {step.num}
                  </span>
                  <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                </div>
                <h4 className="font-display font-bold text-2xl mb-3 text-[var(--text-slate)]">
                  {step.label}
                </h4>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{step.desc}</p>
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="1 0"
                  style={{ pathLength: smoothPath }}
                />
                <defs>
                  <linearGradient id="lineGradLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0A5CFF" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#4E8EFF" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0A5CFF" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {steps.map((step, i) => (
                  <g key={step.num}>
                    <motion.circle
                      cx="100" cy={step.cy} r="30"
                      fill={activeStep >= i ? 'rgba(10, 92, 255, 0.12)' : 'rgba(255,255,255,0.6)'}
                      stroke={activeStep >= i ? '#0A5CFF' : 'var(--border-subtle)'}
                      strokeWidth="1.5"
                      animate={{
                        opacity: activeStep >= i ? 1 : 0.35,
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
                        stroke="rgba(10, 92, 255, 0.3)"
                        strokeWidth="1.5"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    <motion.text
                      x="100" y={step.cy + 1}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="11" fontFamily="var(--font-mono)" fontWeight="700"
                      fill={activeStep >= i ? '#1D2129' : 'rgba(29,33,41,0.28)'}
                      animate={{ opacity: activeStep >= i ? 1 : 0.28 }}
                      transition={liquid}
                    >
                      {step.num}
                    </motion.text>
                    <motion.text
                      x="100" y={step.cy + 46}
                      textAnchor="middle" fontSize="9"
                      fontFamily="var(--font-body)" fontWeight="600"
                      fill="rgba(29,33,41,0.5)"
                      animate={{ opacity: activeStep >= i ? 0.85 : 0.2 }}
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
      initial={prefersReduced ? {} : { opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...liquid, delay }}
    >
      <span className="text-[#0A5CFF]">{icon}</span>
      <div className="leading-none">
        <span className="block font-mono text-xs font-black text-[var(--text-slate)]">{value}</span>
        <span className="block font-mono text-[8px] uppercase tracking-wider mt-0.5 text-[var(--text-secondary)]">{label}</span>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE ORCHESTRATOR
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

  /* ── Dona Flor Menu Demo State ───────────────────────────── */
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

  /* ── Contact Form State ──────────────────────────────────── */
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
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-slate)]">

      {/* Kinetic Custom SVG Cursor */}
      <CustomCursor />

      {/* ── Floating Nav ── */}
      <FloatingNav santiagoTime={santiagoTime} />

      {/* ══════════════════════════════════════════════════════
          HERO SECTION — Monumental Clash Display & Kinetic Depth
          ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">

        {/* Atmospheric background */}
        <FloatingOrbs palette="mixed" intensity="medium" />

        {/* Dot grid pattern */}
        <div className="hero-dot-grid" aria-hidden="true" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* ── Left: Value Prop ─────────────────────────── */}
          <motion.div
            className="lg:col-span-7"
            initial={prefersReduced ? {} : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...liquid, delay: 0.15 }}
          >
            <GlassSurface variant="strong" className="p-8 lg:p-12 flex flex-col justify-between min-h-[520px] shadow-[var(--sm-shadow-lg)] border-[var(--border-subtle)]">
              <div className="space-y-7">
                {/* Badge chips */}
                <div className="flex flex-wrap gap-2.5">
                  <StatusBadge color="sky" dot shimmer>Kinetic Tech Minimalism</StatusBadge>
                  <StatusBadge color="lavender">Next.js Nativo</StatusBadge>
                  <StatusBadge color="neutral">Santiago, CL 🇨🇱</StatusBadge>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black leading-[1.04] font-display tracking-tight text-[var(--text-slate)]">
                  <WordReveal text="Impulsamos el crecimiento digital de tu PYME con" />
                  {' '}
                  <span className="text-gradient-sky">
                    <WordReveal text="ingeniería y empatía" />
                  </span>
                </h1>

                <motion.p
                  className="text-sm md:text-base leading-relaxed max-w-xl text-[var(--text-secondary)]"
                  initial={prefersReduced ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...liquid, delay: 0.9 }}
                >
                  Desarrollamos plataformas estáticas de ultra-velocidad y menús digitales con cotizador por WhatsApp. Sin cobros mensuales amarrados, con presupuesto transparente e inmersión en tu negocio en Santiago.
                </motion.p>

                {/* Stat pills */}
                <motion.div
                  className="flex flex-wrap gap-3 pt-2"
                  initial={prefersReduced ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ...liquid, delay: 1.1 }}
                >
                  <StatPill icon={<Zap className="w-3.5 h-3.5" />} value="12+" label="PYMEs impulsadas" delay={1.15} />
                  <StatPill icon={<Shield className="w-3.5 h-3.5" />} value="100%" label="Código propio" delay={1.22} />
                  <StatPill icon={<Star className="w-3.5 h-3.5" />} value="$0" label="Cobros mensuales" delay={1.3} />
                </motion.div>
              </div>

              <motion.div
                className="pt-8 flex flex-col sm:flex-row gap-4"
                initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...liquid, delay: 1.2 }}
              >
                <MagneticButton href="#contacto" variant="primary" className="px-8 py-3.5 text-xs font-bold shadow-lg shadow-[#0A5CFF]/30">
                  Agendar Asesoría Gratuita
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </MagneticButton>
                <MagneticButton href="#servicios" variant="secondary" className="px-7 py-3.5 text-xs font-semibold">
                  Explorar Catálogo
                </MagneticButton>
              </motion.div>
            </GlassSurface>
          </motion.div>

          {/* ── Right: Dona Flor Device Showcase ──── */}
          <motion.div
            id="hero-phone-showcase"
            className="lg:col-span-5"
            initial={prefersReduced ? {} : { opacity: 0, y: 28, rotateY: -8 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ ...liquid, delay: 0.32 }}
            style={{ perspective: 1200 }}
          >
            <GlassSurface variant="default" className="p-6 lg:p-8 flex flex-col items-center justify-center min-h-[520px] border-[var(--border-subtle)]">

              {/* Lavender glow behind device */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
                style={{
                  background: 'radial-gradient(ellipse 60% 55% at 55% 45%, rgba(224,195,252,0.22) 0%, rgba(10,92,255,0.1) 55%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Phone frame */}
              <motion.div
                className="border-sky-lavender relative w-full max-w-[280px] rounded-[36px]"
                style={{
                  background: 'rgba(255,255,255,0.94)',
                  boxShadow: '0 28px 72px rgba(10,92,255,0.22), 0 10px 24px rgba(29,33,41,0.12)',
                }}
                whileHover={prefersReduced ? {} : { y: -6, scale: 1.02 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="rounded-[35px] overflow-hidden border border-[var(--border-subtle)]">

                  {/* Dynamic Island / notch capsule */}
                  <div className="bg-white pt-2.5 pb-2 px-5 flex items-center justify-between border-b border-[var(--border-subtle)]">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 h-6 px-4 rounded-full z-20 flex items-center gap-2 shadow-xs bg-[var(--bg-primary)] border border-[var(--border-subtle)]">
                      <span className="font-mono text-[8px] font-bold tabular-nums text-[var(--text-slate)]">
                        {santiagoTime.slice(0, 5)}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono text-[8px] text-[var(--text-secondary)]">5G</span>
                    </div>
                    <div className="h-6" />
                  </div>

                  {/* App header */}
                  <div className="px-4 pt-3 pb-3 border-b border-[var(--border-subtle)] bg-white">
                    <div className="flex items-center justify-between mb-1">
                      <StatusBadge color="sage" dot>Prototipo en Vivo</StatusBadge>
                      <Heart className="w-3 h-3 fill-current animate-pulse text-rose-500" />
                    </div>
                    <h3 className="text-sm font-bold mt-1.5 font-display text-[var(--text-slate)]">
                      Dona Flor Gourmet 🇨🇱
                    </h3>
                    <p className="font-mono text-[9px] text-[var(--text-secondary)]">
                      Santiago Centro · Pedidos en 1 clic
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="px-3 py-2.5 space-y-2 max-h-[195px] overflow-y-auto bg-[var(--sm-bg-alt)]">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-2.5 rounded-xl bg-white border border-[var(--border-subtle)] shadow-2xs"
                      >
                        <div className="flex-1 pr-2">
                          <p className="text-[11px] font-bold leading-tight text-[var(--text-slate)]">
                            {item.name}
                          </p>
                          <p className="font-mono text-[9px] font-bold mt-0.5 text-[#0A5CFF]">
                            ${item.price.toLocaleString('es-CL')} CLP
                          </p>
                        </div>
                        <div className="flex items-center gap-1 rounded-lg p-1 shrink-0 bg-[var(--bg-primary)] border border-[var(--border-subtle)]">
                          <button
                            onClick={() => handleDecrement(item.id)}
                            className="w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-bold transition-colors bg-[var(--sm-bg-alt)] text-[var(--text-slate)] hover:bg-[var(--border-subtle)]"
                            aria-label={`Restar ${item.name}`}
                          >
                            −
                          </button>
                          <motion.span
                            key={`${item.id}-${springKeys[item.id] ?? 0}`}
                            className="w-4 text-center font-mono text-[10px] font-black tabular-nums text-[var(--text-slate)]"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.28, 0.9, 1] }}
                            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] as const }}
                          >
                            {item.count}
                          </motion.span>
                          <button
                            onClick={() => handleIncrement(item.id)}
                            className="w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black transition-colors bg-[#0A5CFF] text-white hover:bg-[#0848CC]"
                            aria-label={`Sumar ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Checkout bar */}
                  <div className="border-t border-[var(--border-subtle)] px-4 py-3 relative bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block font-mono text-[8px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                          Total Pedido
                        </span>
                        <span className="font-mono text-xs font-black tabular-nums text-[var(--text-slate)]">
                          $<AnimatedNumber value={total} /> CLP
                        </span>
                      </div>
                      <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="px-3 py-1.5 rounded-lg font-mono text-[9px] font-black uppercase tracking-wider transition-colors bg-[#0A5CFF] text-white hover:bg-[#0848CC] shadow-xs"
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
                          className="absolute inset-0 z-40 p-4 flex flex-col justify-between bg-white/98 backdrop-blur-md border-t border-[var(--border-subtle)] rounded-inherit"
                        >
                          <div className="flex justify-between items-center pb-2 border-b border-[var(--border-subtle)]">
                            <StatusBadge color="sage">Resumen WhatsApp</StatusBadge>
                            <button
                              onClick={() => setIsCheckoutOpen(false)}
                              className="transition-colors rounded text-[var(--text-secondary)] hover:text-[var(--text-slate)]"
                              aria-label="Cerrar resumen"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="my-3 space-y-2">
                            <p className="text-[10px] font-bold text-[var(--text-slate)]">Mensaje Cotizador CLP:</p>
                            <p className="font-mono text-[8px] leading-relaxed p-2.5 rounded-lg bg-[var(--sm-bg-alt)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                              &ldquo;Hola Dona Flor Gourmet, quisiera pedir:{' '}
                              {menuItems.filter((i) => i.count > 0).map((i) => `${i.count}x ${i.name}`).join(', ') || '1x Empanadas'}.{' '}
                              Total: ${total.toLocaleString('es-CL')} CLP&rdquo;
                            </p>
                          </div>
                          <button
                            onClick={() => { alert('¡Simulación de envío a WhatsApp comercial!'); setIsCheckoutOpen(false); }}
                            className="w-full py-2 rounded-lg font-mono font-black text-[9px] uppercase tracking-wider transition-colors bg-[#25D366] text-white hover:bg-[#1EBE5B] shadow-xs"
                          >
                            Confirmar e Ir a WhatsApp 🚀
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Tag below device */}
              <div className="mt-5 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#0A5CFF]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Prototipo interactivo real · Haz clic para auditar
                </span>
              </div>
            </GlassSurface>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2: KINETIC TICKER (Based on image_5.png)
          ══════════════════════════════════════════════════════ */}
      <KineticTicker />

      {/* ══════════════════════════════════════════════════════
          SECTION 3: METRICS BENTO (Based on image_0.png)
          ══════════════════════════════════════════════════════ */}
      <MetricsBento />

      {/* ══════════════════════════════════════════════════════
          SECTION 4: INTERACTIVE COMPARISON (Based on image_1.png)
          ══════════════════════════════════════════════════════ */}
      <ComparisonBento />

      {/* ══════════════════════════════════════════════════════
          SECTION 5: SERVICES BENTO (Based on image_2-4.png)
          ══════════════════════════════════════════════════════ */}
      <section id="servicios">
        <ServicesBento onOpenDemo={() => {
          const heroPhone = document.querySelector('#hero-phone-showcase');
          if (heroPhone) heroPhone.scrollIntoView({ behavior: 'smooth' });
        }} />
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6: PROCESO — Sticky Scroll Storytelling
          ══════════════════════════════════════════════════════ */}
      <section id="proceso" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative">
        <FloatingOrbs palette="sky" intensity="low" />

        <SectionReveal className="text-center max-w-2xl mx-auto mb-16 space-y-3 relative z-10" from="fade">
          <StatusBadge color="sky">
            <Compass className="w-3 h-3 inline-block mr-1" />
            Metodología Ágil
          </StatusBadge>
          <h2 className="font-display font-black text-3xl md:text-5xl text-[var(--text-slate)]">
            Proceso: Conexión → Creación → Lanzamiento
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            Desplázate para ver cómo construimos tu presencia digital en Santiago en 3 pasos auditados.
          </p>
        </SectionReveal>

        <div className="relative z-10">
          <ProcesosSection />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7: QUIÉNES SOMOS
          ══════════════════════════════════════════════════════ */}
      <section
        id="nosotros"
        className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-gradient-to-b from-transparent via-[var(--sm-bg-alt)]/60 to-transparent"
      >
        <SectionReveal className="text-center max-w-2xl mx-auto mb-14 space-y-3" from="scale">
          <StatusBadge color="sky">
            <Users className="w-3 h-3 inline-block mr-1" />
            Socios Estratégicos
          </StatusBadge>
          <h2 className="font-display font-black text-3xl md:text-5xl text-[var(--text-slate)]">
            El Equipo Detrás de S&M
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)]">
            Dos especialistas senior. Una visión tecnológica. Resultados concretos para tu PYME.
          </p>
        </SectionReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              initials: 'AM', name: 'Andri Manrrique',
              role: 'Liderazgo Comercial & Gestión',
              desc: 'Enfocado en relaciones comerciales empáticas, atención personalizada en Santiago y presupuestos realistas sin sobrecostos para PYMEs locales.',
              badgeColor: 'sky' as const,
              iconColor: 'rgba(10, 92, 255, 0.12)',
            },
            {
              initials: 'JU', name: 'Jeshua Useche',
              role: 'Desarrollo Fullstack & UI/UX',
              desc: 'Transforma los requerimientos de tu negocio en código limpio, rápido y escalable en Next.js con estándares Awwwards y máxima conversión UI/UX.',
              badgeColor: 'lavender' as const,
              iconColor: 'rgba(224, 195, 252, 0.28)',
            },
          ].map((member, idx) => (
            <StaggerItem key={member.name} from={idx === 0 ? 'left' : 'right'}>
              <SpotlightCard className="p-8 flex flex-col sm:flex-row items-start gap-6 border-[var(--border-subtle)]">
                {/* Avatar with animated ring */}
                <div className="relative shrink-0">
                  <motion.div
                    className="border-sky-lavender w-16 h-16 rounded-full flex items-center justify-center font-black text-xl relative z-10 font-display text-[var(--text-slate)]"
                    style={{ background: member.iconColor }}
                    whileHover={prefersReduced ? {} : { scale: 1.1, rotate: -4 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as const }}
                  >
                    {member.initials}
                  </motion.div>
                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#0A5CFF]/30"
                    animate={prefersReduced ? {} : { scale: [1, 1.22, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-2.5 relative z-10">
                  <div>
                    <h4 className="font-display font-bold text-lg text-[var(--text-slate)]">
                      {member.name}
                    </h4>
                    <StatusBadge color={member.badgeColor} className="mt-1.5">{member.role}</StatusBadge>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{member.desc}</p>

                  {/* Contact pill */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all duration-200 bg-[#0A5CFF]/10 border border-[#0A5CFF]/25 text-[#0A5CFF] hover:bg-[#0A5CFF]/20"
                    >
                      <MessageCircle className="w-3 h-3" />
                      Contactar en WhatsApp
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8: CONTACTO DIRECTO
          ══════════════════════════════════════════════════════ */}
      <section id="contacto" className="py-24 px-4 md:px-8 max-w-4xl mx-auto relative">
        <FloatingOrbs palette="lavender" intensity="low" />

        <SectionReveal className="relative z-10" from="scale">
          <GlassSurface variant="strong" className="p-8 lg:p-12 relative overflow-hidden border-[var(--border-subtle)] shadow-[var(--sm-shadow-lg)]">
            {/* Sky glow behind form */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(10,92,255,0.12) 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="text-center space-y-3 mb-10 relative z-10">
              <StatusBadge color="sky" shimmer className="mb-3">Contacto Directo</StatusBadge>
              <h2 className="font-display font-black text-2xl md:text-4xl leading-tight text-[var(--text-slate)]">
                ¿Listo para darle a tu negocio<br className="hidden md:block" />
                {' '}la visibilidad y velocidad que merece?
              </h2>
              <p className="text-sm md:text-base text-[var(--text-secondary)]">
                Completa el formulario o escríbenos directamente a WhatsApp para coordinar tu asesoría sin costo en Santiago.
              </p>
            </div>

            {/* WhatsApp direct CTA */}
            <div
              className="relative z-10 mb-8 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-500/30 bg-emerald-500/[0.08]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#25D366] text-white shadow-xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--text-slate)]">¿Prefieres hablar ahora?</p>
                  <p className="text-[10px] text-[var(--text-secondary)]">Escríbenos al WhatsApp comercial para una respuesta inmediata</p>
                </div>
              </div>
              <a
                href="https://wa.me/56912345678?text=Hola%20S%26M%20Network%2C%20me%20interesa%20una%20asesor%C3%ADa%20gratuita"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center shrink-0 px-5 py-2.5 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider transition-all duration-200 bg-[#25D366] text-white shadow-md shadow-[#25D366]/25 hover:bg-[#1EBE5B]"
              >
                Ir al WhatsApp 🚀
              </a>
            </div>

            <div className="relative z-10 flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-[var(--border-subtle)]" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                O completa el formulario
              </span>
              <div className="h-px flex-1 bg-[var(--border-subtle)]" />
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
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-[#0A5CFF]/30 bg-[#0A5CFF]/10 text-[#0A5CFF]"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <h4 className="font-display font-bold text-xl text-[var(--text-slate)]">
                    ¡Mensaje Enviado con Éxito!
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    Muchas gracias por escribirnos. Nuestro equipo se pondrá en contacto a tu WhatsApp y correo para tu propuesta personalizada.
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
                    label="Nombre del Negocio / Restaurante"
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
                      className="text-xs font-semibold p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-600"
                    >
                      Por favor rellena todos los campos correctamente.
                    </motion.p>
                  )}

                  <MagneticButton type="submit" variant="primary" disabled={formStatus === 'loading'} className="w-full py-4 text-xs font-bold shadow-lg shadow-[#0A5CFF]/30">
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
      <footer className="mt-8 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="px-2 py-1 rounded-xl flex items-center justify-center shadow-xs border border-[var(--border-subtle)] bg-white/90">
                  <LogoIsotype className="w-7 h-4.5" />
                </div>
                <div>
                  <span className="block font-display font-bold text-xs leading-none text-[var(--text-slate)]">S&M Network</span>
                  <span className="block font-mono text-[7px] font-bold uppercase tracking-[0.16em] text-[#0A5CFF]">Company</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                Impulsando el crecimiento digital de PYMEs en Santiago, Chile con ingeniería cinética de punta y trato humano.
              </p>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#0A5CFF]" />
                <span className="font-mono text-[10px] text-[var(--text-secondary)]">Santiago Centro · RM, Chile 🇨🇱</span>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-2.5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#0A5CFF] mb-3">Soluciones</p>
              {['Páginas Web para PYMEs', 'Menús Digitales QR', 'Catálogos WhatsApp CLP', 'Automatización Mayorista'].map((s) => (
                <a
                  key={s}
                  href="#servicios"
                  className="flex items-center gap-1.5 text-xs transition-colors duration-200 group text-[var(--text-secondary)] hover:text-[var(--text-slate)]"
                >
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 text-[#0A5CFF]" />
                  {s}
                </a>
              ))}
            </div>

            {/* Navigation */}
            <div className="space-y-2.5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#0A5CFF] mb-3">Navegación</p>
              {['Servicios', 'Proceso', 'Nosotros', 'Contacto'].map((s) => (
                <a
                  key={s}
                  href={`#${s.toLowerCase()}`}
                  className="flex items-center gap-1.5 text-xs transition-colors duration-200 group text-[var(--text-secondary)] hover:text-[var(--text-slate)]"
                >
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 text-[#0A5CFF]" />
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[var(--border-subtle)]">
            <p className="font-mono text-[10px] text-[var(--text-secondary)]">
              © {new Date().getFullYear()} S&M Network Company. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-emerald-500" />
              Sin cobros mensuales · Next.js Nativo · Hecho con 💙 en Santiago, Chile
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
