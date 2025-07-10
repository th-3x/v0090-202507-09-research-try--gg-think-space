# Phase 3 Backlog: State Management Refactor (Week 4)

## Overview
This backlog contains detailed tasks for Phase 3 of the clean architecture migration. The goal is to refactor the monolithic Zustand store into feature-specific stores while maintaining clean boundaries and implementing proper cross-feature communication.

## Sprint Goals
- [ ] Split monolithic store into feature-specific stores
- [ ] Implement store composition patterns
- [ ] Create cross-feature communication system
- [ ] Establish state management boundaries
- [ ] Maintain backward compatibility during transition
- [ ] Optimize performance and memory usage

---

## Epic 1: Feature Store Architecture

### Task 1.1: Analyze Current Store Structure
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Analyze the current monolithic store.js to understand state dependencies and plan the split.

**Acceptance Criteria:**
- [ ] Document all state properties and their usage
- [ ] Map state properties to features
- [ ] Identify cross-feature dependencies
- [ ] Create state migration plan
- [ ] Document shared state requirements

**Current Store Analysis:**
```javascript
// Current store.js properties to analyze:
- didInit: boolean
- images: Image[]
- layout: string
- layouts: Record<string, Layout>
- nodePositions: Record<string, Position>
- highlightNodes: string[]
- isFetching: boolean
- isSidebarOpen: boolean
- xRayMode: boolean
- targetImage: string
- caption: string
- resetCam: boolean
- cameraHistory: CameraPosition[]
- canGoBack: boolean
- triggerGoBack: number
```

### Task 1.2: Design Store Architecture
**Priority:** High  
**Estimate:** 3 hours  
**Assignee:** Developer

**Description:**
Design the new store architecture with feature-specific stores and shared state.

**Acceptance Criteria:**
- [ ] Define store interfaces for each feature
- [ ] Design shared state structure
- [ ] Plan store composition strategy
- [ ] Define cross-feature communication patterns
- [ ] Create store dependency diagram

**Store Architecture Design:**
```typescript
// Feature Stores:
- PhotoVisualizationStore (nodePositions, resetCam, xRayMode)
- AISearchStore (isFetching, highlightNodes, caption)
- LayoutManagementStore (layout, layouts)
- PhotoGalleryStore (images, targetImage, isSidebarOpen)
- CameraStore (cameraHistory, canGoBack, triggerGoBack)

// Shared Store:
- AppStore (didInit, global app state)
```

---

## Epic 2: Photo Visualization Store

### Task 2.1: Create Photo Visualization Store
**Priority:** High  
**Estimate:** 3 hours  
**Assignee:** Developer

**Description:**
Extract photo visualization related state into a dedicated feature store.

**Acceptance Criteria:**
- [ ] Create `PhotoVisualizationStore` with Zustand
- [ ] Move `nodePositions`, `resetCam`, `xRayMode` from main store
- [ ] Implement store actions for visualization state
- [ ] Add TypeScript interfaces
- [ ] Create store hooks for components

**Files to Create:**
```typescript
// src/features/photo-visualization/store/
- PhotoVisualizationStore.ts
- types.ts
- hooks.ts
- index.ts
```

**Store Interface:**
```typescript
interface PhotoVisualizationState {
  nodePositions: Record<string, Position> | null;
  resetCam: boolean;
  xRayMode: boolean;
  
  // Actions
  setNodePositions: (positions: Record<string, Position>) => void;
  setResetCam: (reset: boolean) => void;
  setXRayMode: (enabled: boolean) => void;
  resetVisualization: () => void;
}
```

### Task 2.2: Create Camera Store
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Extract camera-related state into a separate store for better organization.

**Acceptance Criteria:**
- [ ] Create `CameraStore` for camera state management
- [ ] Move `cameraHistory`, `canGoBack`, `triggerGoBack`
- [ ] Implement camera navigation actions
- [ ] Add camera position tracking
- [ ] Create camera hooks

**Store Interface:**
```typescript
interface CameraState {
  cameraHistory: CameraPosition[];
  canGoBack: boolean;
  triggerGoBack: number | null;
  
  // Actions
  saveCameraPosition: (position: CameraPosition) => void;
  goBackToPreviousPosition: () => void;
  clearHistory: () => void;
}
```

### Task 2.3: Update Visualization Components
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Update photo visualization components to use the new feature stores.

**Acceptance Criteria:**
- [ ] Update PhotoVisualization component imports
- [ ] Replace global store usage with feature stores
- [ ] Update PhotoNode component state access
- [ ] Test camera controls with new store
- [ ] Ensure no breaking changes

---

## Epic 3: AI Search Store

### Task 3.1: Create AI Search Store
**Priority:** High  
**Estimate:** 3 hours  
**Assignee:** Developer

