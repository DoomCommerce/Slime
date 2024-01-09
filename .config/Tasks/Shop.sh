#!/usr/bin/env bash

#
#   Shopify Theme CLI Shorthand
#
#   𝗨𝘀𝗮𝗴𝗲
#   bun run shop 𝗡𝗮𝗺𝗲
#   
#   ( 𝗡𝗮𝗺𝗲.myshopify.com )
#


STORE="MyShopifyStore"


store="${1:-$STORE}"


shopify theme dev   \
    --store=$store
