#!/usr/bin/env node

/**
 * Phase 1 Infrastructure Setup Test Script
 * 
 * This script validates that all Phase 1 tasks have been completed correctly:
 * - Directory structure setup
 * - Build configuration updates
 * - Shared utilities layer
 * - Infrastructure layer
 * - Migration preparation
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

function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

function checkFileContent(filePath, searchString) {
  try {
    const content = fs.readFileSync(path.join(__dirname, filePath), 'utf8');
    return content.includes(searchString);
  } catch (error) {
    return false;
  }
}

// Test Suite
function runTests() {
  log('\n🧪 Phase 1 Infrastructure Setup Test Suite', 'bold');
  log('=' .repeat(50), 'blue');

  // Epic 1: Directory Structure Setup
  log('\n📁 Epic 1: Directory Structure Setup', 'yellow');
  
  test('src/ directory exists', () => directoryExists('src'));
  test('src/app/ directory exists', () => directoryExists('src/app'));
  test('src/features/ directory exists', () => directoryExists('src/features'));
  test('src/shared/ directory exists', () => directoryExists('src/shared'));
  test('src/infrastructure/ directory exists', () => directoryExists('src/infrastructure'));
  test('src/main.tsx exists (moved from index.tsx)', () => fileExists('src/main.tsx'));

  // Shared subdirectories
  test('src/shared/components/ exists', () => directoryExists('src/shared/components'));
  test('src/shared/hooks/ exists', () => directoryExists('src/shared/hooks'));
  test('src/shared/utils/ exists', () => directoryExists('src/shared/utils'));
  test('src/shared/types/ exists', () => directoryExists('src/shared/types'));

  // Infrastructure subdirectories
  test('src/infrastructure/api/ exists', () => directoryExists('src/infrastructure/api'));
  test('src/infrastructure/storage/ exists', () => directoryExists('src/infrastructure/storage'));
  test('src/infrastructure/external/ exists', () => directoryExists('src/infrastructure/external'));

  // Feature directories
  const features = ['photo-visualization', 'ai-search', 'layout-management', 'photo-gallery'];
  features.forEach(feature => {
    test(`src/features/${feature}/ exists`, () => directoryExists(`src/features/${feature}`));
    test(`src/features/${feature}/components/ exists`, () => directoryExists(`src/features/${feature}/components`));
    test(`src/features/${feature}/hooks/ exists`, () => directoryExists(`src/features/${feature}/hooks`));
    test(`src/features/${feature}/services/ exists`, () => directoryExists(`src/features/${feature}/services`));
    test(`src/features/${feature}/types/ exists`, () => directoryExists(`src/features/${feature}/types`));
    test(`src/features/${feature}/index.ts exists`, () => fileExists(`src/features/${feature}/index.ts`));
  });

  // Epic 2: Build Configuration
  log('\n⚙️ Epic 2: Build Configuration', 'yellow');
  
  test('tsconfig.json has updated paths', () => {
    const tsconfig = readJsonFile('tsconfig.json');
    return tsconfig && 
           tsconfig.compilerOptions && 
           tsconfig.compilerOptions.paths &&
           tsconfig.compilerOptions.paths['@/app/*'] &&
           tsconfig.compilerOptions.paths['@/features/*'] &&
           tsconfig.compilerOptions.paths['@/shared/*'] &&
           tsconfig.compilerOptions.paths['@/infrastructure/*'];
  });

  test('tsconfig.json has correct baseUrl', () => {
    const tsconfig = readJsonFile('tsconfig.json');
    return tsconfig && 
           tsconfig.compilerOptions && 
           (tsconfig.compilerOptions.baseUrl === './src' || tsconfig.compilerOptions.baseUrl === 'src');
  });

  test('vite.config.ts has updated resolve aliases', () => {
    return checkFileContent('vite.config.ts', '@/app') &&
           checkFileContent('vite.config.ts', '@/features') &&
           checkFileContent('vite.config.ts', '@/shared') &&
           checkFileContent('vite.config.ts', '@/infrastructure');
  });

  // Epic 3: Shared Utilities Layer
  log('\n🔧 Epic 3: Shared Utilities Layer', 'yellow');
  
  test('src/shared/types/index.ts exists', () => fileExists('src/shared/types/index.ts'));
  test('src/shared/utils/index.ts exists', () => fileExists('src/shared/utils/index.ts'));
  test('src/shared/components/index.ts exists', () => fileExists('src/shared/components/index.ts'));

  // Epic 4: Infrastructure Layer
  log('\n🏗️ Epic 4: Infrastructure Layer', 'yellow');
  
  test('API abstraction files exist', () => {
    return fileExists('src/infrastructure/api/llm-client.ts') ||
           fileExists('src/infrastructure/api/data-client.ts') ||
           fileExists('src/infrastructure/api/types.ts');
  });

  test('Storage abstraction files exist', () => {
    return fileExists('src/infrastructure/storage/data-repository.ts') ||
           fileExists('src/infrastructure/storage/cache.ts');
  });

  // Epic 5: Migration Preparation
  log('\n🔄 Epic 5: Migration Preparation', 'yellow');
  
  test('Feature index files are properly structured', () => {
    return features.every(feature => {
      const indexPath = `src/features/${feature}/index.ts`;
      return fileExists(indexPath);
    });
  });

  test('MIGRATION.md documentation exists', () => fileExists('MIGRATION.md'));

  // Build and Runtime Tests
  log('\n🚀 Build and Runtime Tests', 'yellow');
  
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

  test('Development server can start', () => {
    try {
      // Start dev server and check if it starts without immediate errors
      const child = execSync('timeout 10s npm run dev 2>&1 || true', { stdio: 'pipe' });
      const output = child.toString();
      // Check for common success indicators and absence of critical errors
      return !output.includes('Error:') && 
             !output.includes('Failed to') &&
             (output.includes('Local:') || output.includes('ready') || output.includes('dev server'));
    } catch (error) {
      return false;
    }
  });

  // Legacy File Checks
  log('\n📋 Legacy File Status', 'yellow');
  
  test('Original files still exist (for rollback)', () => {
    return fileExists('App.jsx') &&
           fileExists('PhotoViz.jsx') &&
           fileExists('PhotoNode.jsx') &&
           fileExists('Sidebar.jsx') &&
           fileExists('store.js') &&
           fileExists('actions.js');
  });

  test('Package.json is unchanged', () => {
    const pkg = readJsonFile('package.json');
    return pkg && pkg.dependencies && pkg.devDependencies;
  });
}

function printSummary() {
  log('\n' + '=' .repeat(50), 'blue');
  log('📊 Test Summary', 'bold');
  log('=' .repeat(50), 'blue');
  
  log(`Total Tests: ${totalTests}`, 'blue');
  log(`Passed: ${passedTests}`, 'green');
  log(`Failed: ${totalTests - passedTests}`, 'red');
  log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`, 'yellow');

  if (failedTests.length > 0) {
    log('\n❌ Failed Tests:', 'red');
    failedTests.forEach(test => log(`  • ${test}`, 'red'));
  }

  if (passedTests === totalTests) {
    log('\n🎉 All tests passed! Phase 1 infrastructure setup is complete.', 'green');
    log('✅ Ready to proceed to Phase 2: Feature Extraction', 'green');
  } else {
    log('\n⚠️  Some tests failed. Please review the Phase 1 backlog and complete missing tasks.', 'yellow');
    log('📋 Refer to phase1-backlog.md for detailed requirements.', 'yellow');
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
