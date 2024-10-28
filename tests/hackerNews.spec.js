// Tommy Camou
// tcamou@pdx.edu
// QA Wolf QA Engineer Take Home Application (tests)
// 10/27/2024
// tests/hackerNews.spec.js

// usage: npx playwright test

const { test, expect } = require('@playwright/test');

test.describe('Hacker News Sorting Tests', () => {
  test('should load the newest page correctly', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newest');
    await expect(page).toHaveTitle(/Hacker News/);
  });

  test('should display articles in descending order', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newest');
    const times = await page.$$eval('.athing', nodes =>
      nodes.map(node => {
        const timeString = node.nextElementSibling.querySelector('.age').title.split(' ')[0];
        return new Date(timeString);
      })
    );
    // ensure each time is less than or equal to the previous time
    const isSorted = times.every((time, i, arr) => i === 0 || arr[i - 1] >= time);
    expect(isSorted).toBe(true);
  });
});
