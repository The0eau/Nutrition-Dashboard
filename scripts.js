let calorieChart, sugarChart, proteinChart, carbsChart, calorieGraph;


let breakfastCalories = 0;
let lunchCalories = 0;
let snackCalories = 0;
let dinnerCalories = 0;

let breakfastSugar = 0;
let lunchSugar = 0;
let snackSugar = 0;
let dinnerSugar = 0;

let breakfastProtein = 0;
let lunchProtein = 0;
let snackProtein = 0;
let dinnerProtein = 0;

let breakfastCarbs = 0;
let lunchCarbs = 0;
let snackCarbs = 0;
let dinnerCarbs = 0;

let totalCalories = 0;
let totalSugar = 0;
let totalProtein = 0;
let totalCarbs = 0;

let indice = false;

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

function updateCalorieChart(breakfast, lunch, snack, dinner) {
    cumulativeCalories = 0;
    let calorieData1 = []; 
    calorieData1[0] = (cumulativeCalories += breakfast);
    calorieData1[1] = (cumulativeCalories += lunch);
    calorieData1[2] = (cumulativeCalories += snack);
    calorieData1[3] = (cumulativeCalories += dinner);
    calorieData1[4] = cumulativeCalories; // Total à minuit

    calorieGraph.data.datasets[0].data = calorieData1;
    calorieGraph.update();
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

    breakfastCalories = calculateMealTotal(breakfastSelect1, breakfastSelect2, breakfastSelect3, "calories");
    lunchCalories = calculateMealTotal(lunchSelect1, lunchSelect2, lunchSelect3, "calories");
    snackCalories = calculateMealTotal(snackSelect1, snackSelect2, snackSelect3, "calories");
    dinnerCalories = calculateMealTotal(dinnerSelect1, dinnerSelect2, dinnerSelect3, "calories");

    breakfastSugar = calculateMealTotal(breakfastSelect1, breakfastSelect2, breakfastSelect3, "sugar");
    lunchSugar = calculateMealTotal(lunchSelect1, lunchSelect2, lunchSelect3, "sugar");
    snackSugar = calculateMealTotal(snackSelect1, snackSelect2, snackSelect3, "sugar");
    dinnerSugar = calculateMealTotal(dinnerSelect1, dinnerSelect2, dinnerSelect3, "sugar");

    breakfastProtein = calculateMealTotal(breakfastSelect1, breakfastSelect2, breakfastSelect3, "protein");
    lunchProtein = calculateMealTotal(lunchSelect1, lunchSelect2, lunchSelect3, "protein");
    snackProtein = calculateMealTotal(snackSelect1, snackSelect2, snackSelect3, "protein");
    dinnerProtein = calculateMealTotal(dinnerSelect1, dinnerSelect2, dinnerSelect3, "protein");

    breakfastCarbs = calculateMealTotal(breakfastSelect1, breakfastSelect2, breakfastSelect3, "carbs");
    lunchCarbs = calculateMealTotal(lunchSelect1, lunchSelect2, lunchSelect3, "carbs");
    snackCarbs = calculateMealTotal(snackSelect1, snackSelect2, snackSelect3, "carbs");
    dinnerCarbs = calculateMealTotal(dinnerSelect1, dinnerSelect2, dinnerSelect3, "carbs");

    calorieChart.data.datasets[0].data = [breakfastCalories, lunchCalories, snackCalories, dinnerCalories];
    sugarChart.data.datasets[0].data = [breakfastSugar, lunchSugar, snackSugar, dinnerSugar];
    proteinChart.data.datasets[0].data = [breakfastProtein, lunchProtein, snackProtein, dinnerProtein];
    carbsChart.data.datasets[0].data = [breakfastCarbs, lunchCarbs, snackCarbs, dinnerCarbs];

    updateCalorieChart(breakfastCalories, lunchCalories, snackCalories, dinnerCalories);
    calorieChart.update();
    sugarChart.update();
    proteinChart.update();
    carbsChart.update();

    totalCalories = breakfastCalories + lunchCalories + snackCalories + dinnerCalories;
    document.querySelector(".row-1 .box:first-child").textContent = `Total required calories: ${totalCalories}/${totalCaloriesBegin} kcal`;
}

function goToInitialMenu() {
    document.querySelector("#dashboard").classList.remove("active");
    document.querySelector("#dashboard").classList.add("hidden");
    setTimeout(function() {
        document.querySelector("#initial-menu").classList.add("visible");
        document.querySelector("#initial-menu").classList.remove("hidden");
    }, 500);
    document.getElementById("chatbot-toggler").style.display = "none";
}


function buttonReco(messageInput){


    const breakfastSelect1 = document.getElementById("breakfast-select-1").value;
    const breakfastSelect2 = document.getElementById("breakfast-select-2").value;
    const breakfastSelect3 = document.getElementById("breakfast-select-3").value;
    const lunchSelect1 = document.getElementById("lunch-select-1").value;
    const lunchSelect2 = document.getElementById("lunch-select-2").value;
    const lunchSelect3 = document.getElementById("lunch-select-3").value;
    const snackSelect1 = document.getElementById("snack-select-1").value;
    const snackSelect2 = document.getElementById("snack-select-2").value;
    const snackSelect3 = document.getElementById("snack-select-3").value;
    const dinnerSelect1 = document.getElementById("dinner-select-1").value;
    const dinnerSelect2 = document.getElementById("dinner-select-2").value;
    const dinnerSelect3 = document.getElementById("dinner-select-3").value;
    const breakfastList = [breakfastSelect1, breakfastSelect2, breakfastSelect3, breakfastCalories, breakfastSugar, breakfastProtein, breakfastCarbs];
    const lunchList = [lunchSelect1, lunchSelect2, lunchSelect3, lunchCalories, lunchSugar, lunchProtein, lunchCarbs];
    const snackList = [snackSelect1, snackSelect2, snackSelect3, snackCalories, snackSugar, snackProtein, snackCarbs];
    const dinnerList = [dinnerSelect1, dinnerSelect2, dinnerSelect3, dinnerCalories, dinnerSugar, dinnerProtein, dinnerCarbs];
    const mealList = [
        {
            name: "breakfast",
            list: breakfastList
        },
        {
            name: "lunch",
            list: lunchList
        },
        {
            name: "snack",
            list: snackList
        },
        {
            name: "dinner",
            list: dinnerList
        }
    ];


    const mealSummary = mealList.map(meal => {
        if (meal.list[3] == 0) {
            return `I ate at at ${meal.name} nothing.`
        } else {
        return `I ate at ${meal.name} ${meal.list[0]} ${meal.list[1]} and ${meal.list[2]} with total calories per ${meal.name} of ${meal.list[3]}, ${meal.list[4]} grams of sugar, ${meal.list[5]} grams of protein, ${meal.list[6]} grams of carbohydrates`;
        }
    }).join(" "); 


    userData.message = `With the 4 datasets of food I sent to you, ${messageInput} consisting of 3 foods for breakfast, lunch, snacks and dinner, knowing that ${mealSummary} with a daily calorie total of ${totalCalories}`;
    

    // Create and display user message
    const messageContent = `<div class="message-text"></div>`;
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = messageInput;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});


    setTimeout(() => {
        const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                </svg>
                <div class="message-text">
                   <div class="thinking-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                   </div>
                </div>`;
        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});
        generateBotResponse(incomingMessageDiv);
    }, 600);
};

document.addEventListener("DOMContentLoaded", function() {
    const initialMenu = document.getElementById("initial-menu");
    const dashboard = document.getElementById("dashboard");
    const chatbotToggle = document.getElementById("chatbot-toggler");
    const calculateCaloriesButton = document.getElementById("calculate-calories");
    const totalCaloriesDisplay = document.getElementById("total-calories-display");

    calculateCaloriesButton.addEventListener("click", function() {
        const gender = document.getElementById("gender").value;
        const age = parseInt(document.getElementById("age").value);
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
        const activityLevel = parseFloat(document.getElementById("activity").value); // Activity factor 

        if (!age) {
            alert("Please fill in all required fields: Age.");
        } 
        else if (!weight) {
            alert("Please fill in all required fields: Weight.");
        } 
        else if (!height) {
            alert("Please fill in all required fields: Height.");
        } else {
        if (gender === "female") {
            totalCaloriesBegin = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        } else {
            totalCaloriesBegin = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        }
        
        totalCaloriesBegin = totalCaloriesBegin * activityLevel;

        // Modification de l'attribut onclick du bouton "Back"
         document.querySelector(".row-1 .box:last-child button").setAttribute("onclick", "goToInitialMenu()");

        totalCaloriesDisplay.textContent = `Total required calories: ${totalCaloriesBegin} kcal`;
        // Ajouter la classe "hidden" au menu initial pour le faire disparaître
        document.querySelector("#initial-menu").classList.remove("visible");
        document.querySelector("#initial-menu").classList.add("hidden");
        
        setTimeout(function() {
            document.querySelector("#dashboard").classList.add("active");
            document.querySelector("#dashboard").classList.remove("hidden");
        }, 500);
        chatbotToggle.style.display = "flex";
        if (indice == false){
            loadCSVData("breakfast.csv", "breakfast-select-1");
            loadCSVData("breakfast.csv", "breakfast-select-2");
            loadCSVData("breakfast.csv", "breakfast-select-3");
            loadCSVData("lunch.csv", "lunch-select-1");
            loadCSVData("lunch.csv", "lunch-select-2");
            loadCSVData("lunch.csv", "lunch-select-3");
            loadCSVData("snack.csv", "snack-select-1");
            loadCSVData("snack.csv", "snack-select-2");
            loadCSVData("snack.csv", "snack-select-3");
            loadCSVData("dinner.csv", "dinner-select-1");
            loadCSVData("dinner.csv", "dinner-select-2");
            loadCSVData("dinner.csv", "dinner-select-3");

            const calorieGCtx = document.getElementById("calorieGraph").getContext("2d");
            const calorieCtx = document.getElementById("calorieChart").getContext("2d");
            calorieGraph = new Chart(calorieGCtx, {
                type: "line",
                data: {
                    labels: ["Breakfast", "Lunch", "Snack", "Dinner"],
                    datasets: [{
                        label: "Cumulative Calories Throughout the Day",
                        data: [0, 0, 0, 0],
                        borderColor: "red",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.3
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
            calorieChart = new Chart(calorieCtx, {
                type: 'bar',
                data: {
                    labels: ["Breakfast", "Lunch", "Snack", "Dinner"],
                    datasets: [{
                        label: 'Calories per Meal',
                        data: [0, 0, 0, 0],
                        backgroundColor: ['red', 'red', 'red', 'red'],
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
                        backgroundColor: ['lightpink', 'lightpink', 'lightpink', 'lightpink'],
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
                        backgroundColor: ['lightseagreen', 'lightseagreen', 'lightseagreen', 'lightseagreen'],
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
                        backgroundColor: ['lightsalmon', 'lightsalmon', 'lightsalmon', 'lightsalmon'],
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
            indice = true ;
        }
    }
    });
});

const chatBody = document.querySelector(".chat-body");
const sendAll = document.querySelector("#all");
const sendBreakfast = document.querySelector("#breakfast-rec");
const sendLunch = document.querySelector("#lunch-rec");
const sendSnack = document.querySelector("#snack-rec");
const sendDinner = document.querySelector("#dinner-rec");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");


const API_KEY = ``;

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const userData = {
    message: null,
    file: {
        data: null,
        mime_type: null
    }
}

const chatHistory = []
const initialInputHeight = messageInput.scrollHeight;

// Create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

//Generate bot response using API
const generateBotResponse = async (incomingMessageDiv, type) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");


    // Add user message to chat history
    chatHistory.push({
        role: "user",
        parts: [{ text: userData.message}, ...(userData.file.data ? [{inline_data: userData.file}] : [])]
    });
    //API request
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            contents: chatHistory
        })
    }
    
    try{
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message);

        //Extract and display bot response
        const apiResponseText = data.candidates[0].content.parts[0].text
            .replace(/\*\*(.*?)\*\*/g, "$1")
            .replace(/\*(.*?)\*/g, "$1")
            .trim();
        messageElement.innerText= apiResponseText;

        // Add bot response to chat history
        chatHistory.push({
            role: "model",
            parts: [{ text: apiResponseText}]
        });
    } catch (error){
        console.log(error)
        messageElement.innerText= error.message;
        messageElement.style.color = "#ff0000";
    } finally {
        userData.file = {};
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});
    }
}

const handleOutgoingMessage = (e) => {
    e.preventDefault();

    userData.message = messageInput.value.trim();
    messageInput.value = "";
    fileUploadWrapper.classList.remove("file-uploaded")
    messageInput.dispatchEvent(new Event("input"));


    // Create and display user message
    const messageContent = `<div class="message-text"></div>
                            ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,
                            ${userData.file.data}" class="attachment"/>` : ""}`;
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});

    setTimeout(() => {
        const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                </svg>
                <div class="message-text">
                   <div class="thinking-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                   </div>
                </div>`;
        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});
        generateBotResponse(incomingMessageDiv);
    }, 600);
}

// Handle Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if(e.key === "Enter" && userMessage && !e.shiftKey && window.innerWidth > 768){
        handleOutgoingMessage(e);
    }
});


// Adjust input field height dynamically
messageInput.addEventListener("input", () => {
    messageInput.style.height = `${initialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
})


// Handle file input change
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        fileUploadWrapper.querySelector("img").src= e.target.result;
        fileUploadWrapper.classList.add("file-uploaded")
        const base64String = e.target.result.split(",")[1];
        userData.file = {
            data: base64String,
            mime_type: file.type
        }
        fileInput.value = "";
    }
    reader.readAsDataURL(file);
})

