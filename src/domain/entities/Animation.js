/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Animation configuration entity
 */
export class AnimationConfig {
  constructor(duration = 0.8, ease = 'easeInOut') {
    this.duration = duration
    this.ease = ease
  }
}

/**
 * Animation state entity
 */
export class AnimationState {
  constructor() {
    this.isAutoRotating = false
    this.rotationVelocity = 0
    this.targetSpeed = 0.1
    this.acceleration = 0.5
    this.inactivityTimeout = 33333 // ms
  }

  startAutoRotation() {
    this.isAutoRotating = true
  }

  stopAutoRotation() {
    this.isAutoRotating = false
    this.rotationVelocity = 0
  }

  updateVelocity(delta) {
    const targetVelocity = this.isAutoRotating ? this.targetSpeed : 0
    this.rotationVelocity += (targetVelocity - this.rotationVelocity) * this.acceleration * delta
  }
}
