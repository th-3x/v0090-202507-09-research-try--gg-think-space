# Phase 2 Backlog: Extract Features (Week 2-3)

## Overview
This backlog contains detailed tasks for Phase 2 of the clean architecture migration. The goal is to extract existing functionality into well-defined features with clear boundaries and responsibilities.

## Sprint Goals
- [ ] Extract Photo Visualization feature
- [ ] Extract AI Search feature  
- [ ] Extract Layout Management feature
- [ ] Extract Photo Gallery feature
- [ ] Implement service layer pattern
- [ ] Establish feature boundaries

---

## Epic 1: Photo Visualization Feature

### Task 1.1: Extract PhotoViz Component
**Priority:** High  
**Estimate:** 4 hours  
**Assignee:** Developer

**Description:**
Move PhotoViz.jsx to the photo-visualization feature and refactor into smaller components.

**Acceptance Criteria:**
- [ ] Move `PhotoViz.jsx` to `src/features/photo-visualization/components/`
- [ ] Rename to `PhotoVisualization.tsx`
- [ ] Extract camera controls into separate component
- [ ] Extract scene setup into separate component
- [ ] Add proper TypeScript types

**Refactoring Tasks:**
```typescript
// New components to create:
- PhotoVisualization.tsx (main container)
- CameraControls.tsx (camera interaction)
- SceneRenderer.tsx (3D scene setup)
- VisualEffects.tsx (lighting, effects)
```

### Task 1.2: Extract PhotoNode Component
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Move PhotoNode.jsx to photo-visualization feature and enhance with TypeScript.

**Acceptance Criteria:**
- [ ] Move `PhotoNode.jsx` to `src/features/photo-visualization/components/`
- [ ] Convert to TypeScript (`PhotoNode.tsx`)
- [ ] Define proper props interface
- [ ] Add component documentation

### Task 1.3: Create Visualization Services
**Priority:** High  
**Estimate:** 3 hours  
**Assignee:** Developer

**Description:**
Extract 3D visualization logic into service layer.

**Acceptance Criteria:**
- [ ] Create `VisualizationService` for scene management
- [ ] Create `CameraService` for camera positioning
- [ ] Create `EffectsService` for visual effects
- [ ] Add service interfaces and implementations

**Services to Create:**
```typescript
// src/features/photo-visualization/services/
- VisualizationService.ts
- CameraService.ts  
- EffectsService.ts
- types.ts
```

### Task 1.4: Create Visualization Hooks
**Priority:** Medium  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Create React hooks for visualization state management.

**Acceptance Criteria:**
- [ ] Create `useVisualization` hook
- [ ] Create `useCamera` hook
- [ ] Create `useSceneEffects` hook
- [ ] Integrate with existing Zustand store

**Hooks to Create:**
```typescript
// src/features/photo-visualization/hooks/
- useVisualization.ts
- useCamera.ts
- useSceneEffects.ts
```

---

## Epic 2: AI Search Feature

### Task 2.1: Extract Search Logic
**Priority:** High  
**Estimate:** 3 hours  
**Assignee:** Developer

**Description:**
Extract search-related logic from actions.js into AI search feature.

**Acceptance Criteria:**
- [ ] Move search functions from `actions.js`
- [ ] Create `SearchService` for search orchestration
- [ ] Create `AIService` for LLM communication
- [ ] Move `llm.js` to infrastructure layer

**Files to Create:**
```typescript
// src/features/ai-search/services/
- SearchService.ts
- AIService.ts (interface)
- QueryProcessor.ts
```

### Task 2.2: Create Search Components
**Priority:** High  
**Estimate:** 3 hours  
**Assignee:** Developer

**Description:**
Extract search UI components and enhance with better UX.

**Acceptance Criteria:**
- [ ] Extract search input from `App.jsx`
- [ ] Create `SearchInput` component
- [ ] Create `SearchResults` component
- [ ] Create `SearchPresets` component
- [ ] Add loading states and error handling

**Components to Create:**
```typescript
// src/features/ai-search/components/
- SearchInput.tsx
- SearchResults.tsx
- SearchPresets.tsx
- SearchStatus.tsx
```

### Task 2.3: Move Prompts to AI Search
**Priority:** Medium  
**Estimate:** 1 hour  
**Assignee:** Developer

**Description:**
Move prompts.js to AI search feature and enhance prompt management.

**Acceptance Criteria:**
- [ ] Move `prompts.js` to `src/features/ai-search/services/`
- [ ] Convert to TypeScript
- [ ] Create prompt template system
- [ ] Add prompt validation

### Task 2.4: Create Search Hooks
**Priority:** Medium  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Create React hooks for search functionality.

**Acceptance Criteria:**
- [ ] Create `useSearch` hook
- [ ] Create `useSearchHistory` hook
- [ ] Create `useSearchPresets` hook
- [ ] Integrate with search services

---

## Epic 3: Layout Management Feature

### Task 3.1: Extract Layout Logic
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Extract layout switching logic from actions.js into layout management feature.

**Acceptance Criteria:**
- [ ] Move layout functions from `actions.js`
- [ ] Create `LayoutService` for layout management
- [ ] Create `PositionService` for position calculations
- [ ] Handle sphere and grid layouts

**Services to Create:**
```typescript
// src/features/layout-management/services/
- LayoutService.ts
- PositionService.ts
- AnimationService.ts
```

### Task 3.2: Create Layout Components
**Priority:** Medium  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Extract layout controls from App.jsx and create dedicated components.

