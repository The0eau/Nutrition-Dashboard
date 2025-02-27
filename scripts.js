let calorieChart, sugarChart, proteinChart, carbsChart;


let totalCaloriesBegin;

function loadCSVData(file, selectId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const lines = data.split("\n").filter(line => line.trim() !== "");
            const select = document.getElementById(selectId);

            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Select a food item";
            select.appendChild(defaultOption);

            const foodOptions = [];
            const foodNames = new Set();

            for (let i = 1; i < lines.length; i++) {
                const columns = lines[i].split(",");
                const food = columns[0].trim();
                const calories = parseFloat(columns[2] || 0);
                const sugar = parseFloat(columns[4] || 0);
                const protein = parseFloat(columns[5] || 0);
                const carbs = parseFloat(columns[3] || 0);
                if (food && !foodNames.has(food)) {
                    foodOptions.push({
                        food: food,
                        calories: calories,
                        sugar: sugar,
                        protein: protein,
                        carbs: carbs
                    });
                    foodNames.add(food);
                }
            }

            foodOptions.sort((a, b) => a.food.localeCompare(b.food));

            foodOptions.forEach(item => {
                const option = document.createElement("option");
                option.value = item.food;
                option.textContent = item.food;
                option.dataset.calories = item.calories;
                option.dataset.sugar = item.sugar;
                option.dataset.protein = item.protein;
                option.dataset.carbs = item.carbs;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur lors du chargement du CSV :', error));
}

function updateBarChart() {
    const breakfastSelect1 = document.getElementById("breakfast-select-1");
    const breakfastSelect2 = document.getElementById("breakfast-select-2");
    const breakfastSelect3 = document.getElementById("breakfast-select-3");
    const lunchSelect1 = document.getElementById("lunch-select-1");
    const lunchSelect2 = document.getElementById("lunch-select-2");
    const lunchSelect3 = document.getElementById("lunch-select-3");
    const snackSelect1 = document.getElementById("snack-select-1");
    const snackSelect2 = document.getElementById("snack-select-2");
    const snackSelect3 = document.getElementById("snack-select-3");
    const dinnerSelect1 = document.getElementById("dinner-select-1");
    const dinnerSelect2 = document.getElementById("dinner-select-2");
    const dinnerSelect3 = document.getElementById("dinner-select-3");

    function calculateMealTotal(select1, select2, select3, dataAttribute) {
        const value1 = parseFloat(select1.selectedOptions[0]?.dataset[dataAttribute] || 0);
        const value2 = parseFloat(select2.selectedOptions[0]?.dataset[dataAttribute] || 0);
        const value3 = parseFloat(select3.selectedOptions[0]?.dataset[dataAttribute] || 0);
        return value1 + value2 + value3;
    }

    const breakfastCalories = calculateMealTotal(breakfastSelect1, breakfastSelect2, breakfastSelect3, "calories");
    const lunchCalories = calculateMealTotal(lunchSelect1, lunchSelect2, lunchSelect3, "calories");
    const snackCalories = calculateMealTotal(snackSelect1, snackSelect2, snackSelect3, "calories");
    const dinnerCalories = calculateMealTotal(dinnerSelect1, dinnerSelect2, dinnerSelect3, "calories");

    const breakfastSugar = calculateMealTotal(breakfastSelect1, breakfastSelect2, breakfastSelect3, "sugar");
    const lunchSugar = calculateMealTotal(lunchSelect1, lunchSelect2, lunchSelect3, "sugar");
    const snackSugar = calculateMealTotal(snackSelect1, snackSelect2, snackSelect3, "sugar");
    const dinnerSugar = calculateMealTotal(dinnerSelect1, dinnerSelect2, dinnerSelect3, "sugar");

    const breakfastProtein = calculateMealTotal(breakfastSelect1, breakfastSelect2, breakfastSelect3, "protein");
    const lunchProtein = calculateMealTotal(lunchSelect1, lunchSelect2, lunchSelect3, "protein");
    const snackProtein = calculateMealTotal(snackSelect1, snackSelect2, snackSelect3, "protein");
    const dinnerProtein = calculateMealTotal(dinnerSelect1, dinnerSelect2, dinnerSelect3, "protein");

    const breakfastCarbs = calculateMealTotal(breakfastSelect1, breakfastSelect2, breakfastSelect3, "carbs");
    const lunchCarbs = calculateMealTotal(lunchSelect1, lunchSelect2, lunchSelect3, "carbs");
    const snackCarbs = calculateMealTotal(snackSelect1, snackSelect2, snackSelect3, "carbs");
    const dinnerCarbs = calculateMealTotal(dinnerSelect1, dinnerSelect2, dinnerSelect3, "carbs");

    calorieChart.data.datasets[0].data = [breakfastCalories, lunchCalories, snackCalories, dinnerCalories];
    sugarChart.data.datasets[0].data = [breakfastSugar, lunchSugar, snackSugar, dinnerSugar];
    proteinChart.data.datasets[0].data = [breakfastProtein, lunchProtein, snackProtein, dinnerProtein];
    carbsChart.data.datasets[0].data = [breakfastCarbs, lunchCarbs, snackCarbs, dinnerCarbs];

    calorieChart.update();
    sugarChart.update();
    proteinChart.update();
    carbsChart.update();

    const totalCalories = breakfastCalories + lunchCalories + snackCalories + dinnerCalories;
    document.querySelector(".row-1 .box:first-child").textContent = `Total required calories: ${totalCalories}/${totalCaloriesBegin} kcal`;
}

function goToInitialMenu() {
    document.getElementById("initial-menu").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const initialMenu = document.getElementById("initial-menu");
    const dashboard = document.getElementById("dashboard");
    const calculateCaloriesButton = document.getElementById("calculate-calories");
    const totalCaloriesDisplay = document.getElementById("total-calories-display");

    calculateCaloriesButton.addEventListener("click", function() {
        const gender = document.getElementById("gender").value;
        const age = parseInt(document.getElementById("age").value);
        const weight = parseFloat(document.getElementById("weight").value);
        if (gender === "female") {
            if (age >= 0 && age < 3) {
                totalCaloriesBegin = (58.317 * weight) - 31.1;
            } else if (age >= 3 && age < 10) {
                totalCaloriesBegin = (20.315 * weight) + 485.9;
            } else if (age >= 10 && age < 18) {
                totalCaloriesBegin = (13.384 * weight) + 692.6;
            } else if (age >= 18 && age < 30) {
                totalCaloriesBegin = (14.818 * weight) + 486.6;
            } else if (age >= 30 && age < 60) {
                totalCaloriesBegin = (8.126 * weight) + 845.6;
            } else {
                totalCaloriesBegin = (9.082 * weight) + 658.5;
            }
        } else {
            if (age >= 0 && age < 3) {
                totalCaloriesBegin = (59.512 * weight) - 30.4;
            } else if (age >= 3 && age < 10) {
                totalCaloriesBegin = (22.706 * weight) + 504.3;
            } else if (age >= 10 && age < 18) {
                totalCaloriesBegin = (17.686 * weight) + 658.2;
            } else if (age >= 18 && age < 30) {
                totalCaloriesBegin = (15.057 * weight) + 692.2;
            } else if (age >= 30 && age < 60) {
                totalCaloriesBegin = (11.472 * weight) + 873.1;
            } else {
                totalCaloriesBegin = (11.711 * weight) + 587.7;
            }
        }

        // Modification de l'attribut onclick du bouton "Back"
         document.querySelector(".row-1 .box:last-child button").setAttribute("onclick", "goToInitialMenu()");

        totalCaloriesDisplay.textContent = `Total required calories: ${totalCaloriesBegin} kcal`;
        initialMenu.style.display = "none";
        dashboard.style.display = "grid";

        loadCSVData("Beakfast.csv", "breakfast-select-1");
        loadCSVData("Breakfast.csv", "breakfast-select-2");
        loadCSVData("Breakfast.csv", "breakfast-select-3");
        loadCSVData("Lunch.csv", "lunch-select-1");
        loadCSVData("Lunch.csv", "lunch-select-2");
        loadCSVData("Lunch.csv", "lunch-select-3");
        loadCSVData("Snack.csv", "snack-select-1");
        loadCSVData("Snack.csv", "snack-select-2");
        loadCSVData("Snack.csv", "snack-select-3");
        loadCSVData("Dinner.csv", "dinner-select-1");
        loadCSVData("Dinner.csv", "dinner-select-2");
        loadCSVData("Dinner.csv", "dinner-select-3");

        const calorieCtx = document.getElementById("calorieChart").getContext("2d");
        calorieChart = new Chart(calorieCtx, {
            type: 'bar',
            data: {
                labels: ["Breakfast", "Lunch", "Snack", "Dinner"],
                datasets: [{
                    label: 'Calories per Meal',
                    data: [0, 0, 0, 0],
                    backgroundColor: ['skyblue', 'lightcoral', 'lightgreen', 'yellow'],
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Calories'
                        }
                    }
                }
            }
        });

        const sugarCtx = document.getElementById("sugarChart").getContext("2d");
        sugarChart = new Chart(sugarCtx, {
            type: 'bar',
            data: {
                labels: ["Breakfast", "Lunch", "Snack", "Dinner"],
                datasets: [{
                    label: 'Sugar (g)',
                    data: [0, 0, 0, 0],
                    backgroundColor: ['lightpink', 'orange', 'lightblue', 'violet'],
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Sugar (g)'
                        }
                    }
                }
            }
        });

        const proteinCtx = document.getElementById("proteinChart").getContext("2d");
        proteinChart = new Chart(proteinCtx, {
            type: 'bar',
            data: {
                labels: ["Breakfast", "Lunch", "Snack", "Dinner"],
                datasets: [{
                    label: 'Proteins (g)',
                    data: [0, 0, 0, 0],
                    backgroundColor: ['lightseagreen', 'brown', 'gold', 'coral'],
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Proteins (g)'
                        }
                    }
                }
            }
        });

        const carbsCtx = document.getElementById("carbsChart").getContext("2d");
        carbsChart = new Chart(carbsCtx, {
            type: 'bar',
            data: {
                labels: ["Breakfast", "Lunch", "Snack", "Dinner"],
                datasets: [{
                    label: 'Carbs (g)',
                    data: [0, 0, 0, 0],
                    backgroundColor: ['lightsalmon', 'darkkhaki', 'darkcyan', 'darkorange'],
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Carbs (g)'
                        }
                    }
                }
            }
        });

        document.getElementById("breakfast-select-1").addEventListener("change", updateBarChart);
        document.getElementById("breakfast-select-2").addEventListener("change", updateBarChart);
        document.getElementById("breakfast-select-3").addEventListener("change", updateBarChart);
        document.getElementById("lunch-select-1").addEventListener("change", updateBarChart);
        document.getElementById("lunch-select-2").addEventListener("change", updateBarChart);
        document.getElementById("lunch-select-3").addEventListener("change", updateBarChart);
        document.getElementById("snack-select-1").addEventListener("change", updateBarChart);
        document.getElementById("snack-select-2").addEventListener("change", updateBarChart);
        document.getElementById("snack-select-3").addEventListener("change", updateBarChart);
        document.getElementById("dinner-select-1").addEventListener("change", updateBarChart);
        document.getElementById("dinner-select-2").addEventListener("change", updateBarChart);
        document.getElementById("dinner-select-3").addEventListener("change", updateBarChart);
    });
});