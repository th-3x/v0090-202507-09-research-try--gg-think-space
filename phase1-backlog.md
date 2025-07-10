# Phase 1 Backlog: Setup Infrastructure (Week 1)

## Overview
This backlog contains detailed tasks for Phase 1 of the clean architecture migration. The goal is to establish the foundational infrastructure for the features-based architecture.

## Sprint Goals
- [ ] Create new directory structure
- [ ] Configure build system and TypeScript
- [ ] Establish shared utilities and components
- [ ] Set up infrastructure layer
- [ ] Prepare for feature extraction

---

## Epic 1: Directory Structure Setup

### Task 1.1: Create Core Directory Structure
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Create the new folder hierarchy for clean architecture implementation.

**Acceptance Criteria:**
- [ ] Create `src/` directory as new root
- [ ] Create `src/app/` for application layer
- [ ] Create `src/features/` for features layer
- [ ] Create `src/shared/` for shared utilities
- [ ] Create `src/infrastructure/` for external concerns
- [ ] Move `index.tsx` to `src/main.tsx`

**Tasks:**
```bash
mkdir -p src/app
mkdir -p src/features
mkdir -p src/shared/{components,hooks,utils,types}
mkdir -p src/infrastructure/{api,storage,external}
mv index.tsx src/main.tsx
```

### Task 1.2: Create Feature Directories
**Priority:** High  
**Estimate:** 1 hour  
**Assignee:** Developer

**Description:**
Set up the directory structure for each identified feature.

**Acceptance Criteria:**
- [ ] Create `src/features/photo-visualization/` with subdirectories
- [ ] Create `src/features/ai-search/` with subdirectories
- [ ] Create `src/features/layout-management/` with subdirectories
- [ ] Create `src/features/photo-gallery/` with subdirectories
- [ ] Each feature has: `components/`, `hooks/`, `services/`, `types/`, `index.ts`

**Tasks:**
```bash
# For each feature: photo-visualization, ai-search, layout-management, photo-gallery
mkdir -p src/features/{feature-name}/{components,hooks,services,types}
touch src/features/{feature-name}/index.ts
```

---

## Epic 2: Build Configuration

### Task 2.1: Update TypeScript Configuration
**Priority:** High  
**Estimate:** 1 hour  
**Assignee:** Developer

**Description:**
Configure TypeScript path aliases and update build settings for new structure.

**Acceptance Criteria:**
- [ ] Update `tsconfig.json` with path aliases for new structure
- [ ] Add aliases for `@/app/*`, `@/features/*`, `@/shared/*`, `@/infrastructure/*`
- [ ] Update `baseUrl` to point to `src/`
- [ ] Ensure all existing imports still work

**Implementation:**
```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@/app/*": ["./app/*"],
      "@/features/*": ["./features/*"],
      "@/shared/*": ["./shared/*"],
      "@/infrastructure/*": ["./infrastructure/*"]
    }
  }
}
```

### Task 2.2: Update Vite Configuration
**Priority:** High  
**Estimate:** 30 minutes  
**Assignee:** Developer

**Description:**
Update Vite configuration to work with new directory structure.

**Acceptance Criteria:**
- [ ] Update `vite.config.ts` resolve aliases
- [ ] Ensure build process works with new structure
- [ ] Update entry point to `src/main.tsx`
- [ ] Test dev server starts correctly

**Implementation:**
```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/app': path.resolve(__dirname, './src/app'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/infrastructure': path.resolve(__dirname, './src/infrastructure')
    }
  }
})
```

---

## Epic 3: Shared Utilities Layer

### Task 3.1: Create Shared Types
**Priority:** Medium  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Extract and define shared TypeScript types and interfaces.

**Acceptance Criteria:**
- [ ] Create `src/shared/types/index.ts`
- [ ] Define core domain types (Image, Layout, Position, etc.)
- [ ] Define common UI types (ComponentProps, EventHandlers, etc.)
- [ ] Export all types from shared index

**Types to Define:**
```typescript
// Core domain types
export interface Image {
  id: string;
  description: string;
  url?: string;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Layout {
  name: string;
  positions: Record<string, Position>;
}

// UI types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}
```

### Task 3.2: Create Shared Utilities
**Priority:** Medium  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Extract common utility functions to shared layer.

**Acceptance Criteria:**
- [ ] Create `src/shared/utils/index.ts`
- [ ] Move common utility functions (if any exist)
- [ ] Create utility functions for common operations
- [ ] Add proper TypeScript types for all utilities

