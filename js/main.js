let mealData = document.getElementById("mealData");
let category = document.querySelector(".nav-tab li.category");
let area = document.querySelector(".nav-tab li.area");
let ingredient = document.querySelector(".nav-tab li.ingredient");
let contact = document.querySelector(".nav-tab li.contact");
let submitBtn;

let searchInput = document.querySelector(".nav-tab li.searchInput");
let searchRow = document.querySelector("#searchRow");

jQuery(() => {
  $(".loading-screen").fadeOut(500);
  $("body").css({ overflow: "auto" });
});

// ****************** sid-nav-menu ****************
function openNave() {
  $(".sid-nav-menu").animate({ left: 0 }, 500);
  $(".open-close").removeClass("fa-align-justify");
  $(".open-close").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: 0 }, (i + 6) * 100);
  }
}
function closeNave() {
  let navWidth = $(".sid-nav-menu .nav-tab").outerWidth();
  $(".sid-nav-menu").animate({ left: -navWidth }, 500);
  $(".open-close").addClass("fa-align-justify");
  $(".open-close").removeClass("fa-x");
  $(".links li").animate({ top: 300 }, 500);
}
closeNave();
$(".sid-nav-menu i.open-close").on("click", function () {
  $(".sid-nav-menu ").toggle();
  if ($(".sid-nav-menu").css("left") == "0px") {
    closeNave();
  } else {
    openNave();
  }
});

// *** display data *******//

function displayMeals(arr) {
  let box = ``;
  for (let i = 0; i < arr.length; i++) {
    box += `
       <div class="col-md-3">
       <div onclick="getMealDetails('${arr[i].idMeal}')" class="inner cursor rounded-2 position-relative overflow-hidden">
           <img class="w-100" src=" ${arr[i].strMealThumb}" alt="">
           <div class="inner-layer position-absolute  d-flex align-items-center p-2">
               <h3>${arr[i].strMeal}</h3>
           </div>
       </div>
   </div>`;
  }
  mealData.innerHTML = box;
}
searchByName("");

//*******   git category */
category.addEventListener("click", function () {
  gitCategory();
  closeNave();
});
async function gitCategory() {
  mealData.innerHTML = "";
  $(".new-loading-screen").fadeIn(300);

  searchRow.innerHTML = "";
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  response = await response.json();
  displayCategory(response.categories);
}
function displayCategory(arr) {
  let box = ``;
  for (let i = 0; i < arr.length; i++) {
    box += `
       <div class="col-md-3">
       <div onclick="getCategoryMeals('${
         arr[i].strCategory
       }')" class="inner cursor rounded-2 position-relative overflow-hidden">
       <img class="w-100" src=" ${arr[i].strCategoryThumb}" alt="">
       <div class="inner-layer position-absolute text-center   p-2">
       <h3 class="pt-4">${arr[i].strCategory}</h3>
       <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
       </div>
       </div>
       </div>`;
  }
  mealData.innerHTML = box;
}

//*******   git area */

area.addEventListener("click", function () {
  gitArea();
});
async function gitArea() {
  closeNave();
  mealData.innerHTML = "";
  $(".new-loading-screen").fadeIn(300);

  searchRow.innerHTML = "";

  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  response = await response.json();
  displayArea(response.meals);
  $(".new-loading-screen").fadeOut(300);
}
function displayArea(arr) {
  let box = ``;
  for (let i = 0; i < arr.length; i++) {
    box += `
          <div class="col-md-3">
          <div onClick="getAreaMeals('${arr[i].strArea} ')" class="cursor rounded-2 text-center text-white ">
          <i class="fa-4x  text-white fa-solid fa-house-laptop"></i>
   
          <h3>${arr[i].strArea}</h3>
        
          </div>
          </div>`;
  }
  mealData.innerHTML = box;
}

//*******   git ingredient */

ingredient.addEventListener("click", function () {
  gitIngredient();
  closeNave();
});
async function gitIngredient() {
  mealData.innerHTML = "";
  $(".new-loading-screen").fadeIn(300);

  searchRow.innerHTML = "";
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  response = await response.json();
  displayIngredient(response.meals.slice(0, 20));
  $(".new-loading-screen").fadeOut(300);
}
function displayIngredient(arr) {
  let box = ``;
  for (let i = 0; i < arr.length; i++) {
    box += `
          <div class="col-md-3">
          <div onClick="getIngredientsMeals('${
            arr[i].strIngredient
          }')" class=" rounded-2 text-center text-white cursor">
          <i class="fa-4x text-white fa-solid fa-drumstick-bite  "></i>
   
          <h3>${arr[i].strIngredient}</h3>
          <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        
          </div>
          </div>`;
  }
  mealData.innerHTML = box;
}

