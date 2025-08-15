const currencyData = {
  USD: { country: "us", name: "United States Dollar" },
  INR: { country: "in", name: "Indian Rupee" },
  EUR: { country: "eu", name: "Euro" },
  GBP: { country: "gb", name: "British Pound" },
  JPY: { country: "jp", name: "Japanese Yen" },
  AUD: { country: "au", name: "Australian Dollar" },
  CAD: { country: "ca", name: "Canadian Dollar" },
  CNY: { country: "cn", name: "Chinese Yuan" },
  CHF: { country: "ch", name: "Swiss Franc" }
};

let fromCurrency = "USD";
let toCurrency = "INR";

function createOptions(dropdownId, selectedId, isFrom) {
  const dropdown = document.getElementById(dropdownId);
  const selected = document.getElementById(selectedId);

  for (let code in currencyData) {
    const div = document.createElement("div");
    div.className = "option";
    div.innerHTML = `
      <img src="https://flagcdn.com/24x18/${currencyData[code].country}.png">
      ${code} - ${currencyData[code].name}
    `;
    div.addEventListener("click", () => {
      selected.innerHTML = div.innerHTML;
      dropdown.style.display = "none";
      if (isFrom) fromCurrency = code;
      else toCurrency = code;
    });
    dropdown.appendChild(div);
  }

  selected.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });
}

createOptions("fromOptions", "fromSelected", true);
createOptions("toOptions", "toSelected", false);

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const resultDiv = document.getElementById("result");

  if (!amount || amount <= 0) {
    resultDiv.innerText = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await res.json();
    const rate = data.rates[toCurrency];
    const converted = (amount * rate).toFixed(2);
    resultDiv.innerText = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;
  } catch (err) {
    resultDiv.innerText = "Error fetching exchange rate.";
  }
}
