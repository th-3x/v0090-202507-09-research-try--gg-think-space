/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Scene configuration entity
 */
export class SceneConfig {
  constructor() {
    this.cameraDistance = 25
    this.nodeScale = 600
    this.layoutPositions = {
      sphere: { z: 0 },
      cluster3d: { z: -300 },
      grid: { z: 150 }
    }
    this.defaultCameraPosition = [0, 0, 300]
    this.defaultControlsTarget = [0, 0, 0]
  }
}

/**
 * Scene state entity
 */
export class SceneState {
  constructor() {
    this.groupPosition = { x: 0, y: 0, z: 0 }
    this.groupRotation = { x: 0, y: 0, z: 0 }
  }

  setGroupPosition(x, y, z) {
    this.groupPosition = { x, y, z }
  }

  setGroupRotation(x, y, z) {
    this.groupRotation = { x, y, z }
  }

  resetRotation() {
    this.groupRotation = { x: 0, y: 0, z: 0 }
  }
}
