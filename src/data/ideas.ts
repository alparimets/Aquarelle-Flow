export type CategoryId = 'botanicals' | 'critters' | 'miniature' | 'landscapes' | 'abstracts';

export interface Category {
  id: CategoryId;
  label: string;
  accent: string;
}

export interface Pigment {
  name: string;
  hex: string;
}

export interface Idea {
  id: string;
  category: CategoryId;
  title: string;
  hook: string;
  format: string;
  prompt: string;
  palette: readonly Pigment[];
  tip: string;
}

export const CATEGORIES: readonly Category[] = [
  { id: 'botanicals', label: 'Botanicals, Berries & Fungi', accent: '#7A9A65' },
  { id: 'critters', label: 'Whimsical Critters', accent: '#D46A7E' },
  { id: 'miniature', label: 'Cozy Miniature Worlds', accent: '#E2A856' },
  { id: 'landscapes', label: 'Misty & Layered Landscapes', accent: '#6BA3BE' },
  { id: 'abstracts', label: 'Playful Abstracts & Color Play', accent: '#8E7CB3' },
];

export const ARTIST_NOTES: readonly string[] = [
  'Start with blobs, add ink later.',
  "It's going to turn out great.",
  'A wobbly line is just a line with personality.',
  'Let the water do half the work.',
  'Happy accidents are the best part.',
  "You don't have to finish today.",
  'Paper is cheap. Joy is not. Paint freely.',
  'Squint at it. It already looks lovely.',
  'Every sketchbook page is allowed to be a little messy.',
  'Rest your shoulders, soften your grip.',
];

const PIGMENTS = {
  warmYellow: { name: 'Warm Yellow', hex: '#F2C14E' },
  yellowOchre: { name: 'Yellow Ochre', hex: '#E2A856' },
  burntSienna: { name: 'Burnt Sienna', hex: '#B5603A' },
  burntUmber: { name: 'Burnt Umber', hex: '#6B4A36' },
  alizarin: { name: 'Alizarin Crimson', hex: '#B03A48' },
  rose: { name: 'Alizarin Rose', hex: '#D46A7E' },
  permanentRose: { name: 'Permanent Rose', hex: '#E58CA0' },
  sapGreen: { name: 'Sap Green', hex: '#7A9A65' },
  olive: { name: 'Olive Green', hex: '#8A8F4B' },
  viridian: { name: 'Viridian', hex: '#4E8F7C' },
  cerulean: { name: 'Cerulean Blue', hex: '#6BA3BE' },
  ultramarine: { name: 'Ultramarine', hex: '#4A5FA8' },
  violet: { name: 'Dioxazine Violet', hex: '#7B5EA7' },
  paynesGray: { name: "Payne's Gray", hex: '#4B5563' },
} as const satisfies Record<string, Pigment>;

type PigmentKey = keyof typeof PIGMENTS;
type IdeaRow = [
  title: string,
  hook: string,
  format: string,
  prompt: string,
  palette: [PigmentKey, PigmentKey, PigmentKey, PigmentKey],
  tip: string,
];

function toIdeas(category: CategoryId, rows: IdeaRow[]): Idea[] {
  return rows.map(([title, hook, format, prompt, palette, tip], index) => ({
    id: `${category}-${index + 1}`,
    category,
    title,
    hook,
    format,
    prompt,
    palette: palette.map((key) => PIGMENTS[key]),
    tip,
  }));
}