**Acceptance Criteria:**
- [ ] Extract layout buttons from `App.jsx`
- [ ] Create `LayoutControls` component
- [ ] Create `LayoutPreview` component (optional)
- [ ] Add smooth transitions between layouts

### Task 3.3: Create Layout Hooks
**Priority:** Medium  
**Estimate:** 1.5 hours  
**Assignee:** Developer

**Description:**
Create React hooks for layout management.

**Acceptance Criteria:**
- [ ] Create `useLayout` hook
- [ ] Create `useLayoutTransition` hook
- [ ] Integrate with layout services

---

## Epic 4: Photo Gallery Feature

### Task 4.1: Extract Sidebar Component
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Move Sidebar.jsx to photo-gallery feature and enhance functionality.

**Acceptance Criteria:**
- [ ] Move `Sidebar.jsx` to `src/features/photo-gallery/components/`
- [ ] Convert to TypeScript (`PhotoGallery.tsx`)
- [ ] Break down into smaller components
- [ ] Add filtering and sorting capabilities

**Components to Create:**
```typescript
// src/features/photo-gallery/components/
- PhotoGallery.tsx (main container)
- PhotoList.tsx (photo listing)
- PhotoThumbnail.tsx (individual photo)
- PhotoDetails.tsx (photo information)
- GalleryControls.tsx (filters, sorting)
```

### Task 4.2: Create Gallery Services
**Priority:** Medium  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Create services for photo gallery management.

**Acceptance Criteria:**
- [ ] Create `GalleryService` for gallery operations
- [ ] Create `PhotoService` for photo operations
- [ ] Create `FilterService` for filtering logic
- [ ] Handle photo selection and navigation

### Task 4.3: Create Gallery Hooks
**Priority:** Medium  
**Estimate:** 1.5 hours  
**Assignee:** Developer

**Description:**
Create React hooks for gallery functionality.

**Acceptance Criteria:**
- [ ] Create `useGallery` hook
- [ ] Create `usePhotoSelection` hook
- [ ] Create `usePhotoFilters` hook

---

## Epic 5: Feature Integration

### Task 5.1: Update App Component
**Priority:** High  
**Estimate:** 3 hours  
**Assignee:** Developer

**Description:**
Refactor App.jsx to use new feature components.

**Acceptance Criteria:**
- [ ] Remove extracted logic from `App.jsx`
- [ ] Import and use new feature components
- [ ] Maintain existing functionality
- [ ] Clean up unused imports and code

**New App Structure:**
```typescript
// App.tsx should only contain:
- Feature component imports
- Layout composition
- Global state providers
- Error boundaries
```

### Task 5.2: Create Feature Exports
**Priority:** High  
**Estimate:** 1 hour  
**Assignee:** Developer

**Description:**
Define public APIs for each feature through index files.

**Acceptance Criteria:**
- [ ] Update each feature's `index.ts`
- [ ] Export only public components and hooks
- [ ] Hide internal implementation details
- [ ] Add JSDoc documentation

### Task 5.3: Update Actions File
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Refactor actions.js to coordinate between features.

**Acceptance Criteria:**
- [ ] Remove logic moved to features
- [ ] Keep only cross-feature coordination
- [ ] Update function signatures
- [ ] Maintain backward compatibility

---

## Epic 6: Testing & Validation

### Task 6.1: Feature Unit Tests
**Priority:** Medium  
**Estimate:** 4 hours  
**Assignee:** Developer

**Description:**
Create unit tests for each feature's services and components.

**Acceptance Criteria:**
- [ ] Test all service methods
- [ ] Test component rendering
- [ ] Test hook behavior
- [ ] Mock external dependencies

### Task 6.2: Integration Testing
**Priority:** Medium  
**Estimate:** 3 hours  
**Assignee:** Developer

**Description:**
Test feature interactions and complete workflows.

**Acceptance Criteria:**
- [ ] Test search workflow
- [ ] Test layout switching
- [ ] Test photo selection
- [ ] Test 3D visualization

### Task 6.3: Performance Testing
**Priority:** Low  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Ensure no performance regression after refactoring.

**Acceptance Criteria:**
- [ ] Measure render times
- [ ] Check memory usage
- [ ] Test with large datasets
- [ ] Profile 3D performance

---

## Definition of Done

### Phase 2 Completion Criteria:
- [ ] All features extracted and working independently
- [ ] Service layer implemented for each feature
- [ ] Components properly typed with TypeScript
- [ ] Feature boundaries clearly defined
- [ ] All existing functionality preserved
- [ ] No performance regression
- [ ] Unit tests for critical paths

### Testing Checklist:
- [ ] All features work as before
- [ ] Search functionality intact
- [ ] 3D visualization working
- [ ] Layout switching functional
- [ ] Photo gallery operational
- [ ] No console errors
- [ ] TypeScript compilation clean

### Deliverables:
1. Photo Visualization feature (complete)
2. AI Search feature (complete)
3. Layout Management feature (complete)
4. Photo Gallery feature (complete)
5. Updated App component
6. Feature integration tests
7. Performance validation

---

## Risk Mitigation

### Potential Issues:
1. **State management complexity** - Carefully manage state between features
2. **Component coupling** - Ensure loose coupling between features
3. **Performance impact** - Monitor 3D rendering performance
4. **TypeScript migration** - Handle type definitions carefully

### Rollback Plan:
- Maintain feature flags for gradual rollout
- Keep original components until fully tested
- Use git branches for each feature extraction

---

## Next Phase Preview:
Phase 3 will focus on refactoring state management to be feature-specific and implementing cross-feature communication patterns.
