
export function convertCurrency(amount, rate) {
    return amount * rate;
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
