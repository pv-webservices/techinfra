// Central configuration for build-time AI image generation.
// Change models, quality tiers or sizes here — nothing else needs rewriting.
// The API key is read from the OPENAI_API_KEY environment variable (or .env) and is
// only ever used by this Node process. It is never bundled into the website.

export const IMAGE_CONFIG = {
  endpoint: 'https://api.openai.com/v1/images/generations',

  models: {
    // Default: fast and cost-efficient for routine website imagery.
    flare: process.env.IMAGE_MODEL_FLARE || 'gpt-image-2.5-flare',
    // Premium: hero, complex photoreal scenes, people, reference-based work.
    sunburst: process.env.IMAGE_MODEL_SUNBURST || 'gpt-image-2.5-sunburst',
  },

  quality: {
    default: process.env.IMAGE_QUALITY_DEFAULT || 'medium',
    premium: process.env.IMAGE_QUALITY_PREMIUM || 'high',
  },

  sizes: {
    square: '1024x1024',
    landscape: '1536x1024',
    portrait: '1024x1536',
  },

  outputFormat: 'png',
  concurrency: 3,
  timeoutMs: 240_000,
  retries: 2,

  // Where untouched originals are kept, and where optimized WebP files are written.
  sourceDir: 'assets-src/generated',
  publicDir: 'static/media',

  // Responsive WebP widths produced per orientation.
  variants: {
    landscape: [640, 1024, 1536],
    portrait: [640, 1024],
    square: [512, 1024],
  },
  webpQuality: 80,
};
