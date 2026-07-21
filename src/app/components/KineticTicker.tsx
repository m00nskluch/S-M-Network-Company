'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from 'framer-motion';
import { Sparkles, Zap, Shield, Star, MapPin, Globe, Code2 } from 'lucide-react';

const tickerItems = [
  { text: 'Santiago, Chile 🇨🇱', icon: <MapPin className="w-3.5 h-3.5 text-[#0A5CFF]" />, tag: 'LOCAL' },
  { text: 'Next.js 16 Nativo', icon: <Code2 className="w-3.5 h-3.5 text-[#4E8EFF]" />, tag: 'STACK' },
  { text: 'Sin Cobros Mensuales', icon: <Star className="w-3.5 h-3.5 text-[#A8DADC]" />, tag: '$0 CLP' },
  { text: 'Alta Velocidad < 0.3s', icon: <Zap className="w-3.5 h-3.5 text-[#0A5CFF]" />, tag: 'PERFORMANCE' },
  { text: 'SEO Local Optimizado', icon: <Globe className="w-3.5 h-3.5 text-[#9C6ADE]" />, tag: 'GOOGLE' },
  { text: 'Código 100% Propio', icon: <Shield className="w-3.5 h-3.5 text-[#0A5CFF]" />, tag: 'SEGURIDAD' },
  { text: 'Escalabilidad Total', icon: <Sparkles className="w-3.5 h-3.5 text-[#4E8EFF]" />, tag: 'FUTURO' },
];

export function KineticTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const prefersReduced = useReducedMotion();

  useGSAP(() => {
    if (prefersReduced || !trackRef.current) return;

    // Calculate total width of single set
    const totalWidth = trackRef.current.scrollWidth / 2;

    // GSAP infinite horizontal loop
    tweenRef.current = gsap.to(trackRef.current, {
      x: -totalWidth,
      duration: 32,
      ease: 'none',
      repeat: -1,
      onRepeat: () => {
        gsap.set(trackRef.current, { x: 0 });
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [prefersReduced]);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.15, duration: 0.6, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: 'power2.out' });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden py-5"
      style={{
        background: 'var(--sm-bg-alt)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {/* Edge gradient masks for seamless fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[var(--sm-bg-alt)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[var(--sm-bg-alt)] to-transparent" />

      {/* Marquee Track (Double items for infinite loop) */}
      <div
        ref={trackRef}
        className="flex w-max items-center gap-6 px-3"
      >
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div
            key={idx}
            className="group flex shrink-0 items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-2 shadow-sm transition-all duration-300 hover:border-[#0A5CFF]/40 hover:shadow-md hover:scale-[1.03]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0A5CFF]/10 transition-transform group-hover:rotate-12">
              {item.icon}
            </span>
            <span className="font-display text-xs font-semibold tracking-tight text-[var(--text-slate)]">
              {item.text}
            </span>
            <span className="rounded-md bg-[var(--text-slate)]/5 px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-[var(--text-secondary)] group-hover:bg-[#0A5CFF]/10 group-hover:text-[#0A5CFF]">
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
