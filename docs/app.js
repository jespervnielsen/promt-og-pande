// Simple recipe site JavaScript

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
async function loadRecipeList() {
    const recipesList = document.getElementById('recipes-list');
    
    if (!recipesList) return;
    
    try {
        // Fetch the recipes.json file
        const response = await fetch('recipes.json');
        
        if (!response.ok) {
            throw new Error('Kunne ikke indlæse opskriftsliste');
        }
        
        const recipes = await response.json();
        
        // Clear loading message
        recipesList.innerHTML = '';
        
        if (recipes.length === 0) {
            recipesList.innerHTML = '<p class="loading">Ingen opskrifter fundet endnu.</p>';
            return;
        }
        
        // Create recipe cards
        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            
            card.innerHTML = `
                <h3>${recipe.title}</h3>
                <a href="recipe.html?name=${encodeURIComponent(recipe.name)}" class="recipe-link">
                    Se opskrift →
                </a>
            `;
            
            recipesList.appendChild(card);
        });
    } catch (error) {
        recipesList.innerHTML = `<p class="error">Kunne ikke indlæse opskrifter: ${error.message}</p>`;
    }
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
        // Fetch the markdown file from the recipes directory
        const response = await fetch(`recipes/${encodeURIComponent(recipeName)}.md`);
        
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
            document.title = `${h1.textContent} - Prompt & Pande`;
        }
        
    } catch (error) {
        recipeContent.innerHTML = `<p class="error">Kunne ikke indlæse opskriften: ${error.message}</p>`;
    }
}
