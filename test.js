function addMealRow(mealType) {
    const mealTableBody = document.getElementById('meal-table-body');

    // Création d'une nouvelle ligne
    const row = document.createElement('tr');

    // Colonne du type de repas
    const mealCell = document.createElement('td');
    mealCell.textContent = mealType.charAt(0).toUpperCase() + mealType.slice(1); // Capitalisation
    row.appendChild(mealCell);

    // Colonne de sélection des aliments
    const foodCell = document.createElement('td');
    const select = document.createElement('select');

    // Liste des aliments (modifiable selon besoin)
    const foods = ['Pomme', 'Pain', 'Œuf', 'Yaourt', 'Poulet', 'Riz', 'Légumes', 'Noix'];
    foods.forEach(food => {
        const option = document.createElement('option');
        option.value = food;
        option.textContent = food;
        select.appendChild(option);
    });

    foodCell.appendChild(select);
    row.appendChild(foodCell);

    // Bouton de suppression
    const actionCell = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Supprimer";
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = function () {
        mealTableBody.removeChild(row);
    };

    actionCell.appendChild(removeBtn);
    row.appendChild(actionCell);

    // Ajout de la ligne au tableau
    mealTableBody.appendChild(row);
}

