import { Link } from 'react-router-dom';
import { Clock, Target } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import FocusSwatch from '../components/FocusSwatch';
import BackLink from '../components/BackLink';

export default function ExerciseListView() {
  const { results } = useSession();

  if (results.length === 0) {
    return (
      <div className="text-center">
        <p className="mb-4">No exercises yet. Tell us how you're feeling to get started.</p>
        <Link to="/" className="text-terracotta-700 underline">
          Back to start
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl text-sage-800 sm:text-4xl">Your exercise options</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((e) => (
          <Link
            key={e.id}
            to={`/exercise/${e.id}`}
            className="group flex flex-col rounded-2xl border border-terracotta-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta-300 hover:shadow-md"
          >
            <FocusSwatch palette={e.palette} label={e.focus} hasVideo={!!e.youtubeVideoId} />
            <div className="flex flex-1 flex-col p-5">
              <h2 className="mb-2 text-xl text-sage-800">{e.title}</h2>
              <p className="mb-4 flex-1 text-sm">{e.summary}</p>
              <p className="flex items-center gap-2 text-sm text-sage-700">
                <Clock size={16} aria-hidden /> {e.duration}
              </p>
              <p className="flex items-center gap-2 text-sm text-sage-700">
                <Target size={16} aria-hidden /> {e.focus}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <BackLink to="/">Change my answers</BackLink>
    </div>
  );
}
