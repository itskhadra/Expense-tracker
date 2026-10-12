import { convertCurrency } from "./utils.js";
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


// Save the latest exchange rates
export function setRates(newRates) {
    rates = newRates;
}
// Recalculate every converted amount using the current rates.
// map builds a new array, and {...expense} copies each object
// instead of changing it (second use of the spread operator).
export function recalculateExpenses() {
    expenses = expenses.map(function (expense) {
        return {
            ...expense,
            convertedAmount: convertCurrency(
                expense.amount,
                expense.currency,
                rates
            )
        };
    });
}

