import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api/postApi";
import { useState } from "react";
import currencies from "../api/currencies.json";

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurr, setFromCurr] = useState("USD");
  const [exchangeCurr, setExchangeCurr] = useState("PKR");

  const { data, refetch, isFetching , isLoading} = useQuery({
    queryKey: ["exchangeRate", fromCurr, exchangeCurr],
    queryFn: () => fetchApi(fromCurr, exchangeCurr),
    enabled: false,
  });

  return (
    <main className="converter-container">
      {/* ==================== Currency Converter Form ==================== */}
      <form className="converter-form" onSubmit={(e) => e.preventDefault()}>
        <h1 className="common-heading">Currency Converter</h1>

        {/* ==================== Amount ==================== */}
        <div className="form-group">
          <label htmlFor="amount">Amount</label>

          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter your amount"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* ==================== Currency Selection ==================== */}
        <div className="currency-grid">
          {/* ==================== From Currency ==================== */}
          <div className="form-group">
            <label htmlFor="from-currency">From</label>

            <select
              id="from-currency"
              name="from-currency"
              value={fromCurr}
              onChange={(e) => setFromCurr(e.target.value)}
            >
              {currencies.map(({ code, name }) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>

          {/* ==================== To Currency ==================== */}
          <div className="form-group">
            <label htmlFor="to-currency">To</label>

            <select
              id="to-currency"
              name="to-currency"
              value={exchangeCurr}
              onChange={(e) => setExchangeCurr(e.target.value)}
            >
              {currencies.map(({ code, name }) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ==================== Convert Button ==================== */}
        <button type="button" className="convert-btn" disabled={isFetching || amount <= 0} onClick={() => refetch()}>
          {isFetching ? "Converting..." : "Convert"}
        </button>

        {/* ==================== Conversion Result ==================== */}
        <p className="result">
          {data ?
            `${amount} ${fromCurr} = ${(amount * data).toFixed(2)} ${exchangeCurr}` 
        : "Enter an amount to see the conversion."}
        </p>
      </form>
    </main>
  );
};
