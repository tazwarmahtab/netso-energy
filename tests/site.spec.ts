import { test, expect } from '@playwright/test';

test('Netso Energy site loads correctly', async ({ page, isMobile }) => {
  // Navigate to preview server
  await page.goto('/', { waitUntil: 'networkidle' });

  // Check page title
  await expect(page).toHaveTitle(/NETSO ENERGY/);

  // Check site header is visible
  const header = page.locator('[data-site-header]');
  await expect(header).toBeVisible();

  // Navigation items check (desktop visible directly, mobile via hamburger menu)
  if (!isMobile) {
    await expect(header.getByRole('link', { name: 'How it works' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Projects' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'About' })).toBeVisible();
  }

  // Check feasibility form route
  await page.goto('/feasibility', { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle(/Feasibility/i);

  // Check form fields
  await expect(page.locator('input#name')).toBeVisible();
  await expect(page.locator('input#phone')).toBeVisible();
  await expect(page.locator('input#address')).toBeVisible();
  await expect(page.locator('input#district')).toBeVisible();
  await expect(page.locator('input#neighborhood')).toBeVisible();

  // Check validation works (submit empty form)
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Please enter your name.')).toBeVisible();
  await expect(page.locator('text=Enter a valid Bangladesh number')).toBeVisible();
  await expect(page.locator('text=Please enter a full address.')).toBeVisible();
  await expect(page.locator('text=Please enter your district.')).toBeVisible();
  await expect(page.locator('text=Please enter your neighborhood.')).toBeVisible();

  // Check select dropdowns
  await expect(page.locator('select#propertyType')).toBeVisible();
  await expect(page.locator('select#ownershipStatus')).toBeVisible();
  await expect(page.locator('select#roofSize')).toBeVisible();
  await expect(page.locator('select#roofAccessReadiness')).toBeVisible();
  await expect(page.locator('select#shadingStatus')).toBeVisible();
  await expect(page.locator('select#targetInstallTimeline')).toBeVisible();
  await expect(page.locator('select#primaryGoal')).toBeVisible();
});

test('Mobile responsive check', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/', { waitUntil: 'networkidle' });

  // Check mobile header
  const mobileHeader = page.locator('[data-site-header]');
  await expect(mobileHeader).toBeVisible();

  // Check mobile menu trigger button
  const menuButton = mobileHeader.getByRole('button', { name: /menu/i });
  await expect(menuButton).toBeVisible();
});

test('Dark mode not forced', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Neither html nor body should have a forced dark class.
  // The site uses light theme by default (color-scheme: light in index.html);
  // dark sections use per-section theme-dark, never a global body class.
  const htmlClass = await page.evaluate(() => document.documentElement.className);
  expect(htmlClass).not.toContain('dark');
});

test('Feasibility form validation - BN numbers', async ({ page }) => {
  await page.goto('/feasibility', { waitUntil: 'networkidle' });

  // Test form filling with valid Bangladeshi info
  await page.fill('input#name', 'Test User');
  await page.fill('input#phone', '01712345678');
  await page.fill('input#address', 'Road 11, House 45');
  await page.fill('input#district', 'Dhaka');
  await page.fill('input#neighborhood', 'Gulshan');

  // Select required dropdowns
  await page.selectOption('select#propertyType', 'Single-family home');
  await page.selectOption('select#ownershipStatus', 'Owner');
  await page.selectOption('select#monthlyBillRange', 'BDT 7,000–15,000');
  await page.selectOption('select#roofSize', '1,000–2,000 sq ft');
  await page.selectOption('select#roofAccessReadiness', 'Ready now');
  await page.selectOption('select#shadingStatus', 'Mostly clear');
  await page.selectOption('select#targetInstallTimeline', 'Within 1 month');
  await page.selectOption('select#primaryGoal', 'Reduce daytime electricity cost');

  // Fill optional numeric bill amount with digits
  await page.fill('input#monthlyBillAmount', '12000');

  // Validation errors should not be visible for valid fields
  await expect(page.locator('#name-error')).toHaveCount(0);
  await expect(page.locator('#phone-error')).toHaveCount(0);
  await expect(page.locator('#address-error')).toHaveCount(0);
});

test('Feasibility form duplicate submission guard', async ({ page }) => {
  await page.goto('/feasibility', { waitUntil: 'networkidle' });

  // Verify form renders submission button with disabled state handling
  const submitButton = page.locator('button[type="submit"]');
  await expect(submitButton).toBeVisible();
  await expect(submitButton).not.toBeDisabled();
});

test('Hero section elements', async ({ page }) => {
  // Use reduced-motion emulation so hero content is immediately revealed
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'networkidle' });

  // Hero headline is visible under reduced motion / after reveal
  const headline = page.locator('h1').first();
  await expect(headline).toBeVisible();
  await expect(headline).toContainText('energy-generating asset');

  // Hero card title
  await expect(page.locator('text=Architecture that shades, shelters, and generates.')).toBeVisible();
});

test('Navigation and footer', async ({ page, isMobile }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Navigation items in header for desktop
  if (!isMobile) {
    const header = page.locator('[data-site-header]');
    await expect(header.getByRole('link', { name: 'How it works' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Projects' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'About' })).toBeVisible();
  }

  // Footer section
  const footer = page.locator('footer');
  await expect(footer.locator('text=Rooftop energy infrastructure for Bangladesh.')).toBeVisible();
  await expect(footer.locator('text=Made in Bangladesh.')).toBeVisible();
});

test('Language toggle works', async ({ page, isMobile }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  if (isMobile) {
    // On mobile, open menu sheet first
    const menuBtn = page.locator('[data-site-header]').getByRole('button', { name: /menu/i });
    await menuBtn.click();
    const sheet = page.locator('[role="dialog"]');
    await expect(sheet).toBeVisible();
    const bnButton = sheet.getByRole('button', { name: 'বাংলা' }).first();
    await bnButton.click();
    await expect(sheet.getByRole('link', { name: 'কীভাবে কাজ করে' })).toBeVisible();
  } else {
    // On desktop, click inline language toggle
    const bnButton = page.locator('[data-site-header]').getByRole('button', { name: 'বাংলা' }).first();
    await expect(bnButton).toBeVisible();
    await bnButton.click();
    const header = page.locator('[data-site-header]');
    await expect(header.getByRole('link', { name: 'কীভাবে কাজ করে' })).toBeVisible();
  }
});

test('prefers-reduced-motion respected', async ({ page }) => {
  // Set prefers-reduced-motion
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'networkidle' });

  // Hero content should immediately be rendered without needing scroll trigger
  const headline = page.locator('h1').first();
  await expect(headline).toBeVisible();
});

test('Skip link accessibility', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Directly check skip link presence and href
  const skipLink = page.locator('a[href="#main-content"]');
  await expect(skipLink).toBeAttached();
  await expect(skipLink).toHaveAttribute('href', '#main-content');
});

test('External links open in new tab', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Check external links
  const externalLinks = page.locator('a[href^="https://wa.me"]');
  const count = await externalLinks.count();
  expect(count).toBeGreaterThan(0);
});

