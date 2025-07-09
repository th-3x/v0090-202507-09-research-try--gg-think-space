// screenshot.js - Script to take a screenshot of a website using Playwright

const { chromium } = require('@playwright/test');

async function takeScreenshot() {
  // Launch a new browser
  const browser = await chromium.launch();
  
  // Create a new page
  const page = await browser.newPage();
  
  // Navigate to example.com
  console.log('Navigating to example.com...');
  await page.goto('https://example.com');
  
  // Take a screenshot and save it
  console.log('Taking screenshot...');
  await page.screenshot({ path: 'example-screenshot.png', fullPage: true });
  
  console.log('Screenshot saved as example-screenshot.png');
  
  // Close the browser
  await browser.close();
}

// Run the function
takeScreenshot().catch(err => {
  console.error('Error taking screenshot:', err);
  process.exit(1);
});
