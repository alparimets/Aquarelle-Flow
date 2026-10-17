import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Brush, Check, Info } from 'lucide-react';
import { exercises } from '../data/exercises';
import { useSession } from '../context/SessionContext';
import PdfExportButton from '../components/PdfExportButton';

export default function ExerciseDetailView() {
  const { id } = useParams();
  const { progress, toggleStep } = useSession();
  const ref = useRef<HTMLDivElement>(null);
  const exercise = exercises.find((e) => e.id === id);

  if (!exercise) {
    return (
      <div className="text-center">
        <p className="mb-4">We couldn't find that exercise.</p>
        <Link to="/" className="text-terracotta underline">
          Back to start
        </Link>
      </div>
    );
  }

  const done = progress[exercise.id] ?? [];
  const completed = done.filter(Boolean).length;

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <PdfExportButton targetRef={ref} filename={exercise.id} />
      </div>
      <div ref={ref} className="rounded-2xl bg-paper p-6">
        <h1 className="text-3xl text-sage-dark">{exercise.title}</h1>
        <p className="mb-2 text-sm">
          Focus: {exercise.focus} · {exercise.duration}
        </p>
        <p className="mb-6 flex items-center gap-2 rounded-lg bg-sage-light px-3 py-2 text-sm">
          <Info size={16} aria-hidden /> This session is ephemeral; export to PDF to save your plan.
        </p>

        <h2 className="mb-2 text-xl">Materials</h2>
        <ul className="mb-6 list-disc space-y-1 pl-6">
          {exercise.materials.map((m) => (
            <li key={m.name}>
              {m.name}
              {m.alternative && <span className="block text-sm text-slate-500">{m.alternative}</span>}
            </li>
          ))}
        </ul>

        <h2 className="mb-2 text-xl">
          Steps ({completed}/{exercise.steps.length} done)
        </h2>
        <ol className="space-y-3">
          {exercise.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-xl border border-sage/40 bg-white p-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-sage-light text-sage-dark"
                aria-hidden
              >
                <Brush size={28} />
              </div>
              <label className="flex flex-1 cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 accent-[#8A9A86]"
                  aria-label={s.title}
                  checked={!!done[i]}
                  onChange={() => toggleStep(exercise.id, i, exercise.steps.length)}
                />
                <span>
                  <span className="block font-medium">
                    {i + 1}. {s.title}
                    {done[i] && <Check size={16} className="ml-2 inline text-sage-dark" aria-hidden />}
                  </span>
                  <span className="text-sm">{s.detail}</span>
                </span>
              </label>
            </li>
          ))}
        </ol>
      </div>
      <Link to="/exercises" className="mt-6 inline-block text-sm text-terracotta underline">
        Back to options
      </Link>
    </div>
  );
}
