'use client';

import React from 'react';
import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion';

type RevealDirection = 'bottom' | 'left' | 'right' | 'scale' | 'fade';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  from?: RevealDirection;
}

const initialByDirection: Record<RevealDirection, TargetAndTransition> = {
  bottom: { opacity: 0, y: 32, filter: 'blur(8px)' },
  left:   { opacity: 0, x: -40, filter: 'blur(6px)' },
  right:  { opacity: 0, x: 40,  filter: 'blur(6px)' },
  scale:  { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  fade:   { opacity: 0 },
};

const animateByDirection: Record<RevealDirection, TargetAndTransition> = {
  bottom: { opacity: 1, y: 0, filter: 'blur(0px)' },
  left:   { opacity: 1, x: 0, filter: 'blur(0px)' },
  right:  { opacity: 1, x: 0, filter: 'blur(0px)' },
  scale:  { opacity: 1, scale: 1, filter: 'blur(0px)' },
  fade:   { opacity: 1 },
};

export function SectionReveal({
  children,
  className = '',
  delay = 0,
  amount = 0.3,
  from = 'bottom',
}: SectionRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={initialByDirection[from]}
      whileInView={animateByDirection[from]}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.58,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
    >
      {children}
    </motion.div>
  );
}

/* Staggered container for child reveals */
export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
  from = 'bottom',
}: {
  children: React.ReactNode;
  className?: string;
  from?: RevealDirection;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { ...initialByDirection[from] },
        visible: {
          ...animateByDirection[from],
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
