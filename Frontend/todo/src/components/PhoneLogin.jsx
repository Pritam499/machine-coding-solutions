import React, { useState } from 'react';

export default function PhoneLogin({ onNext }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(value.slice(0, 10));
  };

  const handleSendOTP = () => {
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit number');
      return;
    }
    setError('');
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit
    onNext(otp); // send OTP to parent
  };

  return (
    <div>
      <h2>Login with Phone</h2>
      <input
        type="text"
        value={phone}
        onChange={handleChange}
        placeholder="Enter 10-digit number"
      />
      <button onClick={handleSendOTP} style={{ marginLeft: '8px' }}>
        Send OTP
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
