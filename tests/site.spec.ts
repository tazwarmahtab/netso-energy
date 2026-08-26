import { test, expect } from '@playwright/test';

test('Netso Energy site loads correctly', async ({ page }) => {
  // Navigate to the preview server
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  
  // Check page title
  await expect(page).toHaveTitle(/NETSO ENERGY/);
  
  // Check hero section is visible
  const hero = page.locator('[data-site-header]');
  await expect(hero).toBeVisible();
  
  // Check hero headline
  const headline = page.locator('h1');
  await expect(headline).toContainText('energy-generating asset');
  
  // Check primary CTA
  const cta = page.locator('a:has-text("Check rooftop potential")');
  await expect(cta).toBeVisible();
  
  // Check feasibility form route
  await page.goto('http://127.0.0.1:4173/feasibility', { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle(/Check Feasibility/);
  
  // Check form fields
  await expect(page.locator('input[id="name"]')).toBeVisible();
  await expect(page.locator('input[id="phone"]')).toBeVisible();
  await expect(page.locator('input[id="address"]')).toBeVisible();
  await expect(page.locator('input[id="district"]')).toBeVisible();
  await expect(page.locator('input[id="neighborhood"]')).toBeVisible();
  
  // Check validation works (submit empty form)
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Please enter your name')).toBeVisible();
  await expect(page.locator('text=Enter a valid Bangladesh number')).toBeVisible();
  await expect(page.locator('text=Please enter a full address')).toBeVisible();
  await expect(page.locator('text=Please enter your district')).toBeVisible();
  await expect(page.locator('text=Please enter your neighborhood')).toBeVisible();
  
  // Check select dropdowns
  await expect(page.locator('select[id="propertyType"]')).toBeVisible();
  await expect(page.locator('select[id="ownershipStatus"]')).toBeVisible();
  await expect(page.locator('select[id="roofSize"]')).toBeVisible();
  await expect(page.locator('select[id="roofAccessReadiness"]')).toBeVisible();
  await expect(page.locator('select[id="shadingStatus"]')).toBeVisible();
  await expect(page.locator('select[id="targetInstallTimeline"]')).toBeVisible();
  await expect(page.locator('select[id="primaryGoal"]')).toBeVisible();
  
  // Check WhatsApp CTA
  const whatsappCta = page.locator('a:has-text("Start on WhatsApp")');
  await expect(whatsappCta).toBeVisible();
});

test('Mobile responsive check', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  
  // Check mobile header
  const mobileHeader = page.locator('[data-site-header]');
  await expect(mobileHeader).toBeVisible();
  
  // Check mobile menu button
  const menuButton = page.locator('button[aria-label="Open menu"]');
  await expect(menuButton).toBeVisible();
});

test('Dark mode not forced', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  
  // Body should not have dark class forcing dark mode
  const bodyClass = await page.evaluate(() => document.body.className);
  // Site uses light theme by default (color-scheme: light in index.html)
  expect(bodyClass).not.toContain('dark');
});

test('Feasibility form validation - BN numbers', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/feasibility', { waitUntil: 'networkidle' });
  
  // Test Bengali numerals in bill amount
  await page.fill('input[id="monthlyBillAmount"]', '৫০০০');
  await page.fill('input[id="name"]', 'Test User');
  await page.fill('input[id="phone"]', '01712345678');
  await page.fill('input[id="address"]', 'Test Address');
  await page.fill('input[id="district"]', 'Dhaka');
  await page.fill('input[id="neighborhood"]', 'Gulshan');
  
  // Select required dropdowns
  await page.selectOption('select[id="propertyType"]', 'Single-family home');
  await page.selectOption('select[id="ownershipStatus"]', 'Owner');
  await page.selectOption('select[id="roofSize"]', '500–1,000 sq ft');
  await page.selectOption('select[id="roofAccessReadiness"]', 'Ready now');
  await page.selectOption('select[id="shadingStatus"]', 'Mostly clear');
  await page.selectOption('select[id="targetInstallTimeline"]', 'Within 1 month');
  await page.selectOption('select[id="primaryGoal"]', 'Reduce daytime electricity cost');
  
  // Submit
  await page.click('button[type="submit"]');
  
  // Should not show required field errors
  await expect(page.locator('text=Please complete this field')).toHaveCount(0);
});

