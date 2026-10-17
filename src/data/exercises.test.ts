import { describe, expect, it } from 'vitest';
import { exercises } from './exercises';

describe('exercise data', () => {
  it('has unique ids', () => {
    expect(new Set(exercises.map((e) => e.id)).size).toBe(exercises.length);
  });

  it('gives every exercise steps, materials, a palette and a search query', () => {
    for (const e of exercises) {
      expect(e.steps.length).toBeGreaterThan(0);
      expect(e.materials.length).toBeGreaterThan(0);
      expect(e.palette).toHaveLength(2);
      expect(e.searchQuery).not.toBe('');
    }
  });

  it('uses well-formed YouTube video ids where provided', () => {
    for (const e of exercises.filter((x) => x.youtubeVideoId)) {
      expect(e.youtubeVideoId).toMatch(/^[\w-]{11}$/);
    }
  });
});
