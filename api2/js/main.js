$(".fa-bars").on("click", function() {
    $(this).toggleClass("fa-xmark");
    $(".sidebar").toggleClass("move");
    $(".sidebar .links ul a").toggleClass("top");
});

$(".loading .loader").fadeOut(3000, function() {
    $(".loading").hide(); 
});

async function fetchMealData() {
    try {
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        let data = await response.json();
        const container = document.querySelector(".my-image");
        let myData = '';

        if (data.meals) {
            data.meals.forEach(meal => {
                myData += `
                <div class="image" onclick="informationMeal('${meal.idMeal}')">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="layer">
                        <h2>${meal.strMeal}</h2>
                    </div>
                </div>
                `;
            });
            container.innerHTML = myData; 
        }
    } catch (error) {
        console.error("Error fetching meals:", error);
    }
}
fetchMealData();

async function informationMeal(mealId) {
    try {
        let container = document.querySelector(".my-image");
        container.innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let data = await response.json();
        let defaultMeal = document.querySelector(".information");
        let myData = "";

        if (data.meals) {
            data.meals.forEach(meal => {
                myData += `
                <div class="info">
                    <div class="image">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <h2>${meal.strMeal}</h2>
                    </div>
                    <div class="instrc">
                        <h3>Instructions</h3>
                        <p>${meal.strInstructions}</p>
                        <h4>Area: ${meal.strArea}</h4>
                        <h5>Category: ${meal.strCategory}</h5>
                        <ul>
                            Ingredients:
                            <li>${meal.strMeasure1}</li>
                            <li>${meal.strMeasure2}</li>
                            <li>${meal.strMeasure3}</li>
                            <li>${meal.strMeasure4}</li>
                            <li>${meal.strMeasure5}</li>
                            <li>${meal.strMeasure6}</li>
                            <li>${meal.strMeasure7}</li>
                        </ul>
                        <div class="my-span">Tags:
                            <span>${meal.strTags}</span>
                            <div>
                                <a href="${meal.strSource}" target="_blank">Source</a>
                                <a href="${meal.strYoutube}" target="_blank">YouTube</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });
            defaultMeal.innerHTML = myData;
        }
    } catch (error) {
        console.error("Error fetching meal information:", error);
    }
}

async function searchName() {
    let query = document.querySelector(".input-name").value; 
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        let data = await response.json();
        const container = document.querySelector(".default");
        let myData = '';

        if (data.meals) {
            data.meals.forEach(search => {
                myData += `
                <div class="image">
                    <img src="${search.strMealThumb}" alt="${search.strMeal}"/>
                    <div class="layer">
                        <h2>${search.strMeal}</h2>
                    </div>
                </div>
                `;
            });
            container.innerHTML = myData;
        }
    } catch (error) {
        console.error("Error in search:", error);
    }
}
document.querySelector(".input-name").addEventListener("input", searchName);

async function searchLetter() {
    let letter = document.querySelector(".input-letter").value; 
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let data = await response.json();
        let container = document.querySelector(".default");
        let myData = '';

        if (data.meals) {
            data.meals.forEach(search => {
                myData += `
                <div class="image">
                    <img src="${search.strMealThumb}" alt="${search.strMeal}"/>
                    <div class="layer">
                        <h2>${search.strMeal}</h2>
                    </div>
                </div>
                `;
            });
            container.innerHTML = myData;
        }
    } catch (error) {
        console.error("Error in search:", error);
    }
}
document.querySelector(".input-letter").addEventListener("input", searchLetter);

async function fetchCategory() {
    try {
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        let data = await response.json();
        let container = document.querySelector(".my-categories");
        let myData = '';

        if (data.categories) {
            data.categories.forEach(category => {
                myData += `
                <div onclick="sameCategory('${category.strCategory}')" class="image">
                    <img src="${category.strCategoryThumb}" alt="${category.strCategory}"/>
                    <div class="layer">
                        <h2>${category.strCategory}</h2>
                        <p>${category.strCategoryDescription.slice(0, 80)}</p>
                    </div>
                </div>
                `;
            });
            container.innerHTML = myData; 
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
fetchCategory();

async function sameCategory(category) {
    try {
        let container = document.querySelector(".my-categories");
        container.innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        let data = await response.json();
        const defaultCategories = document.querySelector(".default");
        let myData = ""; 

        if (data.meals) {
            data.meals.forEach(category => {
                myData += `
                <div class="image">
                    <img src="${category.strMealThumb}" alt="${category.strMeal}"/>
                    <div class="layer">
                        <h2>${category.strMeal}</h2>
                    </div>
                </div>
                `;
            });
            defaultCategories.innerHTML = myData;
        }
    } catch (error) {
        console.error("Error fetching same category:", error);
    }
}

async function areaFetch() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let data = await response.json();
        let container = document.querySelector(".my-area");
        let myData = '';

        if (data.meals) {
            data.meals.forEach(area => {
                myData += `
                <div onclick="sameArea('${area.strArea}')">
                   <i class="fa-solid fa-house-laptop"></i>
                   <h2>${area.strArea}</h2>
                </div>
                `;
            });
            container.innerHTML = myData; 
        }
    } catch (error) {
        console.error("Error fetching areas:", error);
    }
}
areaFetch();
let areaAnchor = document.querySelector(".area");
areaAnchor.addEventListener("click", areaFetch);

async function sameArea(category) {
    try {
        let container = document.querySelector(".my-area");
        container.innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`);
        let data = await response.json();
        let defaultArea = document.querySelector(".default");
        let myData = '';

        if (data.meals) {
            data.meals.forEach(area => {
                myData += `
                <div class="image">
                    <img src="${area.strMealThumb}" alt="${area.strMeal}"/>
                    <div class="layer">
                        <h2>${area.strMeal}</h2>
                    </div>
                </div>
                `;
            });
            defaultArea.innerHTML = myData;
        }
    } catch (error) {
        console.error("Error in sameArea function:", error);
    }
}

async function ingredientFetch() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let data = await response.json();
        let container = document.querySelector(".my-ingredients");
        let myData = '';

        if (data.meals) {
            data.meals.forEach(ingredient => {
                myData += `
                <div onclick="sameIngredient('${ingredient.strIngredient}')" class="image">
                    <h2>${ingredient.strIngredient}</h2>
                </div>
                `;
            });
            container.innerHTML = myData; 
        }
    } catch (error) {
        console.error("Error fetching ingredients:", error);
    }
}
ingredientFetch();
let ingredientAnchor = document.querySelector(".ingredient");
ingredientAnchor.addEventListener("click", ingredientFetch);

async function sameIngredient(ingredient) {
    try {
        let container = document.querySelector(".my-ingredients");
        container.innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        let data = await response.json();
        let defaultIngredient = document.querySelector(".default");
        let myData = '';

        if (data.meals) {
            data.meals.forEach(ingredient => {
                myData += `
                <div class="image">
                    <img src="${ingredient.strMealThumb}" alt="${ingredient.strMeal}"/>
                    <div class="layer">
                        <h2>${ingredient.strMeal}</h2>
                    </div>
                </div>
                `;
            });
            defaultIngredient.innerHTML = myData;
        }
    } catch (error) {
        console.error("Error fetching same ingredient:", error);
    }
}
