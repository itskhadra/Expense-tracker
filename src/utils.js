// rates come from the API with the home currency as the base,
// so rates["USD"] means "USD per 1 unit of home currency".
// Dividing converts an amount in that currency into the home currency.
export function convertCurrency(amount, fromCurrency, rates) {
    const rate = rates[fromCurrency];

    if (!rate) {
        throw new Error(`Missing exchange rate for ${fromCurrency}`);
    }

    return amount / rate;
}
export function calculateTotal(amounts) {
    return amounts.reduce(function (total, amount) {
        return total + amount;
    }, 0);
}

export function filterExpenses(expenses, category) {
    if (category === "All") {
        return expenses;
    }

    return expenses.filter(function (expense) {
        return expense.category === category;
    });
}
