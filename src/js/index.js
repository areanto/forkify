import Search from "./models/Search";
import Recipe from "./models/Recipe";
import {
    elements,
    renderLoader,
    clearLoader
} from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";

const state = {};

// SEARCH CONTROLLER

const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
    if (query) {
        // 2. New search object and add it to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results to the UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResultsPages.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();

        searchView.renderResults(state.search.result, goToPage);
    }

})

// RECIPE CONTROLLER

const controlRecipe = async () => {
    // Get recipe ID from url
    const id = window.location.hash.replace("#", "");

    if (id) {
        // Prepare UI for results
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();

            // Parsing Ingredients Text
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            console.log(state.recipe);
        } catch (error) {
            alert("Error in Recipeview");
        }

        // Render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);
    }
};

// fire controlrecipe if the hashchange or on pageload
["hashchange", "load"].forEach(event => addEventListener(event, controlRecipe));