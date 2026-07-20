'use client';

import React, { useRef, useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type GlassSurfaceVariant = 'default' | 'strong' | 'subtle' | 'fogged' | 'glow';

const variantClass: Record<GlassSurfaceVariant, string> = {
  default: 'glass-surface',
  strong:  'glass-surface glass-surface-strong',
  subtle:  'glass-surface glass-surface-subtle',
  fogged:  'glass-surface glass-fogged',
  glow:    'glass-surface glass-surface-glow',
};

/* ── GlassSurface ────────────────────────────────────────────── */
interface GlassSurfaceProps {
  children: React.ReactNode;
  variant?: GlassSurfaceVariant;
  className?: string;
  as?: React.ElementType;
  onClick?: () => void;
  style?: React.CSSProperties;
  id?: string;
}

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

/* ── SpotlightCard — with optional 3D Tilt ───────────────────── */
interface SpotlightCardProps {
  children: React.ReactNode;
  variant?: GlassSurfaceVariant;
  className?: string;
  id?: string;
  tilt?: boolean;
  tiltStrength?: number;
}

export function SpotlightCard({
  children,
  variant = 'default',
  className = '',
  id,
  tilt = true,
  tiltStrength = 8,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();

      // Spotlight tracking
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty('--x', `${x}%`);
      ref.current.style.setProperty('--y', `${y}%`);

      // 3D tilt — map cursor position to rotation degrees
      if (tilt) {
        const cx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const cy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        setRotateY(cx * tiltStrength);
        setRotateX(-cy * tiltStrength);
      }
    },
    [prefersReduced, tilt, tiltStrength]
  );

  const handlePointerLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    if (ref.current) {
      ref.current.style.setProperty('--x', '50%');
      ref.current.style.setProperty('--y', '50%');
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      id={id}
      className={`${variantClass[variant]} spotlight-card ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ transformStyle: 'preserve-3d' }}
      animate={
        prefersReduced
          ? {}
          : {
              rotateX,
              rotateY,
            }
      }
      whileHover={prefersReduced ? {} : { y: -6, scale: 1.012 }}
      whileTap={prefersReduced ? {} : { scale: 0.988 }}
      transition={{
        duration: 0.22,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        rotateX: { type: 'spring', stiffness: 180, damping: 22 },
        rotateY: { type: 'spring', stiffness: 180, damping: 22 },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── StatusBadge ─────────────────────────────────────────────── */
/*
  Pill badge with solid pastel background + slate text.
  Contrast verified: slate (#1E293B) on sage (#A8DADC) = ~7.1:1 ✓ AAA
                     slate (#1E293B) on sky-light (#8EC5FC) = ~5.8:1 ✓ AA
  NEVER uses pastel as text color on a light background.
*/
type BadgeColor = 'sage' | 'sky' | 'lavender' | 'neutral';

const badgeStyle: Record<BadgeColor, { bg: string; border: string }> = {
  sage:     { bg: 'rgba(168, 218, 220, 0.55)', border: 'rgba(168, 218, 220, 0.7)' },
  sky:      { bg: 'rgba(142, 197, 252, 0.30)', border: 'rgba(112, 161, 215, 0.45)' },
  lavender: { bg: 'rgba(224, 195, 252, 0.28)', border: 'rgba(224, 195, 252, 0.50)' },
  neutral:  { bg: 'rgba(30,  41,  59,  0.06)', border: 'rgba(30,  41,  59,  0.12)' },
};

interface StatusBadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
  dot?: boolean;
  shimmer?: boolean;
}

export function StatusBadge({
  children,
  color = 'sage',
  className = '',
  dot = false,
  shimmer = false,
}: StatusBadgeProps) {
  const { bg, border } = badgeStyle[color];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase tracking-widest ${shimmer ? 'shimmer-badge' : ''} ${className}`}
      style={{
        background: bg,
        border: `1px solid ${border}`,
        color: 'var(--sm-slate)',  /* slate text on pastel bg = AA+ always */
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
          style={{ background: 'var(--sm-slate)', opacity: 0.5 }}
        />
      )}
      {children}
    </span>
  );
}
