'use client';

import React from 'react';

interface LogoIsotypeProps {
  className?: string;
  size?: number;
  color?: string;
}

export function LogoIsotype({
  className = 'w-9 h-6',
  size,
  color = '#70A1D7',
}: LogoIsotypeProps) {
  const style = size ? { width: size, height: size * 0.71 } : undefined;

  return (
    <svg
      viewBox="0 0 210 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="S&M Isotipo"
    >
      <path
        d="M 38 96 
           C 30 118, 54 136, 76 136 
           C 42 136, 26 92, 38 60 
           C 48 34, 76 28, 98 36 
           C 112 42, 114 56, 100 74 
           C 82 96, 64 114, 76 130 
           C 86 142, 106 114, 122 76 
           L 132 50 
           C 136 40, 144 34, 150 40 
           L 168 84 
           L 184 46 
           C 188 38, 196 36, 200 44 
           L 200 126"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
