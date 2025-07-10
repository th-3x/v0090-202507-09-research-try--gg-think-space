/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Camera entity - represents camera state and behavior
 */
export class CameraEntity {
  constructor(position = { x: 0, y: 0, z: 300 }, target = { x: 0, y: 0, z: 0 }) {
    this.position = { ...position }
    this.target = { ...target }
  }

  setPosition(x, y, z) {
    this.position = { x, y, z }
  }

  setTarget(x, y, z) {
    this.target = { x, y, z }
  }

  clone() {
    return new CameraEntity(
      { ...this.position },
      { ...this.target }
    )
  }

  equals(other) {
    return (
      this.position.x === other.position.x &&
      this.position.y === other.position.y &&
      this.position.z === other.position.z &&
      this.target.x === other.target.x &&
      this.target.y === other.target.y &&
      this.target.z === other.target.z
    )
  }
}
