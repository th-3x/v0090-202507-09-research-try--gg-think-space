/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionAnimationService } from '../services/MotionAnimationService.js'
import { ZustandCameraHistoryService } from '../services/ZustandCameraHistoryService.js'
import { CameraUseCase } from '../../domain/usecases/CameraUseCase.js'
import { SceneUseCase } from '../../domain/usecases/SceneUseCase.js'
import { SceneController } from '../../presentation/controllers/SceneController.js'

/**
 * Dependency injection container
 */
export class Container {
  constructor(store) {
    this.store = store
    this._services = new Map()
    this._setupServices()
  }

  _setupServices() {
    // Infrastructure services
    this._services.set('animationService', new MotionAnimationService())
    this._services.set('cameraHistoryService', new ZustandCameraHistoryService(this.store))

    // Use cases
    this._services.set('cameraUseCase', new CameraUseCase(
      this.get('animationService'),
      this.get('cameraHistoryService')
    ))
    this._services.set('sceneUseCase', new SceneUseCase(
      this.get('animationService')
    ))

    // Controllers
    this._services.set('sceneController', new SceneController(
      this.get('cameraUseCase'),
      this.get('sceneUseCase')
    ))
  }

  get(serviceName) {
    const service = this._services.get(serviceName)
    if (!service) {
      throw new Error(`Service ${serviceName} not found`)
    }
    return service
  }

  getSceneController() {
    return this.get('sceneController')
  }
}
