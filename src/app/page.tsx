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
  Clock
} from 'lucide-react';

// Mock Server Action representing lead email dispatch
async function sendLeadEmail(formData: { name: string; businessName: string; whatsapp: string }) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log('Lead submitted successfully to S&M Network Company:', formData);
  return { success: true };
}

// Text Roll Animation Button Component
function TextRollButton({ 
  children, 
  href, 
  onClick,
  type = 'button',
  className = '' 
}: { 
  children: string; 
  href?: string; 
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
  className?: string;
}) {
  const content = (
    <span className="relative block overflow-hidden h-5">
      <motion.span 
        className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-5"
      >
        <span className="h-5 flex items-center justify-center">{children}</span>
        <span className="h-5 flex items-center justify-center text-emerald-100 font-extrabold">{children}</span>
      </motion.span>
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
    <button type={type} onClick={onClick} className={`group ${className}`}>
      {content}
    </button>
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

  // Santiago Time clock state
  const [santiagoTime, setSantiagoTime] = useState<string>('--:--');

  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'America/Santiago',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        };
        setSantiagoTime(new Intl.DateTimeFormat('es-CL', options).format(new Date()));
      } catch {
        // Fallback in case of timezone formatting issues
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        setSantiagoTime(`${hh}:${mm}`);
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-emerald-100 selection:text-emerald-950 overflow-x-hidden antialiased font-sans p-4 md:p-6 lg:p-10 pt-24">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-100/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Pill Navigation Bar */}
      <nav className="fixed top-4 left-4 right-4 max-w-7xl mx-auto bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-full shadow-lg px-4 md:px-8 py-3.5 flex items-center justify-between z-50 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center text-white font-extrabold shadow-sm border border-slate-800 shrink-0">
            <span className="text-[11px] text-transparent bg-clip-text bg-gradient-to-tr from-emerald-400 to-[#06B6D4]">S&M</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-sm tracking-tight text-[#0F172A]">
              S&M Network
            </span>
          </div>
        </div>

        {/* Center: Nav links and Clock */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-slate-500 font-bold text-xs uppercase tracking-wider">
            <a href="#servicios" className="hover:text-[#0F172A] transition-colors">Servicios</a>
            <a href="#proceso" className="hover:text-[#0F172A] transition-colors">Proceso</a>
            <a href="#nosotros" className="hover:text-[#0F172A] transition-colors">Nosotros</a>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/50 px-3 py-1.5 rounded-full text-[10px] font-extrabold text-slate-600 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{santiagoTime} en Santiago, CL</span>
          </div>
        </div>

        {/* Right: CTA button */}
        <TextRollButton
          href="#contacto"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white bg-[#10B981] hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-md shadow-emerald-500/10 border border-emerald-500/20"
        >
          Contacto Directo
        </TextRollButton>
      </nav>

      {/* Main Structural Frame */}
      <div className="max-w-7xl mx-auto border border-slate-200/80 rounded-[32px] bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-100/50 p-4 md:p-8 lg:p-10 space-y-16 relative overflow-hidden">
        
        {/* Decorative Grid Gridline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-[0.12] pointer-events-none" />

        {/* SECTION 1: HERO & INTERACTIVE DEMO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 pt-4">
          
          {/* Left Hero Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#FFFFFF] border border-slate-200/80 rounded-3xl p-8 lg:p-12 flex flex-col justify-between shadow-sm relative overflow-hidden group"
          >
            {/* Fine grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#10B981] border border-emerald-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  React / Next.js
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-50 text-[#06B6D4] border border-cyan-200/50">
                  Tailored Code
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                  Santiago, CL
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-[46px] font-black text-[#0F172A] leading-[1.1] tracking-tight">
                Impulsamos el crecimiento digital de tu PYME con <span className="text-[#10B981] bg-emerald-50/80 px-2 py-0.5 rounded-xl border border-emerald-100">empatía y transparencia</span>
              </h1>

              <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium max-w-xl">
                Diseñamos y desarrollamos plataformas a medida para restaurantes, distribuidoras y comercios en Santiago. Sin tarifas ocultas, con un único pago y soporte personalizado.
              </p>
            </div>

            <div className="pt-8 relative z-10 flex flex-col sm:flex-row gap-4 items-center">
              <TextRollButton
                href="#contacto"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-white bg-[#10B981] hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 group"
              >
                Agendar Asesoría Gratuita
              </TextRollButton>
              <a 
                href="#servicios" 
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors py-2"
              >
                Conocer Soluciones
              </a>
            </div>
          </motion.div>

          {/* Right Hero Box (Interactive Device Mockup) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 bg-[#FFFFFF] border border-slate-200/80 rounded-3xl p-6 lg:p-8 flex flex-col justify-center items-center shadow-sm relative overflow-hidden group"
          >
            {/* Tech grid dots overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

            {/* Premium Mobile Phone Frame */}
            <div className="w-full max-w-[300px] bg-slate-950 rounded-[40px] border-4 border-slate-900 shadow-2xl overflow-hidden relative ring-8 ring-slate-100/50">
              
              {/* Phone Dynamic Island */}
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

              {/* Menu Banner */}
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
              <div className="p-3 space-y-2 max-h-[200px] overflow-y-auto bg-slate-900/95 scrollbar-thin scrollbar-thumb-slate-800">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/40">
                    <div className="space-y-0.5 flex-1 pr-2">
                      <h4 className="font-bold text-xs text-white leading-tight">{item.name}</h4>
                      <span className="text-[10px] font-extrabold text-[#10B981] block mt-0.5">
                        ${item.price.toLocaleString('es-CL')} CLP
                      </span>
                    </div>

                    {/* Counter Buttons */}
                    <div className="flex items-center gap-1 bg-slate-950 border border-slate-850 rounded-lg p-1 shrink-0">
                      <button 
                        onClick={() => handleDecrement(item.id)}
                        className="w-4 h-4 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-[9px] border border-slate-700/60"
                      >
                        -
                      </button>
                      <span className="w-2 text-center text-[9px] font-bold text-white">{item.count}</span>
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

              {/* Mockup Checkout */}
              <div className="border-t border-slate-850 p-4 bg-slate-950 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-[8px] text-slate-500 font-extrabold uppercase tracking-wider">Total Pedido</span>
                    <span className="text-xs font-black text-[#10B981]">${calculateTotal().toLocaleString('es-CL')} CLP</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (calculateTotal() > 0) {
                        alert('¡Pedido Simulado! El pedido estructurado con el total exacto llegará directamente a tu chat de WhatsApp.');
                      } else {
                        alert('Por favor incrementa la cantidad de algún plato.');
                      }
                    }}
                    className="px-3 py-2 rounded-lg text-[9px] font-extrabold text-slate-950 bg-[#10B981] hover:bg-emerald-400 transition-colors shadow-sm uppercase tracking-wider"
                  >
                    Enviar a WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: EL PROBLEMA & LA SOLUCIÓN */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          {/* El Problema */}
          <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(239,68,68,0.02),transparent_90%)] pointer-events-none" />
            <div className="space-y-6">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center border border-red-100">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-[#0F172A]">El Problema de las PYMEs</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Las agencias tradicionales en Chile cobran costos de mantenimiento excesivos o exigen contratos mensuales amarrados. Por otro lado, los creadores de sitios genéricos cargan páginas lentas y difíciles de configurar para clientes que solo desean vender rápido.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
              <span>Sitios lentos • Comisiones altas • Enredos técnicos</span>
            </div>
          </div>

          {/* La Solución */}
          <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-[#10B981]/45 transition-all duration-300">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.02),transparent_90%)] pointer-events-none" />
            <div className="space-y-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center border border-emerald-100">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-[#0F172A]">La Solución de S&M</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Desarrollamos páginas web estáticas en Next.js ultrarrápidas con un único pago inicial y cero mensualidades. Catálogos digitales autogestionables que redireccionan pedidos formateados directamente a tu WhatsApp, agilizando tus ventas diarias.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] font-extrabold uppercase text-[#10B981] tracking-wider">
              <span>Cero mensualidad • Autogestionable • Pedidos al WhatsApp</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: SERVICIOS (Bento Grid) */}
        <section id="servicios" className="space-y-8 pt-6 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#06B6D4] bg-cyan-50 border border-cyan-100">
              <Sparkles className="w-3.5 h-3.5" />
              Catálogo de Soluciones
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">Servicios Digitales con Estilo Bento</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[360px] relative overflow-hidden group hover:border-[#10B981]/50 transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform duration-300">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A]">Páginas Web para PYMEs</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Diseños a medida 100% optimizados para celulares y tablets. Ideales para capturar clientes locales de tu comuna o rubro de forma directa, elegante y rápida.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#10B981]">Código 100% Autogestionable</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Box 2 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[360px] relative overflow-hidden group hover:border-[#06B6D4]/50 transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#06B6D4] flex items-center justify-center border border-cyan-100 group-hover:scale-105 transition-transform duration-300">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A]">Menús y Catálogos Digitales</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Sube y actualiza platos o productos sin pagar comisiones por venta. Un canal directo para recibir pedidos estructurados directamente en tu WhatsApp.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#06B6D4]">Ideal Gastronomía & Retail</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Box 3 */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[360px] relative overflow-hidden group hover:border-slate-800/30 transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-slate-50 text-[#0F172A] flex items-center justify-center border border-slate-200 group-hover:scale-105 transition-transform duration-300">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A]">Distribución y Venta Online</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Sistemas de venta simplificados para distribuidoras mayoristas o comercios emergentes, integrados con pasarelas de pago y despacho claro.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-700">Flujos de Checkout Ágiles</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 4: CÓMO TRABAJAMOS (Pipeline Workflow) */}
        <section id="proceso" className="space-y-8 border-t border-slate-200/80 pt-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#10B981] bg-emerald-50 border border-emerald-100">
              <Compass className="w-3.5 h-3.5" />
              Metodología Ágil
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">Proceso de Trabajo: Conexión → Creación → Lanzamiento</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
            
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 relative flex flex-col justify-between shadow-sm group">
              <div className="space-y-4">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex justify-between items-center">
                  <span>Paso 01</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
                <h4 className="font-black text-lg text-[#0F172A]">Conexión</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Conversamos para entender tu negocio en profundidad. Definimos las metas, el presupuesto ideal y trazamos un alcance libre de sorpresas técnicas.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 relative flex flex-col justify-between shadow-sm group">
              <div className="space-y-4">
                <div className="text-xs font-black text-[#10B981] uppercase tracking-widest flex justify-between items-center">
                  <span>Paso 02</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                </div>
                <h4 className="font-black text-lg text-[#0F172A]">Creación</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Diseñamos prototipos funcionales y escribimos código moderno. Te enviamos links de prueba interactivos para que veas el avance en tiempo real.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 relative flex flex-col justify-between shadow-sm group">
              <div className="space-y-4">
                <div className="text-xs font-black text-[#06B6D4] uppercase tracking-widest flex justify-between items-center">
                  <span>Paso 03</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                </div>
                <h4 className="font-black text-lg text-[#0F172A]">Lanzamiento</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Publicamos tu plataforma en el hosting definitivo y te enseñamos a autogestionar el contenido con videos cortos creados exclusivamente para ti.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: QUIÉNES SOMOS (The Team Bento) */}
        <section id="nosotros" className="space-y-8 border-t border-slate-200/80 pt-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#10B981] bg-emerald-50 border border-emerald-100">
              <Users className="w-3.5 h-3.5" />
              Socios Estratégicos
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">El Equipo Detrás de S&M</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Profile Andri */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col sm:flex-row items-start gap-6 shadow-sm relative overflow-hidden">
              {/* Tech grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40 pointer-events-none" />

              <div className="w-14 h-14 rounded-2xl bg-[#10B981] text-white flex items-center justify-center font-black text-lg shadow-md shrink-0 relative z-10 border border-emerald-400/20">
                AM
              </div>
              <div className="space-y-3 relative z-10">
                <div>
                  <h4 className="font-extrabold text-base text-[#0F172A]">Andri Manrrique</h4>
                  <p className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-wider">Liderazgo Comercial & Gestión</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Asesor de clientes empático, encargado de la transparencia en la presupuestación y de escuchar en detalle la historia comercial de tu negocio.
                </p>
              </div>
            </div>

            {/* Profile Jeshua */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col sm:flex-row items-start gap-6 shadow-sm relative overflow-hidden">
              {/* Tech grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40 pointer-events-none" />

              <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-black text-lg shadow-md shrink-0 relative z-10 border border-slate-800">
                JU
              </div>
              <div className="space-y-3 relative z-10">
                <div>
                  <h4 className="font-extrabold text-base text-[#0F172A]">Jeshua Useche</h4>
                  <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Desarrollo Fullstack & UI/UX</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Especialista en código a medida, ejecución flexible y transformación de ideas de negocios locales en robustas aplicaciones y menús web.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 6: CONTACTO & CALL TO ACTION */}
        <section id="contacto" className="max-w-3xl mx-auto">
          <motion.div 
            layout
            className="bg-[#0F172A] text-white border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Accent light flare */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center space-y-3 mb-8">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                ¿Listo para darle a tu negocio la visibilidad que merece? Conversemos.
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Llena tus datos a continuación y coordinaremos una propuesta digital única para tu negocio.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
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
                <motion.form 
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all text-xs font-medium text-white placeholder-slate-650"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all text-xs font-medium text-white placeholder-slate-650"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all text-xs font-medium text-white placeholder-slate-650"
                    />
                  </div>

                  {formStatus === 'error' && (
                    <p className="text-xs text-red-400 font-bold bg-red-950/30 p-3 rounded-xl border border-red-900/50">
                      Por favor rellena todos los campos correctamente.
                    </p>
                  )}

                  <TextRollButton
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-[#10B981] hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-500/10 border border-emerald-500/20"
                  >
                    {formStatus === 'loading' ? 'Procesando...' : 'Enviar Mensaje'}
                  </TextRollButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center text-white font-extrabold text-xs">
              S&M
            </div>
            <div>
              <span className="font-extrabold text-xs text-[#0F172A]">S&M Network</span>
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
