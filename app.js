const fromAmountElement = document.querySelector(".amount");
const convertedAmountElement = document.querySelector(".convertedAmount");
const fromCurrencyElement = document.querySelector(".fromCurrency");
const toCurrencyElement = document.querySelector(".toCurrency");
const resultElement = document.querySelector(".result");

//Array to populate the select tags with these countries

const countries = [
  { code: "USD", name: "United State Dollar" },
  { code: "INR", name: "Indian Rupee" },
];

//Showing countries from array to select tag
countries.forEach((country) => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");

  option1.value = option2.value = country.code;
  option1.textContent =
    option2.textContent = `${country.code}(${country.name})`;

  fromCurrencyElement.appendChild(option1);
  toCurrencyElement.appendChild(option2);

  // setting default value of element
  fromAmountElement.value = "USD";
  toCurrencyElement.value = "INR";
});

// Functon to get exchange rate using API
const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
  
    // Fetch data from API
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
  
      const conversionRate = data.rates[toCurrency];
      const convertedAmount = amount * conversionRate;
  
      convertedAmountElement.value = convertedAmount.toFixed(2); // Round to 2 decimal places
      resultElement.textContent=`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  fromAmountElement.addEventListener('input', getExchangeRate);
  
