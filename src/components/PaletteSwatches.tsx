import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Pigment } from '../data/ideas';

export function SwatchDot({ hex, className = 'h-12 w-12' }: { hex: string; className?: string }) {
  return <span aria-hidden className={`swatch-dot block shrink-0 ${className}`} style={{ backgroundColor: hex }} />;
}

// Compact mode is a plain row of dots for places where names would not fit.
export function MiniPalette({ palette }: { palette: readonly Pigment[] }) {
  return (
    <ul className="flex gap-1.5" aria-label="Palette">
      {palette.map(({ name, hex }) => (
        <li key={hex} title={`${name} ${hex}`}>
          <SwatchDot hex={hex} className="h-5 w-5" />
        </li>
      ))}
    </ul>
  );
}

export default function PaletteSwatches({ palette }: { palette: readonly Pigment[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(null), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {palette.map(({ name, hex }) => (
          <li key={hex}>
            <button
              type="button"
              onClick={() => copy(hex)}
              aria-label={`Copy ${name} ${hex}`}
              className="group flex w-full items-center gap-3 rounded-xl border border-transparent p-2 text-left transition-all duration-300 hover:border-paper-edge hover:bg-white/70 hover:shadow-lift"
            >
              <SwatchDot hex={hex} className="h-12 w-12 transition-transform duration-300 group-hover:scale-110" />
              <span className="min-w-0 text-sm leading-tight">
                <span className="block font-medium">{name}</span>
                <span className="flex items-center gap-1 font-mono text-xs text-ink-soft">
                  {copied === hex ? (
                    <>
                      <Check size={12} aria-hidden /> Copied
                    </>
                  ) : (
                    hex.toUpperCase()
                  )}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="sr-only" aria-live="polite">
        {copied ? `Copied ${copied}` : ''}
      </p>
    </div>
  );
}
