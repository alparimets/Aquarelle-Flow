import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Exercise, Preferences } from '../data/exercises';

interface SessionState {
  preferences: Preferences | null;
  results: Exercise[];
  progress: Record<string, boolean[]>;
  setSession: (prefs: Preferences, results: Exercise[]) => void;
  toggleStep: (exerciseId: string, index: number, total: number) => void;
}

const SessionContext = createContext<SessionState | null>(null);

// Everything lives in memory only: no storage, no backend.
export function SessionProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [results, setResults] = useState<Exercise[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean[]>>({});

  const setSession = useCallback((prefs: Preferences, res: Exercise[]) => {
    setPreferences(prefs);
    setResults(res);
  }, []);

  const toggleStep = useCallback((id: string, index: number, total: number) => {
    setProgress((prev) => {
      const current = prev[id] ?? new Array<boolean>(total).fill(false);
      const next = [...current];
      next[index] = !next[index];
      return { ...prev, [id]: next };
    });
  }, []);

  const value = useMemo(
    () => ({ preferences, results, progress, setSession, toggleStep }),
    [preferences, results, progress, setSession, toggleStep],
  );
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionState {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
