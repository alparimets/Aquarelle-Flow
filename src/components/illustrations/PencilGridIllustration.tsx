import { IllustrationProps } from './shared';
import IllustrationFrame from './IllustrationFrame';

export default function PencilGridIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationFrame className={className}>
      <rect x="16" y="22" width="64" height="44" rx="2" fill="none" stroke="#8A8378" strokeWidth="1.6" strokeDasharray="5 3" strokeLinecap="round" />
      <path d="M48 22v44M16 44h64" stroke="#B8B1A4" strokeWidth="1" strokeDasharray="2 3" strokeLinecap="round" />
      <g transform="rotate(-38 70 70)">
        <rect x="58" y="66" width="30" height="7" rx="1.5" fill="#E9C46A" />
        <rect x="52" y="66" width="6" height="7" fill="#E4A0A0" />
        <path d="M88 66l8 3.5-8 3.5z" fill="#F1D9B5" />
        <path d="M93 68.4l3 1.1-3 1.1z" fill="#4A4A4A" />
      </g>
    </IllustrationFrame>
  );
}
