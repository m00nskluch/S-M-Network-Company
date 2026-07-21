'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle2, Zap, Clock, ShieldAlert, ShieldCheck, DollarSign, RefreshCw, Cpu, Layers } from 'lucide-react';
import { GlassSurface } from './GlassSurface';

interface ComparisonRow {
  id: string;
  traditionalTitle: string;
  traditionalDesc: string;
  traditionalSvg: React.ReactNode;
  traditionalWarning: string;
  kineticTitle: string;
  kineticDesc: string;
  kineticSvg: React.ReactNode;
  kineticBenefit: string;
}

const comparisonData: ComparisonRow[] = [
  {
    id: 'speed',
    traditionalTitle: 'Sitios lentos & prefabricados',
    traditionalDesc: 'Constructores (WordPress/Elementor) pesados con más de 30 plugins innecesarios. Tiempos de carga > 4 segundos.',
    traditionalWarning: 'Carga lenta (4.2s) = 65% abandono',
    traditionalSvg: (
      <div className="flex items-center gap-2 text-rose-500 font-mono text-xs">
        <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Cargando scripts lentos... [4.2s]</span>
      </div>
    ),
    kineticTitle: 'Carga Instantánea en Next.js',
    kineticDesc: 'Código estático y SSR ultra-roptimizado. Compilación nativa que sirve tu web en milisegundos sin sobrecarga.',
    kineticBenefit: 'Velocidad < 0.3s = 100/100 PageSpeed',
    kineticSvg: (
      <div className="flex items-center gap-2 text-[#0A5CFF] font-mono text-xs font-bold">
        <Zap className="w-5 h-5 animate-bounce" />
        <span>Carga instantánea [0.18s] ✓ SSR</span>
      </div>
    ),
  },
  {
    id: 'cost',
    traditionalTitle: 'Mensualidades amarradas perpetuas',
    traditionalDesc: 'Te cobran una cuota mensual obligatoria ($50.000 - $150.000 CLP/mes) solo por mantener tu sitio en un servidor básico.',
    traditionalWarning: 'Costo acumulado a 3 años: > $3.600.000 CLP',
    traditionalSvg: (
      <div className="flex items-center gap-2 text-rose-500 font-mono text-xs">
        <RefreshCw className="w-5 h-5 animate-pulse" />
        <span>Cobro mensual recurrente en curso...</span>
      </div>
    ),
    kineticTitle: 'Único pago inicial justo ($0 / mes)',
    kineticDesc: 'Sin comisiones mensuales ni amarres contractuales. Eres dueño absoluto del código fuente y del servidor estático.',
    kineticBenefit: 'Ahorro del 100% en mantenimiento mensual',
    kineticSvg: (
      <div className="flex items-center gap-2 text-[#0A5CFF] font-mono text-xs font-bold">
        <DollarSign className="w-5 h-5 animate-pulse" />
        <span>$0 CLP Mensuales · Código 100% Tuyo</span>
      </div>
    ),
  },
  {
    id: 'tech',
    traditionalTitle: 'Código frágil y vulnerable',
    traditionalDesc: 'Dependencia crítica de plantillas obsoletas y fallas constantes tras actualizaciones automáticas del servidor.',
    traditionalWarning: 'Brechas de seguridad & caídas frecuentes',
    traditionalSvg: (
      <div className="flex items-center gap-2 text-rose-500 font-mono text-xs">
        <ShieldAlert className="w-5 h-5" />
        <span>Vulnerabilidad detectada en plugin de terceros</span>
      </div>
    ),
    kineticTitle: 'Ingeniería Next.js & TypeScript',
    kineticDesc: 'Arquitectura tipada robusta, blindada contra ataques comunes, respaldada por la red global de Vercel y Cloudflare.',
    kineticBenefit: 'Seguridad de grado corporativo 99.9% Uptime',
    kineticSvg: (
      <div className="flex items-center gap-2 text-[#0A5CFF] font-mono text-xs font-bold">
        <ShieldCheck className="w-5 h-5" />
        <span>Arquitectura TypeScript + Vercel Edge</span>
      </div>
    ),
  },
  {
    id: 'sales',
    traditionalTitle: 'Sin conexión a ventas locales',
    traditionalDesc: 'Formularios aburridos que llegan al correo de spam sin notificar a tu equipo comercial ni integrar WhatsApp.',
    traditionalWarning: 'Leads perdidos por falta de inmediatez',
    traditionalSvg: (
      <div className="flex items-center gap-2 text-rose-500 font-mono text-xs">
        <Layers className="w-5 h-5 opacity-60" />
        <span>Formulario genérico → Bandeja de Spam</span>
      </div>
    ),
    kineticTitle: 'Conexión directa a tu WhatsApp',
    kineticDesc: 'Catálogos interactivos con cotizador CLP que envían pedidos estructurados directamente al WhatsApp de tu negocio.',
    kineticBenefit: 'Conversión inmediata en 1 solo clic',
    kineticSvg: (
      <div className="flex items-center gap-2 text-[#0A5CFF] font-mono text-xs font-bold">
        <Cpu className="w-5 h-5 animate-pulse" />
        <span>Pedido CLP → WhatsApp Comercial Directo 🚀</span>
      </div>
    ),
  },
];

