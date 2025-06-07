// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      async function getCurrencyConvert() {
        setLoading(true);

        if (amount <= 0) {
          setLoading(false);

          return;
        }
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await response.json();

        if (data && data.rates && data.rates[toCurrency]) {
          setConvertedAmount(data.rates[toCurrency]);
        } else {
          setConvertedAmount(null);
        }

        if (fromCurrency === toCurrency) {
          setConvertedAmount(amount);
        }

        setLoading(false);
      }

      getCurrencyConvert();
    },
    [amount, toCurrency, fromCurrency]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={loading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={loading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={loading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{loading ? " Loading . . ." : `${convertedAmount} ${toCurrency}`}</p>
    </div>
  );
}
