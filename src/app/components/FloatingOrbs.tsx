'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface OrbConfig {
  id: number;
  color: string;
  size: string;
  blur: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity: number;
  duration: number;
  x: [number, number, number];
  y: [number, number, number];
  scale: [number, number, number];
}

interface FloatingOrbsProps {
  intensity?: 'low' | 'medium' | 'high';
  palette?: 'sky' | 'lavender' | 'mixed';
  className?: string;
}

const orbSets: Record<FloatingOrbsProps['palette'] & string, OrbConfig[]> = {
  sky: [
    {
      id: 1,
      color: 'rgba(142, 197, 252, 0.22)',
      size: '560px',
      blur: '90px',
      top: '-14%',
      right: '-8%',
      opacity: 1,
      duration: 38,
      x: [0, -40, 20],
      y: [0, 60, -30],
      scale: [1, 1.14, 0.94],
    },
    {
      id: 2,
      color: 'rgba(112, 161, 215, 0.16)',
      size: '420px',
      blur: '70px',
      bottom: '-10%',
      left: '-6%',
      opacity: 1,
      duration: 52,
      x: [0, 50, -20],
      y: [0, -40, 30],
      scale: [1, 0.92, 1.08],
    },
  ],
  lavender: [
    {
      id: 1,
      color: 'rgba(224, 195, 252, 0.20)',
      size: '500px',
      blur: '100px',
      top: '-10%',
      right: '-10%',
      opacity: 1,
      duration: 44,
      x: [0, -30, 15],
      y: [0, 50, -25],
      scale: [1, 1.1, 0.95],
    },
    {
      id: 2,
      color: 'rgba(142, 197, 252, 0.12)',
      size: '380px',
      blur: '80px',
      bottom: '-12%',
      left: '-4%',
      opacity: 1,
      duration: 60,
      x: [0, 40, -15],
      y: [0, -35, 20],
      scale: [1, 0.9, 1.06],
    },
  ],
  mixed: [
    {
      id: 1,
      color: 'rgba(142, 197, 252, 0.18)',
      size: '600px',
      blur: '100px',
      top: '-18%',
      right: '-10%',
      opacity: 1,
      duration: 42,
      x: [0, -50, 25],
      y: [0, 70, -35],
      scale: [1, 1.16, 0.92],
    },
    {
      id: 2,
      color: 'rgba(224, 195, 252, 0.16)',
      size: '440px',
      blur: '80px',
      bottom: '-14%',
      left: '-8%',
      opacity: 1,
      duration: 56,
      x: [0, 60, -28],
      y: [0, -48, 22],
      scale: [1, 0.88, 1.1],
    },
    {
      id: 3,
      color: 'rgba(168, 218, 220, 0.12)',
      size: '320px',
      blur: '70px',
      top: '40%',
      left: '30%',
      opacity: 1,
      duration: 68,
      x: [0, 30, -40],
      y: [0, 20, -50],
      scale: [1, 1.08, 0.94],
    },
  ],
};

const intensityMultipliers = {
  low: 0.55,
  medium: 1,
  high: 1.4,
};

export function FloatingOrbs({
  intensity = 'medium',
  palette = 'mixed',
  className = '',
}: FloatingOrbsProps) {
  const prefersReduced = useReducedMotion();
  const multiplier = intensityMultipliers[intensity];
  const orbs = orbSets[palette] ?? orbSets.mixed;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {orbs.map((orb) => {
        const posStyle: React.CSSProperties = {
          position: 'absolute',
          width: orb.size,
          height: orb.size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orb.color} 0%, transparent 68%)`,
          filter: `blur(${orb.blur})`,
          willChange: 'transform',
          ...(orb.top != null && { top: orb.top }),
          ...(orb.right != null && { right: orb.right }),
          ...(orb.bottom != null && { bottom: orb.bottom }),
          ...(orb.left != null && { left: orb.left }),
          opacity: orb.opacity * multiplier,
        };

        if (prefersReduced) {
          return <div key={orb.id} style={posStyle} />;
        }

        return (
          <motion.div
            key={orb.id}
            style={posStyle}
            animate={{
              x: orb.x,
              y: orb.y,
              scale: orb.scale,
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              times: [0, 0.5, 1],
            }}
          />
        );
      })}
    </div>
  );
}
