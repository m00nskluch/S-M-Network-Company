'use client';

import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

type GlassSurfaceVariant = 'default' | 'strong' | 'subtle' | 'fogged';

interface GlassSurfaceProps {
  children: React.ReactNode;
  variant?: GlassSurfaceVariant;
  className?: string;
  as?: React.ElementType;
  onClick?: () => void;
  style?: React.CSSProperties;
  id?: string;
}

const variantClass: Record<GlassSurfaceVariant, string> = {
  default: 'glass-surface',
  strong:  'glass-surface glass-surface-strong',
  subtle:  'glass-surface glass-surface-subtle',
  fogged:  'glass-surface glass-fogged',
};

export function GlassSurface({
  children,
  variant = 'default',
  className = '',
  as: Tag = 'div',
  onClick,
  style,
  id,
}: GlassSurfaceProps) {
  return (
    <Tag
      id={id}
      className={`${variantClass[variant]} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </Tag>
  );
}

/* ─── Spotlight Card ──────────────────────────────────────── */
interface SpotlightCardProps {
  children: React.ReactNode;
  variant?: GlassSurfaceVariant;
  className?: string;
  hoverBorderColor?: string;
  id?: string;
}

export function SpotlightCard({
  children,
  variant = 'default',
  className = '',
  hoverBorderColor,
  id,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty('--x', `${x}%`);
      ref.current.style.setProperty('--y', `${y}%`);
    },
    [prefersReduced]
  );

  return (
    <motion.div
      ref={ref}
      id={id}
      className={`${variantClass[variant]} spotlight-card ${className}`}
      onPointerMove={handlePointerMove}
      whileHover={prefersReduced ? {} : { y: -6, scale: 1.012 }}
      whileTap={prefersReduced ? {} : { scale: 0.988 }}
      transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      style={hoverBorderColor ? {
        ['--hover-border' as string]: hoverBorderColor,
      } : undefined}
    >
      {children}
    </motion.div>
  );
}
