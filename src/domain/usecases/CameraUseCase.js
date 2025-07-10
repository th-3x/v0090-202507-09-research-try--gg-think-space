/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CameraEntity } from '../entities/Camera.js'
import { AnimationConfig } from '../entities/Animation.js'

/**
 * Camera use case - handles camera operations and animations
 */
export class CameraUseCase {
  constructor(animationService, cameraHistoryService) {
    this.animationService = animationService
    this.cameraHistoryService = cameraHistoryService
  }

  /**
   * Animate camera to target position
   */
  async animateToTarget(camera, controls, targetPosition, targetControlsTarget, config = new AnimationConfig()) {
    // Save current position to history
    this.cameraHistoryService.savePosition(
      new CameraEntity(camera.position, controls.target)
    )

    const animations = [
      // Camera position animations
      this.animationService.animate(camera.position.x, targetPosition.x, {
        ...config,
        onUpdate: (value) => { camera.position.x = value }
      }),
      this.animationService.animate(camera.position.y, targetPosition.y, {
        ...config,
        onUpdate: (value) => { camera.position.y = value }
      }),
      this.animationService.animate(camera.position.z, targetPosition.z, {
        ...config,
        onUpdate: (value) => { camera.position.z = value }
      }),
      // Controls target animations
      this.animationService.animate(controls.target.x, targetControlsTarget.x, {
        ...config,
        onUpdate: (value) => { controls.target.x = value }
      }),
      this.animationService.animate(controls.target.y, targetControlsTarget.y, {
        ...config,
        onUpdate: (value) => { controls.target.y = value }
      }),
      this.animationService.animate(controls.target.z, targetControlsTarget.z, {
        ...config,
        onUpdate: (value) => { controls.target.z = value }
      })
    ]

    await Promise.all(animations.map(a => a.finished))

    // Ensure final positions are set
    camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z)
    controls.target.set(targetControlsTarget.x, targetControlsTarget.y, targetControlsTarget.z)
  }

  /**
   * Go back to previous camera position
   */
  async goBackToPreviousPosition(camera, controls, config = new AnimationConfig()) {
    const previousPosition = this.cameraHistoryService.getPreviousPosition()
    if (!previousPosition) {
      return false
    }

    await this.animateToTarget(
      camera,
      controls,
      previousPosition.position,
      previousPosition.target,
      config
    )

    return true
  }

  /**
   * Reset camera to default position
   */
  async resetToDefault(camera, controls, defaultPosition, defaultTarget, config = new AnimationConfig()) {
    await this.animateToTarget(camera, controls, defaultPosition, defaultTarget, config)
  }

  /**
   * Calculate target camera position for focusing on a node
   */
  calculateTargetCameraPosition(nodeWorldPosition, currentCameraPosition, currentControlsTarget, cameraDistance) {
    const offsetDirection = {
      x: currentCameraPosition.x - currentControlsTarget.x,
      y: currentCameraPosition.y - currentControlsTarget.y,
      z: currentCameraPosition.z - currentControlsTarget.z
    }

    // Normalize offset direction
    const length = Math.sqrt(offsetDirection.x ** 2 + offsetDirection.y ** 2 + offsetDirection.z ** 2)
    if (length === 0) {
      offsetDirection.x = 0
      offsetDirection.y = 0
      offsetDirection.z = 1
    } else {
      offsetDirection.x /= length
      offsetDirection.y /= length
      offsetDirection.z /= length
    }

    // Scale by camera distance
    offsetDirection.x *= cameraDistance
    offsetDirection.y *= cameraDistance
    offsetDirection.z *= cameraDistance

    return {
      x: nodeWorldPosition.x + offsetDirection.x,
      y: nodeWorldPosition.y + offsetDirection.y,
      z: nodeWorldPosition.z + offsetDirection.z
    }
  }
}
