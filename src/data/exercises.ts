export type Skill = 'novice' | 'beginner' | 'intermediate';
export type TimeSlot = 'quick' | 'focused' | 'weekend';
export type Energy = 'low' | 'moderate' | 'high';

export interface Preferences {
  skill: Skill;
  time: TimeSlot;
  energy: Energy;
}

export type StepVisualType = 'pencil-grid' | 'wet-wash' | 'gradient-fade' | 'pigment-layers';

export interface Step {
  title: string;
  detail: string;
  stepVisualType: StepVisualType;
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
  /** Two pigment colors used for the card swatch and step illustrations. */
  palette: [string, string];
  /** Verified YouTube video ID; when absent a YouTube search link is shown instead. */
  youtubeVideoId?: string;
  searchQuery: string;
}

const steps = (...rows: [title: string, detail: string, visual: StepVisualType][]): Step[] =>
  rows.map(([title, detail, stepVisualType]) => ({ title, detail, stepVisualType }));

const basics = [
  { name: 'Pencil' },
  { name: 'Watercolor palette' },
  { name: 'Water container' },
  {
    name: 'Paper',
    alternative: "Standard printer paper works fine for quick technique drills if watercolor paper isn't available.",
  },
];

const withBasics = (...extra: Exercise['materials']) => [...basics, ...extra];

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
    materials: withBasics({ name: 'Flat or round brush', alternative: 'Any soft brush will do.' }),
    steps: steps(
      ['Draw a rectangle', 'Lightly outline a 5×10 cm rectangle with pencil.', 'pencil-grid'],
      ['Lay the first stripe', 'Load the brush with rich color and paint a stripe along the top.', 'wet-wash'],
      ['Add water and continue', 'Dip in clean water each stripe so the color grows paler as you move down.', 'gradient-fade'],
      ['Let it dry', 'Rest and admire the soft fade without touching it.', 'pigment-layers'],
    ),
    palette: ['#5B7FA6', '#BBD0E6'],
    youtubeVideoId: 'SMg1RIhd8u0',
    searchQuery: 'watercolor gradient wash tutorial beginner',
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
    materials: withBasics(),
    steps: steps(
      ['Draw a grid', 'Sketch a 4×4 grid of small squares.', 'pencil-grid'],
      ['Paint pure colors', 'Fill the first row and column with single colors.', 'wet-wash'],
      ['Mix and fill', 'Fill each remaining square with a blend of its row and column colors.', 'pigment-layers'],
      ['Note favorites', 'Pencil a short note beside the combinations you love.', 'pencil-grid'],
    ),
    palette: ['#D98A5F', '#7FA38E'],
    youtubeVideoId: 'hpcHXlLM-Hk',
    searchQuery: 'watercolor color mixing chart beginner',
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
    materials: withBasics({ name: 'Large soft brush', alternative: 'A medium round brush works too.' }),
    steps: steps(
      ['Outline the horizon', 'Draw a simple horizon line with pencil.', 'pencil-grid'],
      ['Wet the sky', 'Brush clean water across the sky area until it glistens.', 'wet-wash'],
      ['Drop in color', 'Touch in blues, pinks, and golds and let them spread.', 'pigment-layers'],
      ['Add the landscape', 'Once dry, paint a simple dark silhouette below the horizon.', 'gradient-fade'],
    ),
    palette: ['#C98FA8', '#E8B96A'],
    youtubeVideoId: 't1fsYCgT7AE',
    searchQuery: 'watercolor wet on wet sky tutorial beginner',
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
    materials: withBasics({ name: 'Round brush (size 6–8)' }),
    steps: steps(
      ['Sketch the stem', 'Lightly draw a curved stem with a few leaf shapes.', 'pencil-grid'],
      ['First wet layer', 'Paint each leaf with a pale green wash.', 'wet-wash'],
      ['Layer detail', 'While still damp, add darker green near the stem.', 'pigment-layers'],
      ['Add blooms', 'Dab in flowers using a contrasting color.', 'gradient-fade'],
    ),
    palette: ['#6F9A6B', '#E3A0A0'],
    youtubeVideoId: '50Cm57Q5vTg',
    searchQuery: 'loose watercolor leaves botanical tutorial beginner',
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
    materials: withBasics({ name: 'Table salt', alternative: 'Skip it or use sea salt.' }, { name: 'Plastic wrap' }),
    steps: steps(
      ['Prepare squares', 'Pencil four squares on your paper.', 'pencil-grid'],
      ['Salt bloom', 'Paint a wet wash and sprinkle salt on top.', 'wet-wash'],
      ['Wrinkle effect', 'Press crumpled plastic wrap into another wet wash.', 'pigment-layers'],
      ['Splatter', 'Tap a loaded brush over the third square; leave the fourth for your own idea.', 'gradient-fade'],
    ),
    palette: ['#6C8FA3', '#D9A066'],
    youtubeVideoId: 'NQ9ViXNf9q4',
    searchQuery: 'watercolor texture techniques salt plastic wrap',
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
    materials: withBasics({ name: 'Masking tape', alternative: 'Hold paper steady with your hand.' }),
    steps: steps(
      ['Plan the scene', 'Sketch three bands: distant hills, middle trees, foreground.', 'pencil-grid'],
      ['Paint the far layer', 'Use pale, cool washes for distant hills and let dry.', 'wet-wash'],
      ['Build the middle', 'Add medium-value shapes for trees and fields.', 'pigment-layers'],
      ['Finish the foreground', 'Use your darkest, warmest colors and a few details.', 'gradient-fade'],
      ['Step back', 'Remove the tape and enjoy the result.', 'pigment-layers'],
    ),
    palette: ['#7B9E87', '#A9BCD0'],
    searchQuery: 'layered watercolor landscape tutorial beginner',
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
    materials: withBasics(),
    steps: steps(
      ['Choose a subject', 'Pick something simple, like a tree or a cup.', 'pencil-grid'],
      ['Warm palette', 'Paint it with sunny reds and yellows.', 'wet-wash'],
      ['Cool palette', 'Paint it again in blues and greens.', 'gradient-fade'],
      ['Muted and bold', 'Make two more versions: one subdued, one vivid.', 'pigment-layers'],
      ['Compare', 'Lay them side by side and notice how each feels.', 'pencil-grid'],
    ),
    palette: ['#D9774F', '#5E86A8'],
    youtubeVideoId: 'aIk7nodva34',
    searchQuery: 'watercolor same subject warm cool color palettes mood',
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
    materials: withBasics(),
    steps: steps(
      ['Fold your pages', 'Fold or cut paper into a small booklet.', 'pencil-grid'],
      ['Wash each page', 'Paint a light wash of a different color on every page.', 'wet-wash'],
      ['Doodle on top', 'When dry, add simple shapes and small notes.', 'pigment-layers'],
    ),
    palette: ['#B58DB0', '#8DB5A3'],
    youtubeVideoId: 'HA7SzB9bEEs',
    searchQuery: 'watercolor journal washes beginner',
  },
];

