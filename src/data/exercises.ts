export type Skill = 'novice' | 'beginner' | 'intermediate';
export type TimeSlot = 'quick' | 'focused' | 'weekend';
export type Energy = 'low' | 'moderate' | 'high';

export interface Preferences {
  skill: Skill;
  time: TimeSlot;
  energy: Energy;
}

export interface Step {
  title: string;
  detail: string;
}

export interface Exercise {
  id: string;
  title: string;
  summary: string;
  duration: string;
  focus: string;
  time: TimeSlot;
  energies: Energy[];
  minSkill: Skill;
  materials: { name: string; alternative?: string }[];
  steps: Step[];
}

const basics = [
  { name: 'Pencil' },
  { name: 'Watercolor palette' },
  { name: 'Water container' },
  {
    name: 'Paper',
    alternative: "Standard printer paper works fine for quick technique drills if watercolor paper isn't available.",
  },
];

export const exercises: Exercise[] = [
  {
    id: 'gradient-wash',
    title: 'Gentle Gradient Wash',
    summary: 'Blend one color from deep to pale in a single calm stroke sequence.',
    duration: '15–30 min',
    focus: 'Brush Control',
    time: 'quick',
    energies: ['low', 'moderate'],
    minSkill: 'novice',
    materials: [...basics, { name: 'Flat or round brush', alternative: 'Any soft brush will do.' }],
    steps: [
      { title: 'Draw a rectangle', detail: 'Lightly outline a 5×10 cm rectangle with pencil.' },
      { title: 'Lay the first stripe', detail: 'Load the brush with rich color and paint a stripe along the top.' },
      { title: 'Add water and continue', detail: 'Dip in clean water each stripe so the color grows paler as you move down.' },
      { title: 'Let it dry', detail: 'Rest and admire the soft fade without touching it.' },
    ],
  },
  {
    id: 'color-mixing-grid',
    title: 'Color Mixing Grid',
    summary: 'Discover secondary colors by mixing small swatches in a tidy grid.',
    duration: '20–30 min',
    focus: 'Color Mixing',
    time: 'quick',
    energies: ['moderate', 'high'],
    minSkill: 'novice',
    materials: [...basics],
    steps: [
      { title: 'Draw a grid', detail: 'Sketch a 4×4 grid of small squares.' },
      { title: 'Paint pure colors', detail: 'Fill the first row and column with single colors.' },
      { title: 'Mix and fill', detail: 'Fill each remaining square with a blend of its row and column colors.' },
      { title: 'Note favorites', detail: 'Pencil a short note beside the combinations you love.' },
    ],
  },
  {
    id: 'wet-on-wet-sky',
    title: 'Wet-on-Wet Dreamy Sky',
    summary: 'Let colors bloom and drift together in a soft evening sky.',
    duration: '1–1.5 h',
    focus: 'Wet-on-Wet Technique',
    time: 'focused',
    energies: ['low', 'moderate', 'high'],
    minSkill: 'beginner',
    materials: [...basics, { name: 'Large soft brush', alternative: 'A medium round brush works too.' }],
    steps: [
      { title: 'Outline the horizon', detail: 'Draw a simple horizon line with pencil.' },
      { title: 'Wet the sky', detail: 'Brush clean water across the sky area until it glistens.' },
      { title: 'Drop in color', detail: 'Touch in blues, pinks, and golds and let them spread.' },
      { title: 'Add the landscape', detail: 'Once dry, paint a simple dark silhouette below the horizon.' },
    ],
  },
  {
    id: 'loose-botanicals',
    title: 'Loose Botanical Study',
    summary: 'Paint a few leaves and blooms with relaxed, layered strokes.',
    duration: '1–2 h',
    focus: 'Layering & Shapes',
    time: 'focused',
    energies: ['low', 'moderate'],
    minSkill: 'beginner',
    materials: [...basics, { name: 'Round brush (size 6–8)' }],
    steps: [
      { title: 'Sketch the stem', detail: 'Lightly draw a curved stem with a few leaf shapes.' },
      { title: 'First wet layer', detail: 'Paint each leaf with a pale green wash.' },
      { title: 'Layer detail', detail: 'While still damp, add darker green near the stem.' },
      { title: 'Add blooms', detail: 'Dab in flowers using a contrasting color.' },
    ],
  },
  {
    id: 'experimental-textures',
    title: 'Experimental Texture Playground',
    summary: 'Try salt, plastic wrap, and splatters to see what happens.',
    duration: '1–2 h',
    focus: 'Experimentation',
    time: 'focused',
    energies: ['high'],
    minSkill: 'novice',
    materials: [...basics, { name: 'Table salt', alternative: 'Skip it or use sea salt.' }, { name: 'Plastic wrap' }],
    steps: [
      { title: 'Prepare squares', detail: 'Pencil four squares on your paper.' },
      { title: 'Salt bloom', detail: 'Paint a wet wash and sprinkle salt on top.' },
      { title: 'Wrinkle effect', detail: 'Press crumpled plastic wrap into another wet wash.' },
      { title: 'Splatter', detail: 'Tap a loaded brush over the third square; leave the fourth for your own idea.' },
    ],
  },
  {
    id: 'weekend-landscape',
    title: 'Weekend Layered Landscape',
    summary: 'Build a full landscape in patient layers from far to near.',
    duration: 'Half-day+',
    focus: 'Layering & Composition',
    time: 'weekend',
    energies: ['low', 'moderate', 'high'],
    minSkill: 'beginner',
    materials: [...basics, { name: 'Masking tape', alternative: 'Hold paper steady with your hand.' }],
    steps: [
      { title: 'Plan the scene', detail: 'Sketch three bands: distant hills, middle trees, foreground.' },
      { title: 'Paint the far layer', detail: 'Use pale, cool washes for distant hills and let dry.' },
      { title: 'Build the middle', detail: 'Add medium-value shapes for trees and fields.' },
      { title: 'Finish the foreground', detail: 'Use your darkest, warmest colors and a few details.' },
      { title: 'Step back', detail: 'Remove the tape and enjoy the result.' },
    ],
  },
  {
    id: 'weekend-series',
    title: 'Mini Series: Four Moods',
    summary: 'Paint the same simple subject four ways to explore expression.',
    duration: 'Half-day+',
    focus: 'Color & Mood',
    time: 'weekend',
    energies: ['moderate', 'high'],
    minSkill: 'intermediate',
    materials: [...basics],
    steps: [
      { title: 'Choose a subject', detail: 'Pick something simple, like a tree or a cup.' },
      { title: 'Warm palette', detail: 'Paint it with sunny reds and yellows.' },
      { title: 'Cool palette', detail: 'Paint it again in blues and greens.' },
      { title: 'Muted and bold', detail: 'Make two more versions: one subdued, one vivid.' },
      { title: 'Compare', detail: 'Lay them side by side and notice how each feels.' },
    ],
  },
  {
    id: 'weekend-wash-journal',
    title: 'Wash Journal Afternoon',
    summary: 'Fill a few pages with relaxed washes, doodles, and notes.',
    duration: 'Half-day+',
    focus: 'Brush Control',
    time: 'weekend',
    energies: ['low'],
    minSkill: 'novice',
    materials: [...basics],
    steps: [
      { title: 'Fold your pages', detail: 'Fold or cut paper into a small booklet.' },
      { title: 'Wash each page', detail: 'Paint a light wash of a different color on every page.' },
      { title: 'Doodle on top', detail: 'When dry, add simple shapes and small notes.' },
    ],
  },
];