**Description:**
Extract AI search related state into a dedicated feature store.

**Acceptance Criteria:**
- [ ] Create `AISearchStore` with search state
- [ ] Move `isFetching`, `highlightNodes`, `caption`
- [ ] Implement search actions and state management
- [ ] Add search history functionality
- [ ] Create search preset management

**Store Interface:**
```typescript
interface AISearchState {
  isFetching: boolean;
  highlightNodes: string[] | null;
  caption: string | null;
  searchHistory: SearchQuery[];
  currentQuery: string;
  
  // Actions
  setFetching: (fetching: boolean) => void;
  setHighlightNodes: (nodes: string[]) => void;
  setCaption: (caption: string) => void;
  addToHistory: (query: SearchQuery) => void;
  clearSearch: () => void;
}
```

### Task 3.2: Implement Search State Management
**Priority:** Medium  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Enhance search store with advanced state management features.

**Acceptance Criteria:**
- [ ] Add search result caching
- [ ] Implement search debouncing
- [ ] Add error state management
- [ ] Create search analytics tracking
- [ ] Add search suggestions state

### Task 3.3: Update Search Components
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Update AI search components to use the new search store.

**Acceptance Criteria:**
- [ ] Update SearchInput component
- [ ] Update SearchResults component
- [ ] Update SearchPresets component
- [ ] Replace actions.js search functions
- [ ] Test search functionality

---

## Epic 4: Layout Management Store

### Task 4.1: Create Layout Management Store
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Extract layout management state into a dedicated feature store.

**Acceptance Criteria:**
- [ ] Create `LayoutManagementStore`
- [ ] Move `layout`, `layouts` from main store
- [ ] Implement layout switching actions
- [ ] Add layout transition state
- [ ] Create layout persistence

**Store Interface:**
```typescript
interface LayoutManagementState {
  currentLayout: string;
  layouts: Record<string, Layout>;
  isTransitioning: boolean;
  transitionProgress: number;
  
  // Actions
  setLayout: (layout: string) => void;
  addLayout: (name: string, layout: Layout) => void;
  setTransitioning: (transitioning: boolean) => void;
  updateTransitionProgress: (progress: number) => void;
}
```

### Task 4.2: Implement Layout Transitions
**Priority:** Medium  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Add smooth transition state management for layout changes.

**Acceptance Criteria:**
- [ ] Add transition state tracking
- [ ] Implement progress monitoring
- [ ] Add transition cancellation
- [ ] Create transition presets
- [ ] Add transition callbacks

### Task 4.3: Update Layout Components
**Priority:** High  
**Estimate:** 1 hour  
**Assignee:** Developer

**Description:**
Update layout management components to use the new store.

**Acceptance Criteria:**
- [ ] Update LayoutControls component
- [ ] Replace layout actions from actions.js
- [ ] Test layout switching functionality
- [ ] Ensure smooth transitions

---

## Epic 5: Photo Gallery Store

### Task 5.1: Create Photo Gallery Store
**Priority:** High  
**Estimate:** 2.5 hours  
**Assignee:** Developer

**Description:**
Extract photo gallery state into a dedicated feature store.

**Acceptance Criteria:**
- [ ] Create `PhotoGalleryStore`
- [ ] Move `images`, `targetImage`, `isSidebarOpen`
- [ ] Implement gallery navigation actions
- [ ] Add photo filtering state
- [ ] Create photo selection management

**Store Interface:**
```typescript
interface PhotoGalleryState {
  images: Image[] | null;
  targetImage: string | null;
  isSidebarOpen: boolean;
  selectedImages: string[];
  filters: PhotoFilters;
  sortBy: SortOption;
  
  // Actions
  setImages: (images: Image[]) => void;
  setTargetImage: (imageId: string) => void;
  toggleSidebar: () => void;
  selectImage: (imageId: string) => void;
  setFilters: (filters: PhotoFilters) => void;
  setSortBy: (sortBy: SortOption) => void;
}
```

### Task 5.2: Implement Gallery Features
**Priority:** Medium  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Add advanced gallery features to the store.

**Acceptance Criteria:**
- [ ] Add photo filtering logic
- [ ] Implement sorting functionality
- [ ] Add multi-selection support
- [ ] Create gallery view modes
- [ ] Add photo metadata caching

### Task 5.3: Update Gallery Components
**Priority:** High  
**Estimate:** 1.5 hours  
**Assignee:** Developer

**Description:**
Update photo gallery components to use the new store.

**Acceptance Criteria:**
- [ ] Update PhotoGallery component
- [ ] Update PhotoList component
- [ ] Update PhotoThumbnail component
- [ ] Replace sidebar actions
- [ ] Test gallery functionality

---

## Epic 6: Store Composition & Integration

