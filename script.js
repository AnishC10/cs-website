const foodNameInput = document.getElementById("foodName");
const caloriesInput = document.getElementById("calories");
const foodList = document.getElementById("foodList");
const totalCaloriesEl = document.getElementById("totalCalories");
const addFoodBtn = document.getElementById("addFoodBtn");

let foods = [];
const CALORIE_GOAL = 2000;

// ===============================
// Load from localStorage
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const savedFoods = localStorage.getItem("foods");
    if (savedFoods) {
        foods = JSON.parse(savedFoods);
    }
    renderFoods();
});

// ===============================
// Add Food (Button + Enter Key)
// ===============================
addFoodBtn.addEventListener("click", addFood);
caloriesInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addFood();
    }
});

function addFood() {
    const name = foodNameInput.value.trim();
    const calories = parseInt(caloriesInput.value);

    if (!name || isNaN(calories) || calories <= 0) {
        alert("Please enter a valid food name and calorie amount.");
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
}

// ===============================
// Render Foods
// ===============================
function renderFoods() {
    foodList.innerHTML = "";
    let total = 0;

    if (foods.length === 0) {
        foodList.innerHTML = `
            <li class="list-group-item text-center text-muted">
                No foods added yet.
            </li>
        `;
        totalCaloriesEl.textContent = 0;
        return;
    }

    foods.forEach(food => {
        total += food.calories;

        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center";

        const foodText = document.createElement("span");
        foodText.textContent = `${food.name} - ${food.calories} cal`;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-sm btn-danger";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteFood(food.id);
        });

        li.appendChild(foodText);
        li.appendChild(deleteBtn);
        foodList.appendChild(li);
    });

    totalCaloriesEl.textContent = total;

    // Simple goal indicator
    if (total > CALORIE_GOAL) {
        totalCaloriesEl.classList.add("text-danger");
    } else {
        totalCaloriesEl.classList.remove("text-danger");
    }
}

// ===============================
// Delete Food
// ===============================
function deleteFood(id) {
    foods = foods.filter(food => food.id !== id);
    saveFoods();
    renderFoods();
}

// ===============================
// Save to localStorage
// ===============================
function saveFoods() {
    localStorage.setItem("foods", JSON.stringify(foods));
}