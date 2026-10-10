
import { getExchangeRates } from "./api.js";
import {
    addExpense,
    deleteExpense,
    expenses,
    homeCurrency,
    setHomeCurrency
} from "./state.js";
import {
    displayExpenses,
    displayTotal,
    showLoading,
    showError
} from "./ui.js";

const form = document.getElementById("expense-form");
const homeCurrencySelect = document.getElementById("home-currency");
const categoryFilter = document.getElementById("category-filter");

async function convertAmount(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
        return amount;
    }

    const rates = await getExchangeRates(fromCurrency);
    const rate = rates[toCurrency];

    if (!rate) {
        throw new Error("Currency conversion is unavailable.");
    }

    return amount * rate;
}

async function updateExpenseConversions() {
    for (const expense of expenses) {
        expense.convertedAmount = await convertAmount(
            expense.amount,
            expense.currency,
            homeCurrency
        );
    }
}

async function loadRates() {
    showLoading(true);
    showError("");

    try {
        await getExchangeRates(homeCurrency);
        await updateExpenseConversions();
    } catch (error) {
        showError("Could not load exchange rates. Please try again.");
    } finally {
        showLoading(false);
    }
}

function updatePage() {
    const selectedCategory = categoryFilter.value;

    const filteredExpenses = expenses.filter(function (expense) {
        return selectedCategory === "All" ||
            expense.category === selectedCategory;
    });

    displayExpenses(filteredExpenses, homeCurrency, function (id) {
        deleteExpense(id);
        updatePage();
    });

    const total = expenses.reduce(function (sum, expense) {
        return sum + (expense.convertedAmount || 0);
    }, 0);

    displayTotal(total, homeCurrency);
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const description = document.getElementById("description").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const currency = document.getElementById("currency").value;
    const category = document.getElementById("category").value;

    if (!description || !Number.isFinite(amount) || amount <= 0) {
        showError("Please enter a description and a valid amount.");
        return;
    }

    showLoading(true);
    showError("");

    try {
        const convertedAmount = await convertAmount(
            amount,
            currency,
            homeCurrency
        );

        addExpense({
            id: Date.now(),
            description,
            amount,
            currency,
            category,
            convertedAmount
        });

        form.reset();
        updatePage();
    } catch (error) {
        showError("Could not convert the currency. Please try again.");
    } finally {
        showLoading(false);
    }
});

homeCurrencySelect.addEventListener("change", async function () {
    setHomeCurrency(homeCurrencySelect.value);
    await loadRates();
    updatePage();
});

categoryFilter.addEventListener("change", updatePage);

await loadRates();
updatePage();
