#!/usr/bin/env bash
#
# Extract 'Product' schema JSON-LD from HTML pages.
# Reads list of newline-delimited URLs from stdin.
# Writes JSONL to stdout.
#
# Example: `cat urls.txt | ./script.sh > products.jsonl`
# Requirements: `curl`, `fq`, `jq`

set -euo pipefail

xargs -n1 curl -sL \
  | fq -d html -r '.. | 
      select(type == "object" and ."@type" == "application/ld+json") | 
      ."#text" | 
      fromjson | 
      select(.["@type"] == "Product")' \
  | jq -c '.'
