import { describe, expect, it } from 'vitest';
import { IDEAS } from '../data/ideas';
import { STORAGE_KEY, StorageLike, getBrowserStorage, loadSaved, persistSaved, toggleSaved } from './sketchbook';

function memoryStorage(initial?: string): StorageLike & { data: Map<string, string> } {
  const data = new Map<string, string>();
  if (initial !== undefined) data.set(STORAGE_KEY, initial);
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
  };
}

describe('toggleSaved', () => {
  it('adds new ideas to the front and removes saved ones', () => {
    expect(toggleSaved(['a'], 'b')).toEqual(['b', 'a']);
    expect(toggleSaved(['b', 'a'], 'b')).toEqual(['a']);
  });
});

describe('loadSaved', () => {
  it('returns nothing without storage or saved data', () => {
    expect(loadSaved(null)).toEqual([]);
    expect(loadSaved(memoryStorage())).toEqual([]);
  });

  it('keeps only known, unique idea ids', () => {
    const id = IDEAS[0].id;
    expect(loadSaved(memoryStorage(JSON.stringify([id, id, 'gone', 42])))).toEqual([id]);
  });

  it('ignores corrupted or unexpected data', () => {
    expect(loadSaved(memoryStorage('{not json'))).toEqual([]);
    expect(loadSaved(memoryStorage('{"a":1}'))).toEqual([]);
  });
});

describe('persistSaved', () => {
  it('round-trips through storage', () => {
    const storage = memoryStorage();
    const ids = [IDEAS[1].id, IDEAS[0].id];
    persistSaved(storage, ids);
    expect(loadSaved(storage)).toEqual(ids);
  });

  it('does not throw when storage is missing or full', () => {
    const full: StorageLike = {
      getItem: () => null,
      setItem: () => {
        throw new Error('quota');
      },
    };
    expect(() => persistSaved(null, ['a'])).not.toThrow();
    expect(() => persistSaved(full, ['a'])).not.toThrow();
  });
});

describe('getBrowserStorage', () => {
  it('is null outside a browser', () => {
    expect(getBrowserStorage()).toBeNull();
  });
});
