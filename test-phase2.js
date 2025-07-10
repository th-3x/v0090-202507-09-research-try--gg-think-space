#!/usr/bin/env node

/**
 * Phase 2 Feature Extraction Test Script
 * 
 * This script validates that all Phase 2 tasks have been completed correctly:
 * - Photo Visualization feature extraction
 * - AI Search feature extraction
 * - Layout Management feature extraction
 * - Photo Gallery feature extraction
 * - Service layer implementation
 * - Feature integration and boundaries
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = [];

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function test(description, testFn) {
  totalTests++;
  try {
    const result = testFn();
    if (result) {
      passedTests++;
      log(`✅ ${description}`, 'green');
    } else {
      failedTests.push(description);
      log(`❌ ${description}`, 'red');
    }
  } catch (error) {
    failedTests.push(`${description}: ${error.message}`);
    log(`❌ ${description}: ${error.message}`, 'red');
  }
}

function fileExists(filePath) {
  return fs.existsSync(path.join(__dirname, filePath));
}

function directoryExists(dirPath) {
  const fullPath = path.join(__dirname, dirPath);
  return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
}

function checkFileContent(filePath, searchStrings) {
  try {
    const content = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    if (Array.isArray(searchStrings)) {
      return searchStrings.every(str => content.includes(str));
    }
    return content.includes(searchStrings);
  } catch (error) {
    return false;
  }
}

function checkExportStructure(filePath, expectedExports) {
  try {
    const content = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    return expectedExports.every(exportName => 
      content.includes(`export`) && 
      (content.includes(exportName) || content.includes('export *'))
    );
  } catch (error) {
    return false;
  }
}

function checkImportMigration(filePath, oldImports, newImports) {
  try {
    const content = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    const hasOldImports = oldImports.some(imp => content.includes(imp));
    const hasNewImports = newImports.some(imp => content.includes(imp));
    return !hasOldImports && hasNewImports;
  } catch (error) {
    return false;
  }
}

// Test Suite
function runTests() {
  log('\n🧪 Phase 2 Feature Extraction Test Suite', 'bold');
  log('=' .repeat(60), 'blue');

  // Epic 1: Photo Visualization Feature
  log('\n🎨 Epic 1: Photo Visualization Feature', 'cyan');
  
  test('PhotoVisualization component extracted', () => 
    fileExists('src/features/photo-visualization/components/PhotoVisualization.tsx') ||
    fileExists('src/features/photo-visualization/components/PhotoVisualization.jsx')
  );

  test('PhotoNode component moved to feature', () => 
    fileExists('src/features/photo-visualization/components/PhotoNode.tsx') ||
    fileExists('src/features/photo-visualization/components/PhotoNode.jsx')
  );

  test('CameraControls component exists', () => 
    fileExists('src/features/photo-visualization/components/CameraControls.tsx') ||
    fileExists('src/features/photo-visualization/components/CameraControls.jsx')
  );

  test('Visualization services implemented', () => {
    const services = [
      'src/features/photo-visualization/services/VisualizationService.ts',
      'src/features/photo-visualization/services/CameraService.ts',
      'src/features/photo-visualization/services/EffectsService.ts'
    ];
    return services.some(service => fileExists(service));
  });

  test('Visualization hooks created', () => {
    const hooks = [
      'src/features/photo-visualization/hooks/useVisualization.ts',
      'src/features/photo-visualization/hooks/useCamera.ts',
      'src/features/photo-visualization/hooks/useSceneEffects.ts'
    ];
    return hooks.some(hook => fileExists(hook));
  });

  test('Photo visualization types defined', () => 
    fileExists('src/features/photo-visualization/types/index.ts')
  );

  test('Photo visualization feature exports', () => 
    checkExportStructure('src/features/photo-visualization/index.ts', 
      ['components', 'hooks', 'services'])
  );

  // Epic 2: AI Search Feature
  log('\n🤖 Epic 2: AI Search Feature', 'cyan');
  
  test('SearchInput component extracted', () => 
    fileExists('src/features/ai-search/components/SearchInput.tsx') ||
    fileExists('src/features/ai-search/components/SearchInput.jsx')
  );

  test('SearchResults component exists', () => 
    fileExists('src/features/ai-search/components/SearchResults.tsx') ||
    fileExists('src/features/ai-search/components/SearchResults.jsx')
  );

  test('SearchPresets component exists', () => 
    fileExists('src/features/ai-search/components/SearchPresets.tsx') ||
    fileExists('src/features/ai-search/components/SearchPresets.jsx')
  );

  test('Search services implemented', () => {
    const services = [
      'src/features/ai-search/services/SearchService.ts',
      'src/features/ai-search/services/AIService.ts',
      'src/features/ai-search/services/QueryProcessor.ts'
    ];
    return services.some(service => fileExists(service));
  });

  test('Prompts moved to AI search feature', () => 
    fileExists('src/features/ai-search/services/prompts.ts') ||
    checkFileContent('src/features/ai-search/services/SearchService.ts', 'queryPrompt')
  );

  test('Search hooks created', () => {
    const hooks = [
      'src/features/ai-search/hooks/useSearch.ts',
      'src/features/ai-search/hooks/useSearchHistory.ts',
      'src/features/ai-search/hooks/useSearchPresets.ts'
    ];
    return hooks.some(hook => fileExists(hook));
  });

  test('AI search feature exports', () => 
    checkExportStructure('src/features/ai-search/index.ts', 
      ['components', 'hooks', 'services'])
  );

  // Epic 3: Layout Management Feature
  log('\n📐 Epic 3: Layout Management Feature', 'cyan');
  
  test('LayoutControls component extracted', () => 
    fileExists('src/features/layout-management/components/LayoutControls.tsx') ||
    fileExists('src/features/layout-management/components/LayoutControls.jsx')
  );

  test('Layout services implemented', () => {
    const services = [
      'src/features/layout-management/services/LayoutService.ts',
      'src/features/layout-management/services/PositionService.ts',
      'src/features/layout-management/services/AnimationService.ts'
    ];
    return services.some(service => fileExists(service));
  });

  test('Layout hooks created', () => {
    const hooks = [
      'src/features/layout-management/hooks/useLayout.ts',
      'src/features/layout-management/hooks/useLayoutTransition.ts'
    ];
    return hooks.some(hook => fileExists(hook));
  });

  test('Layout management feature exports', () => 
    checkExportStructure('src/features/layout-management/index.ts', 
      ['components', 'hooks', 'services'])
  );

  // Epic 4: Photo Gallery Feature
  log('\n🖼️ Epic 4: Photo Gallery Feature', 'cyan');
  
  test('PhotoGallery component extracted from Sidebar', () => 
    fileExists('src/features/photo-gallery/components/PhotoGallery.tsx') ||
    fileExists('src/features/photo-gallery/components/PhotoGallery.jsx')
  );

  test('PhotoList component exists', () => 
    fileExists('src/features/photo-gallery/components/PhotoList.tsx') ||
    fileExists('src/features/photo-gallery/components/PhotoList.jsx')
  );

  test('PhotoThumbnail component exists', () => 
    fileExists('src/features/photo-gallery/components/PhotoThumbnail.tsx') ||
    fileExists('src/features/photo-gallery/components/PhotoThumbnail.jsx')
  );

  test('Gallery services implemented', () => {
    const services = [
      'src/features/photo-gallery/services/GalleryService.ts',
      'src/features/photo-gallery/services/PhotoService.ts',
      'src/features/photo-gallery/services/FilterService.ts'
    ];
    return services.some(service => fileExists(service));
  });

  test('Gallery hooks created', () => {
    const hooks = [
      'src/features/photo-gallery/hooks/useGallery.ts',
      'src/features/photo-gallery/hooks/usePhotoSelection.ts',
      'src/features/photo-gallery/hooks/usePhotoFilters.ts'
    ];
    return hooks.some(hook => fileExists(hook));
  });

  test('Photo gallery feature exports', () => 
    checkExportStructure('src/features/photo-gallery/index.ts', 
      ['components', 'hooks', 'services'])
  );

  // Epic 5: Feature Integration
  log('\n🔗 Epic 5: Feature Integration', 'cyan');
  
  test('App.jsx updated to use feature components', () => {
    if (!fileExists('src/app/App.tsx') && !fileExists('src/app/App.jsx') && !fileExists('App.jsx')) {
      return false;
    }
    
    const appFile = fileExists('src/app/App.tsx') ? 'src/app/App.tsx' : 
                   fileExists('src/app/App.jsx') ? 'src/app/App.jsx' : 'App.jsx';
    
    return checkFileContent(appFile, ['@/features/', 'photo-visualization', 'ai-search']);
  });

  test('Original components removed or moved', () => {
    // Check that original files are either moved or imports updated
    const originalFiles = ['PhotoViz.jsx', 'PhotoNode.jsx', 'Sidebar.jsx'];
    const movedOrUpdated = originalFiles.every(file => {
      if (!fileExists(file)) return true; // File moved
      // If file exists, check if it's been updated to import from features
      return checkFileContent(file, '@/features/');
    });
    return movedOrUpdated;
  });

  test('Actions.js refactored for feature coordination', () => {
    if (!fileExists('actions.js') && !fileExists('src/app/actions.js')) return true;
    
    const actionsFile = fileExists('src/app/actions.js') ? 'src/app/actions.js' : 'actions.js';
    // Check that actions either imports from features or has been significantly reduced
    return checkFileContent(actionsFile, '@/features/') || 
           !checkFileContent(actionsFile, ['sendQuery', 'setLayout', 'setTargetImage']);
  });

  test('LLM integration moved to infrastructure', () => 
    fileExists('src/infrastructure/api/llm-client.ts') ||
    fileExists('src/infrastructure/external/llm.ts') ||
    !fileExists('llm.js') // Original file removed
  );

  // Epic 6: Testing & Validation
  log('\n🧪 Epic 6: Testing & Validation', 'cyan');
  
  test('TypeScript compilation passes', () => {
    try {
      execSync('npx tsc --noEmit', { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  });

  test('Vite build succeeds', () => {
    try {
      execSync('npm run build', { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  });

  test('Development server starts without errors', () => {
    try {
      const child = execSync('timeout 15s npm run dev 2>&1 || true', { stdio: 'pipe' });
      const output = child.toString();
      return !output.includes('Error:') && 
             !output.includes('Failed to') &&
             !output.includes('Cannot resolve') &&
             (output.includes('Local:') || output.includes('ready') || output.includes('dev server'));
    } catch (error) {
      return false;
    }
  });

  test('No broken imports in feature files', () => {
    try {
      // Check for common import errors in feature directories
      const features = ['photo-visualization', 'ai-search', 'layout-management', 'photo-gallery'];
      return features.every(feature => {
        const featurePath = `src/features/${feature}`;
        if (!directoryExists(featurePath)) return true;
        
        // Check index.ts doesn't have broken exports
        const indexFile = `${featurePath}/index.ts`;
        if (fileExists(indexFile)) {
          const content = fs.readFileSync(path.join(__dirname, indexFile), 'utf8');
          // Basic check for export syntax
          return !content.includes('export') || 
                 content.includes('export *') || 
                 content.includes('export {');
        }
        return true;
      });
    } catch (error) {
      return false;
    }
  });

  // Feature Boundary Tests
  log('\n🏗️ Feature Boundary Validation', 'cyan');
  
  test('Features have proper public APIs', () => {
    const features = ['photo-visualization', 'ai-search', 'layout-management', 'photo-gallery'];
    return features.every(feature => {
      const indexPath = `src/features/${feature}/index.ts`;
      return fileExists(indexPath);
    });
  });

  test('No direct cross-feature imports', () => {
    try {
      const features = ['photo-visualization', 'ai-search', 'layout-management', 'photo-gallery'];
      return features.every(feature => {
        const featurePath = `src/features/${feature}`;
        if (!directoryExists(featurePath)) return true;
        
        // Check that feature files don't import directly from other features
        // (they should go through the public API)
        const files = fs.readdirSync(path.join(__dirname, featurePath), { recursive: true });
        return files.every(file => {
          if (!file.endsWith('.ts') && !file.endsWith('.tsx') && 
              !file.endsWith('.js') && !file.endsWith('.jsx')) return true;
          
          const filePath = path.join(__dirname, featurePath, file);
          if (!fs.statSync(filePath).isFile()) return true;
          
          const content = fs.readFileSync(filePath, 'utf8');
          // Check for direct imports from other features (bad pattern)
          const otherFeatures = features.filter(f => f !== feature);
          return !otherFeatures.some(otherFeature => 
            content.includes(`../../../features/${otherFeature}/`) ||
            content.includes(`@/features/${otherFeature}/components/`) ||
            content.includes(`@/features/${otherFeature}/services/`)
          );
        });
      });
    } catch (error) {
      return false;
    }
  });

  test('Shared utilities properly used', () => {
    return fileExists('src/shared/types/index.ts') &&
           fileExists('src/shared/utils/index.ts') &&
           fileExists('src/shared/components/index.ts');
  });
}

function printSummary() {
  log('\n' + '=' .repeat(60), 'blue');
  log('📊 Phase 2 Test Summary', 'bold');
  log('=' .repeat(60), 'blue');
  
  log(`Total Tests: ${totalTests}`, 'blue');
  log(`Passed: ${passedTests}`, 'green');
  log(`Failed: ${totalTests - passedTests}`, 'red');
  log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`, 'yellow');

  if (failedTests.length > 0) {
    log('\n❌ Failed Tests:', 'red');
    failedTests.forEach(test => log(`  • ${test}`, 'red'));
  }

  if (passedTests === totalTests) {
    log('\n🎉 All tests passed! Phase 2 feature extraction is complete.', 'green');
    log('✅ Ready to proceed to Phase 3: State Management Refactor', 'green');
    log('🚀 Features are properly extracted and integrated!', 'cyan');
  } else {
    log('\n⚠️  Some tests failed. Please review the Phase 2 backlog and complete missing tasks.', 'yellow');
    log('📋 Refer to phase2-backlog.md for detailed requirements.', 'yellow');
    
    if (failedTests.length <= 5) {
      log('\n💡 Quick fixes needed - you\'re almost there!', 'cyan');
    } else {
      log('\n🔧 Significant work remaining - review the backlog carefully.', 'magenta');
    }
  }
}

// Run the test suite
try {
  runTests();
  printSummary();
  
  // Exit with appropriate code
  process.exit(passedTests === totalTests ? 0 : 1);
} catch (error) {
  log(`\n💥 Test suite failed to run: ${error.message}`, 'red');
  process.exit(1);
}
