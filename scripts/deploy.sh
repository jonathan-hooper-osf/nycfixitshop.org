#!/bin/bash
npx tailwindcss -i site/css/tailwind.css -o dist/css/styles.css --minimize
cp site/index.html dist/index.html
rm -Rf dist/images/*
cp site/images/* dist/images/