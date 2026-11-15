import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getBrowserStorage, loadSaved, persistSaved, toggleSaved } from '../lib/sketchbook';

interface SketchbookState {
  savedIds: readonly string[];
  isSaved: (id: string) => boolean;
  toggle: (id: string) => void;
}

const SketchbookContext = createContext<SketchbookState | null>(null);

export function SketchbookProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<readonly string[]>(() => loadSaved(getBrowserStorage()));

  useEffect(() => {
    persistSaved(getBrowserStorage(), savedIds);
  }, [savedIds]);

  const toggle = useCallback((id: string) => setSavedIds((prev) => toggleSaved(prev, id)), []);
  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const value = useMemo(() => ({ savedIds, isSaved, toggle }), [savedIds, isSaved, toggle]);
  return <SketchbookContext.Provider value={value}>{children}</SketchbookContext.Provider>;
}

export function useSketchbook(): SketchbookState {
  const ctx = useContext(SketchbookContext);
  if (!ctx) throw new Error('useSketchbook must be used within SketchbookProvider');
  return ctx;
}