const botanicals = toIdeas('botanicals', [
  [
    'Sunlit Red Currant Study',
    'Tiny jewels on a slender stem.',
    'A5 Study Sheet',
    'Paint one loose cluster of berries hanging from a curved stem, letting a few overlap. Keep the leaves soft and simple, and let the berries be the stars of the page.',
    ['alizarin', 'warmYellow', 'sapGreen', 'burntUmber'],
    'Leave a dry white crescent on each berry for shine.',
  ],
  [
    'Loose Little Mushrooms',
    'A tiny forest family, no two alike.',
    'A5 Study Sheet',
    'Dot three or four mushrooms of different heights across the page. Drop a darker tone under each cap while it is still wet, and let the stems stay pale.',
    ['burntSienna', 'yellowOchre', 'burntUmber', 'sapGreen'],
    'Add slightly offset 0.3mm waterproof ink lines once dry.',
  ],
  [
    'Negative-Space Autumn Leaves',
    'Paint the glow around the leaf.',
    'Postcard',
    'Sketch two or three leaves lightly, then wash warm colour around them instead of inside them. The paper left behind becomes the leaf, edges softly imperfect.',
    ['yellowOchre', 'burntSienna', 'alizarin', 'burntUmber'],
    'Once dry, pull a few veins in with a fine brush and a drop of umber.',
  ],
  [
    'Swedish Moss Study',
    'A soft green carpet you can almost feel.',
    'A5 Study Sheet',
    'Dab and stipple greens into a mossy mound, mixing on the paper as you go. Add a tiny fern curl or two peeking out for scale.',
    ['sapGreen', 'olive', 'viridian', 'yellowOchre'],
    'Flick a little water into the damp paint for a fuzzy texture.',
  ],
  [
    'Blackberry Bramble',
    'Plump, dusky berries on a tangled branch.',
    'A5 Study Sheet',
    'Paint a trailing branch with a few ripe and a few unripe berries. Let colours bleed from red into deep purple while wet for that jewel-like depth.',
    ['violet', 'alizarin', 'sapGreen', 'burntUmber'],
    'Lift a small highlight with a damp brush before the paint dries.',
  ],
  [
    'Wildflower Jar Sketch',
    'A bouquet from the roadside.',
    'Postcard',
    'Fill a simple glass jar with loose daisies and grasses, using quick dabs for petals and single strokes for stems. The jar can be only a few hinted lines.',
    ['permanentRose', 'warmYellow', 'sapGreen', 'cerulean'],
    'Add tiny ink dots at the flower centres for charm.',
  ],
  [
    'Ginkgo Leaf Fan',
    'A golden fan that glows on its own.',
    'A6 Sketchbook Page',
    'Paint a single fan-shaped leaf in a wet yellow wash, then drop a touch of green at the stem end and let it drift outward.',
    ['warmYellow', 'yellowOchre', 'sapGreen', 'burntSienna'],
    'Draw the radiating veins with a fine pen once dry.',
  ],
  [
    'Foraged Chanterelles',
    'Little golden trumpets in the moss.',
    'A5 Study Sheet',
    'Group two or three chanterelles with ruffled, curving edges, resting on a loose patch of green. Keep the shapes wobbly and warm.',
    ['yellowOchre', 'warmYellow', 'sapGreen', 'burntUmber'],
    'Let a little burnt sienna kiss the edges while the wash is damp.',
  ],
]);

