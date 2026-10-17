import { IllustrationProps, useSvgId } from './shared';
import IllustrationFrame from './IllustrationFrame';

export default function GradientFadeIllustration({ palette, className }: IllustrationProps) {
  const id = useSvgId('fade');
  return (
    <IllustrationFrame className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette[0]} stopOpacity="0.95" />
          <stop offset="100%" stopColor={palette[1]} stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <rect x="18" y="16" width="60" height="64" rx="2" fill={`url(#${id})`} />
      <rect x="18" y="16" width="60" height="64" rx="2" fill="none" stroke="#8A8378" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <path d="M18 31h60M18 47h60M18 63h60" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" />
    </IllustrationFrame>
  );
}
