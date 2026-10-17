import { Link } from 'react-router-dom';
import { Clock, Target } from 'lucide-react';
import { useSession } from '../context/SessionContext';

export default function ExerciseListView() {
  const { results } = useSession();

  if (results.length === 0) {
    return (
      <div className="text-center">
        <p className="mb-4">No exercises yet. Tell us how you're feeling to get started.</p>
        <Link to="/" className="text-terracotta underline">
          Back to start
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl text-sage-dark">Your exercise options</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {results.map((e) => (
          <Link
            key={e.id}
            to={`/exercise/${e.id}`}
            className="block rounded-2xl border border-terracotta/40 bg-white p-5 transition hover:shadow-md"
          >
            <h2 className="mb-2 text-xl">{e.title}</h2>
            <p className="mb-4 text-sm">{e.summary}</p>
            <p className="flex items-center gap-2 text-sm text-sage-dark">
              <Clock size={16} aria-hidden /> {e.duration}
            </p>
            <p className="flex items-center gap-2 text-sm text-sage-dark">
              <Target size={16} aria-hidden /> {e.focus}
            </p>
          </Link>
        ))}
      </div>
      <Link to="/" className="mt-6 inline-block text-sm text-terracotta underline">
        Change my answers
      </Link>
    </div>
  );
}