**Utilities to Create:**
- String manipulation helpers
- Array/object utilities
- Math/calculation helpers
- Validation functions

### Task 3.3: Create Shared UI Components
**Priority:** Low  
**Estimate:** 3 hours  
**Assignee:** Developer

**Description:**
Create reusable UI components that can be shared across features.

**Acceptance Criteria:**
- [ ] Create `src/shared/components/` directory
- [ ] Create basic UI components (Button, Input, Modal, etc.)
- [ ] Add proper TypeScript props interfaces
- [ ] Create component index file for exports

**Components to Create:**
- `Button` - Reusable button component
- `Input` - Styled input component
- `Modal` - Modal dialog component
- `Spinner` - Loading spinner component

---

## Epic 4: Infrastructure Layer

### Task 4.1: Create API Abstraction Layer
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Move external API calls to infrastructure layer with proper abstractions.

**Acceptance Criteria:**
- [ ] Create `src/infrastructure/api/` directory
- [ ] Move LLM API calls from `llm.js` to infrastructure
- [ ] Create API client interfaces
- [ ] Add error handling and retry logic

**Files to Create:**
- `src/infrastructure/api/llm-client.ts`
- `src/infrastructure/api/data-client.ts`
- `src/infrastructure/api/types.ts`

### Task 4.2: Create Data Access Layer
**Priority:** Medium  
**Estimate:** 1.5 hours  
**Assignee:** Developer

**Description:**
Abstract data loading and caching mechanisms.

**Acceptance Criteria:**
- [ ] Create `src/infrastructure/storage/` directory
- [ ] Abstract JSON data loading from public folder
- [ ] Create data repository interfaces
- [ ] Add caching mechanisms

**Files to Create:**
- `src/infrastructure/storage/data-repository.ts`
- `src/infrastructure/storage/cache.ts`

---

## Epic 5: Migration Preparation

### Task 5.1: Create Feature Index Files
**Priority:** Medium  
**Estimate:** 1 hour  
**Assignee:** Developer

**Description:**
Create index files for each feature to define public APIs.

**Acceptance Criteria:**
- [ ] Create `index.ts` in each feature directory
- [ ] Define public API exports (components, hooks, services)
- [ ] Add TypeScript re-exports
- [ ] Document feature boundaries

**Template for Feature Index:**
```typescript
// src/features/{feature-name}/index.ts
export * from './components';
export * from './hooks';
export * from './services';
export * from './types';
```

### Task 5.2: Update Import Statements
**Priority:** High  
**Estimate:** 2 hours  
**Assignee:** Developer

**Description:**
Update existing import statements to work with new structure.

**Acceptance Criteria:**
- [ ] Update imports in `App.jsx` to use new paths
- [ ] Update imports in all component files
- [ ] Ensure no broken imports
- [ ] Test application still runs correctly

### Task 5.3: Create Migration Documentation
**Priority:** Low  
**Estimate:** 1 hour  
**Assignee:** Developer

**Description:**
Document the migration process and new structure.

**Acceptance Criteria:**
- [ ] Create `MIGRATION.md` file
- [ ] Document new directory structure
- [ ] Add import path examples
- [ ] Create developer guidelines

---

## Definition of Done

### Phase 1 Completion Criteria:
- [ ] All new directories created and properly structured
- [ ] TypeScript and Vite configurations updated
- [ ] Shared utilities layer established
- [ ] Infrastructure layer created with API abstractions
- [ ] All existing functionality still works
- [ ] No broken imports or build errors
- [ ] Documentation updated

### Testing Checklist:
- [ ] `npm run dev` starts successfully
- [ ] `npm run build` completes without errors
- [ ] All existing features work as before
- [ ] TypeScript compilation passes
- [ ] No console errors in browser

### Deliverables:
1. New directory structure
2. Updated configuration files
3. Shared utilities and components
4. Infrastructure layer foundation
5. Migration documentation
6. Working application with new structure

---

## Risk Mitigation

### Potential Issues:
1. **Import path conflicts** - Carefully test all imports after changes
2. **Build configuration issues** - Test build process frequently
3. **TypeScript errors** - Ensure all types are properly defined
4. **Performance impact** - Monitor app performance during changes

### Rollback Plan:
- Keep original files until migration is complete
- Use git branches for each major change
- Test thoroughly before proceeding to next phase

---

## Next Phase Preview:
Phase 2 will focus on extracting the first feature (Photo Visualization) and implementing the service layer pattern.
