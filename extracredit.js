// Tommy Camou 
// tcamou@pdx.edu
// QA Wolf QA Engineer Take Home Application (extra)
// 10/25/2024
// extracredit.js

const { chromium } = require('playwright');
const Getopt = require('node-getopt');

// define CLI options
const getopt = new Getopt([
    ['n', 'numArticles=ARG', 'specify number of articles to validate', '100'],
    ['u', 'url=ARG', 'specify URL of page on which to begin validation', 'https://news.ycombinator.com/newest'],
    ['t', 'title', 'extract titles of articles', false],
    ['', 'headless', 'enable headless mode', false],
    ['v', 'verbose', 'enable verbose output', false],
    ['h', 'help', 'display this help']
]).bindHelp();
getopt.setHelp(
    'Usage: node extracredit.js [OPTION]\n\n' +
    '[[OPTIONS]]\n\n'
)
opt = getopt.parseSystem();

// global defaults
const numArticles = opt.options.numArticles;
if (numArticles < 0) {
    console.log('ERROR: Negative Number of Articles: number must be greater than 0')
}
const url = opt.options.url;
const urlRegex = /^(https?:\/\/)?([^\s]*)?(^|\.)ycombinator\.com(\/[^\s]*)?$/;
if (!urlRegex.test(url)) {
    console.log('ERROR: Invalid URL Format: url must be on the ycombinator.com domain');
}
const getTitles = opt.options.title;
const headlessFlag = opt.options.headless;
const verbose = opt.options.verbose;

async function sortHackerNewsArticles() {
  // launch browser (headless for tests to run in background)
  const browser = await chromium.launch({ headless: headlessFlag });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News and wait for content to load
  await page.goto(url, {  waitUntil: 'domcontentloaded' });

  // extract the first specified number of articles (time + options)
  let articles = [];
  let currentArticles = [];
  while (articles.length < numArticles) {
    // extract all articles on current page
    currentArticles = await page.$$eval('.athing', nodes => 
      nodes.map(node => {
        const title = node.querySelector('.titleline a').innerText;
        // parse time to ISO 8601 format
        const timeString = node.nextElementSibling.querySelector('.age').title.split(' ')[0];
        const time = new Date(timeString);
        return { title, time };
      })
    );
    // add current page to all articles
    articles = articles.concat(currentArticles.slice(0, numArticles - articles.length)); // adds only up to num total
    // go to next page
    const moreLink = await page.$('.morelink');
    if (moreLink) {
        await moreLink.click()
    } else {
        console.log('ERROR: Unable to Load Next Page: There are less than the specified number of articles')
    }
  }
  
  // check if articles are sorted from newest to oldest
  const isSorted = articles.every((article, i, arr) => {
    if (verbose) {
        if (getTitles) console.log(i + ': ' + article.title)
        console.log(i + ': ' + article.time);
    }
    if (i === 0) return true;
    return arr[i-1].time >= article.time;
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
