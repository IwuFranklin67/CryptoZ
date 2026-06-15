const amountInput = 100;
const resultDisplay = document.getElementById("resultDisplay");
const from = document.getElementById("from");
const to = document.getElementById("to");

const api = "https://api.frankfurter.dev";

async function convert(base, quote, amount) {
  try {
    const response = await fetch(`${api}/v2/rate/${base}/${quote}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.rate === undefined) {
      throw new Error("No rate found in API response");
    }

    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
      throw new Error("Invalid amount entered");
    }

    const result = (numericAmount * data.rate).toFixed(2);

    return result;
  } catch (error) {
    console.error("Conversion failed", error.message);

    throw error;
  }
}

convert("USD", "EUR", amountInput)
  .then((result) => (resultDisplay.textContent = result))
  .catch((err) => console.error(err));
