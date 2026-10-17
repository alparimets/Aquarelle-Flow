import { IllustrationProps, useSvgId } from './illustrations/shared';

interface Props extends IllustrationProps {
  label: string;
  hasVideo?: boolean;
}

/** Mini watercolor swatch used as the thumbnail at the top of an exercise card. */
export default function FocusSwatch({ palette, label, hasVideo, className = '' }: Props) {
  const id = useSvgId('swatch');
  return (
    <div className={`relative h-28 overflow-hidden rounded-t-2xl ${className}`}>
      <svg viewBox="0 0 200 112" preserveAspectRatio="none" className="h-full w-full" role="presentation" aria-hidden focusable="false">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette[0]} stopOpacity="0.8" />
            <stop offset="100%" stopColor={palette[1]} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <rect width="200" height="112" fill={`url(#${id})`} />
        <circle cx="150" cy="28" r="34" fill="#fff" fillOpacity="0.18" />
        <circle cx="40" cy="92" r="40" fill={palette[1]} fillOpacity="0.3" />
      </svg>
      <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-sage-800 shadow-sm">
        {label}
      </span>
      {hasVideo && (
        <span className="absolute right-3 top-3 rounded-full bg-sage-700 px-2.5 py-1 text-xs font-medium text-paper">
          ▶ Video
        </span>
      )}
    </div>
  );
}
