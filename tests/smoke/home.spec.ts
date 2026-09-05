import { expect, test } from "playwright/test";

test.describe("Netso homepage", () => {
  test("renders the Netso proposition and core sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Make your rooftop/i })).toBeVisible();
    await expect(page.getByText("Industrial Energy Infrastructure")).toBeVisible();
    await expect(page.locator("canvas").first()).toBeAttached();
    await expect(page.locator("#why-netso")).toBeAttached();
    await expect(page.locator("#solutions")).toBeAttached();
    await expect(page.locator("#projects")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });

  test("opens and submits the project request modal", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Start a project" }).first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: /Tell us about the site/i })).toBeVisible();
    await dialog.getByLabel("Name").fill("Test Company");
    await dialog.getByLabel("Email").fill("test@example.com");
    await dialog.getByLabel("Site / Company").fill("Factory rooftop");
    await dialog.getByLabel("Message").fill("Testing the Netso project inquiry flow.");
    await dialog.getByRole("button", { name: "Send request" }).click();
    await expect(dialog.getByRole("heading", { name: "Request received" })).toBeVisible();
  });

  test("opens the navigation overlay", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("button", { name: /Close/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Why Netso" })).toBeVisible();
  });
});
