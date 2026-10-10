export async function getExchangeRates(baseCurrency = "USD") {
    const url = `https://open.er-api.com/v6/latest/${baseCurrency}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not get exchange rates.");
    }

    const data = await response.json();

    if (data.result !== "success") {
        throw new Error("Exchange rates are unavailable.");
    }

    return data.rates;
}