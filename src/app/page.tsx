'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Code,
  Smartphone,
  Sparkles,
  Users,
  Globe,
  ShoppingBag,
  Heart,
  Send,
  Loader2,
  Compass,
  CheckCircle2,
  Lock,
  ChevronRight,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  Clock,
  X
} from 'lucide-react';

// ─── Server Action (mock) ──────────────────────────────────────────────────────
async function sendLeadEmail(formData: { name: string; businessName: string; whatsapp: string }) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log('Lead submitted to S&M Network Company:', formData);
  return { success: true };
}

// ─── Motion Variants ──────────────────────────────────────────────────────────
const fadeUpVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// ─── Specular Glow Card ────────────────────────────────────────────────────────
function GlassCard({
  children,
  className = '',
  dark = false,
  hoverColor = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  hoverColor?: string;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mx', `${x}%`);
    cardRef.current.style.setProperty('--my', `${y}%`);
  }, [prefersReduced]);

  const baseClass = dark ? 'glass-card-dark' : 'glass-card';
  const hoverClass = hoverColor ? `hover:border-[${hoverColor}]/50` : '';

  return (
    <motion.div
      ref={cardRef}
      className={`${baseClass} glass-specular-overlay rounded-3xl relative overflow-hidden ${hoverClass} ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={prefersReduced ? {} : { y: -8, scale: 1.015 }}
      whileTap={prefersReduced ? {} : { scale: 0.985 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// ─── Liquid Glass Pill Button ──────────────────────────────────────────────────
function GlassPillButton({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  primary = false,
  className = '',
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  primary?: boolean;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  const baseStyle = primary
    ? 'bg-[#10B981] text-white border border-emerald-400/40 shadow-[0_4px_16px_-4px_rgba(16,185,129,0.5)] hover:bg-emerald-500 hover:shadow-[0_8px_32px_-4px_rgba(16,185,129,0.6)]'
    : 'bg-white/70 backdrop-blur-md border border-white/80 text-[#1C1917] shadow-sm hover:bg-white/95 hover:shadow-md';

  const combinedClasses = `glass-cta-btn inline-flex items-center justify-center rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer select-none ${baseStyle} ${disabled ? 'opacity-60 pointer-events-none' : ''} ${className}`;

  const motionProps = prefersReduced ? {} : {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { scale: 0.96 },
    transition: { duration: 0.25, ease: 'easeOut' as const },
  };

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} className={combinedClasses} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} disabled={disabled} onClick={onClick} className={combinedClasses} {...motionProps}>
      {children}
    </motion.button>
  );
}

// ─── Floating Nav ─────────────────────────────────────────────────────────────
function FloatingNav({ santiagoTime }: { santiagoTime: string }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 48);
  });

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={`fixed top-4 left-4 right-4 max-w-7xl mx-auto rounded-full px-4 md:px-7 py-2.5 flex items-center justify-between z-50 transition-all duration-500 will-change-transform ${
        scrolled
          ? 'bg-white/90 backdrop-blur-[28px] border border-white/70 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.9)]'
          : 'bg-white/65 backdrop-blur-[24px] border border-white/50 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center relative shrink-0 shadow-sm border border-neutral-700/50">
          <span className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-tr from-emerald-400 to-cyan-400">S&M</span>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-white animate-pulse shadow-sm" />
        </div>
        <div className="hidden sm:block">
          <span className="font-extrabold text-sm tracking-tight text-[#0F172A] block leading-none">S&M Network</span>
          <span className="block text-[7px] text-[#10B981] font-black uppercase tracking-widest">Company</span>
        </div>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-7 text-[#737373] font-bold text-xs uppercase tracking-wider">
        {['Servicios', 'Proceso', 'Nosotros', 'Contacto'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="relative hover:text-[#0F172A] transition-colors duration-200 group py-1"
          >
            {link}
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 rounded-full bg-[#10B981] transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 bg-white/70 border border-neutral-200/50 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-[#737373] shadow-sm backdrop-blur-md">
          <Clock className="w-3 h-3 text-[#10B981] shrink-0" />
          <span className="font-extrabold tabular-nums">{santiagoTime}</span>
          <span className="text-neutral-400">Santiago CL</span>
        </div>
        <GlassPillButton href="#contacto" primary className="px-5 py-2 text-[10px]">
          Contacto Directo
        </GlassPillButton>
      </div>
    </motion.nav>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Page() {
  const prefersReduced = useReducedMotion();

  // ── Form State ───────────────────────────────────────────────────────────────
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // ── Santiago Time ─────────────────────────────────────────────────────────
  const [santiagoTime, setSantiagoTime] = useState<string>('--:--:--');

  useEffect(() => {
    const updateTime = () => {
      try {
        setSantiagoTime(
          new Intl.DateTimeFormat('es-CL', {
            timeZone: 'America/Santiago',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).format(new Date())
        );
      } catch {
        const n = new Date();
        setSantiagoTime(
          `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}:${String(n.getSeconds()).padStart(2, '0')}`
        );
      }
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  // ── Dona Flor Menu ────────────────────────────────────────────────────────
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Empanadas Pino Horno', price: 2800, desc: 'Pino de res, aceituna de Azapa y huevo.', count: 1 },
    { id: 2, name: 'Arepa Reina Pepiada', price: 4500, desc: 'Pollo deshilachado, palta y mayonesa casera.', count: 1 },
    { id: 3, name: 'Arepa Pabellón', price: 5000, desc: 'Carne mechada, porotos negros, queso y tajadas.', count: 0 },
  ]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const handleIncrement = (id: number) => setMenuItems((items) => items.map((i) => (i.id === id ? { ...i, count: i.count + 1 } : i)));
  const handleDecrement = (id: number) => setMenuItems((items) => items.map((i) => (i.id === id && i.count > 0 ? { ...i, count: i.count - 1 } : i)));
  const calculateTotal = () => menuItems.reduce((acc, i) => acc + i.price * i.count, 0);

  // ── Form Submit ───────────────────────────────────────────────────────────
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !businessName || !whatsapp) { setFormStatus('error'); return; }
    setFormStatus('loading');
    try {
      const res = await sendLeadEmail({ name, businessName, whatsapp });
      setFormStatus(res.success ? 'success' : 'error');
    } catch { setFormStatus('error'); }
  };

  // ── Viewport variant helper ───────────────────────────────────────────────
  const viewportOnce = { once: true, margin: '-60px' };

  return (
    <div className="min-h-screen text-[#1C1917] overflow-x-hidden font-sans" style={{ background: 'var(--bg-base)' }}>

      {/* ── Ambient Floating Orbs ── */}
      {!prefersReduced && (
        <>
          <div className="ambient-orb ambient-orb-1" aria-hidden="true" />
          <div className="ambient-orb ambient-orb-2" aria-hidden="true" />
          <div className="ambient-orb ambient-orb-3" aria-hidden="true" />
        </>
      )}

      {/* ── Floating Nav ── */}
      <FloatingNav santiagoTime={santiagoTime} />

      {/* ── Page Content ── */}
      <div className="relative z-10 px-4 md:px-6 lg:px-10 pt-24 pb-10 max-w-7xl mx-auto space-y-10">

        {/* ══════════════════════════════════════════════════════════════
            OUTER STRUCTURAL GLASS FRAME
            ══════════════════════════════════════════════════════════════ */}
        <div className="glass-card rounded-[2.5rem] p-4 md:p-8 lg:p-10 space-y-16 relative overflow-hidden">

          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '1.5rem 1.5rem' }}
            aria-hidden="true"
          />

          {/* ─── SECTION 1: HERO ──────────────────────────────────────────── */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 pt-2">

            {/* Left — Main Value Prop */}
            <motion.div
              custom={0}
              variants={prefersReduced ? {} : fadeUpVariant}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7"
            >
              <GlassCard className="p-8 lg:p-12 flex flex-col justify-between min-h-[420px]" hoverColor="#10B981">
                <div className="space-y-6 relative z-10">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#10B981] border border-emerald-200/60 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      React / Next.js
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-50 text-[#06B6D4] border border-cyan-200/60 backdrop-blur-sm">
                      Tailored Code
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-neutral-100/80 text-[#737373] border border-neutral-200 backdrop-blur-sm">
                      Santiago, CL 🇨🇱
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black text-[#0F172A] tracking-tight leading-[1.08]">
                    Impulsamos el crecimiento digital de tu PYME con{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-cyan-500 to-emerald-500">
                      empatía y transparencia
                    </span>
                  </h1>

                  <p className="text-sm md:text-base text-[#737373] leading-relaxed font-medium max-w-xl">
                    Desarrollamos soluciones web únicas y rápidas para restaurantes, comercios locales y distribuidoras en Santiago. Sin cobros mensuales amarrados, con presupuesto justo y comunicación cercana.
                  </p>
                </div>

                <div className="pt-8 relative z-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <GlassPillButton href="#contacto" primary className="w-full sm:w-auto px-8 py-4 text-xs">
                    <ArrowRight className="w-3.5 h-3.5 mr-2 -ml-1" />
                    Agendar Asesoría Gratuita
                  </GlassPillButton>
                  <GlassPillButton href="#servicios" className="w-full sm:w-auto px-6 py-4 text-xs">
                    Conocer Soluciones
                  </GlassPillButton>
                </div>
              </GlassCard>
            </motion.div>

            {/* Right — Phone Mockup (Dona Flor) */}
            <motion.div
              custom={0.1}
              variants={prefersReduced ? {} : fadeUpVariant}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5"
            >
              <GlassCard className="p-6 lg:p-8 flex flex-col justify-center items-center min-h-[420px]" hoverColor="#06B6D4">
                {/* iOS Phone Frame */}
                <div className="w-full max-w-[295px] bg-[#0F172A] rounded-[40px] border-4 border-neutral-800 shadow-2xl overflow-hidden relative ring-8 ring-white/30">

                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30" />

                  {/* Status Bar */}
                  <div className="bg-neutral-900 pt-8 pb-2 flex justify-between px-5 items-center">
                    <span className="text-[9px] text-neutral-400 font-semibold tabular-nums">{santiagoTime.slice(0,5)}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      <span className="text-[9px] text-neutral-400">5G 🔋</span>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="bg-[#0F172A] p-4 border-b border-neutral-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] uppercase font-extrabold tracking-widest bg-emerald-500/20 text-[#10B981] px-2 py-0.5 rounded border border-emerald-500/10">
                        Demo Interactiva
                      </span>
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                    </div>
                    <h3 className="text-sm font-black text-white mt-1">Dona Flor Gourmet 🇨🇱</h3>
                    <p className="text-[10px] text-neutral-400">Santiago Centro • Pedidos al WhatsApp</p>
                  </div>

                  {/* Menu Items */}
                  <div className="p-3 space-y-2 max-h-[200px] overflow-y-auto bg-neutral-900/95">
                    {menuItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-2.5 bg-neutral-800/80 rounded-xl border border-neutral-700/40">
                        <div className="flex-1 pr-2 space-y-0.5">
                          <h4 className="font-bold text-xs text-white leading-tight">{item.name}</h4>
                          <span className="text-[10px] font-extrabold text-[#10B981] block">
                            ${item.price.toLocaleString('es-CL')} CLP
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-800 rounded-lg p-1 shrink-0">
                          <button onClick={() => handleDecrement(item.id)} className="w-4 h-4 rounded bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center font-bold text-[10px] border border-neutral-700/60 transition-colors">
                            −
                          </button>
                          <span className="w-3 text-center text-[9px] font-bold text-white tabular-nums">{item.count}</span>
                          <button onClick={() => handleIncrement(item.id)} className="w-4 h-4 rounded bg-[#10B981] hover:bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] transition-colors">
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Checkout Bar */}
                  <div className="border-t border-neutral-800 p-3.5 bg-neutral-950 relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-[8px] text-neutral-500 font-extrabold uppercase tracking-wider">Total Pedido</span>
                        <span className="text-xs font-black text-[#10B981] tabular-nums">${calculateTotal().toLocaleString('es-CL')} CLP</span>
                      </div>
                      <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="px-3 py-1.5 rounded-lg text-[9px] font-extrabold text-neutral-950 bg-[#10B981] hover:bg-emerald-400 transition-colors uppercase tracking-wider"
                      >
                        Enviar a WhatsApp
                      </button>
                    </div>

                    {/* Checkout Summary Sheet */}
                    <AnimatePresence>
                      {isCheckoutOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 16 }}
                          transition={{ duration: 0.28, ease: 'easeOut' as const }}
                          className="absolute inset-0 bg-neutral-950 p-4 z-40 flex flex-col justify-between border-t border-neutral-800"
                        >
                          <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                            <span className="text-[10px] font-extrabold text-[#10B981] uppercase">Resumen Pedido</span>
                            <button onClick={() => setIsCheckoutOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[10px] text-neutral-300 space-y-2 my-3">
                            <p className="font-semibold text-white text-[11px]">Mensaje preformateado para WhatsApp:</p>
                            <p className="text-[9px] text-neutral-400 bg-neutral-900 p-2 rounded border border-neutral-800 leading-relaxed">
                              &ldquo;Hola Dona Flor Gourmet, quisiera pedir: {menuItems.filter((i) => i.count > 0).map((i) => `${i.count}x ${i.name}`).join(', ') || '1x Empanadas'}. Total: ${calculateTotal().toLocaleString('es-CL')} CLP&rdquo;
                            </p>
                          </div>
                          <button
                            onClick={() => { alert('¡Redireccionando al WhatsApp comercial!'); setIsCheckoutOpen(false); }}
                            className="w-full py-1.5 bg-[#10B981] text-neutral-950 font-black text-[9px] rounded uppercase tracking-wider hover:bg-emerald-400 transition-colors"
                          >
                            Confirmar e Ir a WhatsApp
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </section>

          {/* ─── SECTION 2: EL PROBLEMA VS. LA SOLUCIÓN ──────────────── */}
          <section className="pt-6 border-t border-white/60">
            <motion.div
              variants={prefersReduced ? {} : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Problem Card */}
              <motion.div variants={prefersReduced ? {} : staggerItem}>
                <GlassCard className="p-8 flex flex-col justify-between min-h-[280px]" hoverColor="#f43f5e">
                  <div className="space-y-5 relative z-10">
                    <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100 shadow-sm">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-[#0F172A]">El Problema de las PYMEs</h3>
                      <p className="text-sm text-[#737373] leading-relaxed font-medium">
                        Agencias tradicionales que cobran mensualidades excesivas, o sitios prefabricados lentos, vulnerables y sin optimización para ventas locales en Santiago.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200/60 text-[10px] font-extrabold uppercase text-[#737373] tracking-wider">
                    Sitios lentos • Mensualidades altas • Enredos técnicos
                  </div>
                </GlassCard>
              </motion.div>

              {/* Solution Card */}
              <motion.div variants={prefersReduced ? {} : staggerItem}>
                <GlassCard className="p-8 flex flex-col justify-between min-h-[280px]" hoverColor="#10B981">
                  <div className="space-y-5 relative z-10">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center border border-emerald-100 shadow-sm">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-[#0F172A]">La Solución S&M</h3>
                      <p className="text-sm text-[#737373] leading-relaxed font-medium">
                        Presupuesto justo de un único pago inicial, código estático ultrarrápido en Next.js, catálogos interactivos que envían pedidos directo a tu WhatsApp.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-emerald-100 text-[10px] font-extrabold uppercase text-[#10B981] tracking-wider">
                    Un único pago • Código propio • Conexión directa
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </section>

          {/* ─── SECTION 3: SERVICIOS ─────────────────────────────────── */}
          <section id="servicios" className="space-y-8 pt-6 border-t border-white/60">
            <motion.div
              variants={prefersReduced ? {} : fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center max-w-2xl mx-auto space-y-3"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#06B6D4] bg-cyan-50 border border-cyan-100">
                <Sparkles className="w-3.5 h-3.5" />
                Catálogo de Soluciones
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">Servicios Digitales con Estilo Bento</h2>
            </motion.div>

            <motion.div
              variants={prefersReduced ? {} : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: <Globe className="w-6 h-6" />,
                  iconBg: 'bg-emerald-50 text-[#10B981] border-emerald-100',
                  title: 'Páginas Web para PYMEs',
                  desc: 'Plataformas optimizadas para Google y móviles. Atraen clientes de tu zona geográfica en Santiago de forma fluida y profesional.',
                  badge: 'Velocidad + SEO Local',
                  badgeColor: 'text-[#10B981]',
                  hover: '#10B981',
                },
                {
                  icon: <Smartphone className="w-6 h-6" />,
                  iconBg: 'bg-cyan-50 text-[#06B6D4] border-cyan-100',
                  title: 'Menús y Catálogos Digitales',
                  desc: 'Catálogos sin comisiones de terceros. Recibe solicitudes detalladas con montos CLP listos para procesar en tu WhatsApp.',
                  badge: 'Precios CLP + WhatsApp',
                  badgeColor: 'text-[#06B6D4]',
                  hover: '#06B6D4',
                },
                {
                  icon: <ShoppingBag className="w-6 h-6" />,
                  iconBg: 'bg-neutral-100 text-[#1C1917] border-neutral-200',
                  title: 'Distribución y Venta Online',
                  desc: 'Sistemas simples para distribuidoras y locales comerciales. Recopilación ágil de leads y catálogo de inventarios.',
                  badge: 'Automatización de Ventas',
                  badgeColor: 'text-[#737373]',
                  hover: '#8B5CF6',
                },
              ].map((service, i) => (
                <motion.div key={i} variants={prefersReduced ? {} : staggerItem}>
                  <GlassCard className="p-8 flex flex-col justify-between min-h-[360px]" hoverColor={service.hover}>
                    <div className="space-y-5 relative z-10">
                      <motion.div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${service.iconBg}`}
                        whileHover={prefersReduced ? {} : { scale: 1.12, rotate: 4 }}
                        transition={{ duration: 0.25, ease: 'easeOut' as const }}
                      >
                        {service.icon}
                      </motion.div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-[#0F172A]">{service.title}</h3>
                        <p className="text-xs text-[#737373] leading-relaxed font-medium">{service.desc}</p>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-neutral-100 flex items-center justify-between relative z-10">
                      <span className={`text-[9px] font-extrabold uppercase tracking-wider ${service.badgeColor}`}>{service.badge}</span>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ─── SECTION 4: PROCESO ───────────────────────────────────── */}
          <section id="proceso" className="space-y-8 pt-6 border-t border-white/60">
            <motion.div
              variants={prefersReduced ? {} : fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center max-w-2xl mx-auto space-y-3"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#10B981] bg-emerald-50 border border-emerald-100">
                <Compass className="w-3.5 h-3.5" />
                Metodología Ágil
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">
                Proceso: Conexión → Creación → Lanzamiento
              </h2>
            </motion.div>

            <motion.div
              variants={prefersReduced ? {} : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative"
            >
              {/* Connecting line (desktop) */}
              <div className="hidden md:block absolute top-12 left-[calc(33.33%-1rem)] right-[calc(33.33%-1rem)] h-0.5 bg-gradient-to-r from-emerald-200 via-cyan-200 to-transparent rounded-full pointer-events-none" />

              {[
                { step: '01', label: 'Conexión', color: 'text-neutral-400', dot: 'bg-neutral-300', hover: '#10B981', delay: 0, desc: 'Andri escucha la historia y visión de tu negocio. Analizamos tus necesidades reales y definimos un presupuesto transparente sin sorpresas.' },
                { step: '02', label: 'Creación', color: 'text-[#10B981]', dot: 'bg-[#10B981]', hover: '#10B981', delay: 0.08, desc: 'Jeshua desarrolla código a medida en Next.js. Prototipamos la interfaz y enviamos demos para revisar cada detalle contigo.', pulse: true },
                { step: '03', label: 'Lanzamiento', color: 'text-[#06B6D4]', dot: 'bg-[#06B6D4]', hover: '#06B6D4', delay: 0.16, desc: 'Publicamos tu web en el dominio definitivo y capacitamos a tu equipo para autogestionar el sitio con facilidad.' },
              ].map((step) => (
                <motion.div key={step.step} variants={prefersReduced ? {} : staggerItem}>
                  <GlassCard className="p-8 flex flex-col gap-4" hoverColor={step.hover}>
                    <div className={`text-xs font-black uppercase tracking-widest flex justify-between items-center ${step.color} relative z-10`}>
                      <span>Paso {step.step}</span>
                      <span className={`w-2 h-2 rounded-full ${step.dot} ${step.pulse ? 'animate-pulse' : ''}`} />
                    </div>
                    <h4 className="font-black text-lg text-[#0F172A] relative z-10">{step.step}. {step.label}</h4>
                    <p className="text-xs text-[#737373] leading-relaxed font-medium relative z-10">{step.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ─── SECTION 5: QUIÉNES SOMOS ─────────────────────────────── */}
          <section id="nosotros" className="space-y-8 pt-6 border-t border-white/60">
            <motion.div
              variants={prefersReduced ? {} : fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center max-w-2xl mx-auto space-y-3"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#10B981] bg-emerald-50 border border-emerald-100">
                <Users className="w-3.5 h-3.5" />
                Socios Estratégicos
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">El Equipo Detrás de S&M</h2>
            </motion.div>

            <motion.div
              variants={prefersReduced ? {} : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {/* Andri */}
              <motion.div variants={prefersReduced ? {} : staggerItem}>
                <GlassCard dark className="p-8 flex flex-col sm:flex-row items-start gap-6 min-h-[200px]" hoverColor="#10B981">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-[#10B981] text-white flex items-center justify-center font-black text-lg shadow-md shrink-0 border border-emerald-400/30 relative z-10"
                    whileHover={prefersReduced ? {} : { scale: 1.08, rotate: -3 }}
                    transition={{ duration: 0.25, ease: 'easeOut' as const }}
                  >
                    AM
                  </motion.div>
                  <div className="space-y-2 relative z-10">
                    <div>
                      <h4 className="font-extrabold text-base text-white">Andri Manrrique</h4>
                      <p className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-wider">Liderazgo Comercial & Gestión</p>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed font-medium">
                      Enfocado en relaciones comerciales empáticas, atención personalizada y presupuestos realistas sin sobrecostos para PYMEs.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Jeshua */}
              <motion.div variants={prefersReduced ? {} : staggerItem}>
                <GlassCard dark className="p-8 flex flex-col sm:flex-row items-start gap-6 min-h-[200px]" hoverColor="#06B6D4">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-neutral-700 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0 border border-neutral-600 relative z-10"
                    whileHover={prefersReduced ? {} : { scale: 1.08, rotate: 3 }}
                    transition={{ duration: 0.25, ease: 'easeOut' as const }}
                  >
                    JU
                  </motion.div>
                  <div className="space-y-2 relative z-10">
                    <div>
                      <h4 className="font-extrabold text-base text-white">Jeshua Useche</h4>
                      <p className="text-[10px] font-extrabold text-[#06B6D4] uppercase tracking-wider">Desarrollo Fullstack & UI/UX</p>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed font-medium">
                      Transforma los requerimientos del cliente en código limpio, rápido y escalable en Next.js y React con estándares UI/UX modernos.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </section>

          {/* ─── SECTION 6: CONTACTO ──────────────────────────────────── */}
          <section id="contacto" className="max-w-3xl mx-auto">
            <motion.div
              variants={prefersReduced ? {} : fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <GlassCard dark className="p-8 lg:p-12 relative overflow-hidden">
                {/* Radial backlight */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />

                <div className="text-center space-y-3 mb-8 relative z-10">
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                    ¿Listo para darle a tu negocio la visibilidad que merece? Conversemos.
                  </h3>
                  <p className="text-sm text-[#94A3B8] font-medium">
                    Completa el formulario y nos contactaremos a tu WhatsApp para coordinar tu propuesta.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {formStatus === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' as const }}
                      className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-6 rounded-2xl text-center space-y-3 relative z-10"
                    >
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-[#10B981] border border-emerald-500/30">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-extrabold text-base">¡Mensaje Enviado con Éxito!</h4>
                      <p className="text-xs text-emerald-400 font-medium leading-relaxed">
                        Muchas gracias por escribirnos. Nuestro equipo se pondrá en contacto a tu WhatsApp para tu asesoría gratuita.
                      </p>
                    </motion.div>
                  ) : (
                    <form key="form" onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-widest mb-2">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          placeholder="Juan Pérez"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#10B981]/60 focus:border-[#10B981]/50 transition-all text-sm font-medium text-white placeholder-neutral-600 backdrop-blur-sm"
                        />
                      </div>

                      {/* Business */}
                      <div>
                        <label htmlFor="businessName" className="block text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-widest mb-2">
                          Nombre del Negocio
                        </label>
                        <input
                          type="text"
                          id="businessName"
                          required
                          placeholder="Ej. Dona Flor Gourmet, Distribuidora El Bosque..."
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#10B981]/60 focus:border-[#10B981]/50 transition-all text-sm font-medium text-white placeholder-neutral-600 backdrop-blur-sm"
                        />
                      </div>

                      {/* WhatsApp */}
                      <div>
                        <label htmlFor="whatsapp" className="block text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-widest mb-2">
                          numero de whatsapp
                        </label>
                        <input
                          type="tel"
                          id="whatsapp"
                          required
                          placeholder="Ej. +56 9 1234 5678"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#10B981]/60 focus:border-[#10B981]/50 transition-all text-sm font-medium text-white placeholder-neutral-600 backdrop-blur-sm"
                        />
                      </div>

                      {formStatus === 'error' && (
                        <p className="text-xs text-red-400 font-bold bg-red-950/30 p-3 rounded-xl border border-red-900/50">
                          Por favor rellena todos los campos correctamente.
                        </p>
                      )}

                      <GlassPillButton type="submit" primary disabled={formStatus === 'loading'} className="w-full py-4 text-xs">
                        {formStatus === 'loading' ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                            Procesando...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 mr-2" />
                            Enviar Mensaje
                          </>
                        )}
                      </GlassPillButton>
                    </form>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          </section>

          {/* ─── FOOTER ───────────────────────────────────────────────── */}
          <footer className="pt-8 border-t border-white/60 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center shadow-sm border border-neutral-700/50">
                <span className="text-[9px] font-black text-transparent bg-clip-text bg-gradient-to-tr from-emerald-400 to-cyan-400">S&M</span>
              </div>
              <div>
                <span className="font-extrabold text-xs text-[#0F172A] block leading-none">S&M Network</span>
                <span className="block text-[7px] text-[#10B981] font-black uppercase tracking-widest">Company</span>
              </div>
            </div>
            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider text-center">
              © {new Date().getFullYear()} S&M Network Company. Todos los derechos reservados. Santiago, Chile.
            </p>
            <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-bold">
              <Lock className="w-3 h-3 text-[#10B981]" />
              <span>Sin cobros mensuales. Código propio.</span>
            </div>
          </footer>

        </div>{/* end outer glass frame */}
      </div>{/* end content container */}
    </div>
  );
}
