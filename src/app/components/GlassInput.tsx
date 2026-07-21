'use client';

import React, { useRef, useState, useCallback, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GlassInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  icon?: React.ReactNode;
  error?: boolean;
  hint?: string;
}

export function GlassInput({
  label,
  type = 'text',
  value,
  onChange,
  required,
  icon,
  error,
  hint,
}: GlassInputProps) {
  const uid = useId();
  const id = `glass-input-${uid}`;
  const [focused, setFocused] = useState(false);
  const [glowX, setGlowX] = useState(50);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const hasValue = value.length > 0;
  const elevated = focused || hasValue;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setGlowX(pct);
    },
    [prefersReduced]
  );

  const borderColor = error
    ? 'rgba(239, 68, 68, 0.55)'
    : focused
    ? 'rgba(112, 161, 215, 0.65)'
    : 'rgba(112, 161, 215, 0.28)';

  const glowShadow = error
    ? '0 0 0 3px rgba(239,68,68,0.14)'
    : focused
    ? '0 0 0 3.5px rgba(112,161,215,0.22), 0 4px 16px rgba(112,161,215,0.14)'
    : '0 2px 8px rgba(112,161,215,0.08)';

  return (
    <div className="relative">
      <motion.div
        ref={wrapRef}
        className="relative rounded-2xl overflow-hidden"
        style={{
          border: `1px solid ${borderColor}`,
          background: 'rgba(255,255,255,0.62)',
          backdropFilter: 'blur(12px) saturate(140%)',
          WebkitBackdropFilter: 'blur(12px) saturate(140%)',
          boxShadow: glowShadow,
          transition: 'border-color 0.2s ease, box-shadow 0.25s ease',
        }}
        onMouseMove={handleMouseMove}
        animate={prefersReduced ? {} : { scale: focused ? 1.008 : 1 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Radial glow that follows mouse along the bottom border */}
        {!prefersReduced && focused && (
          <div
            className="absolute bottom-0 h-px pointer-events-none"
            style={{
              left: 0,
              right: 0,
              background: `radial-gradient(200px circle at ${glowX}% 50%, rgba(112,161,215,0.60), transparent 70%)`,
              opacity: focused ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}
            aria-hidden="true"
          />
        )}

        {/* Top rim light */}
        <div
          className="absolute top-0 left-4 right-4 h-px pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.85)' }}
          aria-hidden="true"
        />

        <div className="relative px-4 pt-6 pb-2.5 flex items-end gap-3">
          <div className="flex-1">
            {/* Floating label */}
            <label
              htmlFor={id}
              className="absolute pointer-events-none select-none font-medium transition-all"
              style={{
                left: '1rem',
                top: elevated ? '0.55rem' : '50%',
                transform: elevated ? 'translateY(0)' : 'translateY(-50%)',
                fontSize: elevated ? '0.6rem' : '0.8rem',
                color: error
                  ? '#DC2626'
                  : elevated
                  ? 'var(--sm-sky)'
                  : 'var(--sm-slate-mid)',
                letterSpacing: elevated ? '0.08em' : '0',
                textTransform: elevated ? 'uppercase' : 'none',
                fontWeight: elevated ? 700 : 400,
                fontFamily: elevated ? 'var(--font-mono)' : 'var(--font-body)',
                transition:
                  'top 0.18s cubic-bezier(0.16,1,0.3,1), font-size 0.18s ease, color 0.18s ease, letter-spacing 0.18s ease',
              }}
            >
              {label}
            </label>

            <input
              ref={inputRef}
              id={id}
              type={type}
              required={required}
              value={value}
              placeholder=" "
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full bg-transparent text-sm font-medium outline-none"
              style={{
                color: 'var(--sm-slate)',
                caretColor: 'var(--sm-sky)',
                fontFamily: 'var(--font-body)',
              }}
              aria-label={label}
              aria-invalid={error ? 'true' : 'false'}
            />
          </div>

          {/* Optional icon slot */}
          {icon && (
            <motion.div
              className="shrink-0 pb-1"
              animate={
                prefersReduced
                  ? {}
                  : { opacity: focused ? 1 : 0.4, scale: focused ? 1.1 : 1 }
              }
              transition={{ duration: 0.18 }}
              style={{ color: error ? '#DC2626' : 'var(--sm-sky)' }}
            >
              {icon}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Hint text below */}
      {hint && (
        <p
          className="mt-1.5 px-1 text-[10px] font-medium"
          style={{ color: error ? '#DC2626' : 'var(--sm-slate-mid)' }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
