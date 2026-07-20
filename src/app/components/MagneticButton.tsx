'use client';

import React, { useRef, useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
  radius?: number;
  strength?: number;
}

export function MagneticButton({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'secondary',
  className = '',
  radius = 44,
  strength = 0.34,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReduced || isTouch || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        setOffset({ x: dx * strength, y: dy * strength });
      }
    },
    [prefersReduced, isTouch, radius, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  const handleTouchStart = useCallback(() => {
    setIsTouch(true);
  }, []);

  const primaryStyle =
    'bg-[#2FE6A6] text-[#0B0F14] font-black border border-[rgba(47,230,166,0.4)] shadow-[0_4px_20px_rgba(47,230,166,0.28)] hover:shadow-[0_8px_36px_rgba(47,230,166,0.42)] hover:bg-[#4ef5b8]';

  const secondaryStyle =
    'glass-surface glass-surface-subtle text-[#F3F5F4] hover:border-[rgba(255,255,255,0.22)]';

  const baseClass = `glass-cta-btn relative inline-flex items-center justify-center gap-2 rounded-full text-xs font-black uppercase tracking-wider transition-[box-shadow,background-color,border-color] select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2FE6A6] focus-visible:outline-offset-3 ${
    variant === 'primary' ? primaryStyle : secondaryStyle
  } ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`;

  const motionProps = prefersReduced
    ? {}
    : {
        animate: { x: offset.x, y: offset.y },
        whileTap: { scale: 0.96 },
        transition: {
          type: 'spring' as const,
          stiffness: 300,
          damping: 22,
        },
      };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={baseClass}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}

/* Glass CTA shine class is in globals.css as .glass-cta-btn */
