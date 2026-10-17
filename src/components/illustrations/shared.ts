import { useId } from 'react';

export interface IllustrationProps {
  palette: [string, string];
  className?: string;
}

/** SVG ids must be safe inside url(#...) references, including during PDF capture. */
export function useSvgId(prefix: string) {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
}
