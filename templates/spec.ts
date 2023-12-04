import { test, expect } from '@playwright/test';

test(`Screenshot for #{url}`, async ({ page }) => {
  const url = '#{url}';

  // go to URL
  await page.goto(url);

  // click on "Accept All Cookies"
  await page.waitForSelector('#onetrust-button-group-parent', {
    timeout: 3000,
  });
  const button = await page.$('#onetrust-button-group-parent');
  if (button) {
    await button.click();
  }

  const name = `${url.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
  const screenshotPath = `screenshots/${name}`;

  await page.screenshot({ path: screenshotPath, fullPage: true });

  await expect(page).toHaveScreenshot(name);
});
