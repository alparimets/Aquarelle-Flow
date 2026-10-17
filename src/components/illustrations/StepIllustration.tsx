import { StepVisualType } from '../../data/exercises';
import GradientFadeIllustration from './GradientFadeIllustration';
import PencilGridIllustration from './PencilGridIllustration';
import PigmentLayersIllustration from './PigmentLayersIllustration';
import WetWashIllustration from './WetWashIllustration';

interface Props {
  type: StepVisualType;
  palette: [string, string];
  className?: string;
}

const components = {
  'pencil-grid': PencilGridIllustration,
  'wet-wash': WetWashIllustration,
  'gradient-fade': GradientFadeIllustration,
  'pigment-layers': PigmentLayersIllustration,
} satisfies Record<StepVisualType, unknown>;

export default function StepIllustration({ type, palette, className }: Props) {
  const Illustration = components[type];
  return <Illustration palette={palette} className={className} />;
}
