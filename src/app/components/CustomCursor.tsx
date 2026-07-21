'use client';

import React, { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // Default true until mouse move detected

  useGSAP(() => {
    if (prefersReduced || isTouch || !cursorRef.current || !dotRef.current) return;

    // High performance quick setters
    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.35, ease: 'power3.out' });
    const dotXTo = gsap.quickTo(dotRef.current, 'x', { duration: 0.1, ease: 'power2.out' });
    const dotYTo = gsap.quickTo(dotRef.current, 'y', { duration: 0.1, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) setIsTouch(false);
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);

      // Check if hovering interactive elements
      const target = e.target as HTMLElement;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], .spotlight-card');
        setIsHovered(!!interactive);
        setIsPointer(!!target.closest('a, button, input, textarea, select, [role="button"]'));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReduced, isTouch]);

  if (prefersReduced || isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer kinetic halo ring */}
      <div
        ref={cursorRef}
        className="absolute left-0 top-0 -ml-5 -mt-5 flex items-center justify-center rounded-full border transition-[width,height,border-color,background-color,margin] duration-300 ease-out will-change-transform"
        style={{
          width: isPointer ? '54px' : isHovered ? '48px' : '40px',
          height: isPointer ? '54px' : isHovered ? '48px' : '40px',
          marginLeft: isPointer ? '-27px' : isHovered ? '-24px' : '-20px',
          marginTop: isPointer ? '-27px' : isHovered ? '-24px' : '-20px',
          borderColor: isPointer
            ? 'rgba(10, 92, 255, 0.85)'
            : isHovered
            ? 'rgba(10, 92, 255, 0.45)'
            : 'rgba(29, 33, 41, 0.22)',
          background: isPointer
            ? 'rgba(10, 92, 255, 0.12)'
            : isHovered
            ? 'rgba(10, 92, 255, 0.05)'
            : 'transparent',
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
        }}
      />

      {/* Inner high-precision dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full transition-transform duration-200 ease-out will-change-transform"
        style={{
          background: isPointer ? '#0A5CFF' : 'var(--text-slate)',
          transform: isPointer ? 'scale(1.5)' : isHovered ? 'scale(0.8)' : 'scale(1)',
          boxShadow: isPointer ? '0 0 12px rgba(10, 92, 255, 0.6)' : 'none',
        }}
      />
    </div>
  );
}
