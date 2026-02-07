# 🍳 Promt & Pande

A minimal static recipe site for GitHub Pages.

## About

"Promt & Pande" (Prompt & Pan) is a simple, cozy recipe website built with plain HTML, CSS, and JavaScript. It features a clean kitchen-inspired design and uses markdown files for easy recipe management.

## Features

- 📝 Markdown-based recipes
- 🎨 Clean, cozy kitchen-themed design
- 📱 Fully responsive
- 🚀 Hosted on GitHub Pages
- 🔧 No build process required

## Structure

```
/docs           - GitHub Pages site
  index.html    - Recipe list page
  recipe.html   - Individual recipe viewer
  app.js        - Site logic
  styles.css    - Styling
/recipes        - Recipe markdown files
  example.md    - Sample pancake recipe
```

## Adding Recipes

1. Create a new `.md` file in the `/recipes` folder
2. Add the recipe name to the `RECIPES` array in `/docs/app.js`
3. Commit and push - GitHub Pages will update automatically!

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
