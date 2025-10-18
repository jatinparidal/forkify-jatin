import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchVIew from './views/searchVIew.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'regenerator-runtime/runtime'; // polyfilling async/await
import 'core-js/stable'; // polyfilling everything else

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

// *****************
// RECIPE CONTROLLER
// *****************

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Update Bookmark
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError();
  }
};

// controlRecipe();

// *****************
// SEARCH CONTROLLER
// *****************
const controlSearchResults = async function () {
  try {
    // 1) GET SEARCH QUERY
    const query = searchVIew.getQuery();
    if (!query) return;

    // 2) LOAD SEARCH RESULT
    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    // 3) RENDER RESULTS
    resultsView.render(model.getSearchResultsPage());

    // 4) RENDER PAGINATION
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResults();

// ********************
// PAGINATON CONTROLLER
// ********************
const controlPagination = function (goToPage) {
  console.log(goToPage);
  // model.getSearchResultsPage(goToPage);

  // 1) RENDERING NEW RESULTS
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) RENDERING NEW PAGINATION
  paginationView.render(model.state.search);
};

// *****************
// SERVING CONTROLER
// *****************
const controlServings = function (newServing) {
  // 1) Update the recipe serving (in state)
  model.updateServings(newServing);

  // 2) Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

// ******************
// BOOKMARK CONTROLER
// ******************
const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// ********************
// ADD RECIPE CONTROLER
// ********************
const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // used to get the site of that id

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 100);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchVIew.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('Git suru ho gaya bhidu');
};

init();
