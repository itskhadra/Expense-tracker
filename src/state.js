export let expenses = [];

export let homeCurrency = "KES";
export let rates = {};

// Add a new expense
export function addExpense(expense) {
    expenses = [...expenses, expense];
}

// Delete an expense
export function deleteExpense(id) {
    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });
}

// Change the home currency
export function setHomeCurrency(currency) {
    homeCurrency = currency;
}

// Get all expenses
export function getExpenses() {
    return expenses;
}

// Get the home currency
export function getHomeCurrency() {
    return homeCurrency;
}
// Save the latest exchange rates
export function setRates(newRates) {
    rates = newRates;
}