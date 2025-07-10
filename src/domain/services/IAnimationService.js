/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Animation service interface
 */
export class IAnimationService {
  /**
   * Animate a value from current to target
   * @param {number} from - Starting value
   * @param {number} to - Target value
   * @param {Object} options - Animation options (duration, ease, onUpdate)
   * @returns {Promise} Animation promise with finished property
   */
  animate(from, to, options) {
    throw new Error('animate method must be implemented')
  }
}
