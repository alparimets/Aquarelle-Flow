import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Energy, Preferences, Skill, TimeSlot } from '../data/exercises';

interface Props {
  onSubmit: (prefs: Preferences) => void;
  loading: boolean;
  message?: string | null;
}

interface PillProps<T extends string> {
  legend: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}

function PillGroup<T extends string>({ legend, options, value, onChange }: PillProps<T>) {
  return (
    <fieldset className="mb-6">
      <legend className="mb-2 font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              value === o.value
                ? 'border-sage bg-sage text-white'
                : 'border-sage/50 bg-white hover:bg-sage-light'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function InputForm({ onSubmit, loading, message }: Props) {
  const [skill, setSkill] = useState<Skill>('novice');
  const [time, setTime] = useState<TimeSlot>('quick');
  const [energy, setEnergy] = useState<Energy>('moderate');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ skill, time, energy });
      }}
    >
      <PillGroup<Skill>
        legend="Skill level"
        value={skill}
        onChange={setSkill}
        options={[
          { value: 'novice', label: 'Novice' },
          { value: 'beginner', label: 'Beginner' },
          { value: 'intermediate', label: 'Intermediate' },
        ]}
      />
      <PillGroup<TimeSlot>
        legend="Available time"
        value={time}
        onChange={setTime}
        options={[
          { value: 'quick', label: 'Quick Warm-up (15-30m)' },
          { value: 'focused', label: 'Focused Session (1h-2h)' },
          { value: 'weekend', label: 'Weekend Project (Half-day+)' },
        ]}
      />
      <PillGroup<Energy>
        legend="Current energy"
        value={energy}
        onChange={setEnergy}
        options={[
          { value: 'low', label: 'Relaxed / Low Energy' },
          { value: 'moderate', label: 'Focused / Moderate' },
          { value: 'high', label: 'High Energy / Experimental' },
        ]}
      />
      {message && (
        <p role="status" className="mb-4 text-sm text-terracotta">
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {loading && <Loader2 className="animate-spin" size={18} aria-hidden />}
        {loading ? 'Mixing colors…' : 'Discover Exercises'}
      </button>
    </form>
  );
}
