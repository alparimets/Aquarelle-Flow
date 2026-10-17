import { AnimatePresence, motion } from 'framer-motion';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Palette } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import IntroView from './views/IntroView';
import ExerciseListView from './views/ExerciseListView';
import ExerciseDetailView from './views/ExerciseDetailView';
import HelpView from './views/HelpView';

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen">
      <header className="border-b border-terracotta-200/60">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 font-serif text-xl text-sage-800">
            <Palette size={22} aria-hidden /> Watercolor Creative Space
          </Link>
          <Link to="/help" className="text-sm hover:text-terracotta-700">
            Help
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <ErrorBoundary key={location.pathname}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Routes location={location}>
                <Route path="/" element={<IntroView />} />
                <Route path="/exercises" element={<ExerciseListView />} />
                <Route path="/exercise/:id" element={<ExerciseDetailView />} />
                <Route path="/help" element={<HelpView />} />
                <Route path="*" element={<IntroView />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </ErrorBoundary>
      </main>
    </div>
  );
}
