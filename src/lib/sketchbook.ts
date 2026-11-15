import { IDEAS_BY_ID } from '../data/ideas';

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const STORAGE_KEY = 'aquarelle-flow:sketchbook';

// Storage can be missing or throw (private mode, blocked cookies), so the app must keep working without it.
export function getBrowserStorage(): StorageLike | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function loadSaved(storage: StorageLike | null): string[] {
  if (!storage) return [];
  try {
    const parsed: unknown = JSON.parse(storage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    const valid = parsed.filter((id): id is string => typeof id === 'string' && IDEAS_BY_ID.has(id));
    return [...new Set(valid)];
  } catch {
    return [];
  }
}

export function persistSaved(storage: StorageLike | null, ids: readonly string[]): void {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Could not save sketchbook', error);
  }
}

// Newest saves come first, like the latest page in a binder.
export function toggleSaved(ids: readonly string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((saved) => saved !== id) : [id, ...ids];
}
