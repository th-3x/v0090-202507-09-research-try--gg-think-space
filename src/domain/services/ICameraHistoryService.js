/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Camera history service interface
 */
export class ICameraHistoryService {
  /**
   * Save camera position to history
   * @param {CameraEntity} cameraEntity - Camera state to save
   */
  savePosition(cameraEntity) {
    throw new Error('savePosition method must be implemented')
  }

  /**
   * Get previous camera position
   * @returns {CameraEntity|null} Previous camera position or null if none exists
   */
  getPreviousPosition() {
    throw new Error('getPreviousPosition method must be implemented')
  }

  /**
   * Clear camera history
   */
  clearHistory() {
    throw new Error('clearHistory method must be implemented')
  }

  /**
   * Check if can go back
   * @returns {boolean} True if can go back to previous position
   */
  canGoBack() {
    throw new Error('canGoBack method must be implemented')
  }
}
