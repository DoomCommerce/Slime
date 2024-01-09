#!/usr/bin/env bash

clear

echo "Bundling /Source/[x]/ -> /assets/[x].js"

bun run watch Test &

wait

echo "Stopped bundling!"