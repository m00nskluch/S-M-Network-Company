'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Server Action representing lead email dispatch
async function sendLeadEmail(formData: { name: string; businessName: string; whatsapp: string }) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  console.log('Lead submitted successfully to S&M Network Company:', formData);
  return { success: true };
}

export default function Page() {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    whatsapp: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-emerald-100 selection:text-emerald-950 overflow-x-hidden antialiased font-sans p-4 md:p-6 lg:p-8">
      
      {/* Outer Layout Frame / Structural Border */}
      <div className="max-w-7xl mx-auto border border-slate-200/80 rounded-[32px] bg-slate-50/50 shadow-sm p-4 md:p-8 space-y-8 relative">
        
        {/* Navigation Header */}
        <header className="flex items-center justify-between border-b border-slate-200/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F172A] flex items-center justify-center text-white font-extrabold shadow-md border border-slate-800">
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-emerald-400 to-[#06B6D4]">S&M</span>
            </div>
            <div>
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                S&M Network
              </span>
              <span className="block text-[8px] text-[#10B981] tracking-widest font-extrabold uppercase -mt-1">Company</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#servicios" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#0F172A] transition-colors">Servicios</a>
            <a href="#proceso" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#0F172A] transition-colors">Proceso</a>
            <a href="#nosotros" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#0F172A] transition-colors">Nosotros</a>
          </nav>

          <a 
            href="#contacto" 
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider text-white bg-[#10B981] hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-md shadow-emerald-500/10 border border-emerald-500/20"
          >
            Contacto
          </a>
        </header>

        {/* 1. Framed Hero Section (Asymmetric 2-column) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Hero Box */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#FFFFFF] border border-slate-200/80 rounded-3xl p-8 lg:p-12 flex flex-col justify-between shadow-sm relative overflow-hidden group"
          >
            {/* Tech Grid Pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_0%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Badges container */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#10B981] border border-emerald-200/50">
                  React / Next.js
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-50 text-[#06B6D4] border border-cyan-200/50">
                  Tailored Code
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                  Santiago, CL
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-[#0F172A] leading-[1.1] tracking-tight">
                Impulsamos el crecimiento digital de tu PYME con <span className="text-[#10B981]">empatía y transparencia</span>
              </h1>

              <p className="text-base text-slate-550 leading-relaxed font-medium max-w-xl">
                Páginas web, catálogos y menús digitales creados a la medida de tu presupuesto. Sin mensualidades ocultas ni enredos técnicos.
              </p>
            </div>

            <div className="pt-8 relative z-10">
              <motion.a
                whileTap={{ scale: 0.98 }}
                href="#contacto"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4.5 rounded-2xl text-sm font-extrabold uppercase tracking-wider text-white bg-[#10B981] hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 group"
              >
                Agendar Asesoría Gratuita
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Hero Box (Interactive Device Frame) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 flex flex-col justify-center items-center shadow-sm relative overflow-hidden"
          >
            {/* Device Mockup Shell */}
            <div className="w-full max-w-sm bg-[#F8FAFC] rounded-2xl border border-slate-200/80 shadow-md overflow-hidden relative">
              {/* Mockup Status Bar */}
              <div className="bg-[#0F172A] py-2.5 text-center text-[10px] text-slate-400 font-semibold tracking-wider flex justify-between px-5 items-center">
                <span>12:45 PM</span>
                <span className="w-16 h-3 rounded-full bg-slate-800 inline-block border border-slate-700/40" />
                <span>LTE 🔋</span>
              </div>

              {/* Menu Banner */}
              <div className="bg-gradient-to-br from-[#0F172A] to-slate-900 p-5 text-white">
                <span className="text-[9px] uppercase font-extrabold tracking-widest bg-emerald-500/20 text-[#10B981] px-2 py-0.5 rounded border border-emerald-500/10">
                  Demo Interactiva
                </span>
                <h3 className="text-base font-bold mt-1">Dona Flor Gourmet 🇨🇱</h3>
                <p className="text-[10px] text-slate-400">Santiago Centro • Pedidos al WhatsApp</p>
              </div>

              {/* Items List */}
              <div className="p-4 space-y-3 max-h-[220px] overflow-y-auto bg-slate-50/50">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded-xl border border-slate-200/60 shadow-sm">
                    <div className="space-y-0.5 flex-1 pr-3">
                      <h4 className="font-bold text-xs text-[#0F172A]">{item.name}</h4>
                      <span className="text-[11px] font-black text-slate-800 block">
                        ${item.price.toLocaleString('es-CL')} CLP
                      </span>
                    </div>

                    {/* Counter Buttons */}
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-1 shrink-0">
                      <button 
                        onClick={() => handleDecrement(item.id)}
                        className="w-5 h-5 rounded bg-white hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs border border-slate-200"
                      >
                        -
                      </button>
                      <span className="w-3 text-center text-xs font-bold text-slate-900">{item.count}</span>
                      <button 
                        onClick={() => handleIncrement(item.id)}
                        className="w-5 h-5 rounded bg-[#10B981] hover:bg-emerald-600 text-white flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mockup Checkout */}
              <div className="border-t border-slate-200/80 p-4 bg-white flex items-center justify-between">
                <div>
                  <span className="block text-[8px] text-slate-400 font-extrabold uppercase tracking-wider">Total Pedido</span>
                  <span className="text-sm font-black text-[#10B981]">${calculateTotal().toLocaleString('es-CL')} CLP</span>
                </div>
                <button 
                  onClick={() => {
                    if (calculateTotal() > 0) {
                      alert('¡Listo! Tu cliente pulsa este botón y te llega el pedido detallado directamente a tu WhatsApp.');
                    } else {
                      alert('Por favor incrementa la cantidad de algún plato.');
                    }
                  }}
                  className="px-4 py-2.5 rounded-lg text-[10px] font-bold text-white bg-[#0F172A] hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Enviar a WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. Bento Grid Services */}
        <section id="servicios" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10B981]">Catálogo de Soluciones</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">Servicios Digitales con Estilo Framed</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 (Large Height) */}
            <motion.div 
              whileHover={{ y: -4, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[350px] relative overflow-hidden group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#10B981] flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#0F172A]">Páginas Web para PYMEs</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Diseños a medida optimizados para celulares y tablets. Ideales para capturar clientes locales de tu comuna o rubro de forma directa y elegante.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#10B981]">Código 100% optimizado</span>
              </div>
            </motion.div>

            {/* Box 2 (Medium Height) */}
            <motion.div 
              whileHover={{ y: -4, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[320px] relative overflow-hidden group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center border border-cyan-100 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#0F172A]">Menús y Catálogos Digitales</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Sube y actualiza platos o productos sin pagar comisiones por venta. Un canal directo para recibir pedidos estructurados en tu WhatsApp.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#06B6D4]">Ideal Gastronomía y Retail</span>
              </div>
            </motion.div>

            {/* Box 3 (Medium Height) */}
            <motion.div 
              whileHover={{ y: -4, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)" }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[320px] relative overflow-hidden group"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#0F172A]">Distribución y Venta Online</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Sistemas de venta simplificados para distribuidoras mayoristas o comercios emergentes, integrados con pasarelas de pago y despacho claro.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700">Flujos de Checkout Ágiles</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 3. Framed Workflow Pipeline */}
        <section id="proceso" className="space-y-6 border-t border-slate-200/80 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10B981]">Metodología Ágil</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">Proceso de Trabajo: Conexión → Creación → Lanzamiento</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
            
            {/* Step 1 */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 relative flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">01</div>
                <h4 className="font-extrabold text-lg text-[#0F172A]">Conexión</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Conversamos para entender tu negocio en profundidad. Definimos las metas, el presupuesto ideal y trazamos un alcance libre de sorpresas técnicas.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 relative flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="text-xs font-black text-[#10B981] uppercase tracking-widest">02</div>
                <h4 className="font-extrabold text-lg text-[#0F172A]">Creación</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Diseñamos prototipos funcionales y escribimos código moderno. Te enviamos links de prueba interactivos para que veas el avance en tiempo real.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 relative flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="text-xs font-black text-[#06B6D4] uppercase tracking-widest">03</div>
                <h4 className="font-extrabold text-lg text-[#0F172A]">Lanzamiento</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Publicamos tu plataforma en el hosting definitivo y te enseñamos a autogestionar el contenido con videos cortos creados exclusivamente para ti.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 4. About Us (The Team Bento) */}
        <section id="nosotros" className="space-y-6 border-t border-slate-200/80 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10B981]">Socios Estratégicos</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">El Equipo Detrás de S&M</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Profile Andri */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-start gap-6 shadow-sm relative overflow-hidden">
              {/* Tech grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40 pointer-events-none" />

              <div className="w-14 h-14 rounded-2xl bg-[#10B981] text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0 relative z-10 border border-emerald-400/20">
                AM
              </div>
              <div className="space-y-2 relative z-10">
                <div>
                  <h4 className="font-extrabold text-base text-[#0F172A]">Andri Manrrique</h4>
                  <p className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-wider">Liderazgo Comercial & Gestión</p>
                </div>
                <p className="text-xs text-slate-650 leading-relaxed font-medium">
                  Relación empática con cada cliente, presupuestos realistas y comunicación transparente. Velamos por maximizar la rentabilidad de tu inversión.
                </p>
              </div>
            </div>

            {/* Profile Jeshua */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-start gap-6 shadow-sm relative overflow-hidden">
              {/* Tech grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40 pointer-events-none" />

              <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0 relative z-10 border border-slate-800">
                JU
              </div>
              <div className="space-y-2 relative z-10">
                <div>
                  <h4 className="font-extrabold text-base text-[#0F172A]">Jeshua Useche</h4>
                  <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Desarrollo Fullstack & UI/UX</p>
                </div>
                <p className="text-xs text-slate-655 leading-relaxed font-medium">
                  Transforma ideas comerciales en plataformas rápidas, seguras y de código limpio. Diseña pensando en la fluidez móvil de tus usuarios.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 5. Framed Contact Section (Dark Navy Bento card) */}
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
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
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

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-[#10B981] hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-500/10 border border-emerald-500/20"
                  >
                    {formStatus === 'loading' ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Procesando...
                      </span>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center text-white font-extrabold text-xs">
              S&M
            </div>
            <div>
              <span className="font-extrabold text-xs text-[#0F172A]">S&M Network</span>
              <span className="block text-[7px] text-[#10B981] font-bold uppercase tracking-widest -mt-1">Company</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            © {new Date().getFullYear()} S&M Network Company. Todos los derechos reservados. Santiago, Chile.
          </p>
        </footer>

      </div>
    </div>
  );
}
