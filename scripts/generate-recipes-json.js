#!/usr/bin/env node

/**
 * Script to generate recipes.json from markdown files in the recipes directory
 * This file contains metadata about all available recipes for the static site
 */

const fs = require('fs');
const path = require('path');

const RECIPES_DIR = path.join(__dirname, '..', 'recipes');
const OUTPUT_FILE = path.join(__dirname, '..', 'docs', 'recipes.json');
const DOCS_RECIPES_DIR = path.join(__dirname, '..', 'docs', 'recipes');

function extractTitle(markdown) {
    // Try to extract the first H1 heading
    const h1Match = markdown.match(/^#\s+(.+)$/m);
    if (h1Match) {
        return h1Match[1].trim();
    }
    
    // Try to find a line with "Titel" or "Title" followed by content
    const titleMatch = markdown.match(/(?:Titel|Title)[:\s]*\n+(.+)/i);
    if (titleMatch) {
        return titleMatch[1].trim();
    }
    
    // Fallback: use the first non-empty line
    const lines = markdown.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
        return lines[0].trim().replace(/^#+\s*/, ''); // Remove markdown heading markers
    }
    
    return 'Untitled Recipe';
}

function generateRecipesJson() {
    console.log('Generating recipes.json...');
    
    // Create docs/recipes directory if it doesn't exist
    if (!fs.existsSync(DOCS_RECIPES_DIR)) {
        fs.mkdirSync(DOCS_RECIPES_DIR, { recursive: true });
        console.log('Created docs/recipes directory');
    }
    
    // Read all files from the recipes directory
    const files = fs.readdirSync(RECIPES_DIR);
    
    // Filter for markdown files only
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    console.log(`Found ${markdownFiles.length} markdown files`);
    
    const recipes = markdownFiles.map(file => {
        const filePath = path.join(RECIPES_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Copy the markdown file to docs/recipes
        const destPath = path.join(DOCS_RECIPES_DIR, file);
        fs.copyFileSync(filePath, destPath);
        
        // Extract the title from the markdown content
        const title = extractTitle(content);
        
        // Generate a URL-friendly name from the filename (without .md extension)
        const name = file.replace(/\.md$/, '');
        
        console.log(`  - ${file} -> ${title}`);
        
        return {
            name,
            title,
            filename: file
        };
    });
    
    // Sort recipes alphabetically by title
    recipes.sort((a, b) => a.title.localeCompare(b.title, 'da'));
    
    // Write the JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(recipes, null, 2), 'utf-8');
    
    console.log(`\nSuccessfully generated ${OUTPUT_FILE}`);
    console.log(`Copied ${recipes.length} recipe files to ${DOCS_RECIPES_DIR}`);
    console.log(`Total recipes: ${recipes.length}`);
}

// Run the script
try {
    generateRecipesJson();
} catch (error) {
    console.error('Error generating recipes.json:', error);
    process.exit(1);
}
