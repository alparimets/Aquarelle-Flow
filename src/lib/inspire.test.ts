import { describe, expect, it } from 'vitest';
import { ARTIST_NOTES, CATEGORIES, IDEAS } from '../data/ideas';
import { pickIdea, pickNote, secureRandomInt } from './inspire';

describe('idea dataset', () => {
  it('has at least 30 ideas with unique ids', () => {
    expect(IDEAS.length).toBeGreaterThanOrEqual(30);
    expect(new Set(IDEAS.map((i) => i.id)).size).toBe(IDEAS.length);
  });

  it('covers every category with a healthy number of ideas', () => {
    for (const { id } of CATEGORIES) {
      expect(IDEAS.filter((i) => i.category === id).length).toBeGreaterThanOrEqual(6);
    }
  });

  it('gives every idea a complete card with a four-colour palette', () => {
    for (const idea of IDEAS) {
      expect(idea.title && idea.hook && idea.format && idea.prompt && idea.tip).toBeTruthy();
      expect(idea.palette).toHaveLength(4);
      for (const { name, hex } of idea.palette) {
        expect(name).toBeTruthy();
        expect(hex).toMatch(/^#[0-9A-F]{6}$/i);
      }
    }
  });
});

describe('pickIdea', () => {
  const first: (max: number) => number = () => 0;
  const last: (max: number) => number = (max) => max - 1;

  it('stays within the chosen category', () => {
    for (const { id } of CATEGORIES) {
      expect(pickIdea(id, undefined, last).category).toBe(id);
    }
  });

  it('draws from every category when set to all', () => {
    expect(pickIdea('all', undefined, first)).toBe(IDEAS[0]);
    expect(pickIdea('all', undefined, last)).toBe(IDEAS[IDEAS.length - 1]);
  });

  it('never repeats the previous idea', () => {
    const previous = IDEAS[0];
    expect(pickIdea('all', previous.id, first).id).not.toBe(previous.id);
  });

  it('works with the real random source', () => {
    expect(IDEAS).toContain(pickIdea('botanicals'));
  });
});

describe('pickNote', () => {
  it('avoids repeating the previous note', () => {
    expect(pickNote(ARTIST_NOTES[0], () => 0)).toBe(ARTIST_NOTES[1]);
  });

  it('returns a known note', () => {
    expect(ARTIST_NOTES).toContain(pickNote());
  });
});

describe('secureRandomInt', () => {
  it('stays in range', () => {
    for (let i = 0; i < 200; i++) {
      const n = secureRandomInt(7);
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThan(7);
    }
  });
});