const critters = toIdeas('critters', [
  [
    'Cat in a Cozy Sweater',
    'Warm knits and a very pleased cat.',
    'Postcard',
    'Paint a sitting cat as a soft rounded blob, then wrap it in a chunky sweater with simple stripes. Keep the face minimal: two dots and a tiny nose.',
    ['burntSienna', 'cerulean', 'yellowOchre', 'paynesGray'],
    'Add whiskers with a waterproof pen after everything is dry.',
  ],
  [
    'Sleepy Fox Curled Up',
    'A cozy swirl of autumn fur.',
    'A5 Study Sheet',
    'Paint a fox as a curved crescent with its tail wrapped around its nose. Let orange blur into a pale cream belly while the wash is still wet.',
    ['burntSienna', 'yellowOchre', 'burntUmber', 'sapGreen'],
    'Keep a little white at the tail tip by leaving the paper bare.',
  ],
  [
    'Soft Hummingbird',
    'A blur of wings in mid-flutter.',
    'A6 Sketchbook Page',
    'Paint a tiny round body in a wet wash of teal and green, with loose swept wings and a long slim beak. Let the colours melt together without fussing.',
    ['viridian', 'cerulean', 'permanentRose', 'paynesGray'],
    'Add a fine ink line for the beak to make it pop.',
  ],
  [
    'Chubby Bumblebee',
    'Round, fuzzy and full of snacks.',
    'Postcard',
    'Paint a plump striped body with two tiny translucent wings. Drop in a darker band while the yellow is still damp for a fuzzy feel.',
    ['warmYellow', 'yellowOchre', 'burntUmber', 'cerulean'],
    'Leave the wings as pale washes with just a hint of blue outline.',
  ],
  [
    'Hedgehog with a Leaf Hat',
    'A little wanderer in autumn clothes.',
    'A5 Study Sheet',
    'Paint a rounded hedgehog body in browns and a pale face, then balance a big autumn leaf on its back. Flick a few spiky dots over the body.',
    ['burntUmber', 'burntSienna', 'yellowOchre', 'sapGreen'],
    'Dot in a tiny black eye and nose with a pen.',
  ],
  [
    'Rainy Day Frog',
    'Happiest in a puddle.',
    'Postcard',
    'Paint a bright green frog sitting under a big leaf umbrella, with a few blue raindrops falling around. Keep everything round and friendly.',
    ['sapGreen', 'viridian', 'cerulean', 'yellowOchre'],
    'Leave small white spots on the leaf for raindrop sparkle.',
  ],
  [
    'Snoozing Bunny',
    'Soft ears, softer dreams.',
    'A6 Sketchbook Page',
    'Paint a rounded bunny resting on its side, with ears folded and nose tucked in. Use a very pale wash and let a pink tint pool in the ears.',
    ['permanentRose', 'burntSienna', 'paynesGray', 'sapGreen'],
    'Add three little curved lashes for a sleepy face.',
  ],
  [
    'Owl on a Branch',
    'Big eyes, quiet night.',
    'A5 Study Sheet',
    'Paint a chunky owl as an oval with a blotchy feather texture, perched on a slim branch. Give it two big round eyes and let the colours speckle.',
    ['burntUmber', 'yellowOchre', 'paynesGray', 'burntSienna'],
    'Place a small crescent moon behind it in pale yellow.',
  ],
]);

const miniature = toIdeas('miniature', [
  [
    'Cozy Cabin in a Snow Globe',
    'A whole winter evening in one little orb.',
    'Square Card',
    'Draw a circle and tuck a tiny cabin with a glowing window inside. Wash the sky a soft blue, leave the roof bright white, and add a few evergreens.',
    ['cerulean', 'warmYellow', 'viridian', 'burntSienna'],
    'Dot white gouache or gel pen snowflakes on top once dry.',
  ],
  [
    'Steaming Ceramic Mug',
    'A hug you can hold in two hands.',
    'Postcard',
    'Paint a chunky mug in a speckled glaze with a gentle swirl of steam rising above. Keep the edges slightly uneven for a handmade feel.',
    ['cerulean', 'burntSienna', 'yellowOchre', 'paynesGray'],
    'Leave the steam as unpainted paper with a faint grey shadow beside it.',
  ],
  [
    'Cottage Window at Dusk',
    'Warm light from a tiny window.',
    'A5 Study Sheet',
    'Paint a dark blue evening wall with one glowing window and a flower box underneath. Let the yellow glow bleed softly into the dark around it.',
    ['ultramarine', 'warmYellow', 'sapGreen', 'permanentRose'],
    'Add thin ink window panes after the paint dries.',
  ],
  [
    'Tiny Library Nook',
    'A chair, a lamp and a stack of books.',
    'A5 Study Sheet',
    'Paint a squashy armchair beside a tall lamp, with a small pile of books beside it. Keep the shapes simple and the colours warm.',
    ['burntSienna', 'yellowOchre', 'sapGreen', 'burntUmber'],
    'Add a soft yellow glow around the lamp with a damp brush.',
  ],
  [
    'Candle on a Windowsill',
    'One flame, a world of calm.',
    'A6 Sketchbook Page',
    'Paint a small candle in a dish with a glowing flame and a dark window behind it. Let the yellow blur outward into the blue night.',
    ['warmYellow', 'yellowOchre', 'ultramarine', 'paynesGray'],
    'Dab a little white gel pen on the wick for a bright core.',
  ],
  [
    'Mushroom Cottage',
    'Someone very small lives here.',
    'Postcard',
    'Paint a big red-capped mushroom with a tiny round door and window cut into its stem. Add a little path and a few daisies at its base.',
    ['alizarin', 'burntSienna', 'sapGreen', 'warmYellow'],
    'Add white dots on the cap with gouache for the classic look.',
  ],
  [
    'Tea and Toast Breakfast',
    'The loveliest corner of the morning.',
    'A5 Study Sheet',
    'Paint a teapot, a cup and a slice of toast from above, all with soft wobbly outlines. Let the colours spill a little beyond the lines.',
    ['yellowOchre', 'burntSienna', 'cerulean', 'permanentRose'],
    'Add a pale shadow under each item so they settle onto the page.',
  ],
  [
    'Paper Lantern Row',
    'A little festival on a string.',
    '2x2 Mini Grid',
    'Paint a string of five round lanterns in different warm washes, each with a bright glowing centre. Let the colours blur where they meet the dark.',
    ['alizarin', 'warmYellow', 'permanentRose', 'ultramarine'],
    'Connect them with a thin sagging ink line.',
  ],
]);

