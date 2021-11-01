
var edamamIngredientArray = ["chicken", "beef", "pork", "fish", "vegan"];
var edamamIngredient;
var edamamMealType;
var edamamUrl;
var edamamArray = [];

var breakfast = document.getElementById("breakfast");
var lunch = document.getElementById("lunch");
var dinner = document.getElementById("dinner");
var snack = document.getElementById("snack");

function mealTypeAndFetch(mealSelected) {
  edamamIngredient = edamamIngredientArray[Math.trunc(Math.random() * 5)];
  edamamMealType = mealSelected;
  edamamUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + edamamIngredient + "&app_id=ce22d420&app_key=484cfb8615f1c6ea4ed4312af673949f&" + "mealType=" + edamamMealType + "&random=true";

  document.getElementById("meal-dropdown-text").textContent = mealSelected;
};

breakfast.addEventListener('click', mealTypeAndFetch("breakfast"));
lunch.addEventListener('click', mealTypeAndFetch("lunch"));
dinner.addEventListener('click', mealTypeAndFetch("dinner"));
snack.addEventListener('click', mealTypeAndFetch("snack"));
