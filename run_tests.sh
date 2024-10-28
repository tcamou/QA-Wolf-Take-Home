#!/bin/bash

# Tommy Camou
# tcamou@pdx.edu
# QA Wolf QA Engineer Take Home Application (initial tests)
# 10/26/2024
# run_tests.sh

# usage: .\run_tests.sh
# for optional live monitoring in other terminal: tail -f extracredit_output.log
# note: when running tests, the word "error" could appear in an article title, not indicating an actual bug. use with discretion.

LOG_FILE="extracredit_output.log"
> $LOG_FILE

# define arrays for each option
URLS=("https://news.ycombinator.com/newest" "https://news.ycombinator.com/news" "https://news.ycombinator.com/jobs" "https://news.ycombinator.com/show" "https://news.ycombinator.com/ask" "https://news.ycombinator.com/front?day=2023-10-25")
NUM_ARTICLES=("" -1 0 50 100 150 200 250)
TITLE_FLAGS=("" "-t")
VERBOSE_FLAGS=("" "-v")

# loop through all combinations of options
echo "running tests..." | tee -a $LOG_FILE
for url in "${URLS[@]}"; do
    for num in "${NUM_ARTICLES[@]}"; do
        for title in "${TITLE_FLAGS[@]}"; do
            for verbose in "${VERBOSE_FLAGS[@]}"; do
                echo "testing with url=$url, numArticles=$num, title=$title, verbose=$verbose" >> $LOG_FILE
                node.exe extracredit.js --url "$url" --numArticles "$num" --title "$title" $verbose >> $LOG_FILE
            done
        done
    done
done

echo "all tests completed." | tee -a $LOG_FILE

# grep the log file for any error
echo "checking for errors or warnings in log file..."
grep -ni error $LOG_FILE

echo "log review complete."