const landscapes = toIdeas('landscapes', [
  [
    'Wet-on-Wet Mountain Range',
    'Layers fading into the haze.',
    'A5 Study Sheet',
    'Wet the paper, then paint three ridges from palest in the back to darkest in front. Let each layer bleed into the one behind it for that misty depth.',
    ['cerulean', 'ultramarine', 'paynesGray', 'permanentRose'],
    'Add one tiny bird with a single flick of dark paint.',
  ],
  [
    'Sunset Lake Reflection',
    'The sky, upside down.',
    'Postcard',
    'Wash a sunset across the upper half and mirror it softly below with horizontal ripples. Keep a dark, simple shoreline in between.',
    ['warmYellow', 'permanentRose', 'violet', 'ultramarine'],
    'Pull a thin horizontal line of bare paper for a gleam on the water.',
  ],
  [
    'Minimalist Pine Ridge',
    'Quiet trees against a pale sky.',
    'A5 Study Sheet',
    'Paint a pale gradient sky, then add a ridge of simple pine silhouettes in layers. Use the same colour darker for each row closer to you.',
    ['cerulean', 'viridian', 'paynesGray', 'yellowOchre'],
    'Pick out a few trunks with a fine brush in dark gray.',
  ],
  [
    'Foggy Meadow Morning',
    'Everything is soft and still.',
    'Postcard',
    'Paint a pale green meadow with gentle hills and a few faint tree shapes dissolving into mist. Leave lots of white paper for the fog.',
    ['sapGreen', 'olive', 'cerulean', 'yellowOchre'],
    'Add one darker tree in the foreground as an anchor.',
  ],
  [
    'Lavender Field Rows',
    'Purple stripes drifting toward the horizon.',
    'A5 Study Sheet',
    'Paint curved rows of lavender in violet and blue, getting thinner and paler as they recede. Add a golden sky above for warmth.',
    ['violet', 'ultramarine', 'sapGreen', 'warmYellow'],
    'Dab in a few vertical flicks for individual lavender stems.',
  ],
  [
    'Distant Island at Dusk',
    'A tiny shape afloat in a big sky.',
    '2x2 Mini Grid',
    'Paint four small panels of the same island at different times of day. Keep each one very simple, just a sky, a sliver of land and water.',
    ['warmYellow', 'permanentRose', 'cerulean', 'paynesGray'],
    'Label each panel with a tiny time in pencil.',
  ],
  [
    'Rainy Window View',
    'The world softened by raindrops.',
    'A6 Sketchbook Page',
    'Wash blurred blobs of green, blue and yellow, then draw a few clear raindrops on top. The shapes behind should stay soft and unclear.',
    ['cerulean', 'sapGreen', 'yellowOchre', 'paynesGray'],
    'Lift tiny circles with a damp brush for raindrops.',
  ],
  [
    'Winter Hills in Blue',
    'Quiet snow under a cold sky.',
    'Postcard',
    'Paint overlapping hills in pale blue-gray, leaving the tops white. Add a few skinny bare trees or a tiny cabin in the middle distance.',
    ['cerulean', 'ultramarine', 'paynesGray', 'permanentRose'],
    'A single warm window dot makes the whole scene feel cozy.',
  ],
]);

