import React, { useState } from "react";
import axios from "axios";
import "./CurrencyConverter.css";
let api_key = "ae04ffbe8695c69c0d084087"

function App() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const currencyCodes = ["USD", "EUR", "JPY", "INR", "AED"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    //* making request
    try{
      let response = await axios.get(`https://v6.exchangerate-api.com/v6/${api_key}/pair/${formData.from}/${formData.to}/${formData.amount}`)
      // console.log(response.data);
      setResult(response?.data)
      setError("")
      return response.data
    }catch(e){
      setError("Error", e?.response ? e?.response?.data : e?.message)
    }
  };
  // console.log(result);
  
  return (
    <div>
      <section className="hero">
        <h1>Global Currency Converter</h1>
        <p>Your go-to solution for real-time currency conversions worldwide.</p>
      </section>
      <section className="converter">
        <form onSubmit={handleSubmit}>
          <select
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select From Currency</option>
            {currencyCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <select
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select To Currency</option>
            {currencyCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            type="number"
            className="input"
          />
          <button type="submit" className="submit-btn">
            Convert
          </button>
        </form>
        {result && (
          <div className="result">
            <p>
              Converted Amount: {result.conversion_result} {formData.to}
            </p>
            <p>Conversion Rate: {result.conversion_rate} </p>
          </div>
        )}
        {error && <p className="error">Error: {error}</p>}
      </section>
      <section className="additional-info">
        <h2>Why Choose Global Currency Converter?</h2>
        <p>Detailed explanations on advantages or instructions for use.</p>
      </section>
    </div>
  );
}

export default App;