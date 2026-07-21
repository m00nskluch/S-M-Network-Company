'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from 'framer-motion';
import { Zap, Shield, Star, ArrowUpRight, TrendingUp, CheckCircle } from 'lucide-react';
import { SpotlightCard } from './GlassSurface';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface MetricSlot {
  id: string;
  targetValue: number;
  suffix: string;
  prefix: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
  accentHex: string;
  colSpan: string;
  details: string;
}

const metricsData: MetricSlot[] = [
  {
    id: 'pymes',
    targetValue: 12,
    prefix: '',
    suffix: '+',
    title: 'PYMEs Impulsadas en Santiago',
    subtitle: 'Restaurantes, comercios locales y distribuidoras operando con alta velocidad y autonomía digital en la RM.',
    icon: <Zap className="h-6 w-6 text-[#0A5CFF]" />,
    badge: 'CASOS DE ÉXITO',
    badgeColor: 'bg-[#0A5CFF]/10 text-[#0A5CFF] border-[#0A5CFF]/30',
    accentHex: '#0A5CFF',
    colSpan: 'md:col-span-1 lg:col-span-1',
    details: 'Velocidad promedio < 0.3s · +140% retención local',
  },
  {
    id: 'code',
    targetValue: 100,
    prefix: '',
    suffix: '%',
    title: 'Código Propio & Nativo en Next.js',
    subtitle: 'Sin plantillas lentas, sin constructores frágiles. Código a medida optimizado y auditado para máximo rendimiento e indexación.',
    icon: <Shield className="h-6 w-6 text-[#4E8EFF]" />,
    badge: 'STACK PROFESIONAL',
    badgeColor: 'bg-[#4E8EFF]/10 text-[#4E8EFF] border-[#4E8EFF]/30',
    accentHex: '#4E8EFF',
    colSpan: 'md:col-span-1 lg:col-span-1',
    details: '100 / 100 en Google PageSpeed Insights',
  },
  {
    id: 'fees',
    targetValue: 0,
    prefix: '$',
    suffix: ' CLP',
    title: 'Cobros Mensuales Amarrados',
    subtitle: 'Un único pago inicial justo y transparente. Tu PYME es dueña al 100% de su código, dominio y servidores estáticos.',
    icon: <Star className="h-6 w-6 text-[#1D2129]" />,
    badge: 'SIN SORPRESAS',
    badgeColor: 'bg-[#A8DADC]/40 text-[#1D2129] border-[#A8DADC]',
    accentHex: '#A8DADC',
    colSpan: 'md:col-span-2 lg:col-span-1',
    details: 'Inversión clara desde el día 1 · Autogestión total',
  },
];

export function MetricsBento() {
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [counts, setCounts] = useState<Record<string, number>>({
    pymes: 0,
    code: 0,
    fees: 150000, // starts at high mock fee and counts down to 0 for dramatic impact
  });

  useGSAP(() => {
    if (prefersReduced || !gridRef.current) {
      setCounts({ pymes: 12, code: 100, fees: 0 });
      return;
    }

    const counterObj = { pymes: 0, code: 0, fees: 120000 };

    gsap.to(counterObj, {
      pymes: 12,
      code: 100,
      fees: 0,
      duration: 2.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        setCounts({
          pymes: Math.round(counterObj.pymes),
          code: Math.round(counterObj.code),
          fees: Math.round(counterObj.fees),
        });
      },
    });

    // Staggered card entrance animation
    gsap.from('.metric-bento-card', {
      opacity: 0,
      y: 36,
      scale: 0.96,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 88%',
        once: true,
      },
    });
  }, [prefersReduced]);

  return (
    <div ref={gridRef} className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-20">
      {/* Section Header */}
      <div className="mx-auto max-w-3xl text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-1.5 shadow-xs">
          <TrendingUp className="h-3.5 w-3.5 text-[#0A5CFF]" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-slate)]">
            Métricas de Impacto Real
          </span>
        </div>
        <h2 className="font-display text-3xl font-black md:text-5xl tracking-tight text-[var(--text-slate)]">
          Números que Hablan por Tu Negocio
        </h2>
        <p className="text-sm md:text-base text-[var(--text-secondary)]">
          Reconstruimos la presencia de tu empresa con ingeniería verificada y total control de tu inversión.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricsData.map((slot) => {
          const val = counts[slot.id] ?? slot.targetValue;
          return (
            <SpotlightCard
              key={slot.id}
              tilt={true}
              tiltStrength={12}
              className={`metric-bento-card group flex flex-col justify-between p-8 lg:p-10 ${slot.colSpan} min-h-[380px] relative overflow-hidden transition-all duration-300 hover:border-[#0A5CFF]/40 hover:shadow-xl`}
            >
              {/* Background luminous ambient orb */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                style={{ background: slot.accentHex }}
              />

              {/* Top slot header */}
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest ${slot.badgeColor}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                  {slot.badge}
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {slot.icon}
                </div>
              </div>

              {/* Center dynamic metric count */}
              <div className="relative z-10 my-8 space-y-2">
                <div className="flex items-baseline gap-1 font-display font-black tracking-tighter text-[var(--text-slate)]">
                  <span className="text-xl md:text-2xl text-[var(--text-secondary)] font-bold">
                    {slot.prefix}
                  </span>
                  <span className="text-6xl lg:text-7xl tabular-nums bg-gradient-to-br from-[var(--text-slate)] to-[#0A5CFF] bg-clip-text text-transparent">
                    {val.toLocaleString('es-CL')}
                  </span>
                  <span className="text-3xl lg:text-4xl text-[#0A5CFF]">
                    {slot.suffix}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-slate)] group-hover:text-[#0A5CFF] transition-colors">
                  {slot.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {slot.subtitle}
                </p>
              </div>

              {/* Bottom interactive slot detail */}
              <div className="relative z-10 flex items-center justify-between border-t border-[var(--border-subtle)] pt-5">
                <div className="flex items-center gap-2 font-mono text-[10px] font-semibold text-[var(--text-secondary)]">
                  <CheckCircle className="h-3.5 w-3.5 text-[#0A5CFF]" />
                  <span>{slot.details}</span>
                </div>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-slate)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-[#0A5CFF] group-hover:text-[#0A5CFF]">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