const abstracts = toIdeas('abstracts', [
  [
    'Wet-on-Wet Blobs with Ink Doodles',
    'Let the colour wander, then play.',
    'A5 Study Sheet',
    'Drop four loose blobs of colour onto damp paper and let them touch. Once dry, doodle faces, leaves or patterns on top with a fine pen.',
    ['permanentRose', 'cerulean', 'warmYellow', 'sapGreen'],
    'Add slightly offset 0.3mm waterproof ink lines for a playful look.',
  ],
  [
    'Botanical Bookmark Strip',
    'A tiny garden for your next book.',
    'Bookmark Strip',
    'Tape off a long thin strip and paint a vertical vine with simple leaves and a few berry dots. Repeat the same shapes in different colours.',
    ['sapGreen', 'olive', 'alizarin', 'yellowOchre'],
    'Punch a hole at the top and tie a ribbon once dry.',
  ],
  [
    'Four-Swatch Mood Grid',
    'How does today feel in colour?',
    '2x2 Mini Grid',
    'Paint four squares, each in a different mood: calm, bright, cosy and stormy. Let the colours inside each square mix softly.',
    ['cerulean', 'warmYellow', 'burntSienna', 'violet'],
    'Write a one-word title under each swatch.',
  ],
  [
    'Sunset Gradient Bands',
    'A sky in horizontal stripes.',
    'Postcard',
    'Paint five or six stripes in warm colours, letting the edges blur a little where they meet. No drawing needed, just colour.',
    ['warmYellow', 'yellowOchre', 'permanentRose', 'violet'],
    'Add a small black bird silhouette to give it a story.',
  ],
  [
    'Confetti Splatter Party',
    'Flick, dab and celebrate.',
    'A5 Study Sheet',
    'Load a brush with colour and tap it over the paper to splatter. Add a few big wet dots to anchor the page, then let everything bleed gently.',
    ['permanentRose', 'cerulean', 'warmYellow', 'viridian'],
    'Outline a few dots with thin ink circles.',
  ],
  [
    'Rainbow Water Drops',
    'Little blobs that glow when they touch.',
    'A6 Sketchbook Page',
    'Paint a bunch of round drops in different colours that overlap, letting the touching areas mix. Leave a white spot in each for shine.',
    ['cerulean', 'rose', 'warmYellow', 'viridian'],
    'Use a drop of salt in a wet blob for a starry texture.',
  ],
  [
    'Gradient Rainbow Arc',
    'One brush, one curve, lots of colour.',
    'Postcard',
    'Paint a curved arc with colours that blend into each other as you go, from warm yellow through pink into a deep blue. Keep it soft and wide.',
    ['warmYellow', 'permanentRose', 'violet', 'cerulean'],
    'Dot tiny clouds at each end with white gouache.',
  ],
  [
    'Pattern Leaf Swatches',
    'Nothing is quite the same twice.',
    '2x2 Mini Grid',
    'Paint four leaves in different greens, then decorate each with a different pattern of dots, lines or stripes once dry.',
    ['sapGreen', 'olive', 'viridian', 'yellowOchre'],
    'Use the same pen for all four so the grid feels like a set.',
  ],
]);

export const IDEAS: readonly Idea[] = [...botanicals, ...critters, ...miniature, ...landscapes, ...abstracts];

export const IDEAS_BY_ID: ReadonlyMap<string, Idea> = new Map(IDEAS.map((idea) => [idea.id, idea]));

export const CATEGORIES_BY_ID: ReadonlyMap<CategoryId, Category> = new Map(CATEGORIES.map((c) => [c.id, c]));
