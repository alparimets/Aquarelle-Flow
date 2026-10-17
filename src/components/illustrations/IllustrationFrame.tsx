import { ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

/** Shared 96×96 paper-toned canvas used by every step illustration. */
export default function IllustrationFrame({ className, children }: Props) {
  return (
    <svg viewBox="0 0 96 96" className={className} role="presentation" aria-hidden focusable="false">
      <rect width="96" height="96" fill="#FBF7EE" />
      {children}
    </svg>
  );
}
