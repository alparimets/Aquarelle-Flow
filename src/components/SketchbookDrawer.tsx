import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Trash2, X } from 'lucide-react';
import { CATEGORIES_BY_ID, IDEAS_BY_ID, Idea } from '../data/ideas';
import { useSketchbook } from '../context/SketchbookContext';
import Badge from './Badge';
import { MiniPalette } from './PaletteSwatches';

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenIdea: (idea: Idea) => void;
}

// Binder rings punched down the left edge.
const RINGS = 'radial-gradient(circle at 14px 50%, #E9E1D3 0 6px, #cfc4b0 6px 7px, transparent 7px) 0 0 / 28px 56px repeat-y';

export default function SketchbookDrawer({ open, onClose, onOpenIdea }: Props) {
  const { savedIds, toggle } = useSketchbook();
  const closeRef = useRef<HTMLButtonElement>(null);
  const saved = savedIds.map((id) => IDEAS_BY_ID.get(id)).filter((idea): idea is Idea => Boolean(idea));

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            className="absolute inset-0 bg-ink/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="My sketchbook"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper-card shadow-card"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 34 }}
          >
            <div aria-hidden className="absolute inset-y-0 left-0 w-7" style={{ background: RINGS }} />
            <header className="flex items-center justify-between border-b border-paper-edge py-4 pl-12 pr-4">
              <h2 className="flex items-center gap-2 text-2xl">
                <BookOpen size={22} aria-hidden /> My sketchbook
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close sketchbook"
                className="rounded-full p-2 transition-colors duration-300 hover:bg-paper-edge"
              >
                <X size={20} aria-hidden />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto py-4 pl-12 pr-4">
              {saved.length === 0 ? (
                <p className="mt-8 text-center text-ink-soft">
                  Your sketchbook is empty. Save an idea you'd like to paint later and it will wait for you here.
                </p>
              ) : (
                <ul className="space-y-4">
                  {saved.map((idea) => (
                    <li key={idea.id} className="rounded-sm border border-paper-edge bg-white p-4 shadow-lift">
                      <Badge accent={CATEGORIES_BY_ID.get(idea.category)?.accent ?? '#7A9A65'}>{idea.format}</Badge>
                      <h3 className="mt-2 text-lg font-semibold">{idea.title}</h3>
                      <p className="text-sm italic text-ink-soft">{idea.hook}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <MiniPalette palette={idea.palette} />
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => onOpenIdea(idea)}
                            className="rounded-full px-3 py-1.5 text-sm font-medium text-sap-dark transition-colors duration-300 hover:bg-sap/15"
                          >
                            Open
                          </button>
                          <button
                            type="button"
                            onClick={() => toggle(idea.id)}
                            aria-label={`Remove ${idea.title}`}
                            className="rounded-full p-2 text-ink-soft transition-colors duration-300 hover:bg-rose/15 hover:text-ink"
                          >
                            <Trash2 size={16} aria-hidden />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
