document.addEventListener("DOMContentLoaded", () => {

    const foodNameInput = document.getElementById("foodName");
    const caloriesInput = document.getElementById("calories");
    const foodList = document.getElementById("foodList");
    const totalCaloriesEl = document.getElementById("totalCalories");
    const addFoodBtn = document.getElementById("addFoodBtn");
    const foodTypeInput = document.getElementById("foodType");

    let foods = [];

    // Load saved data
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

    addFoodBtn.addEventListener("click", () => {
        const name = foodNameInput.value.trim();
        const calories = parseInt(caloriesInput.value);
        const type = foodTypeInput.value.trim();

        if (!name || isNaN(calories) || calories <= 0) {
            alert("Please enter valid food name and calorie amount.");
            return;
        }

        foods.push({
            id: Date.now(),
            name,
            calories,
            type
        });

        saveFoods();
        renderFoods();

        foodNameInput.value = "";
        caloriesInput.value = "";
        foodTypeInput.value = "";
    });

    function renderFoods() {
        foodList.innerHTML = "";
        let total = 0;

        foods.forEach(food => {
            total += food.calories;

            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";

            li.innerHTML = `
                ${food.name} (${food.type}) - ${food.calories} cal
                <button class="btn btn-sm btn-danger">Delete</button>
            `;

            li.querySelector("button").addEventListener("click", () => {
                deleteFood(food.id);
            });

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
});
