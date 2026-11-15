import { CATEGORIES } from '../data/ideas';
import { CategoryFilter } from '../lib/inspire';

interface Props {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
}

const OPTIONS: { id: CategoryFilter; label: string; accent: string }[] = [
  { id: 'all', label: 'Surprise me', accent: '#2D2A26' },
  ...CATEGORIES,
];

export default function CategoryPills({ value, onChange }: Props) {
  return (
    <div role="group" aria-label="Idea category" className="flex flex-wrap justify-center gap-2">
      {OPTIONS.map(({ id, label, accent }) => {
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(id)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift ${
              selected
                ? 'border-ink bg-ink text-paper-card'
                : 'border-paper-edge bg-paper-card/80 text-ink hover:border-ink/30'
            }`}
          >
            <span aria-hidden className="swatch-dot h-3 w-3" style={{ backgroundColor: accent }} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
