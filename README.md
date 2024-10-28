# Hacker News Article Sorting Validator

This project contains two scripts, `extracredit.js` and `index.js`, created for validating the sorting of articles on Hacker News. The scripts use [Playwright](https://playwright.dev/) for web scraping and automate the browser to test whether articles are ordered from newest to oldest.

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Usage](#usage)
  - [extracredit.js](#extracreditjs)
  - [index.js](#indexjs)
- [Logging and Reporting](#logging-and-reporting)
- [Enhanced Logging and Reporting](#enhanced-logging-and-reporting)

## Features

### extracredit.js
- **Command-line Options**: Allows customization of the number of articles to validate, the starting URL, verbose output, and more.
- **URL Validation**: Ensures the URL is on the `ycombinator.com` domain.
- **Verbose Mode**: Provides detailed information on each article.
- **Title Extraction**: Optionally outputs article titles.
- **Error Handling**: Validates the URL and input article count.

### index.js
- **Basic Article Validation**: Retrieves and validates the order of 100 articles on Hacker News.
- **Error Logging**: Displays an error if there are fewer than 100 articles.

## Requirements
- **Node.js**: Version 14 or higher.
- **Playwright**: Install by running `npm install playwright`.
- **node-getopt**: Install by running `npm install node-getopt`.

## Usage

### extracredit.js
1. Run the script with customizable options:
    ```bash
    node extracredit.js -n <number_of_articles> -u <url> -t -v
    ```
   Example:
    ```bash
    node extracredit.js -n 100 -u https://news.ycombinator.com/newest -t -v
    ```

#### Options:
- `-n`, `--numArticles`: Specify the number of articles to validate (default: 100).
- `-u`, `--url`: Specify the starting URL (default: `https://news.ycombinator.com/newest`).
- `-t`, `--title`: Extract and log article titles.
- `-v`, `--verbose`: Enable verbose output.
- `-h`, `--help`: Display help.

### index.js
1. Run the script without additional configuration:
    ```bash
    node index.js
    ```

This script automatically validates 100 articles from the `newest` section of Hacker News.

## Logging and Reporting
- **Error Messages**: Both scripts output errors directly to the console, including invalid URL formats and insufficient article counts.

## Enhanced Logging and Reporting
To extend functionality, you may consider:
- **Custom Logging**: Capture browser console output, test errors, and details of each test case.
- **HTML Reports**: Use `mochawesome` or `jest-html-reporter` to generate reports with test details.