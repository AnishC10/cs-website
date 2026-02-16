document.addEventListener("DOMContentLoaded", () => {

    const foodNameInput = document.getElementById("foodName");
    const caloriesInput = document.getElementById("calories");
    const foodTypeInput = document.getElementById("foodType");
    const foodList = document.getElementById("foodList");
    const totalCaloriesEl = document.getElementById("totalCalories");
    const addFoodBtn = document.getElementById("addFoodBtn");

    let foods = [];

    // Load saved foods
    const savedFoods = localStorage.getItem("foods");
    if (savedFoods) {
        foods = JSON.parse(savedFoods);
        renderFoods();
    }

    // ===============================
    // Event Listeners
    // ===============================
    addFoodBtn.addEventListener("click", addFood);

    caloriesInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addFood();
        }
    });

    // ===============================
    // Functions
    // ===============================
    function addFood() {
        const name = foodNameInput.value.trim();
        const calories = Number(caloriesInput.value);
        const type = foodTypeInput.value.trim();

        if (!name || calories <= 0) {
            alert("Please enter valid food info.");
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
    }

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
