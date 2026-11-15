import { AnimatePresence, motion } from 'motion/react';
import { Feather } from 'lucide-react';

export default function ArtistNote({ note }: { note: string }) {
  return (
    <aside aria-label="Artist's note" className="mt-12 text-center">
      <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
        <Feather size={14} aria-hidden /> Artist's note
      </p>
      <AnimatePresence mode="wait">
        <motion.p
          key={note}
          className="mt-2 font-serif text-xl italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {note}
        </motion.p>
      </AnimatePresence>
    </aside>
  );
}
