import React, { useState } from 'react';

export default function OTPVerify({ actualOtp }) {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = () => {
    if (otp === actualOtp) {
      setMessage('✅ OTP verified successfully');
    } else {
      setMessage('❌ Wrong OTP');
    }
    console.log('Entered OTP:', otp);
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
        placeholder="Enter OTP"
      />
      <button onClick={handleVerify} style={{ marginLeft: '8px' }}>
        Verify
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
