#!/usr/bin/env bash

#
#   » Starts shopify with the given / default store
#
#   Usage:
#   npm run shopify 𝗡𝗮𝗺𝗲
#
#   𝗡𝗮𝗺𝗲 is the same as in your store ( 𝗡𝗮𝗺𝗲.myshopify.com )
#


DEV_STORE="edurino"


store="${1:-$DEV_STORE}"


shopify theme dev   \
    --store=$store
