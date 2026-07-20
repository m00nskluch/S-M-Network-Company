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

// iOS Snappy Spring physics config
const iosSpringTransition = { type: 'spring' as const, stiffness: 260, damping: 22 };

// Text Roll Animation Button Component (Rock-solid visibility)
function TextRollButton({ 
  children, 
  href, 
  onClick,
  type = 'button',
  disabled = false,
  className = '' 
}: { 
  children: string; 
  href?: string; 
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}) {
  const content = (
    <span className="relative inline-block overflow-hidden h-5 pointer-events-none select-none">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        <span className="h-5 flex items-center justify-center whitespace-nowrap text-current">{children}</span>
        <span className="h-5 flex items-center justify-center whitespace-nowrap text-emerald-200 font-extrabold">{children}</span>
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={`group ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`group ${className}`}>
      {content}
    </button>
  );
}

export default function Page() {
  // Decoupled Input Form State
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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-slate-100 selection:bg-emerald-100 selection:text-emerald-950 overflow-x-hidden antialiased font-sans p-4 md:p-6 lg:p-10 pt-24 relative">
      
      {/* Ambient Refraction Canvas (Depth & Gradient Blobs) */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none transform-gpu will-change-transform">
        <motion.div 
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{
            x: [0, -100, 60, 0],
            y: [0, 50, -70, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-cyan-500/15 rounded-full blur-3xl" 
        />
      </div>

      {/* HEADER: Floating Glass Pill Navbar */}
      <nav className="fixed top-4 left-4 right-4 max-w-7xl mx-auto bg-slate-900/80 backdrop-blur-md backdrop-saturate-150 rounded-full border border-white/20 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] px-4 md:px-8 py-3 flex items-center justify-between z-50 transform-gpu will-change-transform transition-all duration-300">
        
        {/* Left Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-white font-extrabold shadow-sm border border-slate-700 relative shrink-0">
            <span className="text-xs text-transparent bg-clip-text bg-gradient-to-tr from-emerald-400 to-[#06B6D4]">S&M</span>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
          </div>
          <div className="hidden sm:block">
            <span className="font-extrabold text-sm tracking-tight text-white block">
              S&M Network
            </span>
            <span className="block text-[8px] text-[#10B981] font-black uppercase tracking-widest -mt-1">Company</span>
          </div>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-7 text-slate-300 font-bold text-xs uppercase tracking-wider">
          <a href="#servicios" className="hover:text-emerald-400 transition-colors">Servicios</a>
          <a href="#proceso" className="hover:text-emerald-400 transition-colors">Proceso</a>
          <a href="#nosotros" className="hover:text-emerald-400 transition-colors">Nosotros</a>
          <a href="#contacto" className="hover:text-emerald-400 transition-colors">Contacto</a>
        </div>

        {/* Right Santiago Clock & CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-black text-slate-200 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{santiagoTime} en Santiago, CL</span>
          </div>

          <TextRollButton
            href="#contacto"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white bg-[#10B981] hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-md shadow-emerald-500/20 border border-emerald-400/30"
          >
            Contacto Directo
          </TextRollButton>
        </div>
      </nav>

      {/* Main Structural Container */}
      <div className="max-w-7xl mx-auto border border-white/20 dark:border-white/10 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] p-4 md:p-8 lg:p-10 space-y-16 relative overflow-hidden transform-gpu will-change-transform">
        
        {/* Fine gridlines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-[0.12] pointer-events-none" />

        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 pt-4">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={iosSpringTransition}
            whileHover={{ y: -6, scale: 1.01 }}
            className="lg:col-span-7 bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl backdrop-blur-md backdrop-saturate-150 p-8 lg:p-12 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] relative overflow-hidden group hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 transform-gpu will-change-transform"
          >
            <div className="space-y-6 relative z-10">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-[#10B981] border border-emerald-500/20 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  REACT / NEXT.JS
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-500/10 text-[#06B6D4] border border-cyan-500/20 backdrop-blur-md">
                  TAILORED CODE
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-800/40 text-slate-300 border border-slate-700/50 backdrop-blur-md">
                  SANTIAGO, CL
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-[46px] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.1]">
                Impulsamos el crecimiento digital de tu PYME con <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-200">empatía y transparencia</span>
              </h1>

              <p className="text-sm md:text-base text-slate-500 dark:text-slate-350 leading-relaxed font-medium max-w-xl">
                Desarrollamos soluciones web únicas y rápidas para restaurantes, comercios locales y distribuidoras en Santiago. Sin cobros mensuales amarrados, con presupuesto justo y comunicación cercana.
              </p>
            </div>

            <div className="pt-8 relative z-10 flex flex-col sm:flex-row gap-4 items-center">
              <TextRollButton
                href="#contacto"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-[#10B981] hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
              >
                Agendar Asesoría Gratuita
              </TextRollButton>
              <TextRollButton
                href="#servicios"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-2xl text-xs font-extrabold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                Conocer Soluciones
              </TextRollButton>
            </div>
          </motion.div>

          {/* Right Column (Device Frame) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...iosSpringTransition, delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="lg:col-span-5 bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl backdrop-blur-md backdrop-saturate-150 p-6 lg:p-8 flex flex-col justify-center items-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] relative overflow-hidden group hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 transform-gpu will-change-transform"
          >
            <div className="w-full max-w-[310px] bg-slate-950 rounded-[40px] border-4 border-slate-900 shadow-2xl overflow-hidden relative ring-8 ring-slate-100/10">
              
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 block" />
              </div>

              {/* Status Bar */}
              <div className="bg-slate-900 pt-8 pb-2 text-center text-[9px] text-slate-400 font-semibold tracking-wider flex justify-between px-6 items-center">
                <span>12:45 PM</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>5G 🔋</span>
                </div>
              </div>

              {/* Banner */}
              <div className="bg-[#0F172A] p-4 text-white border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] uppercase font-extrabold tracking-widest bg-emerald-500/20 text-[#10B981] px-2 py-0.5 rounded border border-emerald-500/10">
                    Demo Interactiva
                  </span>
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                </div>
                <h3 className="text-sm font-black mt-2">
                  Dona Flor Gourmet <span className="text-xs">🇨🇱</span>
                </h3>
                <p className="text-[10px] text-slate-400">Santiago Centro • Pedidos al WhatsApp</p>
              </div>

              {/* Items List */}
              <div className="p-3.5 space-y-2.5 max-h-[210px] overflow-y-auto bg-slate-900/95 scrollbar-thin scrollbar-thumb-slate-800">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/40">
                    <div className="space-y-0.5 flex-1 pr-2">
                      <h4 className="font-bold text-xs text-white leading-tight">{item.name}</h4>
                      <span className="text-[10px] font-extrabold text-[#10B981] block mt-0.5">
                        ${item.price.toLocaleString('es-CL')} CLP
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-1 shrink-0">
                      <button 
                        onClick={() => handleDecrement(item.id)}
                        className="w-4 h-4 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-[9px] border border-slate-700/60"
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
              <div className="border-t border-slate-800 p-4 bg-slate-950 flex flex-col gap-2 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-[8px] text-slate-500 font-extrabold uppercase tracking-wider">Total Pedido</span>
                    <span className="text-xs font-black text-[#10B981]">${calculateTotal().toLocaleString('es-CL')} CLP</span>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="px-3.5 py-2 rounded-lg text-[9px] font-extrabold text-slate-950 bg-[#10B981] hover:bg-emerald-400 transition-colors shadow-sm uppercase tracking-wider"
                  >
                    Enviar a WhatsApp
                  </button>
                </div>

                {/* Simulated Order Summary Modal */}
                <AnimatePresence>
                  {isCheckoutOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={iosSpringTransition}
                      className="absolute inset-0 bg-slate-950 p-4 z-40 flex flex-col justify-between border-t border-slate-800 text-white transform-gpu"
                    >
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-[10px] font-extrabold text-[#10B981] uppercase">Resumen Pedido</span>
                        <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-white">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-300 space-y-1 my-2">
                        <p className="font-semibold text-white">Cliente listo para enviar mensaje preformateado a WhatsApp:</p>
                        <p className="text-[9px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
                          "Hola Dona Flor Gourmet, quisiera pedir: {menuItems.filter(i => i.count > 0).map(i => `${i.count}x ${i.name}`).join(', ') || '1x Empanadas'}. Total: ${calculateTotal().toLocaleString('es-CL')} CLP"
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          alert('¡Redireccionando al WhatsApp comercial del negocio!');
                          setIsCheckoutOpen(false);
                        }}
                        className="w-full py-1.5 bg-[#10B981] text-slate-950 font-black text-[9px] rounded uppercase tracking-wider"
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
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
          
          {/* Card A */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={iosSpringTransition}
            className="bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl backdrop-blur-md backdrop-saturate-150 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col justify-between relative overflow-hidden group hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300 transform-gpu will-change-transform"
          >
            <div className="space-y-6">
              <div className="w-11 h-11 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 shadow-sm">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-extrabold text-[#0F172A] dark:text-white">El Problema de las PYMEs</h3>
                <p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed font-medium">
                  Agencias tradicionales que cobran mensualidades excesivas por mantenimiento simple, o creadores de sitios prefabricados que cargan páginas lentas, vulnerables y sin optimización para ventas locales en Santiago.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-2 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
              <span>Sitios lentos • Mantenimientos altos • Enredos técnicos</span>
            </div>
          </motion.div>

          {/* Card B */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.01 }}
            transition={iosSpringTransition}
            className="bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl backdrop-blur-md backdrop-saturate-150 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col justify-between relative overflow-hidden group hover:border-[#10B981]/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 transform-gpu will-change-transform"
          >
            <div className="space-y-6">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-[#10B981] flex items-center justify-center border border-emerald-500/20 shadow-sm">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-extrabold text-[#0F172A] dark:text-white">La Solución S&M</h3>
                <p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed font-medium">
                  Presupuestos justos de un único pago inicial, código estático ultrarrápido en Next.js, interacción empática y catálogos interactivos que envían pedidos estructurados directo a tu WhatsApp.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-2 text-[10px] font-extrabold uppercase text-[#10B981] tracking-wider">
              <span>Un único pago • Código propio • Conexión directa</span>
            </div>
          </motion.div>

        </section>

        {/* SECTION 3: SERVICIOS */}
        <section id="servicios" className="space-y-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#06B6D4] bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              Catálogo de Soluciones
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">Servicios Digitales con Estilo Bento</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={iosSpringTransition}
              className="bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl backdrop-blur-md backdrop-saturate-150 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col justify-between min-h-[360px] relative overflow-hidden group hover:border-[#10B981]/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 transform-gpu will-change-transform"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-[#10B981] flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] dark:text-white">Páginas Web para PYMEs</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed font-medium">
                    Plataformas optimizadas para Google y pantallas móviles. Atraen clientes de tu zona geográfica en Santiago de forma fluida y profesional.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#10B981]">Velocidad + SEO Local</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

            {/* Box 2 */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={iosSpringTransition}
              className="bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl backdrop-blur-md backdrop-saturate-150 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col justify-between min-h-[360px] relative overflow-hidden group hover:border-[#06B6D4]/50 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 transform-gpu will-change-transform"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-[#06B6D4] flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] dark:text-white">Menús y Catálogos Digitales</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed font-medium">
                    Catálogos sin comisiones de terceros. Recibe solicitudes detalladas con montos $ CLP listos para procesar en tu WhatsApp.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#06B6D4]">Precios CLP + WhatsApp</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

            {/* Box 3 */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={iosSpringTransition}
              className="bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl backdrop-blur-md backdrop-saturate-150 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col justify-between min-h-[360px] relative overflow-hidden group hover:border-slate-700/50 hover:shadow-lg hover:shadow-slate-800/5 transition-all duration-300 transform-gpu will-change-transform"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/40 text-slate-200 flex items-center justify-center border border-slate-700/50 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] dark:text-white">Distribución y Venta Online</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed font-medium">
                    Sistemas simples para distribuidoras y locales comerciales. Recopilación ágil de leads y catálogo de inventarios para clientes recurrentes.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">Automatización de Ventas</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 4: CÓMO TRABAJAMOS */}
        <section id="proceso" className="space-y-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#10B981] bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5" />
              Metodología Ágil
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">Proceso de Trabajo: Conexión → Creación → Lanzamiento</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={iosSpringTransition}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl backdrop-blur-md backdrop-saturate-150 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] relative flex flex-col justify-between group hover:border-[#10B981]/50 transition-all duration-300 transform-gpu will-change-transform"
            >
              <div className="space-y-4">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex justify-between items-center">
                  <span>Paso 01</span>
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                </div>
                <h4 className="font-extrabold text-lg text-[#0F172A] dark:text-white">01. Conexión</h4>
                <p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed font-medium">
                  Andri escucha la historia y visión de tu negocio. Analizamos tus necesidades reales y definimos un presupuesto transparente sin sorpresas.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...iosSpringTransition, delay: 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl backdrop-blur-md backdrop-saturate-150 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] relative flex flex-col justify-between group hover:border-[#10B981]/50 transition-all duration-300 transform-gpu will-change-transform"
            >
              <div className="space-y-4">
                <div className="text-xs font-black text-[#10B981] uppercase tracking-widest flex justify-between items-center">
                  <span>Paso 02</span>
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                </div>
                <h4 className="font-extrabold text-lg text-[#0F172A] dark:text-white">02. Creación</h4>
                <p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed font-medium">
                  Jeshua desarrolla código a medida en Next.js. Prototipamos la interfaz y te enviamos enlaces de demostración para revisar cada detalle.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...iosSpringTransition, delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 rounded-3xl backdrop-blur-md backdrop-saturate-150 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] relative flex flex-col justify-between group hover:border-[#06B6D4]/50 transition-all duration-300 transform-gpu will-change-transform"
            >
              <div className="space-y-4">
                <div className="text-xs font-black text-[#06B6D4] uppercase tracking-widest flex justify-between items-center">
                  <span>Paso 03</span>
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
                </div>
                <h4 className="font-extrabold text-lg text-[#0F172A] dark:text-white">03. Lanzamiento</h4>
                <p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed font-medium">
                  Publicamos tu web en el dominio definitivo y capacitamos a tu equipo para autogestionar el sitio con facilidad.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 5: QUIÉNES SOMOS */}
        <section id="nosotros" className="space-y-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#10B981] bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
              <Users className="w-3.5 h-3.5" />
              Socios Estratégicos
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">El Equipo Detrás de S&M</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Andri Profile */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={iosSpringTransition}
              className="bg-[#0F172A] text-white border border-white/10 rounded-3xl p-8 backdrop-blur-md backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col sm:flex-row items-start gap-6 relative overflow-hidden group hover:border-[#10B981]/50 transition-all duration-300 transform-gpu will-change-transform"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

              <div className="w-14 h-14 rounded-2xl bg-[#10B981] text-white flex items-center justify-center font-black text-lg shadow-md shrink-0 relative z-10 border border-emerald-400/20">
                AM
              </div>
              <div className="space-y-3 relative z-10">
                <div>
                  <h4 className="font-extrabold text-base text-white">Andri Manrrique</h4>
                  <p className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-wider">Liderazgo Comercial & Gestión</p>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed font-medium">
                  Enfocado en relaciones comerciales empáticas, atención personalizada y presupuestos realistas sin sobrecostos para pequeñas y medianas empresas.
                </p>
              </div>
            </motion.div>

            {/* Jeshua Profile */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={iosSpringTransition}
              className="bg-[#0F172A] text-white border border-white/10 rounded-3xl p-8 backdrop-blur-md backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] flex flex-col sm:flex-row items-start gap-6 relative overflow-hidden group hover:border-[#06B6D4]/50 transition-all duration-300 transform-gpu will-change-transform"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-black text-lg shadow-md shrink-0 relative z-10 border border-slate-700">
                JU
              </div>
              <div className="space-y-3 relative z-10">
                <div>
                  <h4 className="font-extrabold text-base text-white">Jeshua Useche</h4>
                  <p className="text-[10px] font-extrabold text-[#06B6D4] uppercase tracking-wider">Desarrollo Fullstack & UI/UX</p>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed font-medium">
                  Transforma los requerimientos del cliente en código limpio, rápido y altamente escalable en Next.js y React con estándares UI/UX modernos.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 6: CONTACTO & CONVERSION ENGINE */}
        <section id="contacto" className="max-w-3xl mx-auto">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={iosSpringTransition}
            className="bg-[#0F172A] text-white border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300 transform-gpu will-change-transform"
          >
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center space-y-3 mb-8">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                ¿Listo para darle a tu negocio la visibilidad que merece? Conversemos.
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Completa el formulario y nos contactaremos directamente a tu WhatsApp para coordinar tu propuesta.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={iosSpringTransition}
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
                    <label htmlFor="name" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/70 focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all text-xs font-medium text-white placeholder-slate-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="businessName" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                      Nombre del Negocio
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      required
                      placeholder="Ej. Dona Flor Gourmet, Distribuidora El Bosque..."
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/70 focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all text-xs font-medium text-white placeholder-slate-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                      numero de whatsapp
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      required
                      placeholder="Ej. +56 9 1234 5678"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/70 focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all text-xs font-medium text-white placeholder-slate-600"
                    />
                  </div>

                  {formStatus === 'error' && (
                    <p className="text-xs text-red-400 font-bold bg-red-950/30 p-3 rounded-xl border border-red-900/50">
                      Por favor rellena todos los campos correctamente.
                    </p>
                  )}

                  <TextRollButton
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-[#10B981] hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-500/10 border border-emerald-500/20"
                  >
                    {formStatus === 'loading' ? 'Procesando...' : 'Enviar Mensaje'}
                  </TextRollButton>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4 relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center text-white font-extrabold text-xs">
              S&M
            </div>
            <div>
              <span className="font-extrabold text-xs text-[#0F172A] dark:text-white">S&M Network</span>
              <span className="block text-[7px] text-[#10B981] font-bold uppercase tracking-widest -mt-1">Company</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            © {new Date().getFullYear()} S&M Network Company. Todos los derechos reservados. Santiago, Chile.
          </p>
        </footer>

      </div>
    </div>
  );
}
