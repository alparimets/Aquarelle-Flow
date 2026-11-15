import { useCallback, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
import ArtistNote from './components/ArtistNote';
import CategoryPills from './components/CategoryPills';
import ErrorBoundary from './components/ErrorBoundary';
import IdeaCard from './components/IdeaCard';
import SketchbookDrawer from './components/SketchbookDrawer';
import WashBackground from './components/WashBackground';
import { useSketchbook } from './context/SketchbookContext';
import { Idea } from './data/ideas';
import { CategoryFilter, pickIdea, pickNote } from './lib/inspire';

export default function App() {
  const reduceMotion = useReducedMotion();
  const { savedIds, isSaved, toggle } = useSketchbook();
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [idea, setIdea] = useState<Idea>(() => pickIdea('all'));
  const [note, setNote] = useState(() => pickNote());
  const [drawerOpen, setDrawerOpen] = useState(false);

  const inspire = (nextFilter: CategoryFilter) => {
    setIdea((current) => pickIdea(nextFilter, current.id));
    setNote((current) => pickNote(current));
  };

  const handleFilter = (next: CategoryFilter) => {
    setFilter(next);
    if (next !== 'all' && idea.category !== next) inspire(next);
  };

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const openSaved = (saved: Idea) => {
    setFilter('all');
    setIdea(saved);
    setDrawerOpen(false);
  };

  const hidden = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, rotate: -3 };
  const shown = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: -0.5 };
  const leaving = reduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, rotate: 2 };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <WashBackground />
      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-20 pt-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl">Aquarelle Flow</h1>
            <p className="text-ink-soft">What shall we paint today?</p>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-paper-edge bg-paper-card/90 px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <BookOpen size={18} aria-hidden /> Sketchbook
            <span className="min-w-6 rounded-full bg-ink px-2 py-0.5 text-center text-xs text-paper-card">
              {savedIds.length}
            </span>
          </button>
        </header>

        <main className="mt-10">
          <ErrorBoundary>
            <CategoryPills value={filter} onChange={handleFilter} />

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => inspire(filter)}
                className="inline-flex items-center gap-2 rounded-full bg-sap-dark px-8 py-3 font-medium text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-card"
              >
                <Sparkles size={18} aria-hidden /> Inspire me
              </button>
            </div>

            <div className="mt-10" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idea.id}
                  initial={hidden}
                  animate={shown}
                  exit={leaving}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <IdeaCard idea={idea} saved={isSaved(idea.id)} onToggleSave={() => toggle(idea.id)} />
                </motion.div>
              </AnimatePresence>
            </div>

            <ArtistNote note={note} />
          </ErrorBoundary>
        </main>
      </div>
      <SketchbookDrawer open={drawerOpen} onClose={closeDrawer} onOpenIdea={openSaved} />
    </div>
  );
}
