import React, { useState } from 'react';

function Calculator() {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput('Error');
      }
    } else if (value === 'C') {
      setInput('');
    } else {
      setInput(input + value);
    }
  };

  const renderRow = (row) => (
    <div>
      {row.map((btn) => (
        <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
      ))}
    </div>
  );

  return (
    <div>
      <h3>Calculator</h3>
      <div>{input}</div>

      {renderRow(['7', '8', '9', '/'])}
      {renderRow(['4', '5', '6', '*'])}
      {renderRow(['1', '2', '3', '-'])}
      {renderRow(['0', '.', '=', '+'])}
      {renderRow(['C'])}
    </div>
  );
}

export default Calculator;
