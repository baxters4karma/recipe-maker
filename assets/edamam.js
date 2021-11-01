
var edamamIngredientArray = ["chicken", "beef", "pork", "fish", "vegan"];
var edamamIngredient;
var edamamMealType;
var edamamUrl;
var edamamArray = [];

var breakfast = document.getElementById("breakfast");
var lunch = document.getElementById("lunch");
var dinner = document.getElementById("dinner");
var snack = document.getElementById("snack");
var submitBtn = document.getElementById("submitBtn");


function mealTypeAndFetch(mealSelected) {
  edamamIngredient = edamamIngredientArray[Math.trunc(Math.random() * 5)];
  edamamMealType = mealSelected;
  edamamUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + edamamIngredient + "&app_id=ce22d420&app_key=484cfb8615f1c6ea4ed4312af673949f&" + "mealType=" + edamamMealType + "&random=true";

  document.getElementById("meal-dropdown-text").textContent = mealSelected;

  fetch(edamamUrl)
    .then(function (response) {
      return response.json()
        .then(function (data) {
          edamamArray = data;
        });
    });
};

function submitRun() {
  for (var i = 0; i < 3; i++) {
    document.getElementById("mealPic" + i).src = edamamArray["hits"][i]["recipe"]["image"];
    document.getElementById("mealPic" + i).textContent = edamamArray["hits"][i]["recipe"]["label"];
  }
};

breakfast.addEventListener('click', function () { mealTypeAndFetch("breakfast"); });
lunch.addEventListener('click', function () { mealTypeAndFetch("lunch"); });
dinner.addEventListener('click', function () { mealTypeAndFetch("dinner"); });
snack.addEventListener('click', function () { mealTypeAndFetch("snack"); });

submitBtn.addEventListener('click', function () { submitRun(); });
