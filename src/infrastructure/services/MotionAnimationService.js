/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { animate } from 'motion'
import { IAnimationService } from '../../domain/services/IAnimationService.js'

/**
 * Motion.js implementation of animation service
 */
export class MotionAnimationService extends IAnimationService {
  /**
   * Animate a value using motion library
   */
  animate(from, to, options) {
    return animate(from, to, {
      duration: options.duration || 0.8,
      ease: options.ease || 'easeInOut',
      onUpdate: options.onUpdate
    })
  }
}