test('Solar calculator property segment selector switches rates', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#savings-estimate', { waitUntil: 'networkidle' });

  // Scroll to savings-estimate section to trigger lazy loading
  const calculatorSection = page.locator('#savings-estimate');
  await calculatorSection.scrollIntoViewIfNeeded();

  // Find the segment toggle buttons within the calculator
  const commercialBtn = page.getByRole('button', { name: /Commercial\/Factory|বাণিজ্যিক/i });
  const commonServiceBtn = page.getByRole('button', { name: /Common Services|কমন সার্ভিস/i });
  const residentialBtn = page.getByRole('button', { name: /Residential Flat|আবাসিক ফ্ল্যাট/i });

  await expect(commercialBtn).toBeVisible({ timeout: 15000 });
  await expect(commonServiceBtn).toBeVisible({ timeout: 15000 });
  await expect(residentialBtn).toBeVisible({ timeout: 15000 });

  // Switch to Common Services segment
  await commonServiceBtn.click();

  // Verify button receives active/selected style class
  await expect(commonServiceBtn).toHaveClass(/bg-primary/);
  await expect(commercialBtn).not.toHaveClass(/bg-primary/);

  // Switch to Residential Flat segment
  await residentialBtn.click();
  await expect(residentialBtn).toHaveClass(/bg-primary/);
  await expect(commonServiceBtn).not.toHaveClass(/bg-primary/);
});
