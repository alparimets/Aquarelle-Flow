import { ReactNode } from 'react';

interface Props {
  accent: string;
  children: ReactNode;
}

// A translucent wash of the accent colour behind dark text keeps contrast high on any accent.
export default function Badge({ accent, children }: Props) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-ink"
      style={{ backgroundColor: `${accent}26`, borderColor: `${accent}80` }}
    >
      {children}
    </span>
  );
}
