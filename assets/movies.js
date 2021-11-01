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
  console.log(mealType);

  var movieGenreInput = document.getElementById("movie-dropdown");
  var movieGenre = movieGenreInput.options[movieGenreInput.selectedIndex].text;
  
  // pass user-selected meal type to function
  //getMealTypeDetails(mealType);

  // pass user-selected movie genre to function
  getMovieDetails(movieGenre);

}

// Get or "discover" movies
function getMovie() {
  fetch(MOVIE_BASE_URL + MOVIE_DISCOVER + MOVIE_API_KEY)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data.results);
    });
}

// Get movie data by Genre ID
function getMovieByGenreId(id) {
  genreId = id;
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
      //console.log(data.results);
      //   return data.results;
      for (i = 0; i < 3; i++) {
        var movieDetailObj = { title: "", overview: "", imgPath: "" };
        movieDetailObj.title = data.results[i].title;
        movieDetailObj.overview = data.results[i].overview;
        movieDetailObj.imgPath = MOVIE_IMG + data.results[i].poster_path;

        var movieResultsEl = document.getElementById("movie-results");

        var movieEl = document.createElement("div");
        movieEl.setAttribute("id", "movie");
        movieEl.setAttribute("class", "row");
        movieResultsEl.appendChild(movieEl);
        
        var movieImgEl = document.createElement("img");
        movieImgEl.setAttribute("id", "movie-img");
        movieImgEl.setAttribute("class", "col s6 m6 l6");
        movieImgEl.setAttribute("src", movieDetailObj.imgPath);
        movieImgEl.setAttribute(
          "alt",
          "Size width is 200 of this poster picture for " + movieDetailObj.title
        );
        movieEl.appendChild(movieImgEl);

        var movieContentEl = document.createElement("div");
        movieContentEl.setAttribute("id", "movie-content");
        movieContentEl.setAttribute("class", "col s6 m6 l6");
        movieEl.appendChild(movieContentEl);

        var movieTitleEl = document.createElement("h3");
        movieTitleEl.setAttribute("id", "movie-title");
        movieTitleEl.textContent = movieDetailObj.title;
        movieContentEl.appendChild(movieTitleEl);

        var movieTextEl = document.createElement("p");
        movieTextEl.setAttribute("id", "movie-text");
        movieTextEl.setAttribute("class", "flow-text");
        movieTextEl.textContent = movieDetailObj.overview;
        movieContentEl.appendChild(movieTextEl);
      }
    });
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
  //displaySearchResults(movieDetailObj);
}

// Dynamically create search result blocks
// function displaySearchResults(obj) {

// };

// event listener for users selections
MEAL_SEARCH_FORM.addEventListener("submit", searchHandler);