### Task 6.1: Create Store Composition Layer
**Priority:** High  
**Estimate:** 3 hours  
**Assignee:** Developer

**Description:**
Create a composition layer that combines all feature stores.

**Acceptance Criteria:**
- [ ] Create `StoreProvider` component
- [ ] Implement store composition pattern
- [ ] Add store dependency injection
- [ ] Create unified store hooks
- [ ] Add store debugging tools

**Files to Create:**
```typescript
// src/app/store/
- StoreProvider.tsx
- useStores.ts
- storeComposition.ts
- types.ts
```

### Task 6.2: Implement Cross-Feature Communication
**Priority:** High  
**Estimate:** 4 hours  
**Assignee:** Developer

**Description:**
Create a system for features to communicate without tight coupling.

**Acceptance Criteria:**
- [ ] Create event bus for cross-feature communication
- [ ] Implement store subscriptions
- [ ] Add feature event types
- [ ] Create communication middleware
- [ ] Add event debugging

**Communication Patterns:**
```typescript
// Event-based communication
- SearchResultsEvent (AI Search → Photo Visualization)
- LayoutChangeEvent (Layout Management → Photo Visualization)
- PhotoSelectionEvent (Photo Gallery → Photo Visualization)
- CameraPositionEvent (Photo Visualization → Camera Store)
```

### Task 6.3: Create Shared State Management
**Priority:** Medium  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Manage truly shared state that doesn't belong to any specific feature.

**Acceptance Criteria:**
- [ ] Create `AppStore` for global state
- [ ] Move `didInit` to app store
- [ ] Add global loading states
- [ ] Create app-wide error handling
- [ ] Add global configuration state

---

## Epic 7: Migration & Compatibility

### Task 7.1: Create Migration Strategy
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Plan and implement gradual migration from monolithic to feature stores.

**Acceptance Criteria:**
- [ ] Create store migration utilities
- [ ] Implement backward compatibility layer
- [ ] Add feature flags for store migration
- [ ] Create rollback mechanisms
- [ ] Document migration steps

### Task 7.2: Update App Component
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Update the main App component to use the new store architecture.

**Acceptance Criteria:**
- [ ] Wrap App with StoreProvider
- [ ] Update component imports
- [ ] Replace global store usage
- [ ] Test all functionality
- [ ] Ensure no regressions

### Task 7.3: Deprecate Old Store
**Priority:** Medium  
**Estimate:** 1 hour  
**Assignee:** Developer

**Description:**
Safely deprecate the old monolithic store.

**Acceptance Criteria:**
- [ ] Mark old store as deprecated
- [ ] Add migration warnings
- [ ] Update documentation
- [ ] Plan removal timeline
- [ ] Create cleanup tasks

---

## Epic 8: Performance & Optimization

### Task 8.1: Optimize Store Performance
**Priority:** Medium  
**Estimate:** 3 hours  
**Assignee:** Developer

**Description:**
Optimize the new store architecture for performance.

**Acceptance Criteria:**
- [ ] Implement store memoization
- [ ] Add selective subscriptions
- [ ] Optimize re-render patterns
- [ ] Add performance monitoring
- [ ] Create performance benchmarks

### Task 8.2: Implement Store Persistence
**Priority:** Low  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Add persistence for relevant store state.

**Acceptance Criteria:**
- [ ] Add localStorage persistence
- [ ] Implement state hydration
- [ ] Add persistence configuration
- [ ] Handle migration of persisted state
- [ ] Add persistence debugging

---

## Definition of Done

### Phase 3 Completion Criteria:
- [ ] All feature stores implemented and tested
- [ ] Store composition layer working
- [ ] Cross-feature communication established
- [ ] Migration completed without regressions
- [ ] Performance optimized
- [ ] Documentation updated
- [ ] All existing functionality preserved

### Testing Checklist:
- [ ] All features work with new stores
- [ ] Cross-feature interactions functional
- [ ] No memory leaks in store subscriptions
- [ ] Performance meets or exceeds baseline
- [ ] Store state properly synchronized
- [ ] Error handling works correctly

### Deliverables:
1. Feature-specific stores for all 4 features
2. Store composition and provider system
3. Cross-feature communication system
4. Migration utilities and documentation
5. Performance optimizations
6. Updated App component
7. Comprehensive testing

---

## Risk Mitigation

### Potential Issues:
1. **State synchronization** - Ensure proper event handling
2. **Performance regression** - Monitor re-render patterns
3. **Memory leaks** - Proper subscription cleanup
4. **Complex debugging** - Add store debugging tools

### Rollback Plan:
- Feature flags for gradual rollout
- Backward compatibility layer
- Keep old store until fully migrated
- Comprehensive testing at each step

---

## Next Phase Preview:
Phase 4 will focus on comprehensive testing, documentation, and final optimizations to complete the clean architecture migration.
