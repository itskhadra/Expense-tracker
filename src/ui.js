const expenseList = document.getElementById("expense-list");

export function displayExpenses(expenses, homeCurrency, onDelete) {
    expenseList.innerHTML = "";

const emptyMessage = document.getElementById("empty-message");

if (expenses.length === 0) {
    emptyMessage.hidden = false;
    return;
}

emptyMessage.hidden = true;

    expenses.forEach(function (expense) {
        const card = document.createElement("div");
        const title = document.createElement("h3");
        const details = document.createElement("p");
        const converted = document.createElement("p");
        const deleteButton = document.createElement("button");

        title.textContent = expense.description;

        details.textContent =
            `${expense.amount} ${expense.currency} | ${expense.category}`;

        converted.textContent =
            `Converted: ${homeCurrency} ${Number(expense.convertedAmount).toFixed(2)}`;

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function () {
            onDelete(expense.id);
        });

        card.appendChild(title);
        card.appendChild(details);
        card.appendChild(converted);
        card.appendChild(deleteButton);

        expenseList.appendChild(card);
    });
}

export function displayTotal(total, homeCurrency) {
    const totalAmount = document.getElementById("total-amount");

    totalAmount.textContent =
        `${homeCurrency} ${Number(total).toFixed(2)}`;
}

export function showLoading(isLoading) {
    const loadingMessage = document.getElementById("loading-message");

    loadingMessage.hidden = !isLoading;
}

export function showError(message) {
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = message;
    errorMessage.hidden = message === "";
}