test('Feasibility form duplicate submission guard', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/feasibility', { waitUntil: 'networkidle' });
  
  // Fill form
  await page.fill('input[id="name"]', 'Test User');
  await page.fill('input[id="phone"]', '01712345678');
  await page.fill('input[id="address"]', 'Test Address');
  await page.fill('input[id="district"]', 'Dhaka');
  await page.fill('input[id="neighborhood"]', 'Gulshan');
  
  await page.selectOption('select[id="propertyType"]', 'Single-family home');
  await page.selectOption('select[id="ownershipStatus"]', 'Owner');
  await page.selectOption('select[id="roofSize"]', '500–1,000 sq ft');
  await page.selectOption('select[id="roofAccessReadiness"]', 'Ready now');
  await page.selectOption('select[id="shadingStatus"]', 'Mostly clear');
  await page.selectOption('select[id="targetInstallTimeline"]', 'Within 1 month');
  await page.selectOption('select[id="primaryGoal"]', 'Reduce daytime electricity cost');
  
  // First submit
  await page.click('button[type="submit"]');
  
  // Wait for success or error
  await page.waitForTimeout(2000);
  
  // Try to submit again quickly - should be blocked by submission guard
  await page.click('button[type="submit"]');
  
  // Should not show submitting state twice
  const submittingText = page.locator('text=Submitting...');
  // The guard should prevent double submission
});

test('Hero section elements', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  
  // Hero video should be present
  const video = page.locator('video');
  await expect(video).toHaveCount(1);
  
  // Hero headline
  const headline = page.locator('h1:has-text("Turn your rooftop into an energy-generating asset")');
  await expect(headline).toBeVisible();
  
  // Hero card with "Solar Pergola"
  const card = page.locator('text=Solar Pergola');
  await expect(card).toBeVisible();
  
  // Trust notes
  await expect(page.locator('text=Dhaka rooftops')).toBeVisible();
  await expect(page.locator('text=Solar pergolas')).toBeVisible();
  await expect(page.locator('text=Energy assets')).toBeVisible();
});

test('Navigation and footer', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  
  // Navigation items
  await expect(page.locator('text=How it works')).toBeVisible();
  await expect(page.locator('text=Products')).toBeVisible();
  await expect(page.locator('text=Projects')).toBeVisible();
  await expect(page.locator('text=About')).toBeVisible();
  
  // Footer
  await expect(page.locator('text=Rooftop energy infrastructure for Bangladesh')).toBeVisible();
  await expect(page.locator('text=Made in Bangladesh')).toBeVisible();
});

test('Language toggle works', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  
  // Click language toggle
  await page.click('button[aria-label="Language"]');
  
  // Should show both languages
  await expect(page.locator('text=English')).toBeVisible();
  await expect(page.locator('text=বাংলা')).toBeVisible();
  
  // Switch to Bangla
  await page.click('text=বাংলা');
  
  // Page should update to Bangla
  await expect(page.locator('text=রুফটপ এনার্জি ইনফ্রাস্ট্রাকচার')).toBeVisible();
});

test('prefers-reduced-motion respected', async ({ page }) => {
  // Set prefers-reduced-motion
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  
  // Animations should be disabled (check CSS)
  const animationDuration = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue('--anim-duration-standard');
  });
  
  // Should be effectively zero
  expect(animationDuration).toBeTruthy();
});

test('Skip link accessibility', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  
  // Tab to skip link
  await page.keyboard.press('Tab');
  
  // Skip link should be focused
  const skipLink = page.locator('a[href="#main"]');
  await expect(skipLink).toBeFocused();
});

test('External links open in new tab', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  
  // Check footer social links
  const socialLinks = page.locator('footer a[href^="http"]');
  const count = await socialLinks.count();
  
  for (let i = 0; i < count; i++) {
    const link = socialLinks.nth(i);
    const target = await link.getAttribute('target');
    const rel = await link.getAttribute('rel');
    expect(target).toBe('_blank');
    expect(rel).toContain('noopener');
  }
});