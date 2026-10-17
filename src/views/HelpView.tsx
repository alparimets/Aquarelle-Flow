export default function HelpView() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-sage-dark">Help & Philosophy</h1>
      <section>
        <h2 className="mb-2 text-xl">Mindful creation, without perfectionism</h2>
        <p>
          Watercolor is about water, color, and a little surprise. These exercises are invitations, not tests.
          Happy accidents are part of the practice. Enjoy the process more than the result.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-xl">Using checklists</h2>
        <p>
          Tick each step as you finish it. Your progress is held only while this page is open, so nothing is stored
          on your device or sent anywhere.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-xl">Exporting your plan</h2>
        <p>
          On any exercise page, press "Export to PDF" to download an A4 plan with materials, steps, and your
          current progress. Export before closing the page, because sessions are ephemeral.
        </p>
      </section>
    </div>
  );
}
