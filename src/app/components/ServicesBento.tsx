'use client';

import React, { useState } from 'react';
import { Globe, Smartphone, Zap, ChevronRight, CheckCircle2, ArrowRight, MessageCircle, Sparkles, BarChart3, ShieldCheck } from 'lucide-react';
import { SpotlightCard, StatusBadge } from './GlassSurface';
import { MagneticButton } from './MagneticButton';

export function ServicesBento({ onOpenDemo }: { onOpenDemo?: () => void }) {
  const [activeSpeedTab, setActiveSpeedTab] = useState<'desktop' | 'mobile'>('mobile');
  const [waOrderStep, setWaOrderStep] = useState(1);

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-1.5 shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-[#0A5CFF]" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-slate)]">
            Catálogo Cinético de Soluciones
          </span>
        </div>
        <h2 className="font-display text-3xl font-black md:text-5xl tracking-tight text-[var(--text-slate)]">
          Ingeniería Digital que Vende
        </h2>
        <p className="text-sm md:text-base text-[var(--text-secondary)]">
          Diseñadas específicamente para el ecosistema comercial de Santiago de Chile. Sin intermediarios técnicos ni mensualidades amarradas.
        </p>
      </div>

      {/* Bento Grid Asymétrico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 1: Web & SEO Local (2 columnas) — based on image_2.png */}
        <SpotlightCard tilt={true} tiltStrength={8} className="md:col-span-2 p-8 lg:p-10 flex flex-col justify-between min-h-[420px] relative overflow-hidden group">
          {/* Big number watermark */}
          <span className="section-num-deco text-[140px] absolute -top-8 -right-4 leading-none select-none opacity-20 group-hover:opacity-30 transition-opacity">
            01
          </span>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A5CFF]/10 border border-[#0A5CFF]/30 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-[#0A5CFF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0A5CFF] animate-pulse" />
                VELOCIDAD + SEO LOCAL
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <Globe className="h-6 w-6 text-[#0A5CFF]" />
              </div>
            </div>

            <div className="max-w-xl">
              <h3 className="font-display text-2xl md:text-3xl font-black text-[var(--text-slate)] mb-3">
                Páginas Web para PYMEs en Santiago
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Plataformas de alta velocidad con arquitectura estática en Next.js. Posicionamos tu negocio frente a clientes activos que buscan tus servicios en Google en la Región Metropolitana.
              </p>
            </div>

            {/* Interactive Speed Gauge & PageSpeed Slot */}
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-white/70 p-4 backdrop-blur-md shadow-xs transition-all group-hover:bg-white">
              <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[#0A5CFF]" />
                  <span className="font-mono text-[10px] font-bold uppercase text-[var(--text-slate)]">
                    Audit de Rendimiento en Vivo
                  </span>
                </div>
                <div className="flex rounded-lg border border-[var(--border-subtle)] p-0.5 bg-[var(--sm-bg-alt)]">
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveSpeedTab('mobile'); }}
                    className={`px-2 py-0.5 font-mono text-[9px] font-bold rounded-md transition-colors ${
                      activeSpeedTab === 'mobile' ? 'bg-[#0A5CFF] text-white' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    Móvil (5G)
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveSpeedTab('desktop'); }}
                    className={`px-2 py-0.5 font-mono text-[9px] font-bold rounded-md transition-colors ${
                      activeSpeedTab === 'desktop' ? 'bg-[#0A5CFF] text-white' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    Desktop
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-[#0A5CFF]/5 p-2 border border-[#0A5CFF]/20">
                  <span className="block font-display text-xl font-black text-[#0A5CFF]">100/100</span>
                  <span className="font-mono text-[8px] font-bold uppercase text-[var(--text-secondary)]">Rendimiento</span>
                </div>
                <div className="rounded-xl bg-emerald-500/5 p-2 border border-emerald-500/20">
                  <span className="block font-display text-xl font-black text-emerald-600">&lt; 0.2s</span>
                  <span className="font-mono text-[8px] font-bold uppercase text-[var(--text-secondary)]">First Contentful</span>
                </div>
                <div className="rounded-xl bg-purple-500/5 p-2 border border-purple-500/20">
                  <span className="block font-display text-xl font-black text-purple-600">0.0 ms</span>
                  <span className="font-mono text-[8px] font-bold uppercase text-[var(--text-secondary)]">Layout Shift</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] relative z-10">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Incluye Dominio .CL · SSL Gratuito · SEO Local
            </span>
            <MagneticButton href="#contacto" variant="secondary" className="px-5 py-2 text-[10px]">
              Cotizar Mi Web
              <ChevronRight className="h-3.5 w-3.5" />
            </MagneticButton>
          </div>
        </SpotlightCard>

        {/* CARD 2: Menús & Catálogos WhatsApp (1 columna) — based on image_3.png */}
        <SpotlightCard tilt={true} tiltStrength={10} className="p-8 flex flex-col justify-between min-h-[420px] relative overflow-hidden group">
          <span className="section-num-deco text-[120px] absolute -top-6 -right-3 leading-none opacity-20 group-hover:opacity-30 transition-opacity">
            02
          </span>

          <div className="space-y-5 relative z-10">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-emerald-600">
                PRECIOS CLP + WHATSAPP
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-sm group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                <Smartphone className="h-6 w-6 text-emerald-600" />
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-black text-[var(--text-slate)] mb-2">
                Menús y Catálogos Digitales
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                Olvídate de comisiones del 25% en apps de delivery. Tus clientes escogen y te envían el pedido estructurado al WhatsApp con el total en CLP en 1 clic.
              </p>
            </div>

            {/* Interactive WhatsApp Order Simulation */}
            <div
              onClick={() => setWaOrderStep((s) => (s === 1 ? 2 : 1))}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-3 cursor-pointer transition-all hover:bg-emerald-500/[0.08]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] font-bold uppercase text-emerald-700">
                  {waOrderStep === 1 ? '👆 Clic para Simular Envío' : '✅ Pedido Generado'}
                </span>
                <MessageCircle className="h-4 w-4 text-emerald-600 animate-pulse" />
              </div>
              {waOrderStep === 1 ? (
                <div className="space-y-1 font-mono text-[9px] text-[var(--text-secondary)]">
                  <div className="flex justify-between"><span>2x Arepa Reina</span><span>$9.000 CLP</span></div>
                  <div className="flex justify-between font-bold text-[var(--text-slate)] border-t border-emerald-500/20 pt-1">
                    <span>Total a Pagar:</span><span>$9.000 CLP</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-white p-2 text-center shadow-xs border border-emerald-500/30">
                  <p className="font-mono text-[9px] font-bold text-emerald-700">
                    &ldquo;Hola! Quisiera pedir 2x Arepa Reina ($9.000 CLP)&rdquo; 🚀
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-5 mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] relative z-10">
            <span className="font-mono text-[9px] font-bold uppercase text-emerald-600">
              Cero comisiones por venta
            </span>
            <MagneticButton href="#contacto" variant="secondary" className="px-4 py-1.5 text-[9px]">
              Solicitar
              <ChevronRight className="h-3.5 w-3.5" />
            </MagneticButton>
          </div>
        </SpotlightCard>

        {/* CARD 3: Automatización de Ventas & Demo (3 columnas / full width bottom) — based on image_4.png */}
        <SpotlightCard tilt={true} tiltStrength={6} className="md:col-span-3 p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden group border-[#0A5CFF]/30">
          <span className="section-num-deco text-[160px] absolute -bottom-10 -left-6 leading-none opacity-15 group-hover:opacity-25 transition-opacity">
            03
          </span>

          <div className="flex-1 space-y-4 relative z-10 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0A5CFF] text-white px-3.5 py-1 font-mono text-[9px] font-black uppercase tracking-widest shadow-sm">
                <Zap className="h-3 w-3 animate-bounce" />
                AUTOMATIZACIÓN DE VENTAS
              </span>
              <StatusBadge color="lavender">ESCALABILIDAD TOTAL</StatusBadge>
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-black text-[var(--text-slate)]">
              Sistemas de Distribución & Venta Mayorista
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-[var(--text-secondary)]">
              Digitalizamos el flujo comercial de distribuidoras, comercios locales y empresas B2B en Santiago. Integración con formularios de captura rápida de leads, inventarios auto-gestionados y conexión directa al CRM de tu equipo.
            </p>

            {/* Feature Check Pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-1.5 rounded-full bg-white/80 border border-[var(--border-subtle)] px-3 py-1 text-xs font-semibold text-[var(--text-slate)] shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-[#0A5CFF]" />
                <span>Base de datos propia</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white/80 border border-[var(--border-subtle)] px-3 py-1 text-xs font-semibold text-[var(--text-slate)] shadow-2xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Autogestión sin código</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white/80 border border-[var(--border-subtle)] px-3 py-1 text-xs font-semibold text-[var(--text-slate)] shadow-2xs">
                <Sparkles className="h-3.5 w-3.5 text-[#9C6ADE]" />
                <span>Escalable con tu crecimiento</span>
              </div>
            </div>
          </div>

          {/* CTA Box / Demo Launcher slot */}
          <div className="flex flex-col items-start md:items-end gap-4 relative z-10 shrink-0 w-full md:w-auto rounded-3xl border border-[var(--border-subtle)] bg-white/80 p-6 backdrop-blur-lg shadow-sm">
            <div className="text-left md:text-right">
              <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                ¿Quieres ver cómo funciona?
              </span>
              <span className="font-display text-lg font-bold text-[var(--text-slate)]">
                Explora el Prototipo en Vivo
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <MagneticButton
                onClick={() => {
                  if (onOpenDemo) onOpenDemo();
                  else {
                    const heroPhone = document.querySelector('#hero-phone-showcase');
                    if (heroPhone) heroPhone.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                variant="primary"
                className="px-6 py-3.5 text-xs w-full sm:w-auto font-black shadow-lg shadow-[#0A5CFF]/30"
              >
                <Zap className="h-4 w-4" />
                VER DEMO INTERACTIVA
              </MagneticButton>
              <MagneticButton href="#contacto" variant="secondary" className="px-5 py-3.5 text-xs w-full sm:w-auto">
                Asesoría Gratuita
                <ArrowRight className="h-3.5 w-3.5" />
              </MagneticButton>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
