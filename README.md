# 🍳 Prompt & Pande

A minimal static recipe site for GitHub Pages.

## About

"Prompt & Pande" (Prompt & Pan) is a simple, cozy recipe website built with plain HTML, CSS, and JavaScript. It features a clean kitchen-inspired design and uses markdown files for easy recipe management.

## Features

- 📝 Markdown-based recipes
- 🎨 Clean, cozy kitchen-themed design
- 📱 Fully responsive
- 🚀 Hosted on GitHub Pages
- 🔧 No build process required

## Structure

```
/docs              - GitHub Pages site
  /recipes         - Recipe markdown files (*.md)
  index.html       - Recipe list page
  recipe.html      - Individual recipe viewer
  recipes.json     - Auto-generated recipe index
  app.js           - Site logic
  styles.css       - Styling
/scripts           - Build scripts
  generate-recipes-json.js - Auto-generates recipes.json from markdown files
```

## Adding Recipes

1. Create a new `.md` file in the `/docs/recipes` folder
2. The file will be automatically discovered and added to the site
3. To update the recipe list, run: `node scripts/generate-recipes-json.js`
4. Commit and push - GitHub Pages will update automatically!

### Recipe Format

Recipes are written in Markdown. The first heading or "Titel" line will be used as the recipe title. Example:

```markdown
# My Delicious Recipe

A brief description of the recipe.

## Ingredients

- 500g ingredient 1
- 2dl ingredient 2

## Instructions

1. Step one
2. Step two
```

## Automatic Updates

The repository includes a GitHub Actions workflow that automatically regenerates `recipes.json` when recipe files are modified on the main branch.

## Local Development

Simply open `/docs/index.html` in your browser, or use a local server:

```bash
cd docs
python -m http.server 8000
# Visit http://localhost:8000
```

## Live Site

Visit the site at: [https://jespervnielsen.github.io/promt-og-pande/](https://jespervnielsen.github.io/promt-og-pande/)

---

Made with ❤️ and good butter
