# Clean Architecture Implementation Plan for Reflector Codebase

## Overview
This document outlines the plan to refactor the current Thinking Space AI Studio App (reflector codebase) from a flat structure to a clean architecture with a features layer. The current codebase is a React-based 3D photo visualization app with AI integration.

## Current Architecture Analysis

### Current Structure
```
├── App.jsx              # Main app component
├── PhotoViz.jsx         # 3D visualization component
├── PhotoNode.jsx        # Individual photo node component
├── Sidebar.jsx          # Sidebar component
├── store.js             # Zustand state management
├── actions.js           # Business logic actions
├── llm.js               # AI/LLM integration
├── prompts.js           # AI prompts
├── index.tsx            # App entry point
└── public/              # Static assets (JSON data, images)
```

### Current Issues
- **Flat structure**: All components and logic in root directory
- **Mixed concerns**: UI, business logic, and data access intermingled
- **Tight coupling**: Direct dependencies between UI and business logic
- **No clear boundaries**: Features not clearly separated
- **Hard to test**: Business logic tightly coupled to UI components
- **Difficult to scale**: Adding new features requires touching multiple files

## Target Clean Architecture

### Architecture Layers
```
src/
├── app/                 # Application layer
├── features/            # Features layer (main focus)
├── shared/              # Shared utilities and components
├── infrastructure/      # External concerns (APIs, storage)
└── main.tsx            # Application entry point
```

### Features Layer Structure
```
src/features/
├── photo-visualization/     # 3D photo display and interaction
│   ├── components/         # UI components
│   ├── hooks/             # React hooks
│   ├── services/          # Business logic
│   ├── types/             # TypeScript types
│   └── index.ts           # Public API
├── ai-search/              # AI-powered search functionality
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── index.ts
├── layout-management/      # Layout switching (sphere, grid)
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── index.ts
└── photo-gallery/          # Photo listing and selection
    ├── components/
    ├── hooks/
    ├── services/
    ├── types/
    └── index.ts
```

## Implementation Plan

### Phase 1: Setup Infrastructure (Week 1)
1. **Create directory structure**
   - Set up the new folder hierarchy
   - Configure TypeScript path aliases
   - Update build configuration

2. **Establish shared utilities**
   - Move common utilities to `src/shared/`
   - Create shared types and interfaces
   - Set up shared UI components

3. **Infrastructure layer**
   - Move API calls to `src/infrastructure/`
   - Create data access abstractions
   - Set up external service interfaces

### Phase 2: Extract Features (Week 2-3)
1. **Photo Visualization Feature**
   - Extract PhotoViz.jsx and PhotoNode.jsx
   - Create visualization service layer
   - Implement camera control hooks
   - Define visualization types

2. **AI Search Feature**
   - Extract search-related logic from actions.js
   - Move LLM integration to feature service
   - Create search UI components
   - Implement search state management

3. **Layout Management Feature**
   - Extract layout switching logic
   - Create layout calculation services
   - Implement layout transition animations
   - Define layout types and interfaces

4. **Photo Gallery Feature**
   - Extract Sidebar.jsx functionality
   - Create photo listing components
   - Implement photo selection logic
   - Add photo metadata management

### Phase 3: State Management Refactor (Week 4)
1. **Feature-specific stores**
   - Split monolithic store into feature stores
   - Implement store composition
   - Create store interfaces

2. **Cross-feature communication**
   - Implement event system for feature communication
   - Create shared state for cross-cutting concerns
   - Define feature boundaries and contracts

### Phase 4: Testing & Documentation (Week 5)
1. **Unit testing**
   - Test feature services independently
   - Test UI components in isolation
   - Mock external dependencies

2. **Integration testing**
   - Test feature interactions
   - Test complete user workflows
   - Performance testing

3. **Documentation**
   - Document feature APIs
   - Create development guidelines
   - Update README and developer guides

## Detailed Feature Breakdown

### Photo Visualization Feature
**Responsibilities:**
- 3D scene rendering and management
- Camera controls and animations
- Photo node positioning and layout
- Visual effects (x-ray mode, highlighting)

**Components:**
- `PhotoVisualization` (main container)
- `PhotoNode` (individual photo display)
- `CameraControls` (camera interaction)
- `SceneEffects` (visual effects)

**Services:**
- `VisualizationService` (3D scene management)
- `CameraService` (camera positioning)
- `LayoutService` (node positioning)
- `EffectsService` (visual effects)

### AI Search Feature
**Responsibilities:**
- Query processing and validation
- AI/LLM communication
- Search result processing
- Search history management

**Components:**
- `SearchInput` (search interface)
- `SearchResults` (result display)
- `SearchPresets` (preset queries)

**Services:**
- `SearchService` (search orchestration)
- `AIService` (LLM communication)
- `QueryService` (query processing)

### Layout Management Feature
**Responsibilities:**
- Layout calculation and switching
- Position interpolation
- Layout persistence
- Custom layout creation

**Components:**
- `LayoutControls` (layout switching UI)
- `LayoutPreview` (layout visualization)

**Services:**
- `LayoutService` (layout management)
- `PositionService` (position calculations)
- `AnimationService` (layout transitions)

### Photo Gallery Feature
**Responsibilities:**
- Photo listing and filtering
- Photo metadata display
- Photo selection and navigation
- Gallery state management

**Components:**
- `PhotoGallery` (main gallery)
- `PhotoList` (photo listing)
- `PhotoDetails` (photo information)
- `PhotoThumbnail` (thumbnail display)

**Services:**
- `GalleryService` (gallery management)
- `PhotoService` (photo operations)
- `FilterService` (filtering logic)

## Migration Strategy

### Step-by-step Migration
1. **Parallel development**: Build new structure alongside existing code
2. **Feature-by-feature migration**: Migrate one feature at a time
3. **Gradual replacement**: Replace old components with new ones
4. **Testing at each step**: Ensure functionality remains intact
5. **Clean up**: Remove old code after successful migration

### Risk Mitigation
- **Maintain backward compatibility** during migration
- **Comprehensive testing** at each migration step
- **Feature flags** to enable/disable new features
- **Rollback plan** if issues arise
- **Performance monitoring** throughout migration

## Benefits of New Architecture

### Developer Experience
- **Clear separation of concerns**
- **Easier to understand and navigate**
- **Better code reusability**
- **Simplified testing**
- **Faster development of new features**

### Maintainability
- **Isolated feature changes**
- **Reduced coupling between features**
- **Clear dependency management**
- **Easier debugging and troubleshooting**

### Scalability
- **Easy to add new features**
- **Team can work on different features independently**
- **Better code organization for large teams**
- **Clearer API boundaries**

## Success Metrics
- **Code organization**: Clear feature boundaries
- **Test coverage**: >80% coverage for all features
- **Performance**: No regression in app performance
- **Developer velocity**: Faster feature development
- **Bug reduction**: Fewer cross-feature bugs

## Timeline Summary
- **Week 1**: Infrastructure setup
- **Week 2-3**: Feature extraction and implementation
- **Week 4**: State management refactor
- **Week 5**: Testing and documentation
- **Total**: 5 weeks for complete migration

This plan provides a structured approach to transforming the reflector codebase into a maintainable, scalable architecture while preserving all existing functionality.
