import { afterEach, describe, expect, it, vi } from 'vitest';
import { Preferences } from '../data/exercises';
import { selectExercises, withRetry } from './generate';

describe('selectExercises', () => {
  it('returns up to three exercises that match time and skill', () => {
    const prefs: Preferences = { skill: 'novice', time: 'quick', energy: 'moderate' };
    const result = selectExercises(prefs);
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(3);
    expect(result.every((e) => e.time === 'quick')).toBe(true);
  });

  it('never suggests exercises above the chosen skill level', () => {
    const result = selectExercises({ skill: 'novice', time: 'weekend', energy: 'low' });
    expect(result.every((e) => e.minSkill === 'novice')).toBe(true);
  });

  it('relaxes the energy filter when too few exercises match', () => {
    const result = selectExercises({ skill: 'novice', time: 'focused', energy: 'low' });
    expect(result.map((e) => e.id)).toEqual(['experimental-textures']);
  });

  it('does not repeat exercises in a single selection', () => {
    const result = selectExercises({ skill: 'intermediate', time: 'weekend', energy: 'high' });
    expect(new Set(result.map((e) => e.id)).size).toBe(result.length);
  });

  it('throws when nothing matches', () => {
    expect(() =>
      selectExercises({ skill: 'novice', time: 'bogus' as never, energy: 'low' }),
    ).toThrow(/No exercises available/);
  });
});

describe('withRetry', () => {
  afterEach(() => vi.restoreAllMocks());

  it('returns the result of the first successful attempt', async () => {
    await expect(withRetry(() => 'ok', 3, 0)).resolves.toBe('ok');
  });

  it('retries failures, notifying the caller, then succeeds', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const fn = vi.fn().mockRejectedValueOnce(new Error('boom')).mockResolvedValue('ok');
    const onRetry = vi.fn();
    await expect(withRetry(fn, 3, 0, onRetry)).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('throws the last error after exhausting retries', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const fn = vi.fn().mockRejectedValue(new Error('still broken'));
    await expect(withRetry(fn, 2, 0)).rejects.toThrow('still broken');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
