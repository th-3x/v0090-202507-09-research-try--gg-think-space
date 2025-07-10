/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CameraEntity } from '../domain/entities/Camera.js'
import { CameraUseCase } from '../domain/usecases/CameraUseCase.js'

// Mock animation service
class MockAnimationService {
  animate(from, to, options) {
    // Immediately call onUpdate with target value
    if (options.onUpdate) {
      options.onUpdate(to)
    }
    
    return {
      finished: Promise.resolve()
    }
  }
}

// Mock camera history service
class MockCameraHistoryService {
  constructor() {
    this.history = []
  }

  savePosition(cameraEntity) {
    this.history.push(cameraEntity.clone())
  }

  getPreviousPosition() {
    return this.history.pop() || null
  }

  clearHistory() {
    this.history = []
  }

  canGoBack() {
    return this.history.length > 0
  }
}

describe('CameraUseCase', () => {
  let cameraUseCase
  let mockAnimationService
  let mockHistoryService
  let mockCamera
  let mockControls

  beforeEach(() => {
    mockAnimationService = new MockAnimationService()
    mockHistoryService = new MockCameraHistoryService()
    cameraUseCase = new CameraUseCase(mockAnimationService, mockHistoryService)
    
    // Mock Three.js camera and controls
    mockCamera = {
      position: { x: 0, y: 0, z: 300 },
      set: jest.fn()
    }
    
    mockControls = {
      target: { x: 0, y: 0, z: 0 },
      set: jest.fn()
    }
  })

  describe('animateToTarget', () => {
    it('should animate camera to target position', async () => {
      const targetPosition = { x: 10, y: 20, z: 30 }
      const targetControlsTarget = { x: 5, y: 10, z: 15 }

      await cameraUseCase.animateToTarget(
        mockCamera,
        mockControls,
        targetPosition,
        targetControlsTarget
      )

      // Verify camera position was updated
      expect(mockCamera.position.x).toBe(10)
      expect(mockCamera.position.y).toBe(20)
      expect(mockCamera.position.z).toBe(30)

      // Verify controls target was updated
      expect(mockControls.target.x).toBe(5)
      expect(mockControls.target.y).toBe(10)
      expect(mockControls.target.z).toBe(15)

      // Verify final positions were set
      expect(mockCamera.set).toHaveBeenCalledWith(10, 20, 30)
      expect(mockControls.set).toHaveBeenCalledWith(5, 10, 15)
    })

    it('should save camera position to history', async () => {
      const initialPosition = new CameraEntity(mockCamera.position, mockControls.target)
      
      await cameraUseCase.animateToTarget(
        mockCamera,
        mockControls,
        { x: 10, y: 20, z: 30 },
        { x: 5, y: 10, z: 15 }
      )

      // Verify position was saved to history
      expect(mockHistoryService.history).toHaveLength(1)
      expect(mockHistoryService.history[0].position).toEqual(initialPosition.position)
      expect(mockHistoryService.history[0].target).toEqual(initialPosition.target)
    })
  })

  describe('goBackToPreviousPosition', () => {
    it('should return false when no previous position exists', async () => {
      const result = await cameraUseCase.goBackToPreviousPosition(mockCamera, mockControls)
      expect(result).toBe(false)
    })

    it('should animate to previous position when available', async () => {
      // Setup history
      const previousCamera = new CameraEntity({ x: 100, y: 200, z: 300 }, { x: 50, y: 100, z: 150 })
      mockHistoryService.savePosition(previousCamera)

      const result = await cameraUseCase.goBackToPreviousPosition(mockCamera, mockControls)

      expect(result).toBe(true)
      expect(mockCamera.position.x).toBe(100)
      expect(mockCamera.position.y).toBe(200)
      expect(mockCamera.position.z).toBe(300)
    })
  })

  describe('calculateTargetCameraPosition', () => {
    it('should calculate correct camera position', () => {
      const nodeWorldPosition = { x: 10, y: 20, z: 30 }
      const currentCameraPosition = { x: 0, y: 0, z: 100 }
      const currentControlsTarget = { x: 0, y: 0, z: 0 }
      const cameraDistance = 25

      const result = cameraUseCase.calculateTargetCameraPosition(
        nodeWorldPosition,
        currentCameraPosition,
        currentControlsTarget,
        cameraDistance
      )

      // Should maintain relative direction but at specified distance
      expect(result).toBeDefined()
      expect(typeof result.x).toBe('number')
      expect(typeof result.y).toBe('number')
      expect(typeof result.z).toBe('number')
    })

    it('should handle zero offset direction', () => {
      const nodeWorldPosition = { x: 10, y: 20, z: 30 }
      const currentCameraPosition = { x: 0, y: 0, z: 0 }
      const currentControlsTarget = { x: 0, y: 0, z: 0 }
      const cameraDistance = 25

      const result = cameraUseCase.calculateTargetCameraPosition(
        nodeWorldPosition,
        currentCameraPosition,
        currentControlsTarget,
        cameraDistance
      )

      // Should use default direction (0, 0, 1) when offset is zero
      expect(result.x).toBe(10) // nodeWorldPosition.x + 0
      expect(result.y).toBe(20) // nodeWorldPosition.y + 0  
      expect(result.z).toBe(55) // nodeWorldPosition.z + 25
    })
  })
})

// Example of how to run tests:
// npm test -- CameraUseCase.test.js
