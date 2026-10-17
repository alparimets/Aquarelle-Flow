import { Exercise, Preferences, Skill, exercises } from '../data/exercises';

const skillRank: Record<Skill, number> = { novice: 0, beginner: 1, intermediate: 2 };

export async function withRetry<T>(
  fn: () => T | Promise<T>,
  retries = 3,
  delayMs = 400,
  onRetry?: (attempt: number, error: unknown) => void,
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.error(`Exercise generation failed (attempt ${attempt}/${retries})`, error);
      if (attempt < retries) {
        onRetry?.(attempt, error);
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  }
  throw lastError;
}

function secureRandomInt(max: number): number {
  const buf = new Uint32Array(1);
  const limit = 0x100000000 - (0x100000000 % max);
  do {
    crypto.getRandomValues(buf);
  } while (buf[0] >= limit);
  return buf[0] % max;
}

export function selectExercises(prefs: Preferences): Exercise[] {
  const matches = (strict: boolean) =>
    exercises.filter(
      (e) =>
        e.time === prefs.time &&
        skillRank[e.minSkill] <= skillRank[prefs.skill] &&
        (!strict || e.energies.includes(prefs.energy)),
    );
  let pool = matches(true);
  if (pool.length < 2) {
    pool = [...pool, ...matches(false).filter((e) => !pool.includes(e))];
  }
  if (pool.length === 0) {
    throw new Error(`No exercises available for ${JSON.stringify(prefs)}`);
  }
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(3, shuffled.length));
}
