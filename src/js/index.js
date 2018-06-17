import Search from "./models/Search";

/** Global state of the app
 * - Search Object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes object
 */

const state = {};

const controlSearch = async () => {
    // 1. Get query from view
    const query = "quiche";
  
    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results to UI
        console.log(state.search.result);
    }
};

document.querySelector(".search").addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});
