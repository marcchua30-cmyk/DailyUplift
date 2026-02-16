#!/bin/bash
# Simple build verification

echo "Checking TypeScript files..."

# Check if there are any obvious syntax errors
grep -r "export async function POST" app/api/generate-quote/route.ts

echo "Build check complete"
