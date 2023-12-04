#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js and npm before running this script."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm before running this script."
    exit 1
fi

# Check if a project name is provided as an argument
if [ -z "$1" ]; then
    echo "Usage: $0 <project_name>"
    exit 1
fi

# Create a folder with the provided name
project_name="$1"
mkdir "$project_name"

# Change to the project directory
cd "$project_name" || exit

ln -s ../node_modules node_modules
ln -s ../package.json package.json
ln -s ../package-lock.json package-lock.json
ln -s ../templates templates
ln -s ../generate-json.ts generate-json.ts
ln -s ../generate-spec.ts generate-spec.ts

# Install Playwright with automated responses using expect
npx create-playwright@latest --quiet
npm run g:all

# Update the Playwright test configuration file
sed -i 's/reporter: 'html'/reporter: [['html', { open: 'never' }], ['json', { outputFile: 'test-results.json' }]]/' playwright.config.js

# Run Playwright tests
npx playwright test --shard=1/200

echo "Playwright project initialized successfully."
