import React, { useState, useEffect } from "react";

const MortgageCalculator = () => {
  const [principal, setPrincipal] = useState(1000000); // $1M USD
  const interestRate = 11; // 11%
  const [term, setTerm] = useState(5); // 5 years
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const [interestPercentage, setInterestPercentage] = useState(0);

  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12;
    const payments = term * 12;

    // monthly payment formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const monthly =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);

    const total = monthly * payments;
    const interest = total - principal;

    setMonthlyPayment(monthly);
    setTotalPayment(total);
    setTotalInterest(interest);

    setInterestPercentage(Math.round((interest / total) * 100));
  }, [principal, term]);

  return (
    <div className="p-4 max-w-5xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Simple Mortgage Calculator</h2>

      <div className="mb-4">
        <label htmlFor="principalSlider" className="block mb-2">
          Principal: ${principal.toLocaleString()}
        </label>
        <input
          type="range"
          id="principalSlider"
          min="100000"
          max="2000000"
          step="10000"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <p>Interest Rate: {interestRate}% (fixed)</p>
      </div>

      <div className="mb-6">
        <label htmlFor="termSlider" className="block mb-2">
          Loan Term: {term} years
        </label>
        <input
          type="range"
          id="termSlider"
          min="1"
          max="30"
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-6 p-4 bg-gray-900">
        <p className="mb-2">
          <strong>Monthly Payment:</strong> ${monthlyPayment.toFixed(2)}
        </p>
        <p className="mb-2">
          <strong>Total Payment:</strong> ${totalPayment.toFixed(2)}
        </p>
        <p className="mb-2">
          <strong>Total Interest:</strong> ${totalInterest.toFixed(2)}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg mb-2">Interest vs Principal</h3>
        <p className="mb-4">Interest makes up {interestPercentage}% of total payment</p>

        <div
          className="piechart mx-auto"
          style={{
            width: "200px",
            height: "200px",
            backgroundImage: `conic-gradient(#ff6b6b ${interestPercentage}%, #4ecdc4 0%)`,
            borderRadius: "50%",
          }}
        ></div>
        <div className="flex justify-center mt-4">
          <div className="mr-4 flex items-center">
            <div className="w-4 h-4 bg-red-400 mr-2"></div>
            <span>Interest</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-teal-400 mr-2"></div>
            <span>Principal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
