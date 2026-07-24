'use client';

import React, { useRef, useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/*
  CONTRAST VERIFICATION (Section 3 of spec):
  Primary CTA: --sm-sky (#70A1D7) background + --sm-slate (#1E293B) text
  Contrast ratio: ~5.4:1 → passes WCAG AA (≥4.5:1 for normal text) ✓

  Secondary: glass-surface-subtle bg + --sm-slate text
  Contrast ratio: >>7:1 (white/near-white bg) → passes AAA ✓
*/

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
  strength = 0.32,
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

  const handleMouseLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);
  const handleTouchStart = useCallback(() => setIsTouch(true), []);

  // Primary: #70A1D7 bg + #1E293B text = 5.4:1, passes AA ✓
  const primaryStyle = [
    'glass-cta-btn',
    'font-medium',
    'border border-[rgba(77,130,188,0.5)]',
    'shadow-[0_4px_18px_rgba(77,130,188,0.30)]',
    'hover:shadow-[0_8px_32px_rgba(77,130,188,0.42)]',
    'hover:bg-[#5F90C5]',
    'active:bg-[#5483B8]',
  ].join(' ');

  const secondaryStyle = [
    'glass-surface glass-surface-subtle',
    'font-medium',
    'hover:border-[rgba(77,130,188,0.55)]',
    'hover:shadow-[0_4px_16px_rgba(77,130,188,0.14)]',
  ].join(' ');

  const baseClass = `relative inline-flex items-center justify-center gap-2 rounded-full text-xs uppercase tracking-wider transition-[box-shadow,background-color,border-color] select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[#70A1D7] focus-visible:outline-offset-3 ${
    variant === 'primary' ? primaryStyle : secondaryStyle
  } ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`;

  const motionProps = prefersReduced
    ? {}
    : {
        animate: { x: offset.x, y: offset.y },
        whileTap: { scale: 0.97 },
        transition: {
          type: 'spring' as const,
          stiffness: 300,
          damping: 22,
        },
      };

  const primaryInlineStyle = variant === 'primary'
    ? { background: 'var(--sm-sky)', color: 'var(--sm-slate)' }
    : { color: 'var(--sm-slate)' };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={baseClass}
        style={primaryInlineStyle}
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
      style={primaryInlineStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
