#!/usr/bin/env bash

#
#   Bundles the source folder with the given.
#

if [ -z "$1" ] ; then
    echo "No folder name was specified"
fi

echo "Bundling Source/$1 -> assets/$1.js"

bun build                                       \
    --tsconfig-override Source/tsconfig.json  \
    --external None                             \
    --outfile "assets/$1.js"                    \
    --watch                                     \
    "Source/$1/mod.ts"