export function ComparisonBento() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-1.5 shadow-xs">
          <Zap className="h-3.5 w-3.5 text-[#0A5CFF]" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-slate)]">
            Evolución Tecnológica
          </span>
        </div>
        <h2 className="font-display text-3xl font-black md:text-5xl tracking-tight text-[var(--text-slate)]">
          Tradicional vs. Kinetic Tech
        </h2>
        <p className="text-sm md:text-base text-[var(--text-secondary)]">
          Pasa el cursor sobre cada ranura para explorar cómo eliminamos la fricción, los costos ocultos y la lentitud.
        </p>
      </div>

      {/* Comparison Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Traditional Agencies */}
        <GlassSurface variant="fogged" className="p-6 md:p-8 rounded-3xl border border-rose-500/20">
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)] mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--text-slate)]">Agencias & Plantillas</h3>
                <p className="font-mono text-[10px] text-rose-500 font-semibold uppercase tracking-wider">
                  MODELO ANTIGUO & COSTOSO
                </p>
              </div>
            </div>
            <span className="rounded-full bg-rose-500/10 px-3 py-1 font-mono text-[10px] font-bold text-rose-600">
              Obsoleto
            </span>
          </div>

          <div className="space-y-4">
            {comparisonData.map((row) => {
              const isHover = hoveredId === row.id;
              return (
                <div
                  key={row.id}
                  onMouseEnter={() => setHoveredId(row.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                    isHover
                      ? 'border-rose-500/50 bg-rose-500/[0.04] shadow-md'
                      : 'border-[var(--border-subtle)] bg-white/40 hover:bg-white/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                        <h4 className="font-display font-semibold text-base text-[var(--text-slate)] group-hover:text-rose-600 transition-colors">
                          {row.traditionalTitle}
                        </h4>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {row.traditionalDesc}
                      </p>
                    </div>
                  </div>

                  {/* Micro-interaction expansion slot */}
                  <AnimatePresence>
                    {isHover && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-rose-500/20 pt-3"
                      >
                        <div className="flex items-center justify-between rounded-xl bg-rose-500/10 p-3">
                          {row.traditionalSvg}
                        </div>
                        <p className="mt-2 font-mono text-[10px] font-bold text-rose-600">
                          ⚠️ {row.traditionalWarning}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </GlassSurface>

        {/* Right Column: S&M Kinetic Tech */}
        <GlassSurface variant="strong" className="p-6 md:p-8 rounded-3xl border border-[#0A5CFF]/40 shadow-[var(--sm-shadow-lg)]">
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)] mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A5CFF]/10 text-[#0A5CFF] border border-[#0A5CFF]/30">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[var(--text-slate)]">S&M Network Company</h3>
                <p className="font-mono text-[10px] text-[#0A5CFF] font-bold uppercase tracking-wider">
                  KINETIC TECH MINIMALISM
                </p>
              </div>
            </div>
            <span className="rounded-full bg-[#0A5CFF] px-3 py-1 font-mono text-[10px] font-bold text-white shadow-sm">
              Recomendado
            </span>
          </div>

          <div className="space-y-4">
            {comparisonData.map((row) => {
              const isHover = hoveredId === row.id;
              return (
                <div
                  key={row.id}
                  onMouseEnter={() => setHoveredId(row.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                    isHover
                      ? 'border-[#0A5CFF] bg-[#0A5CFF]/[0.06] shadow-md scale-[1.015]'
                      : 'border-[var(--border-subtle)] bg-white/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#0A5CFF] shrink-0" />
                        <h4 className="font-display font-bold text-base text-[var(--text-slate)] group-hover:text-[#0A5CFF] transition-colors">
                          {row.kineticTitle}
                        </h4>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {row.kineticDesc}
                      </p>
                    </div>
                  </div>

                  {/* Micro-interaction expansion slot */}
                  <AnimatePresence>
                    {isHover && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 14 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-[#0A5CFF]/20 pt-3"
                      >
                        <div className="flex items-center justify-between rounded-xl bg-[#0A5CFF]/10 p-3">
                          {row.kineticSvg}
                        </div>
                        <p className="mt-2 font-mono text-[10px] font-bold text-[#0A5CFF]">
                          🚀 {row.kineticBenefit}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </GlassSurface>
      </div>
    </div>
  );
}
