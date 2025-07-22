import React from 'react';

interface AudioWaveformProps {
  isAnimating?: boolean;
  className?: string;
}

export function AudioWaveform({ isAnimating = false, className = '' }: AudioWaveformProps) {
  const bars = Array.from({ length: 32 }, (_, i) => i);

  return (
    <div className={`flex items-end justify-center gap-1 h-32 ${className}`}>
      {bars.map((bar, index) => (
        <div
          key={bar}
          className={`bg-gradient-to-t from-[var(--color-galaxy-purple)] via-[var(--color-galaxy-blue)] to-[var(--color-galaxy-cyan)] rounded-t-sm transition-all duration-300 ${
            isAnimating ? 'waveform-bar' : 'h-4'
          }`}
          style={{
            width: '3px',
            animationDelay: isAnimating ? `${index * 0.05}s` : '0s',
            minHeight: '4px',
            height: isAnimating ? `${Math.random() * 80 + 20}%` : '20%'
          }}
        />
      ))}
    </div>
  );
}