import React from 'react';

interface CrossDollarIconProps {
  className?: string;
  size?: number;
}

export default function CrossDollarIcon({ className = "w-8 h-8", size = 32 }: CrossDollarIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dollar Sign - Top S curve (wraps around vertical bar) */}
      <path
        d="M16 4 C 18 4, 19.5 5, 20 6.5 C 20.5 8, 20 9.5, 18.5 10 C 17.5 10.5, 16.5 10, 16 8.5 C 15.5 7, 16 6, 17.5 5.5 C 19 5, 20 5.5, 20.5 7 L 22 7 L 22 5.5 C 21.5 3.5, 19.5 2, 17 2 C 14.5 2, 12.5 3.5, 12 5.5 C 11.5 7.5, 12 9, 14 9.5 C 16 10, 17 9.5, 17.5 8 C 18 6.5, 17.5 5.5, 16 5 C 14.5 4.5, 13 5, 12.5 6.5 L 10.5 6.5 L 10.5 8 C 11 10, 13 11.5, 15.5 11.5 C 18 11.5, 20 10, 20.5 8 C 21 6, 20.5 4.5, 18.5 4 C 17 3.5, 16 4, 16 5.5 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      {/* Dollar Sign - Bottom S curve (wraps around vertical bar) */}
      <path
        d="M16 20.5 C 18 20.5, 19.5 21.5, 20 23 C 20.5 24.5, 20 26, 18.5 26.5 C 17.5 27, 16.5 26.5, 16 25 C 15.5 23.5, 16 22.5, 17.5 22 C 19 21.5, 20 22, 20.5 23.5 L 22 23.5 L 22 22 C 21.5 20, 19.5 18.5, 17 18.5 C 14.5 18.5, 12.5 20, 12 22 C 11.5 24, 12 25.5, 14 26 C 16 26.5, 17 26, 17.5 24.5 C 18 23, 17.5 22, 16 21.5 C 14.5 21, 13 21.5, 12.5 23 L 10.5 23 L 10.5 24.5 C 11 26.5, 13 28, 15.5 28 C 18 28, 20 26.5, 20.5 24.5 C 21 22.5, 20.5 21, 18.5 20.5 C 17 20, 16 20.5, 16 22 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      {/* Christian Cross - vertical bar (runs through the S) */}
      <rect x="15" y="2" width="2" height="28" fill="currentColor" />
      {/* Christian Cross - horizontal bar */}
      <rect x="8" y="14" width="16" height="2" fill="currentColor" />
    </svg>
  );
}

