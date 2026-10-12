
import test from "node:test";
import assert from "node:assert/strict";
import {
    convertCurrency,
    calculateTotal,
    filterExpenses
} from "../src/utils.js";

test("converts an amount using the rate for its currency", function () {
    assert.equal(convertCurrency(100, "EUR", { EUR: 0.5 }), 200);
});

test("calculates the total expenses", function () {
    assert.equal(calculateTotal([100, 200, 50]), 350);
});

test("returns only expenses in the selected category", function () {
    const expenses = [
        { description: "Lunch", category: "Food" },
        { description: "Bus", category: "Transport" }
    ];

    const result = filterExpenses(expenses, "Food");

    assert.equal(result.length, 1);
    assert.equal(result[0].description, "Lunch");
});

test("returns zero for an empty list", function () {
    assert.equal(calculateTotal([]), 0);
});

test("returns all expenses when All is selected", function () {
    const expenses = [
        { category: "Food" },
        { category: "Transport" }
    ];

    assert.equal(filterExpenses(expenses, "All").length, 2);
});

test("throws an error when the rate is missing", function () {
    assert.throws(function () {
        convertCurrency(100, "XYZ", { EUR: 0.5 });
    });
});

test("returns zero when the amount is zero", function () {
    assert.equal(convertCurrency(0, "EUR", { EUR: 0.5 }), 0);
});