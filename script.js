const foodNameInput = document.getElementById("foodName");
const caloriesInput = document.getElementById("calories");
const foodList = document.getElementById("foodList");
const totalCaloriesEl = document.getElementById("totalCalories");
const addFoodBtn = document.getElementById("addFoodBtn");



let foods = [];

// Load from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedFoods = localStorage.getItem("foods");
    if (savedFoods) {
        foods = JSON.parse(savedFoods);
        renderFoods();
    }
});

addFoodBtn.addEventListener("click", () => {
    const name = foodNameInput.value.trim();
    const calories = parseInt(caloriesInput.value);

    if (!name || isNaN(calories) || calories <= 0) {
        alert("Please enter valid food name and calorie amount.");
        return;
    }

    const foodItem = {
        id: Date.now(),
        name,
        calories
    };

    foods.push(foodItem);
    saveFoods();
    renderFoods();

    foodNameInput.value = "";
    caloriesInput.value = "";
});

function renderFoods() {
    foodList.innerHTML = "";
    let total = 0;

    foods.forEach(food => {
        total += food.calories;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            ${food.name} - ${food.calories} cal
            <button class="btn btn-sm btn-danger" onclick="deleteFood(${food.id})">Delete</button>
        `;

        foodList.appendChild(li);
    });

    totalCaloriesEl.textContent = total;
}

function deleteFood(id) {
    foods = foods.filter(food => food.id !== id);
    saveFoods();
    renderFoods();
}

function saveFoods() {
    localStorage.setItem("foods", JSON.stringify(foods));
}