//*******   git category meals */
async function getCategoryMeals(termCategory) {
  mealData.innerHTML = "";
  $(".new-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${termCategory}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
  $(".new-loading-screen").fadeOut(300);
}

//*******   git area meals */
async function getAreaMeals(termArea) {
  mealData.innerHTML = "";
  $(".new-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${termArea}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
  $(".new-loading-screen").fadeOut(300);
}

//*******   git ingredient meals */
async function getIngredientsMeals(termIngredients) {
  mealData.innerHTML = "";
  $(".new-loading-screen").fadeIn(500);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${termIngredients}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
  $(".new-loading-screen").fadeOut(300);
}

//&&&&&& getMealDetails and displayMealDetails start ///////

async function getMealDetails(id) {
  closeNave();

  mealData.innerHTML = "";
  $(".new-loading-screen").fadeIn(300);

  searchRow.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  response = await response.json();

  displayMealDetails(response.meals[0]);
  $(".new-loading-screen").fadeOut(300);
}

function displayMealDetails(meal) {
  searchRow.innerHTML = "";

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
   if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
          <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let box = `
      <div class="col-md-4 text-white">
                  <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                      alt="">
                      <h2>${meal.strMeal}</h2>
              </div>
              <div class="col-md-8 text-white">
                  <h2>Instructions</h2>
                  <p>${meal.strInstructions}</p>
                  <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                  <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                  <h3>Recipes :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${ingredients}
                  </ul>
  
                  <h3>Tags :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${tagsStr}
                  </ul>
  
                  <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                  <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
              </div>`;

  mealData.innerHTML = box;
}
//&&&&&& getMealDetails and displayMealDetails end ///////

//***** show search inputs */

searchInput.addEventListener("click", function () {
  searchRow.innerHTML = `
      <div class="col-md-6 placeholderWight">
      <input onkeyup="searchByName(this.value)" class=" bg-transparent form-control  text-white " type="text" placeholder="&#xF002; Search By Name..."style="font-family:Arial, FontAwesome"></input>
  </div>
  <div class="col-md-6 placeholderWight">                                                                                                 
      <input onkeyup="searchByLitter(this.value)" maxlength="1" class=" bg-transparent form-control text-white " type="text" placeholder="&#xF002; Search By First Litter..."style="font-family:Arial, FontAwesome"></input>
   </div>
      `;
  mealData.innerHTML = "";
  closeNave();
});
//********************searchByName********* */
async function searchByName(term) {
  closeNave();

  mealData.innerHTML = "";
  $(".new-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  if (response.meals == null) {
    displayMeals = [];
  } else {
    displayMeals(response.meals);
    $(".new-loading-screen").fadeOut(300);
  }
}

//********************searchByLitter********* */

async function searchByLitter(term) {
  closeNave();

  mealData.innerHTML = "";
  $(".new-loading-screen").fadeIn(500);
  if (term == "") {
    term = "f";
  }

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  displayMeals(response.meals);
  $(".new-loading-screen").fadeOut(300);
}

//********************show contactUS********* */

contact.addEventListener("click", () => {
  closeNave();
  mealData.innerHTML = `
  <section>
  <div class="contactUS text-center vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 mx-auto" text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control  " placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age Up to 90 years
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="rePasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="RePassword">
              <div id="rePasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid rePassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> 
</section> 
  
       `;
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("rePasswordInput").addEventListener("focus", () => {
    rePasswordInputTouched = true;
  });
});

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("nameInput").classList.add("is-valid");
      document.getElementById("nameInput").classList.remove("is-invalid");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("nameInput").classList.add("is-invalid");
      document.getElementById("nameInput").classList.remove("is-valid");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("emailInput").classList.add("is-valid");
      document.getElementById("emailInput").classList.remove("is-invalid");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("emailInput").classList.add("is-invalid");
      document.getElementById("emailInput").classList.remove("is-valid");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("phoneInput").classList.add("is-valid");
      document.getElementById("phoneInput").classList.remove("is-invalid");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("phoneInput").classList.add("is-invalid");
      document.getElementById("phoneInput").classList.remove("is-valid");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("ageInput").classList.add("is-valid");
      document.getElementById("ageInput").classList.remove("is-invalid");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("ageInput").classList.add("is-invalid");
      document.getElementById("ageInput").classList.remove("is-valid");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("passwordInput").classList.add("is-valid");
      document.getElementById("passwordInput").classList.remove("is-invalid");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("passwordInput").classList.add("is-invalid");
      document.getElementById("passwordInput").classList.remove("is-valid");
    }
  }
  if (rePasswordInputTouched) {
    if (rePasswordValidation()) {
      document
        .getElementById("rePasswordAlert")
        .classList.replace("d-block", "d-none");
      document.getElementById("rePasswordInput").classList.add("is-valid");
      document.getElementById("rePasswordInput").classList.remove("is-invalid");
    } else {
      document
        .getElementById("rePasswordAlert")
        .classList.replace("d-none", "d-block");
      document.getElementById("rePasswordInput").classList.add("is-invalid");
      document.getElementById("rePasswordInput").classList.remove("is-valid");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    rePasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
//Name  validation
function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}
//Email  validation
function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}
//Phone number validation
function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}
//age number validation
function ageValidation() {
  return /^(0?[1-9]|[1-8][0-9]|90)$/.test(
    document.getElementById("ageInput").value
  );
}
//Password validation
function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}
//Confirm password validation
function rePasswordValidation() {
  return (
    document.getElementById("rePasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
