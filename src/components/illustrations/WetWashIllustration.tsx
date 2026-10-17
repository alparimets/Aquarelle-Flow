import { IllustrationProps, useSvgId } from './shared';
import IllustrationFrame from './IllustrationFrame';

export default function WetWashIllustration({ palette, className }: IllustrationProps) {
  const id = useSvgId('wet');
  return (
    <IllustrationFrame className={className}>
      <defs>
        <radialGradient id={id} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={palette[0]} stopOpacity="0.85" />
          <stop offset="70%" stopColor={palette[1]} stopOpacity="0.55" />
          <stop offset="100%" stopColor={palette[1]} stopOpacity="0.15" />
        </radialGradient>
      </defs>
      <path
        d="M18 34c4-12 22-14 34-10s26 2 28 16-6 22-16 28-30 8-40-2-10-20-6-32z"
        fill={`url(#${id})`}
      />
      <path d="M30 40c6-6 18-6 26-2" stroke="#fff" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M26 74c0 4-3 6-3 9a3 3 0 006 0c0-3-3-5-3-9z" fill={palette[0]} fillOpacity="0.5" />
    </IllustrationFrame>
  );
}
