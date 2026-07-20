'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Mock Server Action representing lead email dispatch
async function sendLeadEmail(formData: { name: string; businessName: string; whatsapp: string }) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log('Lead submitted successfully to S&M Network Company:', formData);
  return { success: true };
}

// Lightweight motion transition
const smoothTransition = { duration: 0.3, ease: 'easeOut' as const };

// Refractive Liquid Glass Pill Button Component
function GlassPillButton({ 
  children, 
  href, 
  onClick,
  type = 'button',
  disabled = false,
  primary = false,
  className = '' 
}: { 
  children: React.ReactNode; 
  href?: string; 
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  primary?: boolean;
  className?: string;
}) {
  const baseStyle = primary
    ? 'bg-[#10B981] hover:bg-[#059669] text-white shadow-md shadow-emerald-500/10 border border-emerald-400/30'
    : 'bg-white/70 backdrop-blur-md border border-white/90 text-[#1C1917] shadow-sm hover:bg-white/95';

  const combinedClasses = `inline-flex items-center justify-center rounded-full text-xs font-black uppercase tracking-wider active:scale-95 transition-all cursor-pointer select-none ${baseStyle} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        transition={smoothTransition}
        className={combinedClasses}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={smoothTransition}
      className={combinedClasses}
    >
      {children}
    </motion.button>
  );
}

export default function Page() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    whatsapp: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Live Santiago Time Clock (HH:MM:SS)
  const [santiagoTime, setSantiagoTime] = useState<string>('--:--:--');

  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'America/Santiago',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        setSantiagoTime(new Intl.DateTimeFormat('es-CL', options).format(new Date()));
      } catch {
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        setSantiagoTime(`${hh}:${mm}:${ss}`);
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Restaurant Menu Interactivity State (Dona Flor Gourmet)
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Empanadas Pino Horno', price: 2800, desc: 'Pino picado de res, aceituna de Azapa y huevo.', count: 1 },
    { id: 2, name: 'Arepa Reina Pepiada', price: 4500, desc: 'Pollo deshilachado con palta y mayonesa casera.', count: 1 },
    { id: 3, name: 'Arepa Pabellón', price: 5000, desc: 'Carne mechada, porotos negros, queso y tajadas.', count: 0 }
  ]);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleIncrement = (id: number) => {
    setMenuItems(items =>
      items.map(item => item.id === id ? { ...item, count: item.count + 1 } : item)
    );
  };

  const handleDecrement = (id: number) => {
    setMenuItems(items =>
      items.map(item => item.id === id && item.count > 0 ? { ...item, count: item.count - 1 } : item)
    );
  };

  const calculateTotal = () => {
    return menuItems.reduce((acc, item) => acc + (item.price * item.count), 0);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.businessName || !formData.whatsapp) {
      setFormStatus('error');
      return;
    }
    setFormStatus('loading');
    try {
      const res = await sendLeadEmail(formData);
      if (res.success) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] selection:bg-emerald-100 selection:text-emerald-950 overflow-x-hidden antialiased font-sans p-4 md:p-6 lg:p-10 pt-24 relative">
      
      {/* HEADER: iOS-Style Floating Tap Bar */}
      <nav className="fixed top-4 left-4 right-4 max-w-7xl mx-auto bg-white/70 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] rounded-full px-4 md:px-7 py-2.5 flex items-center justify-between z-50 transform-gpu transition-all duration-300">
        
        {/* Left Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1C1917] flex items-center justify-center text-white font-extrabold shadow-sm border border-neutral-700 relative shrink-0">
            <span className="text-[11px] text-transparent bg-clip-text bg-gradient-to-tr from-emerald-400 to-[#06B6D4]">S&M</span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-[#1C1917] animate-pulse" />
          </div>
          <div className="hidden sm:block">
            <span className="font-extrabold text-sm tracking-tight text-[#1C1917] block">
              S&M Network
            </span>
            <span className="block text-[7px] text-[#10B981] font-black uppercase tracking-widest -mt-1">Company</span>
          </div>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-7 text-[#737373] font-bold text-xs uppercase tracking-wider">
          <a href="#servicios" className="hover:text-[#1C1917] transition-colors">Servicios</a>
          <a href="#proceso" className="hover:text-[#1C1917] transition-colors">Proceso</a>
          <a href="#nosotros" className="hover:text-[#1C1917] transition-colors">Nosotros</a>
          <a href="#contacto" className="hover:text-[#1C1917] transition-colors">Contacto</a>
        </div>

        {/* Right Santiago Clock & CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 bg-white/80 border border-neutral-200/60 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold text-[#737373] shadow-inner">
            <Clock className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{santiagoTime} en Santiago, CL</span>
          </div>

          <GlassPillButton
            href="#contacto"
            primary
            className="px-5 py-2 text-[10px]"
          >
            Contacto Directo
          </GlassPillButton>
        </div>
      </nav>

      {/* Main Structural Container */}
      <div className="max-w-7xl mx-auto border border-white/80 rounded-3xl bg-white/60 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_20px_rgba(0,0,0,0.03)] p-4 md:p-8 lg:p-10 space-y-16 relative overflow-hidden transform-gpu">
        
        {/* Subtle dot grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40 pointer-events-none" />

        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 pt-4">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smoothTransition}
            whileHover={{ y: -3, scale: 1.01 }}
            className="lg:col-span-7 bg-white/60 border border-white/80 rounded-3xl backdrop-blur-md p-8 lg:p-12 flex flex-col justify-between shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:border-[#10B981]/40 transition-all duration-300 transform-gpu"
          >
            <div className="space-y-6 relative z-10">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#10B981] border border-emerald-200/50 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  REACT / NEXT.JS
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-50 text-[#06B6D4] border border-cyan-200/50 backdrop-blur-md">
                  TAILORED CODE
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-neutral-100 text-[#737373] border border-neutral-200 backdrop-blur-md">
                  SANTIAGO, CL
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-[46px] font-extrabold text-[#1C1917] tracking-tight leading-[1.1]">
                Impulsamos el crecimiento digital de tu PYME con <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-500">empatía y transparencia</span>
              </h1>

              <p className="text-sm md:text-base text-[#737373] leading-relaxed font-medium max-w-xl">
                Desarrollamos soluciones web únicas y rápidas para restaurantes, comercios locales y distribuidoras en Santiago. Sin cobros mensuales amarrados, con presupuesto justo y comunicación cercana.
              </p>
            </div>

            <div className="pt-8 relative z-10 flex flex-col sm:flex-row gap-4 items-center">
              <GlassPillButton
                href="#contacto"
                primary
                className="w-full sm:w-auto px-8 py-4 text-xs"
              >
                Agendar Asesoría Gratuita
              </GlassPillButton>
              <GlassPillButton
                href="#servicios"
                className="w-full sm:w-auto px-6 py-4 text-xs"
              >
                Conocer Soluciones
              </GlassPillButton>
            </div>
          </motion.div>

          {/* Right Column (Device Frame) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.05 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className="lg:col-span-5 bg-white/60 border border-white/80 rounded-3xl backdrop-blur-md p-6 lg:p-8 flex flex-col justify-center items-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:border-[#06B6D4]/40 transition-all duration-300 transform-gpu"
          >
            <div className="w-full max-w-[310px] bg-[#1C1917] rounded-[40px] border-4 border-neutral-900 shadow-2xl overflow-hidden relative ring-8 ring-neutral-200/50">
              
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 block" />
              </div>

              {/* Status Bar */}
              <div className="bg-neutral-900 pt-8 pb-2 text-center text-[9px] text-neutral-400 font-semibold tracking-wider flex justify-between px-6 items-center">
                <span>12:45 PM</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>5G 🔋</span>
                </div>
              </div>

              {/* Banner */}
              <div className="bg-[#1C1917] p-4 text-white border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase font-extrabold tracking-widest bg-emerald-500/20 text-[#10B981] px-2 py-0.5 rounded border border-emerald-500/10">
                    Demo Interactiva
                  </span>
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                </div>
                <h3 className="text-sm font-black mt-2">
                  Dona Flor Gourmet <span className="text-xs">🇨🇱</span>
                </h3>
                <p className="text-[10px] text-neutral-400">Santiago Centro • Pedidos al WhatsApp</p>
              </div>

              {/* Items List */}
              <div className="p-3.5 space-y-2.5 max-h-[210px] overflow-y-auto bg-neutral-900/95 scrollbar-thin scrollbar-thumb-neutral-800">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2.5 bg-neutral-800/80 rounded-xl border border-neutral-700/40">
                    <div className="space-y-0.5 flex-1 pr-2">
                      <h4 className="font-bold text-xs text-white leading-tight">{item.name}</h4>
                      <span className="text-[10px] font-extrabold text-[#10B981] block mt-0.5">
                        ${item.price.toLocaleString('es-CL')} CLP
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-800 rounded-lg p-1 shrink-0">
                      <button 
                        onClick={() => handleDecrement(item.id)}
                        className="w-4 h-4 rounded bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center font-bold text-[9px] border border-neutral-700/60"
                      >
                        -
                      </button>
                      <span className="w-2.5 text-center text-[9px] font-bold text-white">{item.count}</span>
                      <button 
                        onClick={() => handleIncrement(item.id)}
                        className="w-4 h-4 rounded bg-[#10B981] hover:bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Bar */}
              <div className="border-t border-neutral-800 p-4 bg-neutral-950 flex flex-col gap-2 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-[8px] text-neutral-500 font-extrabold uppercase tracking-wider">Total Pedido</span>
                    <span className="text-xs font-black text-[#10B981]">${calculateTotal().toLocaleString('es-CL')} CLP</span>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="px-3.5 py-2 rounded-lg text-[9px] font-extrabold text-neutral-950 bg-[#10B981] hover:bg-emerald-400 transition-colors shadow-sm uppercase tracking-wider"
                  >
                    Enviar a WhatsApp
                  </button>
                </div>

                {/* Summary Modal */}
                <AnimatePresence>
                  {isCheckoutOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={smoothTransition}
                      className="absolute inset-0 bg-neutral-950 p-4 z-40 flex flex-col justify-between border-t border-neutral-800 text-white transform-gpu"
                    >
                      <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                        <span className="text-[10px] font-extrabold text-[#10B981] uppercase">Resumen Pedido</span>
                        <button onClick={() => setIsCheckoutOpen(false)} className="text-neutral-400 hover:text-white">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-neutral-300 space-y-1 my-2">
                        <p className="font-semibold text-white">Cliente listo para enviar mensaje preformateado a WhatsApp:</p>
                        <p className="text-[9px] text-neutral-400 bg-neutral-900 p-2 rounded border border-neutral-800">
                          "Hola Dona Flor Gourmet, quisiera pedir: {menuItems.filter(i => i.count > 0).map(i => `${i.count}x ${i.name}`).join(', ') || '1x Empanadas'}. Total: ${calculateTotal().toLocaleString('es-CL')} CLP"
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          alert('¡Redireccionando al WhatsApp comercial del negocio!');
                          setIsCheckoutOpen(false);
                        }}
                        className="w-full py-1.5 bg-[#10B981] text-neutral-950 font-black text-[9px] rounded uppercase tracking-wider"
                      >
                        Confirmar e Ir a WhatsApp
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </section>

        {/* SECTION 2: EL PROBLEMA vs. LA SOLUCIÓN */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-200/60">
          
          {/* Card A */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            whileHover={{ y: -3, scale: 1.01 }}
            className="bg-white/60 border border-white/80 rounded-3xl backdrop-blur-md p-8 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden group hover:border-rose-400/40 transition-all duration-300 transform-gpu"
          >
            <div className="space-y-6">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100 shadow-sm">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-extrabold text-[#1C1917]">El Problema de las PYMEs</h3>
                <p className="text-xs text-[#737373] leading-relaxed font-medium">
                  Agencias tradicionales que cobran mensualidades excesivas por mantenimiento simple, o creadores de sitios prefabricados que cargan páginas lentas, vulnerables y sin optimización para ventas locales en Santiago.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center gap-2 text-[10px] font-extrabold uppercase text-[#737373] tracking-wider">
              <span>Sitios lentos • Mantenimientos altos • Enredos técnicos</span>
            </div>
          </motion.div>

          {/* Card B */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            whileHover={{ y: -3, scale: 1.01 }}
            className="bg-white/60 border border-white/80 rounded-3xl backdrop-blur-md p-8 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden group hover:border-[#10B981]/50 transition-all duration-300 transform-gpu"
          >
            <div className="space-y-6">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center border border-emerald-100 shadow-sm">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-extrabold text-[#1C1917]">La Solución S&M</h3>
                <p className="text-xs text-[#737373] leading-relaxed font-medium">
                  Presupuestos justos de un único pago inicial, código estático ultrarrápido en Next.js, interacción empática y catálogos interactivos que envían pedidos estructurados directo a tu WhatsApp.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center gap-2 text-[10px] font-extrabold uppercase text-[#10B981] tracking-wider">
              <span>Un único pago • Código propio • Conexión directa</span>
            </div>
          </motion.div>

        </section>

        {/* SECTION 3: SERVICIOS */}
        <section id="servicios" className="space-y-8 pt-6 border-t border-neutral-200/60">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#06B6D4] bg-cyan-50 border border-cyan-100 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              Catálogo de Soluciones
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1917] tracking-tight">Servicios Digitales con Estilo Bento</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-white/60 border border-white/80 rounded-3xl backdrop-blur-md p-8 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[360px] relative overflow-hidden group hover:border-[#10B981]/50 transition-all duration-300 transform-gpu"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-[#1C1917]">Páginas Web para PYMEs</h3>
                  <p className="text-xs text-[#737373] leading-relaxed font-medium">
                    Plataformas optimizadas para Google y pantallas móviles. Atraen clientes de tu zona geográfica en Santiago de forma fluida y profesional.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#10B981]">Velocidad + SEO Local</span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

            {/* Box 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-white/60 border border-white/80 rounded-3xl backdrop-blur-md p-8 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[360px] relative overflow-hidden group hover:border-[#06B6D4]/50 transition-all duration-300 transform-gpu"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#06B6D4] flex items-center justify-center border border-cyan-100 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-[#1C1917]">Menús y Catálogos Digitales</h3>
                  <p className="text-xs text-[#737373] leading-relaxed font-medium">
                    Catálogos sin comisiones de terceros. Recibe solicitudes detalladas con montos $ CLP listos para procesar en tu WhatsApp.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#06B6D4]">Precios CLP + WhatsApp</span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

            {/* Box 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-white/60 border border-white/80 rounded-3xl backdrop-blur-md p-8 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[360px] relative overflow-hidden group hover:border-neutral-400/40 transition-all duration-300 transform-gpu"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-[#1C1917] flex items-center justify-center border border-neutral-200 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-[#1C1917]">Distribución y Venta Online</h3>
                  <p className="text-xs text-[#737373] leading-relaxed font-medium">
                    Sistemas simples para distribuidoras y locales comerciales. Recopilación ágil de leads y catálogo de inventarios para clientes recurrentes.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#737373]">Automatización de Ventas</span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 4: CÓMO TRABAJAMOS */}
        <section id="proceso" className="space-y-8 pt-6 border-t border-neutral-200/60">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#10B981] bg-emerald-50 border border-emerald-100 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5" />
              Metodología Ágil
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1917] tracking-tight">Proceso de Trabajo: Conexión → Creación → Lanzamiento</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-white/60 border border-white/80 rounded-3xl backdrop-blur-md p-8 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_20px_rgba(0,0,0,0.03)] relative flex flex-col justify-between group hover:border-[#10B981]/50 transition-all duration-300 transform-gpu"
            >
              <div className="space-y-4">
                <div className="text-xs font-black text-neutral-400 uppercase tracking-widest flex justify-between items-center">
                  <span>Paso 01</span>
                  <span className="w-2 h-2 rounded-full bg-neutral-300" />
                </div>
                <h4 className="font-extrabold text-lg text-[#1C1917]">01. Conexión</h4>
                <p className="text-xs text-[#737373] leading-relaxed font-medium">
                  Andri escucha la historia y visión de tu negocio. Analizamos tus necesidades reales y definimos un presupuesto transparente sin sorpresas.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-white/60 border border-white/80 rounded-3xl backdrop-blur-md p-8 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_20px_rgba(0,0,0,0.03)] relative flex flex-col justify-between group hover:border-[#10B981]/50 transition-all duration-300 transform-gpu"
            >
              <div className="space-y-4">
                <div className="text-xs font-black text-[#10B981] uppercase tracking-widest flex justify-between items-center">
                  <span>Paso 02</span>
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                </div>
                <h4 className="font-extrabold text-lg text-[#1C1917]">02. Creación</h4>
                <p className="text-xs text-[#737373] leading-relaxed font-medium">
                  Jeshua desarrolla código a medida en Next.js. Prototipamos la interfaz y te enviamos enlaces de demostración para revisar cada detalle.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-white/60 border border-white/80 rounded-3xl backdrop-blur-md p-8 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_20px_rgba(0,0,0,0.03)] relative flex flex-col justify-between group hover:border-[#06B6D4]/50 transition-all duration-300 transform-gpu"
            >
              <div className="space-y-4">
                <div className="text-xs font-black text-[#06B6D4] uppercase tracking-widest flex justify-between items-center">
                  <span>Paso 03</span>
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
                </div>
                <h4 className="font-extrabold text-lg text-[#1C1917]">03. Lanzamiento</h4>
                <p className="text-xs text-[#737373] leading-relaxed font-medium">
                  Publicamos tu web en el dominio definitivo y capacitamos a tu equipo para autogestionar el sitio con facilidad.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 5: QUIÉNES SOMOS */}
        <section id="nosotros" className="space-y-8 pt-6 border-t border-neutral-200/60">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#10B981] bg-emerald-50 border border-emerald-100 backdrop-blur-md">
              <Users className="w-3.5 h-3.5" />
              Socios Estratégicos
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1917] tracking-tight">El Equipo Detrás de S&M</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Andri Profile */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-[#1C1917] text-white border border-neutral-800 rounded-3xl p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-start gap-6 relative overflow-hidden group hover:border-[#10B981]/50 transition-all duration-300 transform-gpu"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#10B981] text-white flex items-center justify-center font-black text-lg shadow-md shrink-0 relative z-10 border border-emerald-400/20">
                AM
              </div>
              <div className="space-y-3 relative z-10">
                <div>
                  <h4 className="font-extrabold text-base text-white">Andri Manrrique</h4>
                  <p className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-wider">Liderazgo Comercial & Gestión</p>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                  Enfocado en relaciones comerciales empáticas, atención personalizada y presupuestos realistas sin sobrecostos para pequeñas y medianas empresas.
                </p>
              </div>
            </motion.div>

            {/* Jeshua Profile */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-[#1C1917] text-white border border-neutral-800 rounded-3xl p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-start gap-6 relative overflow-hidden group hover:border-[#06B6D4]/50 transition-all duration-300 transform-gpu"
            >
              <div className="w-14 h-14 rounded-2xl bg-neutral-800 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0 relative z-10 border border-neutral-700">
                JU
              </div>
              <div className="space-y-3 relative z-10">
                <div>
                  <h4 className="font-extrabold text-base text-white">Jeshua Useche</h4>
                  <p className="text-[10px] font-extrabold text-[#06B6D4] uppercase tracking-wider">Desarrollo Fullstack & UI/UX</p>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                  Transforma los requerimientos del cliente en código limpio, rápido y altamente escalable en Next.js y React con estándares UI/UX modernos.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 6: CONTACTO & CONVERSION ENGINE */}
        <section id="contacto" className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            whileHover={{ scale: 1.01 }}
            className="bg-[#1C1917] text-white border border-neutral-800 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300 transform-gpu"
          >
            <div className="text-center space-y-3 mb-8">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                ¿Listo para darle a tu negocio la visibilidad que merece? Conversemos.
              </h3>
              <p className="text-xs text-neutral-400 font-medium">
                Completa el formulario y nos contactaremos directamente a tu WhatsApp para coordinar tu propuesta.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={smoothTransition}
                  className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-6 rounded-2xl text-center space-y-3"
                >
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-[#10B981] border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-base">¡Mensaje Enviado con Éxito!</h4>
                  <p className="text-xs text-emerald-400 font-medium leading-relaxed">
                    Muchas gracias por escribirnos. Nuestro equipo se pondrá en contacto contigo mediante tu número de WhatsApp para brindarte tu asesoría gratuita.
                  </p>
                </motion.div>
              ) : (
                <form 
                  onSubmit={handleFormSubmit} 
                  className="space-y-5 relative z-10"
                >
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-800 bg-neutral-900/80 focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all text-xs font-medium text-white placeholder-neutral-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="businessName" className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-2">
                      Nombre del Negocio
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      required
                      placeholder="Ej. Dona Flor Gourmet, Distribuidora El Bosque..."
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-800 bg-neutral-900/80 focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all text-xs font-medium text-white placeholder-neutral-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="block text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest mb-2">
                      numero de whatsapp
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      required
                      placeholder="Ej. +56 9 1234 5678"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-800 bg-neutral-900/80 focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all text-xs font-medium text-white placeholder-neutral-600"
                    />
                  </div>

                  {formStatus === 'error' && (
                    <p className="text-xs text-red-400 font-bold bg-red-950/30 p-3 rounded-xl border border-red-900/50">
                      Por favor rellena todos los campos correctamente.
                    </p>
                  )}

                  <GlassPillButton
                    type="submit"
                    primary
                    disabled={formStatus === 'loading'}
                    className="w-full py-3.5 text-xs"
                  >
                    {formStatus === 'loading' ? 'Procesando...' : 'Enviar Mensaje'}
                  </GlassPillButton>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-neutral-200/60 flex flex-col md:flex-row items-center justify-between gap-4 relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1C1917] flex items-center justify-center text-white font-extrabold text-xs">
              S&M
            </div>
            <div>
              <span className="font-extrabold text-xs text-[#1C1917]">S&M Network</span>
              <span className="block text-[7px] text-[#10B981] font-bold uppercase tracking-widest -mt-1">Company</span>
            </div>
          </div>
          <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
            © {new Date().getFullYear()} S&M Network Company. Todos los derechos reservados. Santiago, Chile.
          </p>
        </footer>

      </div>
    </div>
  );
}
