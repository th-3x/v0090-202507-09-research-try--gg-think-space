/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimationState } from '../../domain/entities/Animation.js'

/**
 * Scene controller - handles scene interactions and state management
 */
export class SceneController {
  constructor(cameraUseCase, sceneUseCase) {
    this.cameraUseCase = cameraUseCase
    this.sceneUseCase = sceneUseCase
    this.animationState = new AnimationState()
    this.inactivityTimer = null
  }

  /**
   * Handle user interaction start
   */
  handleInteractionStart() {
    this.animationState.stopAutoRotation()
    this.clearInactivityTimer()
  }

  /**
   * Handle user interaction end
   */
  handleInteractionEnd() {
    this.restartInactivityTimer()
  }

  /**
   * Handle target image change
   */
  async handleTargetImageChange(targetImage, nodePositions, camera, controls, groupRef) {
    if (!targetImage || !nodePositions || !camera || !controls || !groupRef.current) {
      if (!targetImage) {
        this.restartInactivityTimer()
      }
      return
    }

    this.animationState.stopAutoRotation()
    this.clearInactivityTimer()

    const nodePos = nodePositions[targetImage]
    if (!nodePos) {
      console.warn(`No node position found for targetImage: ${targetImage}`)
      return
    }

    // Calculate world position of the target node
    const nodeWorldPosition = this.sceneUseCase.calculateNodeWorldPosition(
      nodePos,
      groupRef.current.rotation,
      groupRef.current.position
    )

    // Calculate target camera position
    const targetCameraPosition = this.cameraUseCase.calculateTargetCameraPosition(
      nodeWorldPosition,
      camera.position,
      controls.target,
      this.sceneUseCase.config.cameraDistance
    )

    // Animate to target
    await this.cameraUseCase.animateToTarget(
      camera,
      controls,
      targetCameraPosition,
      nodeWorldPosition
    )
  }

  /**
   * Handle layout change
   */
  async handleLayoutChange(layout, camera, controls, groupRef) {
    if (!camera || !controls) return

    // Reset camera to default position
    await this.cameraUseCase.resetToDefault(
      camera,
      controls,
      { x: 0, y: 0, z: 300 },
      { x: 0, y: 0, z: 0 }
    )

    // Animate scene layout
    if (groupRef) {
      await this.sceneUseCase.animateLayoutChange(groupRef, layout)
    }
  }

  /**
   * Handle go back action
   */
  async handleGoBack(camera, controls) {
    this.animationState.stopAutoRotation()
    this.clearInactivityTimer()

    const success = await this.cameraUseCase.goBackToPreviousPosition(camera, controls)
    return success
  }

  /**
   * Update animation frame
   */
  updateFrame(delta, groupRef, layout, controls) {
    // Update rotation velocity
    this.animationState.updateVelocity(delta)

    // Update scene rotation
    this.sceneUseCase.updateRotation(
      groupRef,
      this.animationState.rotationVelocity,
      delta,
      layout
    )

    // Update controls
    if (controls) {
      controls.update()
    }
  }

  /**
   * Restart inactivity timer
   */
  restartInactivityTimer() {
    this.clearInactivityTimer()
    this.inactivityTimer = setTimeout(() => {
      // Uncomment to enable auto-rotation after inactivity
      // this.animationState.startAutoRotation()
    }, this.animationState.inactivityTimeout)
  }

  /**
   * Clear inactivity timer
   */
  clearInactivityTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer)
      this.inactivityTimer = null
    }
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    this.clearInactivityTimer()
  }
}
