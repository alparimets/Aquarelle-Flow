import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Info } from 'lucide-react';
import { exercises } from '../data/exercises';
import { useSession } from '../context/SessionContext';
import PdfExportButton from '../components/PdfExportButton';
import VideoTutorialEmbed from '../components/VideoTutorialEmbed';
import StepIllustration from '../components/illustrations/StepIllustration';
import BackLink from '../components/BackLink';

export default function ExerciseDetailView() {
  const { id } = useParams();
  const { progress, toggleStep } = useSession();
  const ref = useRef<HTMLDivElement>(null);
  const exercise = exercises.find((e) => e.id === id);

  if (!exercise) {
    return (
      <div className="text-center">
        <p className="mb-4">We couldn't find that exercise.</p>
        <Link to="/" className="text-terracotta-700 underline">
          Back to start
        </Link>
      </div>
    );
  }

  const done = progress[exercise.id] ?? [];
  const completed = done.filter(Boolean).length;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex justify-end">
        <PdfExportButton targetRef={ref} filename={exercise.id} />
      </div>
      <div ref={ref} className="rounded-2xl bg-paper p-4 sm:p-6">
        <h1 className="text-3xl text-sage-800 sm:text-4xl">{exercise.title}</h1>
        <p className="mb-3 mt-1 text-sm">
          Focus: {exercise.focus} · {exercise.duration}
        </p>
        <p className="mb-6 flex items-center gap-2 rounded-lg bg-sage-100 px-3 py-2 text-sm">
          <Info size={16} aria-hidden className="shrink-0" /> This session is ephemeral; export to PDF to save your
          plan.
        </p>

        <VideoTutorialEmbed videoId={exercise.youtubeVideoId} searchQuery={exercise.searchQuery} title={`${exercise.title} video demonstration`} />

        <h2 className="mb-2 text-xl">Materials</h2>
        <ul className="mb-8 list-disc space-y-1 pl-6">
          {exercise.materials.map((m) => (
            <li key={m.name}>
              {m.name}
              {m.alternative && <span className="block text-sm text-slate-500">{m.alternative}</span>}
            </li>
          ))}
        </ul>

        <h2 className="mb-3 text-xl">
          Steps ({completed}/{exercise.steps.length} done)
        </h2>
        <ol className="space-y-3">
          {exercise.steps.map((s, i) => (
            <li
              key={s.title}
              className="flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-4 shadow-soft transition-all duration-300 hover:border-sage-300 hover:shadow-md sm:flex-row"
            >
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-stone-200 sm:h-20 sm:w-20">
                <StepIllustration type={s.stepVisualType} palette={exercise.palette} className="h-full w-full" />
              </div>
              <label className="flex flex-1 cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 accent-sage-700"
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
      <BackLink to="/exercises">Back to options</BackLink>
    </div>
  );
}
