// Tommy Camou 
// tcamou@pdx.edu
// QA Wolf QA Engineer Take Home Application (main)
// 10/25/2024
// index.js

const { chromium } = require('playwright');

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News and wait for content to load
  await page.goto('https://news.ycombinator.com/newest', {  waitUntil: 'domcontentloaded' });

  // extract the first 100 articles time
  let articles = [];
  while (articles.length < 100) {
    // extract all articles on current page
    const currentArticles = await page.$$eval('.athing', nodes => 
      nodes.map(node => {
        // parse time to ISO 8601 format
        const timeString = node.nextElementSibling.querySelector('.age').title.split(' ')[0];
        const time = new Date(timeString);
        return time;
      })
    );
    // add current page to all articles
    articles = articles.concat(currentArticles.slice(0, 100 - articles.length)); // adds only up to 100 total
    // go to next page
    const moreLink = await page.$('.morelink');
    moreLink ? await moreLink.click() : console.log('ERROR: There are less than 100 articles.')
  }
  
  // check if articles are sorted from newest to oldest
  const isSorted = articles.every((article, i, arr) => {
    if (i === 0) return true;
    return arr[i-1] >= article;
  });
 
  // display validation message
  if (isSorted) {
    console.log('The articles are sorted from newest to oldest.');
  } else {
    console.log('The articles are NOT sorted correctly.');
  }

   // close the browser
   await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
