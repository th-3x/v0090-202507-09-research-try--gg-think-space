/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ICameraHistoryService } from '../../domain/services/ICameraHistoryService.js'
import { CameraEntity } from '../../domain/entities/Camera.js'

/**
 * Zustand store implementation of camera history service
 */
export class ZustandCameraHistoryService extends ICameraHistoryService {
  constructor(store) {
    super()
    this.store = store
  }

  savePosition(cameraEntity) {
    this.store.setState(state => {
      const newHistoryEntry = {
        cameraPosition: { ...cameraEntity.position },
        controlsTarget: { ...cameraEntity.target },
        timestamp: Date.now()
      }

      // Keep only the last 10 positions to avoid memory issues
      state.cameraHistory = [...state.cameraHistory, newHistoryEntry].slice(-10)
      state.canGoBack = state.cameraHistory.length > 0
    })
  }

  getPreviousPosition() {
    const state = this.store.getState()
    if (state.cameraHistory.length === 0) {
      return null
    }

    const previousEntry = state.cameraHistory[state.cameraHistory.length - 1]
    
    // Remove the last position from history
    this.store.setState(state => {
      state.cameraHistory = state.cameraHistory.slice(0, -1)
      state.canGoBack = state.cameraHistory.length > 0
      state.targetImage = null // Clear any selected image
    })

    return new CameraEntity(
      previousEntry.cameraPosition,
      previousEntry.controlsTarget
    )
  }

  clearHistory() {
    this.store.setState(state => {
      state.cameraHistory = []
      state.canGoBack = false
    })
  }

  canGoBack() {
    return this.store.getState().canGoBack
  }
}
