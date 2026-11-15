import { ARTIST_NOTES, CategoryId, IDEAS, Idea } from '../data/ideas';

export type CategoryFilter = CategoryId | 'all';
export type RandomInt = (max: number) => number;

// Rejection sampling avoids modulo bias.
export const secureRandomInt: RandomInt = (max) => {
  const buf = new Uint32Array(1);
  const limit = 0x100000000 - (0x100000000 % max);
  do {
    crypto.getRandomValues(buf);
  } while (buf[0] >= limit);
  return buf[0] % max;
};

function pickOne<T>(items: readonly T[], random: RandomInt): T {
  return items[random(items.length)];
}

// Avoids repeating the previous idea whenever the pool offers any alternative.
export function pickIdea(filter: CategoryFilter, excludeId?: string, random: RandomInt = secureRandomInt): Idea {
  const inCategory = filter === 'all' ? IDEAS : IDEAS.filter((idea) => idea.category === filter);
  const fresh = inCategory.filter((idea) => idea.id !== excludeId);
  return pickOne(fresh.length > 0 ? fresh : inCategory, random);
}

export function pickNote(excludeNote?: string, random: RandomInt = secureRandomInt): string {
  const fresh = ARTIST_NOTES.filter((note) => note !== excludeNote);
  return pickOne(fresh.length > 0 ? fresh : ARTIST_NOTES, random);
}
