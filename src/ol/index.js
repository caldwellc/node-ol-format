/**
 * @module ol
 */

export {default as Feature} from './Feature.js';
export {default as Object} from './Object.js';
export {
  addProjection,
  get,
  addCoordinateTransforms,
  addEquivalentProjections,
  createSafeCoordinateTransform
} from './proj.js';
export {assign} from './obj.js'
export {getUid, VERSION} from './util.js';
