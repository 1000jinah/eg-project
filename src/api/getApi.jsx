import React, { useState } from 'react';

const App = () => {
  const [result, setResult] = useState(null);

  const handleButtonClick = async () => {
    const apiUrl = 'http://127.0.0.1:8000/projection_graph';  // Replace with your actual server URL

    const inputData = {
      initialPayment: 1000.0,
      monthlyPayment: 200.0,
      MonthlyPaymentPeriod: 12,
      monthlyAllowance: 50.0,
      MonthlyAllowancePeriod: 6,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        setResult(null);
        console.error('Failed to fetch data');
      }
    } catch (error) {
      setResult(null);
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Send POST Request</button>
      {result && (
        <div>
          <p>Internal Rate of Return (Yearly): {result.irr_yearly}</p>
          <p>Balance: {JSON.stringify(result.balance)}</p>
        </div>
      )}
    </div>
  );
};

export default App;