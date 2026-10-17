import { IllustrationProps } from './shared';
import IllustrationFrame from './IllustrationFrame';

export default function PigmentLayersIllustration({ palette, className }: IllustrationProps) {
  return (
    <IllustrationFrame className={className}>
      <circle cx="38" cy="42" r="22" fill={palette[0]} fillOpacity="0.45" />
      <circle cx="58" cy="42" r="22" fill={palette[1]} fillOpacity="0.45" />
      <circle cx="48" cy="58" r="22" fill={palette[0]} fillOpacity="0.3" />
      <circle cx="48" cy="58" r="22" fill={palette[1]} fillOpacity="0.3" />
      <g stroke="#8A8378" strokeWidth="1" opacity="0.45" fill="none">
        {[
          [14, palette[0], 0.25],
          [32, palette[0], 0.5],
          [50, palette[0], 0.75],
          [68, palette[1], 0.75],
        ].map(([x, color, opacity]) => (
          <rect key={x} x={x} y="78" width="14" height="8" rx="1" fill={color as string} fillOpacity={opacity as number} />
        ))}
      </g>
    </IllustrationFrame>
  );
}
