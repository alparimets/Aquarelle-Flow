import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import { Preferences } from '../data/exercises';
import { useSession } from '../context/SessionContext';
import { selectExercises, withRetry } from '../lib/generate';

export default function IntroView() {
  const navigate = useNavigate();
  const { setSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (prefs: Preferences) => {
    setLoading(true);
    setMessage(null);
    try {
      const results = await withRetry(
        async () => {
          await new Promise((r) => setTimeout(r, 600));
          return selectExercises(prefs);
        },
        3,
        500,
        () => setMessage('Something went wrong generating your exercise. Retrying...'),
      );
      setSession(prefs, results);
      navigate('/exercises');
    } catch (e) {
      console.error('Exercise generation gave up', e);
      setMessage("We couldn't find an exercise this time. Please try different options.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-terracotta/40 bg-white p-6">
        <h1 className="mb-3 text-3xl text-sage-dark">Welcome</h1>
        <p>
          This is a quiet space to enjoy your free time through creative watercolor exploration. Tell us a little
          about today, and we'll suggest a few gentle exercises. There's no right or wrong, just paint and water.
        </p>
      </section>
      <section className="rounded-2xl border border-sage/40 bg-white p-6">
        <InputForm onSubmit={handleSubmit} loading={loading} message={message} />
      </section>
    </div>
  );
}
