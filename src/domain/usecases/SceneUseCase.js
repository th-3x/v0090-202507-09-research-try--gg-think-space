/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneConfig, SceneState } from '../entities/Scene.js'
import { AnimationConfig } from '../entities/Animation.js'

/**
 * Scene use case - handles scene operations and layout changes
 */
export class SceneUseCase {
  constructor(animationService) {
    this.animationService = animationService
    this.config = new SceneConfig()
  }

  /**
   * Calculate world position of a node
   */
  calculateNodeWorldPosition(nodePosition, groupRotation, groupPosition) {
    const nodeLocalX = (nodePosition[0] - 0.5) * this.config.nodeScale
    const nodeLocalY = (nodePosition[1] - 0.5) * this.config.nodeScale
    const nodeLocalZ = ((nodePosition[2] || 0) - 0.5) * this.config.nodeScale

    // Apply group rotation
    const cos = Math.cos(groupRotation.y)
    const sin = Math.sin(groupRotation.y)

    return {
      x: nodeLocalX * cos - nodeLocalZ * sin,
      y: nodeLocalY,
      z: nodeLocalX * sin + nodeLocalZ * cos + groupPosition.z
    }
  }

  /**
   * Animate scene layout change
   */
  async animateLayoutChange(groupRef, layout, config = new AnimationConfig()) {
    if (!groupRef.current) return

    const targetZ = this.config.layoutPositions[layout]?.z || 0

    const animations = [
      this.animationService.animate(groupRef.current.position.z, targetZ, {
        ...config,
        onUpdate: (value) => { groupRef.current.position.z = value }
      }),
      this.animationService.animate(groupRef.current.rotation.x, 0, {
        ...config,
        onUpdate: (value) => { groupRef.current.rotation.x = value }
      }),
      this.animationService.animate(groupRef.current.rotation.y, 0, {
        ...config,
        onUpdate: (value) => { groupRef.current.rotation.y = value }
      }),
      this.animationService.animate(groupRef.current.rotation.z, 0, {
        ...config,
        onUpdate: (value) => { groupRef.current.rotation.z = value }
      })
    ]

    await Promise.all(animations.map(a => a.finished))
  }

  /**
   * Update scene rotation for auto-rotation
   */
  updateRotation(groupRef, rotationVelocity, delta, layout) {
    if (
      groupRef.current &&
      Math.abs(rotationVelocity) > 0.0001 &&
      layout !== 'grid'
    ) {
      groupRef.current.rotation.y += rotationVelocity * delta
    }
  }
}
