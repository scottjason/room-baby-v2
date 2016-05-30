#!/bin/bash

build="rm -rf dist && NODE_ENV=production webpack -p --config webpack.production.config.js"
eval $build