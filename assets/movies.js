// Global Variables
var MOVIE_BASE_URL = "https://api.themoviedb.org/3/"; //first
var MOVIE_DISCOVER = "discover/movie?"; //second
var MOVIE_API_KEY = "api_key=aac548d653f3a3b1f0f5134308566f43"; //third

var MOVIE_IMG = "https://image.tmdb.org/t/p/w200";

var MOVIE_PAGE_PARAM = "page="; //optional
var MOVIE_APPEND_TO_RESP = "append_to_response"; //optional

// Used when populating movie genre drop-down list
var MOVIE_GENRE_LIST_URL =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=aac548d653f3a3b1f0f5134308566f43&language=en-US";

var MOVIE_GENRE_PARAM = "with_genres="; //optional
var MOVIE_GENRE_ID = ""; //optional, you can use ',' for AND as well as '|' for OR
var MOVIE_GENRE_NAME = "";
// var MOVIE_GENRE_LIST = { id: "", name: "" };
var MOVIE_GENRE_LIST = { id: "", name: "" },
  genreArr = [];

var MEAL_SEARCH_FORM = document.querySelector("#mealSearch");

// capture users selections for meal type and movie genre
function searchHandler(event) {
  event.preventDefault();

  var mealTypeInput = document.getElementById("meal-type");
  var mealType = mealTypeInput.options[mealTypeInput.selectedIndex].text;

  var movieGenreInput = document.getElementById("movie-dropdown");
  var movieGenre = movieGenreInput.options[movieGenreInput.selectedIndex].text;

  // pass user-selected meal type to function
  getMealTypeDetails(mealType);

  // pass user-selected movie genre to function
  getMovieDetails(movieGenre);

}

// Get recipe data
function getMealTypeDetails(userSelection) {
  var mealType = userSelection;
  var searchType = "recipe";

  var recipeBaseUrl = "https://api.edamam.com/";
  var recipeSearch = "api/recipes/v2?type=public&q=" + mealType;
  var recipeAppId = "&app_id=0f5760c9";
  var recipeAppKey = "&app_key=238498a4e517362b8c1dbeaa365400b9";
  var recipeParams =
    "&imageSize=THUMBNAIL&field=label&field=image&field=source&field=url&field=yield&field=ingredientLines";
  var requestUrl = recipeBaseUrl + recipeSearch + recipeAppId + recipeAppKey + recipeParams + "&random=true";


  fetch(requestUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      for (i = 0; i < 3; i++) {
        var detailObj = [],
          recipe = { title: "", overview: "", imgPath: "", link: "" };
        detailObj.title = data.hits[i].recipe.label;
        detailObj.overview = data.hits[i].recipe.ingredientLines;
        detailObj.imgPath = data.hits[i].recipe.image;
        detailObj.link = data.hits[i].recipe.url;
        displaySearchResults(detailObj, searchType);
      }
    });
}

// Get movie data by Genre ID
function getMovieByGenreId(id) {
  var genreId = id;
  var searchType = "movie";
  fetch(
    MOVIE_BASE_URL +
    MOVIE_DISCOVER +
    MOVIE_API_KEY +
    "&" +
    MOVIE_GENRE_PARAM +
    genreId
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      for (i = 0; i < 3; i++) {
        var detailObj = { title: "", overview: "", imgPath: "" };
        detailObj.title = data.results[i].title;
        detailObj.overview = data.results[i].overview;
        detailObj.imgPath = MOVIE_IMG + data.results[i].poster_path;
        displaySearchResults(detailObj, searchType);
      }
    });
}

// dynamically creating and/or building the HTML that
// will hold the search display results
function displaySearchResults(detailObj, searchType) {

  // variable to hold search type as defined in fetch/get call
  var searchResultsType = searchType;

  // set id values specific to search type ('movie' or 'recipe')
  if (searchResultsType === "movie") {
    var resultsElId = "movie-results";
    var divTypeElId = "movie";
    var imgElId = "movie-img";
    var contentElId = "movie-content";
    var titleElId = "movie-title";
    var textElId = "movie-text";
  } else {
    var resultsElId = "recipe-results";
    var divTypeElId = "recipe";
    var imgElId = "recipe-img";
    var contentElId = "recipe-content";
    var titleElId = "recipe-title";
    var textElId = "recipe-text";
  }

  // getting DOM div element to begin dynamic creation of search results
  var resultsEl = document.getElementById(resultsElId);

  // dynamically creating and appending movie/recipe div
  // that holds image and content and setting needed attributes
  var divTypeEl = document.createElement("div");
  divTypeEl.setAttribute("id", divTypeElId);
  divTypeEl.setAttribute("class", "row");
  resultsEl.appendChild(divTypeEl);

  // dynamically creating and appending movie/recipe img tags
  // and setting needed attributes
  var imgEl = document.createElement("img");
  imgEl.setAttribute("id", imgElId);
  imgEl.setAttribute("class", "col s6 m6 l6");
  imgEl.setAttribute("src", detailObj.imgPath);
  imgEl.setAttribute(
    "alt",
    "Size width is 200 of this poster picture for " + detailObj.title
  );
  divTypeEl.appendChild(imgEl);

  // dynamically creating and appending movie/recipe content div
  // that holds title and text and setting needed attributes
  var contentEl = document.createElement("div");
  contentEl.setAttribute("id", contentElId);
  contentEl.setAttribute("class", "col s6 m6 l6");
  divTypeEl.appendChild(contentEl);

  // dynamically creating and appending movie/recipe title
  // and setting needed attributes
  var titleEl = document.createElement("h3");
  titleEl.setAttribute("id", titleElId);
  titleEl.textContent = detailObj.title;
  contentEl.appendChild(titleEl);

  // dynamically creating and appending movie/recipe text
  // and setting needed attributes
  var textEl = document.createElement("p");
  textEl.setAttribute("id", textElId);
  textEl.setAttribute("class", "flow-text");
  textEl.textContent = detailObj.overview;
  contentEl.appendChild(textEl);

  var textEl = document.createElement("p");
  textEl.setAttribute("id", textElId);
  textEl.setAttribute("class", "flow-text");
  textEl.textContent = detailObj.link;
  contentEl.appendChild(textEl);
}

// Receive user movie type selection, return movie details
function getMovieDetails(userSelection) {
  var userGenre = userSelection;
  var genreId = "";
  var genreName = "";
  switch (userGenre) {
    case "Action":
      genreId = 28;
      genreName = "Action";
      break;
    case "Adventure":
      genreId = 12;
      genreName = "Adventure";
      break;
    case "Animation":
      genreId = 16;
      genreName = "Animation";
      break;
    case "Comedy":
      genreId = 35;
      genreName = "Comedy";
      break;
    case "Crime":
      genreId = 80;
      genreName = "Crime";
      break;
    case "Documentary":
      genreId = 99;
      genreName = "Documentary";
      break;
    case "Drama":
      genreId = 18;
      genreName = "Drama";
      break;
  }

  // pass genre ID of user selected genre to API call
  getMovieByGenreId(genreId);

}

// event listener for users selections
MEAL_SEARCH_FORM.addEventListener("submit", searchHandler);