fileCancelButton.addEventListener("click", () => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded");
})


const picker = new EmojiMart.Picker({
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
        const {selectionStart: start, selectionEnd: end} = messageInput;
        messageInput.setRangeText(emoji.native, start, end, "end");
        messageInput.focus();
    },
    onClickOutside: (e) => {
        if(e.target.id === "emoji-picker"){
            document.body.classList.toggle("show-emoji-picker")
        } else {
            document.body.classList.remove("show-emoji-picker")
        }
    }
})

document.querySelector(".chat-form").appendChild(picker);

sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e))
document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());


sendAll.addEventListener("click", (e) => {
    e.preventDefault();
    let messageInput = `Give me recommendations on my all day for a balanced day at ${totalCaloriesBegin} calories.`;
    buttonReco(messageInput);
});

sendBreakfast.addEventListener("click", (e) => {
    e.preventDefault();
    let messageInput = `Give me recommendations on my breakfast for a balanced day at ${totalCaloriesBegin} calories.`;
    buttonReco(messageInput);
});

sendLunch.addEventListener("click", (e) => {
    e.preventDefault();
    let messageInput = `Give me recommendations on my lunch for a balanced day at ${totalCaloriesBegin} calories.`;
    buttonReco(messageInput);
});

sendSnack.addEventListener("click", (e) => {
    e.preventDefault();
    let messageInput = `Give me recommendations on my snack for a balanced day at ${totalCaloriesBegin} calories.`;
    buttonReco(messageInput);
});

sendDinner.addEventListener("click", (e) => {
    e.preventDefault();
    messageInput = `Give me recommendations on my dinner for a balanced day at ${totalCaloriesBegin} calories.`;
    buttonReco(messageInput);
});

chatbotToggler.addEventListener("click",() => document.body.classList.toggle("show-chatbot"));
closeChatbot.addEventListener("click", () =>document.body.classList.remove("show-chatbot"));

