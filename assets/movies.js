
// Global Variables
var MOVIE_BASE_URL = "https://api.themoviedb.org/3/"; //first
var MOVIE_DISCOVER = "discover/movie?"; //second
var MOVIE_API_KEY = "api_key=aac548d653f3a3b1f0f5134308566f43"; //third

var MOVIE_PAGE_PARAM = "page=";  //optional
var MOVIE_APPEND_TO_RESP = "append_to_response"; //optional

// Used when populating movie genre drop-down list
var MOVIE_GENRE_LIST_URL =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=aac548d653f3a3b1f0f5134308566f43&language=en-US";

var MOVIE_GENRE_PARAM = "with_genres="; //optional
var MOVIE_GENRE_ID = ""; //optional, you can use ',' for AND as well as '|' for OR
var MOVIE_GENRE_NAME = "";

//getGenreList();

// Get or "discover" movies
function getMovie() {
    fetch(MOVIE_BASE_URL + MOVIE_DISCOVER + MOVIE_API_KEY)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data.results);
    });
};

// Get list of movie genres
function getGenreList() {
    fetch(MOVIE_GENRE_LIST_URL)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {        
        for (var i = 0; i < data.genres.length; i++) {
            MOVIE_GENRE_ID = data.genres[i].id;
            MOVIE_GENRE_NAME = data.genres[i].name;
            populateGenreDropDown(MOVIE_GENRE_NAME);
        }
    });
};

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
        console.log(data.results);
    });
};

// Dynamically create and populate drop-down box for movie genres
function populateGenreDropDown(name) {
    var genreName = name;    
    var genreOptionGroup = document.getElementById("genre");
    var optionEl = document.createElement("option");
    optionEl.setAttribute(name = "id", value = "genreOpt");
    optionEl.setAttribute(name = "class", value ='genreOpt');
    optionEl.textContent = genreName;    
    genreOptionGroup.appendChild(optionEl);
};