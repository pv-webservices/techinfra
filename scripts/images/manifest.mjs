// Every generated image has a purpose and a placement. Keep this list short —
// existing project imagery is reused wherever it is good enough.

const STYLE =
  'Premium editorial commercial photography for an Indian infrastructure engineering company. ' +
  'Cool deep-navy and blue tones balanced with warm interior light and occasional restrained red accents. ' +
  'Natural perspective, crisp realistic detail, true-to-life materials, high dynamic range, no lens distortion. ' +
  'Absolutely no text, letters, numbers, signage lettering, logos, brand marks or watermarks anywhere in the image.';

export const IMAGE_TASKS = [
  {
    id: 'hero-dusk',
    purpose: 'Homepage hero background (desktop/tablet)',
    placement: 'src/pages/index.astro → .hero picture (≥ 761px)',
    alt: 'Modern glass-fronted commercial building with warmly lit floors at blue hour',
    priority: 'hero',
    orientation: 'landscape',
    traits: ['architecture', 'complex-lighting'],
    prompt:
      'Wide establishing photograph of a contemporary six-storey glass-and-steel corporate headquarters in an Indian metro at blue hour. ' +
      'The building sits in the right two-thirds of the frame, three-quarter view, every floor warmly lit showing open-plan offices, ' +
      'slim vertical fins, a landscaped forecourt with palms and low uplighting, wet stone paving with soft reflections. ' +
      'The left third of the frame is calm, darker deep-navy evening sky and soft tree silhouettes, leaving clean negative space for a headline. ' +
      'Subtle discreet building technology visible: small security cameras at the entrance canopy, rooftop solar panels at the edge of the roof. ' +
      STYLE,
  },
  {
    id: 'hero-dusk-portrait',
    purpose: 'Homepage hero background for phones (no blur, native resolution)',
    placement: 'src/pages/index.astro → .hero picture (≤ 760px)',
    alt: 'Modern glass-fronted commercial building with warmly lit floors at blue hour',
    priority: 'hero',
    orientation: 'portrait',
    traits: ['architecture', 'complex-lighting'],
    prompt:
      'Tall vertical photograph of a contemporary glass-and-steel corporate headquarters in an Indian metro at blue hour, seen from a low three-quarter angle. ' +
      'The building occupies the lower sixty percent of the frame, every floor warmly lit, slim vertical fins, landscaped forecourt with palms and uplighting, ' +
      'wet stone paving with soft reflections. The upper forty percent is a smooth gradient deep-navy evening sky with no clutter, leaving clean space for a headline. ' +
      STYLE,
  },
  {
    id: 'svc-fire',
    purpose: 'Fire & Life Safety service hero and homepage service feature',
    placement: 'services/fire-life-safety hero, homepage services bento',
    alt: 'Smoke detector, sprinkler head and red fire hose cabinet in a modern commercial corridor',
    priority: 'key',
    orientation: 'landscape',
    traits: ['interior'],
    prompt:
      'Clean modern office corridor in a commercial building, photographed with a shallow depth of field. In sharp focus in the foreground: a white ceiling-mounted ' +
      'optical smoke detector beside a chrome pendant fire sprinkler head; mid-ground on the wall a glossy red fire hose reel cabinet and a red manual call point. ' +
      'Soft daylight from glazing, light grey and white finishes, calm professional mood. ' + STYLE,
  },
  {
    id: 'svc-cctv',
    purpose: 'CCTV & Security service hero and homepage service feature',
    placement: 'services/cctv-security hero, homepage services bento',
    alt: 'Dome and box-style security cameras mounted on a modern building entrance at dusk',
    priority: 'key',
    orientation: 'landscape',
    traits: ['architecture'],
    prompt:
      'Close architectural detail of a modern corporate building entrance canopy at dusk: a white professional dome security camera and a sleek white box-style ' +
      'video surveillance camera on a wall bracket, both mounted on a dark metal soffit, in sharp focus, with a softly blurred glass lobby and warm light behind. Small status LED glow. ' +
      'Cool blue exterior light, premium and reassuring mood. ' + STYLE,
  },
  {
    id: 'svc-bms',
    purpose: 'BMS & Integrated Technology service hero and homepage service feature',
    placement: 'services/bms-integrated-technology hero, homepage services bento',
    alt: 'Facility operators monitoring building systems on a large video wall in a control room',
    priority: 'key',
    orientation: 'landscape',
    traits: ['interior', 'multiple-subjects', 'photoreal-people', 'complex-lighting'],
    prompt:
      'Modern building management control room in an Indian corporate campus. Two Indian facility operators, a man and a woman in smart business attire, seen from ' +
      'behind and in three-quarter profile at a curved operator desk with multiple monitors, looking at a large seamless video wall showing abstract building floor ' +
      'plans, HVAC schematics, camera tiles and energy graphs rendered as shapes and lines only (no readable text). Dim ambient room with cool blue screen glow and ' +
      'warm accent lighting. ' + STYLE,
  },
  {
    id: 'svc-solar',
    purpose: 'Solar & Renewable Energy service hero and homepage service feature',
    placement: 'services/solar-renewable-energy hero, homepage services bento',
    alt: 'Rooftop solar power installation on a commercial building under a clear morning sky',
    priority: 'key',
    orientation: 'landscape',
    traits: ['architecture'],
    prompt:
      'Elevated view across a large flat commercial rooftop in India covered with neat rows of modern monocrystalline solar panels on aluminium mounting frames, ' +
      'cable trays and a maintenance walkway, a contemporary city and green trees in the soft-focus background, clear early-morning sky with warm low sunlight ' +
      'glancing across the panels. ' + STYLE,
  },
  {
    id: 'team-site',
    purpose: 'Why Techinfra portrait feature and About page story image',
    placement: 'homepage .why section, about-us approach section',
    alt: 'Two engineers in safety helmets reviewing building system drawings on a tablet in a plant room',
    priority: 'key',
    orientation: 'portrait',
    traits: ['multiple-people', 'interior', 'machinery'],
    prompt:
      'Vertical photograph of two Indian building services engineers, a man and a woman, wearing white safety helmets and high-visibility vests over smart work ' +
      'shirts, standing in a clean modern mechanical plant room, looking together at a tablet showing an abstract building schematic (lines only, no text). ' +
      'Behind them red fire pump pipework, valves and pressure gauges, cable trays and a control panel, softly blurred. Natural confident expressions, collaborative mood. ' +
      STYLE,
  },
  {
    id: 'cta-city',
    purpose: 'Full-width background behind the closing call-to-action band',
    placement: 'src/components/CTA.astro background',
    alt: '',
    priority: 'supporting',
    orientation: 'landscape',
    traits: ['architecture'],
    prompt:
      'Wide night view of a modern Indian commercial business district from a high vantage point: illuminated glass office towers and campus buildings, light ' +
      'trails on a curving boulevard, deep navy sky. Calm, slightly underexposed so overlaid text stays legible. ' + STYLE,
  },
  {
    id: 'contact-lobby',
    purpose: 'Contact page hero image',
    placement: 'src/pages/contact-us.astro hero',
    alt: 'Bright modern corporate reception lobby with access-controlled entry gates',
    priority: 'supporting',
    orientation: 'landscape',
    traits: ['interior'],
    prompt:
      'Bright contemporary corporate reception lobby in an Indian office building: a stone reception desk, glass speed-gate access turnstiles, a discreet ceiling dome ' +
      'camera, timber slat wall, indoor plants and daylight from tall glazing. Empty of people, welcoming and orderly. ' + STYLE,
  },
];
