import { IMAGE_CONFIG } from './config.mjs';

// Traits that justify the premium model. One strong trait or two supporting traits
// are needed before Sunburst is chosen — Flare stays the default.
const STRONG_TRAITS = new Set([
  'reference-image', 'edit', 'person-consistency', 'product-consistency',
  'brand-placement', 'multiple-people',
]);
const SUPPORTING_TRAITS = new Set([
  'architecture', 'interior', 'machinery', 'complex-lighting',
  'photoreal-people', 'detailed-commercial-scene', 'multiple-subjects',
]);

/**
 * Decide model, quality and size for a task from the image manifest.
 * @param {{priority:'hero'|'key'|'supporting', orientation:'square'|'landscape'|'portrait', traits?:string[], escalate?:boolean}} task
 */
export function route(task) {
  const traits = task.traits ?? [];
  const strong = traits.filter((t) => STRONG_TRAITS.has(t)).length;
  const supporting = traits.filter((t) => SUPPORTING_TRAITS.has(t)).length;

  const premiumModel =
    task.escalate === true ||          // Flare already produced an insufficient result
    task.priority === 'hero' ||        // homepage hero / high-priority banner
    strong > 0 ||
    supporting >= 2;

  const premiumQuality = task.priority === 'hero' || task.priority === 'key' || premiumModel;

  const size = IMAGE_CONFIG.sizes[task.orientation];
  if (!size) throw new Error(`Unknown orientation "${task.orientation}" for ${task.id}`);

  return {
    model: premiumModel ? IMAGE_CONFIG.models.sunburst : IMAGE_CONFIG.models.flare,
    tier: premiumModel ? 'sunburst' : 'flare',
    quality: premiumQuality ? IMAGE_CONFIG.quality.premium : IMAGE_CONFIG.quality.default,
    size,
    reason: premiumModel
      ? (task.escalate ? 'escalated after insufficient Flare result' : task.priority === 'hero' ? 'hero asset' : `traits: ${traits.join(', ')}`)
      : 'standard asset',
  };
}
