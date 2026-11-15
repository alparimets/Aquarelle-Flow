import { Bookmark, BookmarkCheck, PenLine } from 'lucide-react';
import { CATEGORIES_BY_ID, Idea } from '../data/ideas';
import Badge from './Badge';
import PaletteSwatches from './PaletteSwatches';

interface Props {
  idea: Idea;
  saved: boolean;
  onToggleSave: () => void;
}

function Label({ children }: { children: string }) {
  return <h3 className="mb-2 font-sans text-xs font-semibold uppercase tracking-widest text-ink-soft">{children}</h3>;
}

export default function IdeaCard({ idea, saved, onToggleSave }: Props) {
  const category = CATEGORIES_BY_ID.get(idea.category);
  const accent = category?.accent ?? '#7A9A65';
  return (
    <article
      aria-label={idea.title}
      className="relative rounded-sm border border-paper-edge bg-paper-card p-6 shadow-card outline outline-1 outline-offset-[-10px] outline-paper-edge sm:p-10"
    >
      <span aria-hidden className="washi absolute -top-3 left-1/2 h-6 w-28 -translate-x-1/2 -rotate-2 shadow-sm" />

      <div className="flex flex-wrap items-center gap-2">
        <Badge accent={accent}>{category?.label}</Badge>
        <Badge accent="#B5A58A">{idea.format}</Badge>
      </div>

      <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">{idea.title}</h2>
      <p className="mt-2 font-serif text-lg italic text-ink-soft">{idea.hook}</p>

      <section className="mt-6">
        <Label>Composition idea</Label>
        <p>{idea.prompt}</p>
      </section>

      <section className="mt-6">
        <Label>Suggested palette</Label>
        <PaletteSwatches palette={idea.palette} />
      </section>

      <section
        className="mt-6 flex gap-3 rounded-xl border border-dashed p-4"
        style={{ borderColor: `${accent}99`, backgroundColor: `${accent}14` }}
      >
        <PenLine size={20} aria-hidden className="mt-0.5 shrink-0" />
        <div>
          <Label>Finishing touch</Label>
          <p>{idea.tip}</p>
        </div>
      </section>

      <button
        type="button"
        onClick={onToggleSave}
        aria-pressed={saved}
        className={`mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift ${
          saved ? 'border-sap-dark bg-sap-dark text-white' : 'border-ink/30 bg-white text-ink hover:border-ink'
        }`}
      >
        {saved ? <BookmarkCheck size={18} aria-hidden /> : <Bookmark size={18} aria-hidden />}
        {saved ? 'Saved to sketchbook' : 'Save to sketchbook'}
      </button>
    </article>
  );
}
