# PhotoViz Clean Architecture Refactor

This document explains the clean architecture refactor of the PhotoViz.jsx component.

## Architecture Overview

The refactored code follows Clean Architecture principles with clear separation of concerns:

```
src/
├── domain/                 # Business logic (no external dependencies)
│   ├── entities/          # Core business objects
│   │   ├── Camera.js      # Camera state and behavior
│   │   ├── Animation.js   # Animation configuration and state
│   │   └── Scene.js       # Scene configuration and state
│   ├── usecases/          # Application business rules
│   │   ├── CameraUseCase.js    # Camera operations and animations
│   │   └── SceneUseCase.js     # Scene operations and layout changes
│   └── services/          # Service interfaces (contracts)
│       ├── IAnimationService.js
│       └── ICameraHistoryService.js
├── infrastructure/        # External concerns (frameworks, libraries)
│   ├── services/         # Service implementations
│   │   ├── MotionAnimationService.js      # Motion.js animation implementation
│   │   └── ZustandCameraHistoryService.js # Zustand store implementation
│   └── di/               # Dependency injection
│       └── Container.js  # Service container
└── presentation/         # UI layer
    ├── controllers/      # UI logic controllers
    │   └── SceneController.js
    └── hooks/           # React hooks
        └── useSceneController.js
```

## Key Benefits

### 1. Separation of Concerns
- **Domain Layer**: Contains pure business logic with no external dependencies
- **Infrastructure Layer**: Handles external frameworks (Motion.js, Zustand)
- **Presentation Layer**: Manages UI interactions and React-specific code

### 2. Dependency Inversion
- High-level modules don't depend on low-level modules
- Both depend on abstractions (interfaces)
- Easy to swap implementations (e.g., replace Motion.js with another animation library)

### 3. Testability
- Business logic is isolated and can be unit tested without React/Three.js
- Services can be mocked easily using interfaces
- Controllers can be tested independently

### 4. Maintainability
- Clear boundaries between different concerns
- Changes in one layer don't affect others
- Easy to understand and modify

### 5. Reusability
- Use cases can be reused in different contexts
- Services can be shared across components
- Entities represent pure business concepts

## Usage

### Original Component
```jsx
import PhotoViz from './PhotoViz'
```

### Clean Architecture Component
```jsx
import PhotoVizClean from './PhotoViz-Clean'
```

The clean architecture version provides the same functionality with better structure.

## Key Components

### Entities
- **CameraEntity**: Represents camera state and basic operations
- **AnimationConfig/AnimationState**: Animation configuration and runtime state
- **SceneConfig/SceneState**: Scene configuration and state management

### Use Cases
- **CameraUseCase**: Handles camera animations, positioning, and history
- **SceneUseCase**: Manages scene layout changes and node positioning

### Services
- **IAnimationService**: Interface for animation operations
- **ICameraHistoryService**: Interface for camera history management
- **MotionAnimationService**: Motion.js implementation of animations
- **ZustandCameraHistoryService**: Zustand store implementation for history

### Controllers
- **SceneController**: Orchestrates interactions between use cases and UI

## Testing Strategy

### Unit Tests
```javascript
// Test entities
describe('CameraEntity', () => {
  it('should set position correctly', () => {
    const camera = new CameraEntity()
    camera.setPosition(1, 2, 3)
    expect(camera.position).toEqual({ x: 1, y: 2, z: 3 })
  })
})

// Test use cases with mocked services
describe('CameraUseCase', () => {
  it('should animate to target position', async () => {
    const mockAnimationService = new MockAnimationService()
    const mockHistoryService = new MockCameraHistoryService()
    const useCase = new CameraUseCase(mockAnimationService, mockHistoryService)
    
    // Test animation logic
  })
})
```

### Integration Tests
```javascript
// Test controllers with real services
describe('SceneController', () => {
  it('should handle target image change', async () => {
    const controller = new SceneController(cameraUseCase, sceneUseCase)
    await controller.handleTargetImageChange(targetImage, nodePositions, camera, controls, groupRef)
    // Verify camera position changed
  })
})
```

## Migration Guide

### Step 1: Install Dependencies
The clean architecture version uses the same dependencies as the original.

### Step 2: Update Imports
Replace the original PhotoViz import with the clean version:

```jsx
// Before
import PhotoViz from './PhotoViz'

// After  
import PhotoVizClean from './PhotoViz-Clean'
```

### Step 3: Test Functionality
The clean architecture version should provide identical functionality to the original.

## Future Enhancements

### 1. Add More Animation Types
```javascript
// Easy to add new animation implementations
class SpringAnimationService extends IAnimationService {
  animate(from, to, options) {
    // Spring animation implementation
  }
}
```

### 2. Implement Undo/Redo
```javascript
// Extend camera history service
class UndoRedoCameraHistoryService extends ICameraHistoryService {
  undo() { /* implementation */ }
  redo() { /* implementation */ }
}
```

### 3. Add Scene Presets
```javascript
// New use case for scene presets
class ScenePresetUseCase {
  savePreset(name, sceneState) { /* implementation */ }
  loadPreset(name) { /* implementation */ }
}
```

## Performance Considerations

- **Lazy Loading**: Services are instantiated only when needed
- **Memory Management**: Camera history is limited to 10 entries
- **Animation Optimization**: Reuses animation instances where possible
- **State Updates**: Minimizes unnecessary re-renders through proper dependency management

## Conclusion

The clean architecture refactor provides a more maintainable, testable, and scalable solution while preserving all original functionality. The separation of concerns makes it easier to understand, modify, and extend the codebase.
