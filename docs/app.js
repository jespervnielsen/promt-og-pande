// Simple recipe site JavaScript

// List of available recipes (add more recipes here)
const RECIPES = [
    { name: 'example', title: 'Eksempel Opskrift' }
];

// Initialize the page based on current location
document.addEventListener('DOMContentLoaded', () => {
    const isRecipePage = window.location.pathname.includes('recipe.html');
    
    if (isRecipePage) {
        loadRecipe();
    } else {
        loadRecipeList();
    }
});

// Load and display the list of recipes
function loadRecipeList() {
    const recipesList = document.getElementById('recipes-list');
    
    if (!recipesList) return;
    
    // Clear loading message
    recipesList.innerHTML = '';
    
    // Create recipe cards
    RECIPES.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        
        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <a href="recipe.html?name=${recipe.name}" class="recipe-link">
                Se opskrift →
            </a>
        `;
        
        recipesList.appendChild(card);
    });
}

// Load and display a single recipe
async function loadRecipe() {
    const recipeContent = document.getElementById('recipe-content');
    
    if (!recipeContent) return;
    
    // Get recipe name from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const recipeName = urlParams.get('name');
    
    if (!recipeName) {
        recipeContent.innerHTML = '<p class="error">Ingen opskrift valgt.</p>';
        return;
    }
    
    try {
        // Fetch the markdown file
        // Try relative path first, then absolute path for GitHub Pages
        let response = await fetch(`../recipes/${recipeName}.md`);
        
        // If relative path fails, try absolute path for GitHub Pages
        if (!response.ok) {
            const repoName = window.location.pathname.split('/')[1];
            if (repoName && repoName !== 'recipe.html') {
                response = await fetch(`/${repoName}/recipes/${recipeName}.md`);
            }
        }
        
        if (!response.ok) {
            throw new Error('Opskrift ikke fundet');
        }
        
        const markdown = await response.text();
        
        // Convert markdown to HTML using marked.js
        // Note: This is safe for static sites where recipes are committed to the repo
        // by trusted maintainers. For user-submitted content, sanitization would be required.
        const html = marked.parse(markdown);
        
        recipeContent.innerHTML = html;
        
        // Update page title if there's an h1
        const h1 = recipeContent.querySelector('h1');
        if (h1) {
            document.title = `${h1.textContent} - Promt & Pande`;
        }
        
    } catch (error) {
        recipeContent.innerHTML = `<p class="error">Kunne ikke indlæse opskriften: ${error.message}</p>`;
    }
}