window.addEventListener("load", () => {
    let breakfast_info = `Here is the food available for the breakfast: Food,Hour,Calories,Carb (g),Sugar (g),Protein (g)
                Natrel Lactose Free 2 Percent,07:10:00,120.0,9.0,8.0,12.0
                Standard Breakfast,07:10:00,110.0,26.0,10.0,1.0
                Breakfast Trail Mix,09:38:00,280.0,30.0,22.0,4.0
                Spinach Smoothie,07:30:00,308.0,69.0,38.0,7.2
                Hot Chocolate,08:49:00,151.0,32.0,25.0,2.5
                Maple Brown Sugar Oatmeal,06:42:00,158.0,33.0,13.0,4.0
                Green Smoothie,07:37:00,308.0,69.0,38.0,7.2
                Bagel,07:37:00,139.0,27.0,4.4,5.5
                Corn Flakes,05:39:00,110.0,26.0,10.0,1.0
                Mello Yello,06:30:00,180.0,48.0,48.0,0.0
                JD Sausage Biscuit,08:42:00,410.0,26.0,4.0,12.0
                Boost,08:00:00,654.0,82.0,40.0,26.0
                Milk,05:30:00,60.0,4.5,4.0,6.0
                Cornflakes,05:30:00,220.0,52.0,20.0,2.0
                Apples,09:00:00,29.0,7.8,5.9,0.1
                Boost ,08:30:00,654.0,82.0,40.0,26.0
                Frosted Flakes,08:00:00,220.0,52.0,20.0,2.0
                Coffee,08:30:00,358.0,70.0,1.3,13.0
                Peach,08:15:00,68.0,17.0,15.0,1.6
                Banana,08:15:00,105.0,27.0,14.0,1.3
                Creamer,09:00:00,7.7,0.7,0.0,0.1
                Sugar,09:00:00,33.0,8.5,8.5,0.0
                Eggs,09:00:00,143.0,0.7,0.4,13.0
                Peppers,09:00:00,11.0,2.7,1.0,0.4
                Onions,09:00:00,30.0,6.9,3.2,0.9
                Cheese,09:00:00,113.0,0.9,0.1,6.4
                Sausage,09:00:00,420.0,1.3,1.3,16.0
                Quest Bar cookie dough,08:10:00,45.0,5.8,0.1,5.0
                Std breakfast,05:15:00,280.0,56.5,24.0,8.0
                Premier protein choc shake,09:50:00,160.0,5.0,1.0,30.0
                1/4 blueberry pancake,08:20:00,84.0,11.0,0.0,2.3
                Grits,08:20:00,151.0,32.0,0.2,2.9
                Bacon,08:20:00,107.0,0.4,0.0,8.0
                Mini Croissants,08:56:00,227.0,26.0,6.3,4.6
                Turkey Bacon,08:56:00,60.0,0.7,0.7,4.8
                Avocado,08:56:00,161.0,8.6,0.7,2.0
                Oatmeal Margarine,09:55:00,141.0,24.0,0.5,5.0
                Splenda/Sugar Blend,09:55:00,3.4,0.9,0.8,0.0
                Boiled Eggs,08:50:00,143.0,0.7,0.4,13.0
                (Dunkin Coffee) Coffee,09:15:00,3.6,0.0,0.0,0.4
                Cream,08:20:00,57.0,0.8,1.1,0.9
                (Florida's Natural) Orange Juice,09:35:00,110.0,26.0,22.0,2.0
                Fried Egg,08:10:00,90.0,0.4,0.2,6.3
                Whole Wheat Toast,08:10:00,153.0,26.0,2.9,8.1
                (Blue Diamond) almonds lightly salted,09:00:00,72.9,2.1,0.4,2.6
                Hard Boiled Egg,05:40:00,156.0,1.1,1.1,12.6
                2% Milk,05:47:00,40.4,3.8,4.1,2.7
                (Fage) Greek Yogurt plain nonfat,08:05:00,220.0,9.0,9.0,20.0
                Mixed Berries,08:05:00,65.0,15.0,8.7,1.4
                (Kashi) Go Rise Cereal,08:05:00,72.0,16.0,3.2,4.8
                Half and half,09:15:00,18.0,0.7,0.6,0.5
                Eggo Waffle,05:17:00,70.0,14.0,1.5,2.0
                Peanut Butter,05:17:00,94.0,3.9,1.1,3.5
                Plain Bagel,09:44:00,277.0,55.0,8.9,11.0
                Cream Cheese,09:44:00,51.0,0.8,0.6,0.9
                Std Bfast,05:30:00,280.0,56.5,24.0,8.0
                Breakfast Essential Drink,06:00:00,214.0,37.0,37.0,16.0
                Toast,08:00:00,192.0,36.0,4.2,6.0
                Mountain Dew,08:00:00,110.0,31.0,31.0,0.0
                Apple,09:50:00,95.0,25.0,19.0,0.5
                Sausage Biscuit,05:50:00,824.0,66.0,3.6,22.0
                Pecan Twirl,09:45:00,100.0,16.0,7.0,1.0
                Honey Nut Cheerios,05:30:00,140.0,30.0,12.0,3.3
                (Pillsbury) Cinammon Rolls ,08:00:00,2245.0,363.0,145.0,30.0
                Frosted Flake,05:24:00,220.0,52.0,20.0,2.0
                Egg,07:30:00,143.0,0.7,0.4,13.0
                Half and Half,09:20:00,37.0,1.4,1.2,0.9
                MCT,05:25:00,121.0,0.0,0.0,0.0
                Toast Butter Cheese Mayo,06:53:00,111.0,14.0,1.6,2.6
                Butter,07:40:00,102.0,0.0,0.0,0.1
                MCT Oil,05:30:00,121.0,0.0,0.0,0.0
                Yogurt,06:00:00,107.0,12.0,12.0,8.9
                Black Berries,06:00:00,62.0,14.0,7.0,2.0
                Blue Berries,06:00:00,84.0,21.0,15.0,1.1
                Kashi,06:00:00,264.0,57.0,14.0,21.0
                Toast - Butter Cheese Mayo,07:21:00,111.0,14.0,1.6,2.6
                Quest Protein Bar Double Chocolate Chunk,09:49:00,160.0,25.0,1.0,20.0
                Quest Protein Bar White Chocolate Raspberry Bar,09:20:00,100.0,10.5,1.0,10.0
                Pepsi,09:10:00,150.0,41.0,41.0,0.0
                Lifesaver Gummies (wild berries),09:10:00,65.0,15.5,13.0,0.5
                Uncle Al's Strawberry Cremes Cookies,09:10:00,120.0,19.0,9.0,1.0
                Special K with strawberries,07:50:00,220.0,54.0,18.0,4.0
                Oreo's Peppermint Bark,09:28:00,288.0,36.0,32.0,2.8
                Quest Protein Bar Birthday Cake,06:00:00,160.0,25.0,1.0,20.0
                Sun Chips Garden Salsa,09:18:00,140.0,19.0,2.0,2.0
                M&M's,09:10:00,236.0,34.0,31.0,2.0
                Sathers Caramel Creams,09:10:00,94.0,17.0,9.0,0.7
`;
    let lunch_info =`Here is the food available for the lunch: Food,Hour,Calories,Carb (g),Sugar (g),Protein (g)
Spinach Salad w/ strawberries and cheese,12:38:00,286.0,14.0,8.5,7.6
Egg,12:38:00,72.0,0.4,0.2,6.3
Breakfast Trail Mix,11:02:00,280.0,30.0,22.0,4.0
Spinach Salad w/ blueberries egg and cheese,12:38:00,286.0,14.0,8.5,7.6
Salty Sweet Popcorn,11:56:00,110.0,14.0,6.0,2.0
Bourbon Chicken,12:15:00,212.0,10.0,9.4,22.0
Shrimp,12:15:00,86.0,1.1,0.0,17.0
Salad with Cranberries,12:30:00,80.0,21.0,17.0,0.0
Chicken Nuggets,12:30:00,147.0,7.2,0.0,7.5
Muffin,11:00:00,212.0,30.0,18.0,2.5
Grilled Chicken Wrap,11:45:00,277.0,23.0,1.7,16.0
Acai Smoothie,11:00:00,440.0,92.0,75.0,5.0
Salad,12:30:00,13.0,2.8,1.2,0.8
Hot Chocolate,13:00:00,151.0,32.0,25.0,2.5
Babel bell cheese,12:30:00,71.0,0.3,0.3,5.0
Babybel Cheese,11:00:00,71.0,0.3,0.3,5.0
Chicken Salad,12:30:00,254.0,3.3,2.4,19.0
Pita Bread,12:30:00,539.0,109.0,2.5,18.0
Mello Yello,10:09:00,180.0,48.0,48.0,0.0
(Jimmy Dean) Chicken Biscuit,10:11:00,280.0,32.0,3.0,13.0
Beef Jerky,12:09:00,164.0,4.4,3.6,13.0
(Gatorade) Fierce Grape,12:12:00,84.0,21.6,20.4,0.0
Banquet Chicken Pot Pie,14:02:00,700.0,66.0,4.0,24.0
(Powerade) Grape,13:46:00,130.0,35.0,34.0,0.0
Omelet (3 egg bacon 3 strip cheese 2 tsp),10:34:00,566.0,3.1,1.4,45.0
Chocolate Milk,10:36:00,241.0,36.0,34.0,11.0
Moutain Dew,12:12:00,80.0,22.0,22.0,0.0
Natrel Lactose Free 2 Percent,10:05:00,120.0,9.0,8.0,12.0
Corn Flakes,10:05:00,110.0,26.0,10.0,1.0
Gatorade,13:35:00,140.0,36.0,34.0,0.0
Vienna Sausage,14:32:00,300.0,3.4,0.0,14.0
Lance Toast Chee,14:32:00,100.0,24.0,4.0,3.0
Tootsie Roll,14:45:00,108.0,22.0,15.0,0.8
Chex Mix,13:30:00,242.0,44.0,4.2,4.4
Fig Bar,14:54:00,392.0,77.0,51.8,4.1
Powerade,13:32:00,130.0,35.0,34.0,0.0
Superfood Salad,10:30:00,170.0,14.0,7.0,5.0
Dots Gumdrops,14:30:00,130.0,33.0,21.0,0.0
Spaghetti,12:00:00,511.2,102.6,3.7,18.0
Greek Yogurt Power Smoothie,10:00:00,180.0,16.0,12.0,20.0
Clam Chowder,13:00:00,201.0,21.0,0.6,6.6
Smartie Candy Roll,11:50:00,50.0,12.0,12.0,0.0
Grilled Chicken,12:50:00,252.0,0.0,0.0,50.0
Green Beans,12:50:00,20.0,4.5,2.1,1.1
French Toast with Syrup,10:00:00,560.0,124.0,84.0,10.0
Rice,12:15:00,18.0,4.0,0.0,0.4
Broccoli,12:15:00,5.0,1.0,0.2,0.3
Steak,12:15:00,39.0,0.0,0.0,3.7
Ham Sandwich,13:00:00,98.0,11.0,1.4,5.4
BBQ Chicken,14:30:00,191.0,13.0,11.0,20.5
Salad with Fried Chicken and Ranch Dressing,14:15:00,451.0,18.0,4.2,30.0
Grapes,13:30:00,34.0,8.9,7.6,0.4
Turkey Wings,12:45:00,852.0,0.0,0.0,102.0
Spinach,12:45:00,41.0,6.8,0.8,5.3
Coffee,12:45:00,358.0,70.0,1.3,13.0
Creamers,12:45:00,362.0,58.0,28.0,5.5
Chicken Breast,14:00:00,198.0,0.0,0.0,37.0
Chicken Wing,14:00:00,88.0,2.6,0.1,4.5
Peach,14:00:00,68.0,17.0,15.0,1.6
Small Bowl of Spinach,13:15:00,41.0,6.8,0.8,5.3
Tea,13:15:00,2.0,0.5,0.0,0.0
Baked Chicken,12:30:00,187.0,0.0,0.0,20.0
Squash,12:30:00,41.0,6.8,4.5,1.9
Eggs,11:30:00,143.0,0.7,0.4,13.0
Bacon,11:30:00,215.0,0.8,0.0,16.0
Waffle with Syrup,11:30:00,218.0,25.0,0.0,5.9
Soda,11:30:00,206.0,51.0,49.0,0.0
Biscott Cookie,13:15:00,348.0,52.0,20.0,6.0
Chicken,12:45:00,498.7,0.1,0.0,54.3
Fries,12:45:00,575.0,76.0,0.6,6.3
Biscuit,12:45:00,212.0,27.0,1.3,4.2
6-inch Turkey Sub,14:00:00,456.0,36.0,4.5,28.0
Chicken Biscuit,10:30:00,396.0,40.0,3.5,16.0
Baked Chicken Thigh,11:00:00,180.0,0.0,0.0,20.0
Baked Potato,11:00:00,80.5,18.3,1.0,2.2
Pepperoni,10:00:00,40.0,0.1,0.0,1.5
Peppers,11:00:00,11.0,2.7,1.0,0.4
Onions,11:00:00,30.0,6.9,3.2,0.9
Chicken Chorizo,13:15:00,167.0,0.0,0.0,20.0
Pepperjack Cheese,13:15:00,211.0,0.4,0.3,14.0
Strawberries,13:15:00,28.0,6.7,4.2,0.6
90% Dark Chocolate,14:00:00,60.0,3.0,0.8,1.0
Cheese,11:00:00,113.0,0.9,0.1,6.4
Sausage,11:00:00,420.0,1.3,1.3,16.0
Creamer,11:00:00,12.0,1.0,0.0,0.1
Sugar,11:00:00,33.0,8.5,8.5,0.0
Tortilla Chips,14:00:00,141.3,20.7,0.2,2.1
Hummus,14:00:00,24.0,2.0,0.0,1.1
Pistachios,13:30:00,350.0,17.0,4.8,13.0
Egg Salad,13:30:00,236.0,2.7,1.2,9.1
Blueberries,13:30:00,25.0,6.4,4.4,0.3
Premier protein choc shake,11:25:00,160.0,5.0,1.0,30.0
Std breakfast,11:50:00,280.0,56.5,24.0,8.0
Fruit smoothie,11:00:00,202.0,42.0,30.0,7.0
PB protein whey powder,11:00:00,113.0,2.0,0.0,25.0
4 small pizza slices everything,14:00:00,626.0,70.0,7.2,26.0
Mac and cheese,13:55:00,376.0,47.0,8.5,9.7
Blue Bunny fudge bar,14:40:00,62.0,12.0,9.0,2.2
Veggie omelet,13:20:00,310.0,9.5,3.9,18.5
Cinnamon raisin bagel,13:20:00,180.0,36.0,3.9,6.5
1 snack size baby ruth,11:45:00,83.0,12.0,9.7,1.0
Ritz PB crackers,14:35:00,200.0,22.0,5.0,4.0
Baked chicken ,12:30:00,187.0,0.0,0.0,20.0
String beans,12:30:00,22.0,5.0,2.3,1.2
Lemon risotto,12:30:00,165.0,25.0,3.0,5.0
Cheesecake,12:30:00,80.0,6.4,5.4,1.4
(Costco) Seafood Stuffed Salmon,13:44,201.0,1.5,0.2,24.0
(Green Giant) Rice Cauliflower - Plain,13:44,15.0,2.9,1.1,1.1
(Dayka and Hackett) Navel Orange,13:44,104.0,27.0,18.0,1.9
(Quaker) Old Fashioned Oats,10:05,150.0,27.0,1.0,5.0
(Red Delicious) Apple with Skin,10:05,125.0,30.0,22.0,0.6
Ground Flaxseeds,10:05,55.0,3.0,0.2,1.9
(Now) Whole Psyllium Husks,10:05,35.0,8.0,0.0,0.0
(Harris Teeter) Fat Free Organic Milk,10:05,80.0,13.0,12.0,8.0
(Peppridge Farm) Whole Wheat Hamburger Bun,13:00,130.0,22.0,3.0,7.0
(Jif) Extra Crunchy Peanut Butter,13:00,190.0,8.0,3.0,7.0
(Firebirds Wood Fired Grill) Steak Sandwich with lettuce and onion,13:00,315.0,26.5,4.5,20.5
(Firebirds Wood Fired Grill) Seasoned Steak Fries,13:00,457.5,59.3,0.8,6.8
(Alex's) Lemonade,13:00,99.0,26.0,25.0,0.2
Cinnamon,12:10,13.0,4.2,0.1,0.2
Std Bfast,10:40,280.0,56.5,24.0,8.0
Homemade soup with Hot Italian sausage kale cannolli beans onion garlic (Kirkland) organic chicken stock white wine,13:40,200.0,16.0,2.8,7.5
(NOSH) Owen's Crunchy Chicken Sandwich without dijonnaise,13:20,468.0,39.0,6.8,30.0
(NOSH) Veggie Slaw Side Order,13:20,174.0,14.0,10.0,1.0
Golden Crust Chicken Patil,14:15:00,405.0,41.0,2.8,30.0
Pineapple and Ginger Juice,14:15:00,133.0,32.0,25.0,0.9
Banana,14:15:00,105.0,27.0,14.0,1.3
Mini Croissants,12:40:00,227.0,26.0,6.3,4.6
Turkey Bacon,12:40:00,60.0,0.7,0.7,4.8
Medium Banana,14:30:00,105.0,27.0,14.0,1.3
Granola Oats and Honey,14:30:00,555.0,61.0,22.0,16.0
Avocado Sandwich - White bread with mayo,12:41:00,378.0,35.0,1.6,13.0
Salad - Shrimp Lettuce Tomato Cheese Avocado,14:55:00,495.0,16.0,5.7,42.0
Low Sugar Apple Juice,14:55:00,114.0,28.0,24.0,0.3
(Wheat Thins) Ranch Crackers,13:28:00,233.3,35.0,8.3,3.3
Sandwich - White Bread Lettuce Chicken Cheese,11:58:00,468.0,39.0,6.8,30.0
Vanilla Cookies,11:58:00,104.0,16.0,7.1,0.9
Chicken and Cheese Sandwich - White Bread Mayo,13:25:00,468.0,39.0,6.8,30.0
Lemon Cookies,13:25:00,413.0,67.0,38.0,4.5
(Blue Diamond) Almonds Lightly Salted,11:15:00,91.1,2.7,0.5,3.2
Swiss Cheese Thinly Sliced,13:15:00,330.0,1.2,0.0,22.5
Baked Chicken Breast,13:15:00,71.0,0.0,0.0,13.0
Broiled Brussel Sprouts,13:15:00,41.0,8.1,2.0,2.9
Coleslaw with Almond and Cranberry,13:15:00,135.0,11.0,8.1,0.8
Green Seedless Grape,11:00:00,34.0,8.9,7.6,0.4
(Blue Diamond) almonds lightly salted,11:00:00,72.9,2.1,0.4,2.6
(Sunkist) orange,11:00:00,190.0,52.0,50.0,0.0
Greek Isle Salad,13:15:00,40.0,8.4,3.7,2.5
Small Spinach Salad,13:15:00,134.0,3.2,1.4,6.8
Baked Potato Salad with Cheese,12:30:00,520.0,44.0,2.0,0.0
Milk,13:00:00,60.0,4.5,4.0,6.0
Frosted Flakes,13:00:00,220.0,52.0,20.0,2.0
Cream,14:30:00,57.0,0.8,1.1,0.9
Green and Red Seedless Grape,13:55:00,51.0,13.0,11.0,0.5
smoothie (spinach celery stick banana),14:35:00,404.0,84.0,60.0,14.0
Salad (spinach broccoli blueberry soy ranch dressing),14:00:00,151.0,11.0,5.0,2.6
Salmon Salad,12:00:00,81.0,1.5,0.7,8.8
(Florida's Natural) Orange Juice,10:45:00,82.5,19.5,16.5,1.5
Egg White,13:45:00,34.0,0.5,0.5,7.2
Strawberry,13:45:00,23.0,5.5,3.5,0.5
Walnut,13:45:00,106.0,2.2,0.4,2.5
Hard Boiled Egg,10:52:00,156.0,1.1,1.1,12.6
Boneless Skinless Chicken Thigh,12:30:00,186.0,0.0,0.0,27.0
(Hannah) Tatziki Sauce,12:30:00,80.0,4.0,0.0,2.0
Tomatoes,12:30:00,30.0,6.4,4.3,1.4
Beets,12:30:00,37.0,8.5,6.8,1.4
Carrots,12:30:00,27.0,6.4,2.7,0.6
Cucumber,12:30:00,7.8,1.9,0.9,0.3
Lettuce Mix,12:30:00,13.0,2.8,1.2,0.8
Red Bell Pepper,12:30:00,9.5,2.3,1.5,0.3
2% Milk,13:20:00,82.0,7.8,8.3,5.4
Homemade potato cauliflower soup with potato cauliflower chicken broth onions,11:30:00,450.0,41.0,1.9,23.0
Oil,11:30:00,41.0,0.0,0.0,0.0
Cheddar Cheese,11:30:00,1145.0,8.8,1.4,65.0
(Dove) Promises Dark Chocolate,13:30:00,42.0,4.8,3.8,0.4
(Fage) Greek Yogurt plain nonfat,10:20:00,220.0,9.0,9.0,20.0
Mixed Berries,10:20:00,65.0,15.0,8.7,1.4
(Kashi) Go Rise Cereal,10:20:00,72.0,16.0,3.2,4.8
Lamb Gyro,13:05:00,723.0,43.0,6.8,47.0
Homemade Potato Chips,13:05:00,138.0,2.2,0.1,0.3
Hershey Kiss,11:00:00,67.0,8.3,7.7,1.0
Balsamic Vinegar,13:43:00,28.0,5.4,4.8,0.2
Salad Greens,13:43:00,27.0,5.1,0.8,2.1
Celery,13:00:00,14.0,3.0,1.8,0.6
Chicken Gyro,12:50:00,466.0,44.0,6.5,44.0
Medium French Fries,12:50:00,365.0,48.0,0.3,4.0
Cheese Steak,11:40:00,573.0,42.0,4.0,32.5
Tortilla,11:40:00,737.0,126.0,0.0,20.0
Refried Beans,11:40:00,214.0,32.0,1.3,12.0
Pizza,12:30:00,854.0,107.0,11.0,37.0
Mountain Dew,12:30:00,230.0,62.0,62.0,0.0
Brunswick Stew,13:30:00,574.0,34.0,19.0,48.0
Slaw,13:30:00,174.0,14.0,10.0,1.0
Nutty Bar,11:50:00,312.0,31.0,19.0,4.6
Potato Salad,12:00:00,162.0,12.7,0.0,3.1
Baked Beans,12:00:00,107.0,24.0,9.0,5.4
Donut,11:15:00,253.0,29.0,14.0,3.7
(Stouffers) Green Pepper Steak,12:15:00,270.0,34.0,5.0,16.0
Pecan Twirl,12:15:00,100.0,16.0,7.0,1.0
Chicken Casserole,12:00:00,410.0,24.0,2.2,19.0
Apple Pie,12:00:00,269.0,39.0,18.0,2.2
Mashed Potato,12:00:00,128.0,19.0,1.6,2.2
Cranberry Sauce,12:00:00,220.0,56.0,44.0,1.2
Chili,13:30:00,335.0,17.0,3.1,21.0
(Jersey Mikes) Salad - Cheese Steak Ranch,12:10:00,471.0,13.0,8.7,28.0
Cream Cheese,12:00:00,102.0,1.6,1.1,1.8
Sausage ,12:00:00,210.0,0.6,0.6,8.1
Moon Cheddar Cheese,14:20:00,230.0,1.8,0.3,12.9
Peppermint Tea,14:30:00,2.4,0.5,0.0,0.0
Jim Bean Bourbon,12:18:00,70.0,0.0,0.0,0.0
MCT Oil,13:10:00,121.0,0.0,0.0,0.0
Pork BBQ,12:12:00,418.0,47.0,38.0,33.0
Beans,12:12:00,239.0,54.0,20.0,12.0
Potato,12:12:00,161.0,37.0,2.0,4.3
Chocolate Peanut Almond Bar,14:10:00,343.0,33.0,24.0,5.0
(Smoke House) Almonds,10:30:00,255.0,9.0,2.1,8.9
Salad - (chicken tomato ranch),12:41:00,576.0,22.0,5.9,43.0
(Wendy's) Southwest Salad,12:12:00,300.0,10.0,4.0,21.0
Fried Cheese Curds,14:45:00,495.0,3.8,0.6,28.0
Half and Half,11:25:00,37.0,1.4,1.2,0.9
Sushi,12:20:00,349.0,38.0,7.0,7.8
Soup,12:20:00,62.0,7.3,0.7,3.1
Potato Chip,13:51,53.0,5.4,0.0,0.6
Chicken Noodle Soup,14:00,93.0,11.0,1.0,4.7
(CaraCara) fresh orange juice,14:55,140.0,42.0,28.0,2.0
Decaf Latte,12:15,189.0,19.0,19.0,12.0
Lactose Free Milk,12:15,409.0,11.0,0.0,7.4
Frosted Flake,10:19,280.0,56.5,24.0,8.0
low fat cottage cheese,13:26,81.0,3.1,3.1,14.0
banana,13:26,105.0,27.0,14.0,1.3
skim decaf latte,11:30,189.0,19.0,19.0,12.0
turkey leg,13:19,335.0,0.0,0.0,48.0
greek yogurt,12:59,532.0,32.0,29.0,92.0
Arkansas black apple,13:09,100.0,25.0,19.0,0.5
ham and turkey sandwich,13:11,550.0,39.0,7.0,32.0
cheese crackers,14:12,303.0,37.0,2.8,6.8
decaf latte,14:23,189.0,19.0,19.0,12.0
oatmeal,11:59,125.0,21.0,0.5,4.5
maple syrup,11:59,26.0,6.7,6.0,0.0
tea with milk,12:08,62.0,5.2,5.0,3.1
Honey,12:08,21.0,5.8,5.8,0.0
turkey and brie sandwich,14:30,287.0,20.5,5.0,16.0
Mixed Nuts,14:38,85.0,3.6,0.7,2.4
Chicken Parmesan with Tomato Sauce,11:50:00,324.0,17.0,4.4,26.0
Mashed Potatoes with Brown Gravy,11:50:00,265.0,39.0,3.1,4.5
Mixed Vegetables (corn peas carrots),11:50:00,12.0,2.4,1.0,0.6
Lifesavers Breath Mints,13:55:00,30.0,7.5,7.0,0.0
V8 Low Sodium,10:19:00,40.0,7.5,6.0,1.5
Club Sandwich with turkey bacon and cheddar cheese,12:20:00,817.0,42.0,7.0,56.0
Lifesaver Peppermint Breath Mint,13:25:00,15.0,4.0,4.0,0.0
Taco Bell Chicken Quesadilla,11:25:00,500.0,38.0,2.0,27.0
Soft Taco,11:25:00,158.0,14.0,0.6,6.0
Uncle Al's Strawberry Cremes Cookies,10:20:00,120.0,19.0,9.0,1.0
Pepsi,10:20:00,150.0,41.0,41.0,0.0
Goetzes Caramel Cremes,14:45:00,94.0,17.0,9.0,0.7
Pizza Slice of NY Pepperoni,11:50:00,626.0,70.0,7.0,26.0
Strawberry Scone,11:50:00,424.0,32.0,1.2,7.3
Coca Cola,11:50:00,150.0,41.0,41.0,0.0
Hard Boiled Eggs,11:45:00,182.0,2.0,2.0,12.0
Cottage Cheese,11:45:00,107.0,4.0,3.0,12.0
Apple Pie ,11:45:00,296.0,43.0,20.0,2.4
M&M's,12:45:00,236.0,34.0,31.0,2.0
"Milkyway ""Fun Size"" Candy Bar",12:45:00,190.0,30.0,26.0,2.0
Whoopers Malted Milk Balls,12:45:00,108.0,18.0,13.0,0.4
Coffee + skim milk,10:00,35.0,4.5,4.7,3.4
Glucerna snack bar,10:09,160.0,20.0,4.0,10.0
Northern Harvest Sweet + Spicy Chunk light Tuna,13:10,80.0,4.0,3.5,16.0
multigrain cakes,13:50,200.0,28.0,5.0,3.0
2 slices bacon,11:00,108.0,0.4,0.0,7.8
chicken cesear salad wrap,13:00,533.0,32.0,1.4,29.0
Salt and vinegar chips,13:00,745.0,75.0,0.4,9.0
Honest Organic Honey Green Tea,13:00,70.0,19.0,19.0,0.0
Slim fast shake,14:07,171.0,2.5,1.8,19.5
Sugg's coconut greek yogurt,12:00,140.0,15.0,15.0,12.5
1/2 cup cottge cheese,11:00,70.0,2.4,1.9,7.9
peach slices,11:00,55.0,14.5,13.0,0.8
1 whole grapefruit,12:30,104.0,26.0,17.0,1.9
2 leftover burritos,12:30,578.0,75.0,6.7,23.0
Ham and cheese sandwhich,13:15,517.0,28.0,3.6,28.0
Brownies,13:15,466.0,50.0,28.0,6.2
Peanut Butter,13:15,94.0,3.9,1.1,3.5
Elmo's diner breakfast burrito 2 eggs/sausage/black beans/sour cream,12:45,657.0,72.0,1.4,29.0
Side of home fried potatoes,12:45,235.0,45.0,0.0,6.9
1 cup coffee,12:45,84.0,2.6,2.6,2.4
brown rice,10:00,218.0,46.0,0.0,4.6
sardines ,10:00,25.0,0.0,0.0,3.0
kimchi,10:00,23.0,3.6,1.6,1.7
french bread,11:00,348.0,66.0,6.0,13.8
Swiss cheese,11:00,424.0,1.6,0.0,29.0
Salami,11:00,148.0,0.3,0.1,8.4
1 ensure plus,12:00,355.0,50.0,21.0,13.0
Standard breakfast,10:30,280.0,56.5,24.0,8.0
Plain cheese pizza,11:30,452.0,57.0,6.1,19.0
cooked black eyed peas,11:30,198.0,35.0,5.6,13.0
`;
    let snack_info = `Here is the food available for the snack: Food,Hour,Calories,Carb (g),Sugar (g),Protein (g)
Babel Cheese,15:30:00,71.0,0.3,0.3,5.0
Breakfast Trail Mix,15:35:00,280.0,30.0,22.0,4.0
Lemon Loaf,15:30:00,235.0,34.0,21.0,3.0
Boost,15:10:00,654.0,82.0,40.0,26.0
(Powerade) Grape,16:08:00,130.0,35.0,34.0,0.0
(Arby's) Classic Roast Beef FF,15:00:00,360.0,37.0,5.0,23.0
Mello Yello,15:00:00,180.0,48.0,48.0,0.0
Gatorade,15:59:00,79.3,19.6,16.0,0.0
Cheeseburger (mayo  mustard chili),15:59:00,677.0,47.0,8.5,39.0
Tater Tots,15:59:00,161.0,23.0,0.2,1.8
Onion Rings,15:59:00,133.6,14.2,1.8,1.3
Sweet Tea,15:59:00,199.0,52.0,50.0,0.0
Tortilla Chips,16:03:00,268.0,38.0,0.4,4.0
Salsa,16:03:00,8.2,1.9,1.1,0.4
Turkey Wings,16:00:00,852.0,0.0,0.0,102.0
(Chipotle) Bowl,16:30:00,1008.0,117.0,5.6,49.0
Baked Chicken,15:30:00,187.0,0.0,0.0,20.0
Green Bean,15:30:00,44.0,9.9,4.5,2.4
Tea with Lemon,15:30:00,2.2,0.7,0.0,0.0
Peppermint,15:45:00,24.0,5.9,3.8,0.0
Dark Chocolate Toffee,15:30:00,77.0,8.7,8.0,0.6
Apple,16:20:00,95.0,25.0,19.0,0.5
Peanut Butter,16:00:00,167.0,6.8,1.8,6.2
4 small pizza slices everything,15:30:00,626.0,70.0,7.2,26.0
Fun size snickers bar,15:00:00,74.0,9.2,7.6,1.1
Homemade Chicken Noodle Soup with chicken onion celery (Kirkland) organic chicken stock and (Amish Kitchens) wide egg noodles,16:35,124.0,15.0,1.3,6.3
Chicken breaded with (Progesso) Italian Bread Crumbs,16:15,323.0,24.0,1.5,35.0
Potato,16:15,93.0,21.0,1.2,2.5
Extra Virgin Olive Oil,16:15,119.0,0.0,0.0,0.0
Homemade Beef and Barley Soup with onion celery kale (Simple Truth) fat free organic beef stock and (Pacific) low sodium organic vegetable broth,16:10,324.0,49.5,7.6,18.0
Hershey's Milk Chocolate Bar,16:00,220.0,26.0,24.0,3.0
Baked Potato,16:50:00,80.0,18.0,1.0,2.2
Salad - Tomato Cheese Lettuce Tortilla Strips,16:50:00,80.0,17.0,7.3,4.9
Air Fried Chicken Wings,16:50:00,324.0,11.0,0.0,20.0
Grapes,15:55:00,39.0,10.0,8.8,0.4
Handfull of Oats and Honey Granola,15:55:00,555.0,61.0,22.0,16.0
Green Seedless Grape,15:50:00,34.0,8.9,7.6,0.4
Coffee,16:15:00,2.4,0.0,0.0,0.3
Cream,16:15:00,57.0,0.8,1.1,0.9
Walnut,15:15:00,159.0,3.3,0.6,3.7
Strawberry,15:15:00,46.0,11.0,7.0,1.0
Blueberry,15:15:00,9.3,2.4,1.6,0.1
(Blue Diamond) almonds lightly salted,16:00:00,121.4,3.6,0.7,4.3
Small Apple,15:30:00,77.0,21.0,15.0,0.4
2% Cottage Cheese,15:30:00,106.5,3.7,2.9,12.0
Clementine,15:07:00,70.0,18.0,14.0,1.3
Mountain Dew,15:00:00,55.0,14.5,14.5,0.0
Oreo Cookie,16:30:00,200.0,32.0,18.0,2.0
Cheese and Crackers,15:00:00,447.5,25.0,5.5,19.5
Coke,15:00:00,258.0,64.0,61.0,0.0
Moon Cheddar Cheese,16:32:00,151.0,1.2,0.2,8.5
Sargento Cranberries Snack Pack Cheese Cashews,16:50:00,87.0,13.0,0.3,1.8
MCT Oil,16:45:00,121.0,0.0,0.0,0.0
Fried Cheddar Cheese Bite,15:32:00,22.0,0.0,0.0,0.0
Peanut Butter Wafers,15:55:00,450.0,48.0,30.0,6.0
Biscuit Chicken Strips,16:09:00,448.0,28.4,0.4,28.0
Angle Food Candy ,16:45:00,292.0,58.0,55.7,1.5
Ice Cream Sandwich,16:30,284.0,45.0,22.0,5.1
turkey leg,15:30,335.0,0.0,0.0,48.0
potato chip,15:30,53.0,5.4,0.0,0.6
come pear,15:40,101.0,27.0,17.0,0.6
cashew nut,15:35,54.0,3.1,0.5,1.4
Decaf Latte,15:53,189.0,19.0,19.0,12.0
Lactose Free Milk,15:53,409.0,11.0,0.0,7.4
low fat cottage cheese,16:16,40.5,1.6,1.6,7.0
greek yogurt,16:21,532.0,32.0,29.0,92.0
Pepsi (Real Sugar),16:00:00,150.0,41.0,41.0,0.0
Simply Naked Pita Chips,16:00:00,130.0,19.0,0.5,3.0
Roasted Red Pepper Hummus,16:00:00,114.0,13.0,2.0,4.7
Milk Chocolate Petit Beurre Biscuits,16:00:00,123.0,18.2,5.3,1.6
Lifesaver Gummies (wild berries),15:05:00,65.0,15.5,13.0,0.5
Quest Protein Bar Caramel Chocolate Chunk,15:58:00,160.0,25.0,1.0,20.0
Small pc red velvet cake,15:50,368.0,36.0,25.0,4.2
Freddy's Steakbuurger,15:30,540.0,40.5,0.0,34.5
Small chocolate shake (1/2),15:30,270.0,48.0,47.3,7.0
Old El Priso burrito 2 taco shells,15:45,126.0,16.8,0.4,1.7
Gnd beef,15:45,308.0,0.0,0.0,31.0
cheese,15:45,113.0,0.9,0.1,6.4
rice + beans,15:45,55.0,9.0,0.3,1.7
Two slices of bread,16:30,154.0,28.0,3.2,5.2
Butter,16:30,204.0,0.0,0.0,0.2
`
    let dinner_info = `Here is the food available for the dinner: Food,Hour,Calories,Carb (g),Sugar (g),Protein (g)
Berry Smoothie,18:00:00,456.0,85.0,83.0,16.0
Chicken Leg,20:30:00,475.0,0.0,0.0,62.0
Asparagus,20:30:00,13.0,2.5,0.8,1.4
Acai Smoothie,19:30:00,440.0,92.0,75.0,5.0
(Trader Joe's) Mac and Cheese,20:00:00,135.0,23.5,1.5,5.0
Coconut Shrimp,20:00:00,317.0,30.0,0.1,11.0
Bourbon Chicken,20:30:00,212.0,10.0,9.4,22.0
Rice,20:30:00,103.0,22.0,0.0,2.1
Shrimp,20:30:00,86.0,1.1,0.0,17.0
Cabbage,20:30:00,17.0,4.1,2.1,0.9
Chai Tea,21:10:00,12.0,3.4,0.0,0.2
Kale Salad,21:00:00,83.7,4.0,2.1,1.2
Pizza,21:00:00,285.0,36.0,3.8,12.0
Oreo Cookies,21:56:00,107.0,17.0,9.3,0.7
Ranch Wings,22:00:00,776.0,30.4,0.6,44.0
Turkey Slider,18:00:00,314.0,21.0,3.9,18.0
Chicken and Rice,20:00:00,532.0,22.0,1.0,67.0
Tangerine Orange,18:45:00,47.0,12.0,9.3,0.7
Salad,20:15:00,13.0,2.8,1.2,0.8
Green Smoothie,20:30:00,308.0,69.0,38.0,7.2
Cheese Pita,19:50:00,640.0,95.0,0.0,30.0
Spinach Smoothie,20:00:00,308.0,69.0,38.0,7.2
(Red Baron) Brick Oven Pepperoni Pizza,18:00:00,1360.0,144.0,28.0,52.0
M & M ,20:19:00,400.0,62.0,56.0,4.0
Stouffers Salisbury Steak Family Size ,17:50:00,175.0,12.0,2.0,11.5
Mashed Potato,17:50:00,300.0,40.0,2.0,4.0
Chocolate Milk,18:22:00,241.0,36.0,34.0,11.0
Frozen Pop,20:45:00,41.1,10.0,7.1,0.0
Mello Yello,18:48:00,145.0,38.0,38.0,0.0
Chip,20:59:00,302.0,43.0,0.5,4.5
Salsa,20:59:00,19.0,4.3,2.6,1.0
Gatorade,20:21:00,79.3,19.6,16.0,0.0
Fig Newton,21:38:00,350.0,73.5,42.0,3.5
Small Oranges/Summer Cuties,19:58:00,188.0,48.0,37.2,0.0
Steak,19:00:00,788.0,0.0,0.0,74.0
Fried Potato,19:00:00,365.0,48.0,0.3,4.0
Ice Cream,20:00:00,273.0,31.0,28.0,4.6
Rib,19:15:00,505.0,0.0,0.0,29.0
Mash Potato,19:15:00,237.0,36.0,3.0,4.1
Sweet Tea,19:15:00,160.0,41.0,40.0,0.0
Cake,21:30:00,262.0,38.0,28.0,2.0
Rice Krispies,17:22:00,140.0,31.0,3.6,2.5
(Hamburger Helper) Deluxe Cheeseburger Macaroni,19:00:00,660.0,132.0,18.0,18.0
Chocolate Cake,21:30:00,424.0,58.0,44.0,3.8
Power Smoothie,18:55:00,202.5,43.7,38.7,5.0
French Dressing,20:20:00,129.0,1.8,1.4,0.4
Spaghetti,20:20:00,852.0,171.0,6.1,30.0
Crab Cakes,18:09:00,391.0,16.0,3.2,25.0
Brussel Sprouts,18:09:00,122.0,24.0,5.9,8.7
Tortilla Chips,21:00:00,268.0,38.0,0.4,4.0
Carne Asada Steak,20:00:00,498.0,0.5,0.1,59.0
Beans,20:00:00,53.0,12.0,4.5,2.7
Merlot Wine,19:30:00,293.0,8.9,2.2,0.3
Crusted Parmesian Chicken,19:30:00,760.0,20.0,0.0,84.0
Salad with Ranch Dressing,19:30:00,654.9,48.2,8.5,17.0
Sweet Potato with Butter and Brown Sugar,19:30:00,140.0,12.6,7.2,0.6
Chocolate Lava Cake,19:30:00,182.0,18.0,13.0,2.8
Vanilla Ice Cream,19:30:00,59.0,6.7,6.0,1.0
Lemon Drop Martini,19:30:00,678.0,65.0,62.0,0.4
Hibachi Steak,18:30:00,262.9,1.1,0.0,36.6
Vegetables,18:30:00,37.0,7.4,1.8,1.6
Fried Rice,18:30:00,296.0,56.0,0.9,6.9
BBQ Chicken,21:15:00,382.0,27.0,22.0,41.0
Lasagna,20:00:00,355.0,20.0,6.6,26.0
Hershey Kiss,20:40:00,70.0,7.7,6.7,1.0
Reese Cup,20:40:00,80.3,8.6,7.4,1.6
Peach,18:00:00,68.0,17.0,15.0,1.6
Grapes,20:15:00,34.0,8.9,7.6,0.4
Popcorn,20:00:00,485.0,48.0,0.5,6.5
Tea with Lemon,20:00:00,2.2,0.7,0.0,0.0
Peanut Butter,20:45:00,94.0,3.9,1.1,3.5
Spoon Biscotti,20:45:00,87.0,13.0,5.0,1.5
Salmon,20:30:00,468.0,0.0,0.0,50.0
Spinach,20:30:00,41.0,6.8,0.8,5.3
Mash Potatoes,20:30:00,237.0,36.0,3.0,4.1
Small Bag of Popcorn,18:30:00,485.0,48.0,0.5,6.5
Cookies,18:30:00,444.0,60.0,29.7,4.5
Cheese Stick,18:30:00,85.0,0.6,0.3,6.3
Chicken Breast ,20:00:00,198.0,0.0,0.0,37.0
Cereal,19:00:00,211.0,41.0,2.4,6.8
Banana,19:00:00,105.0,27.0,14.0,1.3
90% Cocoa Dark Chocolate,22:00:00,60.0,3.0,0.8,1.0
Ziti,19:00:00,358.0,70.0,1.3,13.0
Slice of Banana Bread,19:30:00,362.0,58.0,28.0,5.5
Cheese,22:00:00,113.0,0.9,0.1,6.4
Ranch Dressing,17:45:00,244.0,1.7,1.3,0.4
Baked Potato,17:45:00,80.5,18.3,1.0,2.2
(Babybel) Cheese,22:30:00,71.0,0.3,0.3,5.0
Pepperoni,22:30:00,40.0,0.1,0.0,1.5
Chicken,18:00:00,149.0,0.0,0.0,16.0
Peppers,18:00:00,11.0,2.7,1.0,0.4
Onions,18:00:00,30.0,6.9,3.2,0.9
Flour Tortilla,18:00:00,159.0,27.0,0.0,4.3
Black Beans,18:00:00,114.0,20.0,0.3,7.6
Babybel Cheese,22:00:00,71.0,0.3,0.3,5.0
Coffee,18:00:00,3.0,0.0,0.0,0.4
Creamer,18:00:00,12.0,1.0,0.0,0.1
Sugar,18:00:00,33.0,8.5,8.5,0.0
Taco Salad,19:30:00,503.0,45.0,3.1,22.0
(Outback Steakhouse) Chicken Tacos,18:30:00,1210.0,55.0,8.0,65.0
(Outback Steakhouse) Asparagus,18:30:00,60.0,4.0,2.0,2.0
(Outback Steakhouse) Bread with Butter,18:30:00,310.0,51.0,10.0,10.0
(Outback Steakhouse) Mixed Drink,18:30:00,601.0,44.0,44.0,0.0
90% Dark Chocolate,22:15:00,60.0,3.0,0.8,1.0
Yogurt,18:00:00,143.0,16.0,16.0,12.0
Strawberries,18:00:00,17.0,4.0,2.5,0.3
Granola Bar,22:00:00,711.0,119.0,49.0,9.6
Multigrain Chips,21:00:00,280.0,36.0,0.0,6.0
Hummus,21:00:00,71.0,6.1,0.0,3.4
Chocolate chip cookies,19:30:00,296.0,40.0,19.8,3.0
Fruit smoothie,22:00:00,606.0,126.0,90.0,21.0
Baked cheetos,22:00:00,700.0,100.0,5.0,10.0
PB protein whey powder,18:25:00,113.0,2.0,0.0,25.0
Chex Mix cheddar,18:25:00,260.0,44.0,6.0,4.0
Fritos single serving bag,20:00:00,452.0,48.0,0.2,5.1
Blue Bunny fudge bar,1900-01-01 00:45:00,124.0,24.0,18.0,4.4
Lean Cuisine mushroom ravioli box meal,20:25:00,270.0,40.0,8.0,10.0
M&Ms,1900-01-01 00:05:00,236.0,34.0,31.0,2.1
Premier protein choc shake,18:15:00,160.0,5.0,1.0,30.0
Nutrigrain bar,18:15:00,130.0,25.0,13.0,2.0
Totinos pizza,19:15:00,1320.0,148.0,16.0,44.0
3/4 large blueberry pancake,19:50:00,84.0,11.0,0.0,2.3
Salad - Butter Lettuce,17:55,171.0,8.5,3.7,2.5
Chickpeas,17:55,116.0,19.0,3.4,6.3
Red Onion,17:55,11.4,2.6,1.2,0.4
(Toast) Red Wine Vinegrette,17:55,35.0,1.8,1.6,0.1
(Jolly Time) Select Yellow Pop Corn - Air Popped,20:30,200.0,48.0,0.0,8.0
(Peppridge Farm) Whole Wheat Hamburger Bun,22:25,130.0,22.0,3.0,7.0
(Jif) Extra Crunchy Peanut Butter,22:25,190.0,8.0,3.0,7.0
Tilapia,19:05,74.0,0.0,0.0,15.0
(Harris Teeter) Charleston Crabcake,19:05,90.0,3.7,0.7,5.8
(Green Giant) Rice Cauliflower - Plain,19:05,10.5,2.1,0.8,0.8
Broccoli - Steamed,19:05,30.0,6.1,1.2,2.0
Lemon Juice,19:05,0.8,0.3,0.1,0.0
Butter Lettuce,18:10,11.0,1.9,0.8,1.1
Pecans,18:40,207.0,4.2,1.2,2.8
Smart Balance,22:30,41.0,0.0,0.0,0.0
Navel Orange,22:30,104.0,27.0,18.0,1.9
Homemade soup with Hot Italian sausage kale cannolli beans onion garlic (Kirkland) organic chicken stock white wine,20:25,600.0,48.0,8.3,22.5
Chicken breaded with (Progesso) Italian Bread Crumbs,18:35,275.6,20.5,1.3,29.9
Potato,18:35,50.2,11.3,0.6,1.4
Extra Virgin Olive Oil,18:35,119.0,0.0,0.0,0.0
Salad - Spring Mix,19:15,17.0,3.1,0.5,1.3
Homemade Chicken Noodle Soup with chicken onion celery (Kirkland) organic chicken stock and (Amish Kitchens) wide egg noodles,19:15,124.0,15.0,1.3,6.3
Steamed Shrimp,17:55:00,29.0,0.4,0.0,5.5
Mixed Vegetable,17:55:00,5.7,1.2,0.5,0.3
Moscato,17:55:00,197.0,13.0,0.0,0.2
Pizza Triangles,19:00:00,1138.0,143.0,15.0,49.0
Brownie,19:00:00,132.0,14.0,0.0,1.8
Lemon,19:00:00,24.0,7.8,2.1,0.9
Tomato and Mozzarella Toothpick,19:00:00,220.0,4.7,2.8,13.0
Corona,19:00:00,148.0,14.0,0.0,0.0
Blackberries,19:00:00,6.1,1.4,0.7,0.2
Large Baked Potato,20:15:00,278.0,63.0,3.5,7.5
Mojito,20:15:00,343.0,48.0,43.0,0.6
Steamed Broccoli,20:15:00,30.0,6.1,1.2,2.0
Air Fried French Fries,19:18:00,442.0,59.0,0.4,4.9
Air Fried Chicken Loingettes ,18:25:00,377.0,4.4,0.0,40.0
Salad - Tomato Cheese Lettuce Tortilla Strips,18:25:00,80.0,17.0,7.3,4.9
Burger Salad - Lettuce Tomato Cheese Tortilla Strips Burger Thousand Island Dressing,17:32:00,471.0,13.0,8.7,28.0
Baked Sweet Potato,17:00:00,103.0,24.0,7.4,2.3
Lemon Cookies,17:00:00,550.7,89.3,50.7,6.0
Chicken Wingettes,19:00:00,526.0,16.0,0.4,27.0
Medium Baked Potato,19:00:00,80.0,18.0,1.0,2.2
Mixed Vegetable Green Beans Peas Corn Carrots,19:00:00,37.0,7.9,3.0,9.0
Corn on the Cobb,19:30:00,99.0,22.0,4.7,3.5
Ham Biscuit,19:30:00,299.0,27.0,4.1,9.1
Hot Dog,19:30:00,77.0,0.6,0.3,2.8
Smoothie (spinach celery banana and strawberry),18:15:00,323.0,68.0,48.0,11.0
California Roll,21:15:00,523.0,57.0,11.0,12.0
Townhouse Cracker,21:25:00,67.2,7.7,0.8,0.7
2% Milk,21:30:00,122.0,12.0,12.0,8.1
Celery Stick,17:30:00,14.0,3.0,1.8,0.6
peanut butter,17:30:00,188.0,7.7,2.1,7.0
Cream of Wheat Instant Hot Cereal,19:50:00,146.7,32.0,1.3,5.3
Strawberry,19:50:00,23.0,5.5,3.5,0.5
Boiled Chicken with Cherry Tomatoes and Taco Shell Pieces,20:00:00,498.7,0.1,0.0,54.3
Atlantic Salmon,20:00:00,468.0,0.0,0.0,50.0
Pita Bread,20:00:00,165.0,33.0,0.8,5.5
Barbecue Sauce,20:00:00,58.0,14.0,11.0,0.3
Swiss Cheese Thinly Sliced,19:15:00,110.0,0.4,0.0,7.5
2% Milk ,19:30:00,122.0,12.0,12.0,8.1
Peanut Buttter,17:25:00,188.0,7.7,2.1,7.0
Salmon with Butter and Asparagus,18:45:00,660.0,1.8,0.2,56.0
(Florida's Natural) Orange Juice,19:15:00,110.0,26.0,22.0,2.0
Boneless Skinless Chicken Thigh,17:55:00,232.5,0.0,0.0,33.8
Cooked Spinach,17:55:00,21.0,3.4,0.4,2.7
Kombucha GTS Cosmic Cranberry,18:55:00,30.0,7.0,2.0,0.0
(Blue Diamond) Almond Nut Thins,18:55:00,130.0,24.0,0.0,3.0
Bacon,19:15:00,161.0,0.6,0.0,12.0
Gin-soaked Raisins,20:20:00,129.0,34.0,25.0,1.3
(Hannah) Tatziki Sauce,18:05:00,80.0,4.0,0.0,2.0
Tomatoes,18:05:00,30.0,6.4,4.3,1.4
Balsamic Vinegar,18:05:00,28.0,5.4,4.8,0.2
Cucumber,18:05:00,7.8,1.9,0.9,0.3
Salad Greens,18:05:00,18.0,3.4,0.6,1.4
Red Bell Pepper,18:05:00,9.5,2.3,1.5,0.3
Chardonnay Wine,19:25:00,197.0,5.1,2.3,0.2
Pistachios,20:20:00,200.0,9.5,2.5,7.5
Faro,18:00:00,337.0,71.0,7.8,15.0
Cooked Broccoli,18:00:00,54.0,11.2,2.2,3.8
(Dove) Promises Dark Chocolate,18:32:00,168.0,19.2,15.2,1.6
Celery,17:12:00,14.0,3.0,1.8,0.6
Grilled Salmon,18:07:00,292.0,0.0,0.0,31.0
Homemade potato cauliflower soup with potato cauliflower chicken broth onions,18:07:00,450.0,41.0,1.9,23.0
Sausage Kale Sweet Potato Soup,17:30:00,300.0,46.0,26.0,5.4
Mountain Dew,19:00:00,230.0,62.0,62.0,0.0
Hamburger,19:20:00,1080.0,81.0,0.0,69.0
Chips,19:20:00,894.0,90.0,0.5,10.8
Candy Bar,19:50:00,280.0,35.0,29.0,4.3
Reese's Peanut Butter Cup,17:30:00,210.0,24.0,21.0,5.0
Nutty Bar,19:00:00,326.0,33.0,20.0,4.8
Potato Salad,19:20:00,358.0,28.0,0.0,6.7
Baked Beans,19:20:00,239.0,54.0,20.0,12.0
Sausage Biscuit,19:00:00,824.0,66.0,3.6,22.0
Scrambled Eggs with Jelly,19:00:00,169.0,1.8,1.6,11.0
Peanut Butter Cracker,18:00:00,207.0,25.0,4.4,4.8
Chicken Casserole,19:30:00,513.0,30.0,2.7,24.0
Green Beans,19:30:00,40.0,8.9,4.1,2.1
Apple Pie,19:30:00,269.0,39.0,18.0,2.2
Chicken Pot Pie,18:30:00,463.0,44.0,5.1,12.0
Peach Cobbler,18:30:00,226.0,40.0,32.0,2.3
Peas,18:00:00,95.0,18.0,6.7,6.1
Cranberry Sauce,18:00:00,110.0,28.0,22.0,0.6
Chocolate Pudding,18:00:00,242.0,39.0,29.0,3.6
Porkchop,18:30:00,355.0,0.0,0.0,44.0
Toast,18:30:00,128.0,24.0,2.7,4.0
Oreo Cookie,17:00:00,200.0,32.0,18.0,2.0
Peanuts,17:00:00,333.0,12.0,2.8,14.0
Banana Sandwich,20:15:00,443.0,55.0,18.0,6.6
Black Raspberry Chocolate Ice Cream,19:00:00,600.0,60.0,54.0,6.0
Cheese and Crackers,19:17:00,179.0,10.0,2.2,7.8
(UTZ) Cheese Puffs,21:44:00,226.0,22.0,1.1,2.3
Cream Cheese,18:29:00,102.0,1.6,1.1,1.8
Sausage,18:29:00,210.0,0.6,0.6,8.1
Tea,18:45:00,1.8,0.5,0.0,0.0
Olives,20:27:00,26.0,1.4,0.0,0.2
(Babybel) Cheese Bite,22:40:00,71.0,0.3,0.3,5.0
Chicken Thigh,17:47:00,556.0,0.2,0.0,61.0
Moon Cheddar Cheese,20:49:00,230.0,1.8,0.3,12.9
Mint Chocolate Cookies,17:38:00,390.0,48.0,27.0,3.0
Dark Chocolate Chip,19:22:00,458.0,52.0,40.0,4.0
Corn Cheese Puffs,19:30:00,457.0,3.6,0.5,28.5
Peanut M & M,17:45:00,103.0,12.0,10.0,1.9
Grilled Cheese,18:50:00,732.0,57.0,11.0,23.0
Kashi Go Crunch with Milk,19:40:00,253.3,50.7,17.3,12.0
Vodka Gray Goose,17:45:00,69.0,0.0,0.0,0.0
Kale,17:53:00,36.0,7.3,1.6,2.5
Mozzarella,17:53:00,85.0,0.6,0.3,6.3
Chicken Burger,17:53:00,535.0,57.0,6.5,29.0
Whole Wheat Toast with Butter,19:02:00,222.0,29.0,3.3,5.2
Angle Food Candy from Mother,19:24:00,292.0,58.0,55.7,1.5
Grilled Chicken Cheese Sandwich,18:40:00,511.0,31.0,4.6,39.0
Angle Food Candy ,19:49:00,292.0,58.0,55.7,1.5
(Garrett's) Caramel Popcorn Cheddar,21:28:00,362.0,66.0,44.0,3.2
Chicken Salad Sandwich,17:25:00,535.0,33.0,6.9,34.0
Ginger Bread Cookie,17:45:00,806.0,147.0,72.0,12.0
Cheddar and Caramel Popcorn,19:40:00,58.0,5.7,0.1,1.0
peppermint bark candy,20:15:00,144.0,18.0,16.0,1.4
(Mich) Ultra Beer,22:40:00,95.0,2.6,0.0,0.6
Lasagna (mostly vegetables),18:57,524.0,30.0,9.8,38.0
Red Wine,18:57,50.0,1.5,0.4,0.0
Cashew Nut,19:02,54.0,3.1,0.5,1.4
Chocolate,19:27,54.0,5.9,5.2,0.8
Herbal Tea,20:49,2.4,0.5,0.0,0.0
Honey,20:49,21.0,5.8,5.8,0.0
Frosted Flake,21:23,280.0,56.5,24.0,8.0
Decaf Latte,21:38,189.0,19.0,19.0,12.0
Lactose Free Milk,21:38,409.0,11.0,0.0,7.4
Small Sweet Potato,17:20,54.0,12.0,3.9,1.2
Turkey Leg,17:20,345.0,0.0,0.0,49.0
Stuffing,17:20,176.0,17.0,1.8,2.5
English Peas,17:20,84.0,16.0,5.9,5.4
Ice Cream Sandwich,19:03,284.0,45.0,22.0,5.1
Pound Cake,20:38,212.0,32.0,20.0,3.0
Blueberry,20:38,85.0,21.0,15.0,1.1
toffee,17:47,134.0,16.0,15.0,0.3
vegetable lasagna,19:40,392.0,24.0,5.1,24.0
green beans,19:40,11.0,2.5,1.1,0.6
ice cream,20:08,273.0,31.0,28.0,4.6
ice cream sandwich,17:28,284.0,45.0,22.0,5.1
rice,17:32,205.0,45.0,0.1,4.3
bean,17:32,225.0,40.0,0.6,15.0
duck burrito,17:32,434.0,56.0,5.1,17.0
salsa,17:32,10.0,2.4,1.4,0.6
corn chips,17:32,151.0,16.0,0.1,1.7
beer,17:30,153.0,13.0,0.0,1.6
duck soup with dumpling,17:30,129.0,23.0,7.5,7.0
egg,19:00,36.0,0.2,0.1,3.1
potato chip,19:00,447.0,45.0,0.3,5.4
Mixed Nuts,18:13,153.0,6.5,1.2,4.4
pasta salad with vegetables,19:00,407.0,35.0,3.0,12.0
salad dressing,19:00,129.0,1.8,1.4,0.4
cookie,21:25,886.0,118.0,59.0,9.2
soda,18:19,155.0,38.0,37.0,0.0
lamb,19:45,250.0,0.0,0.0,21.0
small sweet potato,19:45,54.0,12.0,3.9,1.2
beet,19:45,22.0,5.0,4.0,0.8
tea,20:20,2.4,0.7,0.0,0.0
On Gold Standard 100% Whey Protein,19:30:00,113.0,2.0,0.0,25.0
Frozen Strawberries,19:30:00,20.0,5.0,2.5,0.2
Pork Loin Tenderloin (Hornet),19:30:00,83.0,0.0,0.0,14.7
Thomas Blueberry English Muffins,18:50:00,300.0,56.0,2.0,10.0
Jimmy Dean Hot Premium Pork Sausage,18:50:00,150.0,0.7,0.5,8.5
Large Egg,18:50:00,70.0,0.4,0.2,6.3
Kerry Gold Butter,18:50:00,100.0,0.0,0.0,0.0
Lanad o Lakes Cinnamon Sugar,18:50:00,60.0,17.0,15.0,0.0
Asndes Cremede Menth Thin Mints,19:32:00,75.0,8.4,7.2,1.1
Lu Petit Ecolier Milk Chocolate Biscuit Cookie,17:30:00,123.0,18.2,5.3,1.6
Chicken Breast Air Fried,19:21:00,198.0,0.0,0.0,37.0
Green Smoothie (with avocado cotton candy green grapes pear broccoli kale spinach banana),19:21:00,123.0,28.0,15.0,3.0
Sathers Caramel Creams,17:30:00,94.0,17.0,9.0,0.7
Large Eggs Scrambled (nothing added),19:40:00,182.0,2.0,2.0,12.0
Thomas English Muffin Blueberry,19:40:00,150.0,28.0,1.0,5.0
Thomas English Muffin Cinnamon,19:40:00,150.0,28.0,1.0,5.0
Pizza Slice of NY Pepperoni,18:30:00,626.0,70.0,7.0,26.0
Mozarrella Sticks,18:30:00,303.0,24.0,2.0,14.0
Coca Cola,18:30:00,150.0,41.0,41.0,0.0
Kraft Mac and Cheese,19:30:00,376.0,47.0,8.5,9.7
Ghiradelli Peppermint Bark Square,17:50:00,144.0,18.0,16.0,1.4
Land o Lakes Cinnamon Butter,18:15:00,60.0,17.0,15.0,0.0
Sloppy Joe with 1 Bun,17:15:00,399.0,37.0,13.0,27.0
Lay's Wavy Potato Chips,17:15:00,298.0,30.0,0.2,3.6
Lut Petit Ecolier Milk Chocolate Biscuit Cookie,17:15:00,123.0,18.2,5.3,1.6
Ruffles chips,17:50,447.0,45.0,0.3,5.4
Panko breaded baked fish ,20:30,398.0,14.0,0.0,32.0
Onion,20:30,41.5,9.5,4.5,1.3
BLT salad,18:10,409.0,16.5,3.8,12.5
Whole grapefruit,18:10,104.0,26.0,17.0,1.9
Slim Fast,1:10,171.0,2.5,1.8,19.5
Taco Bell Nachos Grande,20:00,740.0,82.0,5.0,16.0
Taco Bell Cinnamon Twists,20:00,170.0,27.0,13.0,1.0
Crystal Light Lemonade,20:00,198.0,51.0,49.0,0.3
2/3 bag Orville Redenbacher butter popcorn,18:20,255.0,26.0,1.0,4.0
Coffee + skim milk,18:38,35.0,4.5,4.7,3.4
Chef Salad,20:55,675.0,26.5,9.5,28.0
V8 juice ,20:55,30.0,7.0,5.0,1.0
Small chocolate shake (1/2),17:00,270.0,48.0,47.3,7.0
Ham and cheese sandwhich,17:00,517.0,28.5,3.6,28.0
Outback Cobb salad with salmon,20:00,577.0,15.0,5.7,43.0
Blue cheese dressing,20:00,146.0,1.4,1.0,0.4
Outback cheesecake with chocolate sauce,22:00,480.0,45.0,37.0,7.1
Outback bread loaf (1/2) + butter,18:00,320.0,60.0,0.7,11.2
Chipotle burrito bowl chicken and steak black beans cheese lettuce salsa sour cream,19:30,1008.0,117.0,5.6,49.0
2 Yuengling beers,19:30,312.0,26.4,0.0,3.4
Chicken soup,18:00,168.0,24.0,5.2,10.0
Crostinis (slice of French bread swiss tomato),18:00,522.0,99.0,9.0,20.7
Chicken enchiladas with black beans spanish rice salsa,19:30,536.0,60.0,4.8,28.0
Beer,19:30,204.0,17.0,0.0,2.2
"12"" Italian BMT Subway whole wheat mayo",17:00,1064.0,60.0,8.0,50.0
Bojangles chicken thigh,20:00,714.0,23.4,0.0,57.0
Sweat tea ice,20:00,320.0,84.0,80.0,0.0
Plain cheese pizza,18:30,1808.0,228.0,24.4,76.0
Anchovies,18:30,25.0,0.0,0.0,3.6
Blue Cheese dressing,18:30,146.0,1.4,1.0,0.4
Lemonade,18:30,99.0,26.0,25.0,0.2
`
    const predefinedMessages = [breakfast_info, lunch_info, snack_info, dinner_info];

    predefinedMessages.forEach((message, index) => {
        setTimeout(() => {
            userData.message = message; // Mettre à jour le message de l'utilisateur
            // Crée un message sans l'afficher dans l'interface

            // Ajouter l'entrée dans l'historique du chat sans afficher à l'écran
            chatHistory.push({
                role: "user",
                parts: [{ text: userData.message }]
            });
            console.log("Message envoyé")
        }, index * 1000); // Délai de 1 seconde entre chaque message
    });
});