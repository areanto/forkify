import {
    elements
} from "./base";

import truncate from 'lodash/truncate';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = "";
};
export const clearResults = () => {
    elements.searchResultsList.innerHTML = "";
    elements.searchResultsPages.innerHTML = "";
};

export const hightlightActive = id => {
    const arrRes = Array.from(document.querySelectorAll(".results__link"));
    arrRes.forEach(el => {
        el.classList.remove("results__link--active");
    });
    document
        .querySelector(`.results__link[href="#${id}"]`)
        .classList.add("results__link--active");
};


const renderRecipe = recipe => {
    const markup = `
  <li>
    <a class="results__link" href="#${recipe.recipe_id}">
    <figure class="results__fig">
        <img src="${recipe.image_url}" alt="${recipe.title}">
    </figure>
    <div class="results__data">
        <h4 class="results__name">${truncate(recipe.title,{'length':17})}</h4>
        <p class="results__author">${recipe.publisher}</p>
    </div>
    </a>
  </li>
  `;

    elements.searchResultsList.insertAdjacentHTML("beforeend", markup);
};

const createButton = (page, type) =>
    `
  <button class="btn-inline results__btn--${type}" data-goto=${
    type === "prev" ? page - 1 : page + 1
  }>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${
            type === "prev" ? "left" : "right"
          }"></use>
      </svg>
      <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
  </button>
  `;
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;

    if (page === 1 && pages > 1) {
        // Show only the button to next page
        button = createButton(page, "next");
    } else if (page < pages) {
        // Show two buttons - back and next
        button = `
    ${createButton(page, "prev")}
    ${createButton(page, "next")}
    `;
    } else if (page === pages && pages > 1) {
        // Show only button to go back
        button = createButton(page, "prev");
    }
    elements.searchResultsPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resPerPage);
};