// // PasswordGenerator.js
// import React, { useState } from 'react';

// export default function PasswordGenerator({ length = 8 }) {
//   const [password, setPassword] = useState('');
//   const [copied, setCopied] = useState(false);

//   // Generate random password using letters, numbers, symbols
//   const generate = () => {
//     const chars =
//       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
//     let pass = '';
//     for (let i = 0; i < length; i++) {
//       pass += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setPassword(pass);
//     setCopied(false);
//   };

//   // Copy to clipboard and show feedback
//   const copyToClipboard = () => {
//     if (!password) return;
//     navigator.clipboard.writeText(password);
//     setCopied(true);
//   };

//   return (
//     <div>
//       <button onClick={generate}>Generate Password</button>

//       {password && (
//         <div>
//           <p>{password}</p>
//           <button onClick={copyToClipboard}>Copy</button>
//           {copied && <span> Copied!</span>}
//         </div>
//       )}
//     </div>
//   );
// }


// PasswordGenerator.js
import React, { useState } from 'react';

export default function PasswordGenerator({ length = 12, minLength = 8, maxLength = 20 }) {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [custom, setCustom] = useState('');
  const [error, setError] = useState('');

  // Validation checks on custom input only
  const hasUpper = /[A-Z]/.test(custom);
  const hasLower = /[a-z]/.test(custom);
  const hasNumber = /[0-9]/.test(custom);
  const hasSpecial = /[!@#$%^&*()]/.test(custom);
  const validLength = custom.length >= minLength && custom.length <= maxLength;
  const allValid = hasUpper && hasLower && hasNumber && hasSpecial && validLength;

  // Generate a secure random password
  const generate = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*()';
    let pass = '';
    // ensure one of each category
    pass += upper[Math.floor(Math.random() * upper.length)];
    pass += lower[Math.floor(Math.random() * lower.length)];
    pass += numbers[Math.floor(Math.random() * numbers.length)];
    pass += special[Math.floor(Math.random() * special.length)];
    const allChars = upper + lower + numbers + special;
    for (let i = 4; i < length; i++) {
      pass += allChars[Math.floor(Math.random() * allChars.length)];
    }
    setPassword(pass);
    setCopied(false);
    setError('');
    // clear custom input
    setCustom('');
  };

  // Copy generated password to clipboard
  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  // Handle submission of custom password
  const handleSubmit = (e) => {
    e.preventDefault();
    if (allValid) {
      console.log('Password set:', custom);
      // reset everything to initial state
      setPassword('');
      setCustom('');
      setCopied(false);
      setError('');
    } else {
      setError('Please meet all criteria before submitting.');
    }
  };

  return (
    <div>
      {/* Generated password section */}
      <div style={{ marginBottom: '16px' }}>
        <button onClick={generate}>Generate Password</button>
        {password && (
          <>
            <span style={{ marginLeft: '8px', fontFamily: 'monospace' }}>{password}</span>
            <button onClick={copyToClipboard} style={{ marginLeft: '8px' }}>Copy</button>
            {copied && <span style={{ color: 'green', marginLeft: '4px' }}>Copied!</span>}
          </>
        )}
      </div>

      {/* Custom input & validation */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={custom}
          onChange={e => setCustom(e.target.value)}
          placeholder="Enter or paste password"
        />
        <button type="submit" style={{ marginLeft: '8px' }}>Submit</button>
      </form>

      {/* Validation feedback: show only when user starts typing */}
      {custom && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '8px' }}>
          <li style={{ color: hasUpper ? 'green' : 'red' }}>{hasUpper ? '✔' : '✖'} Uppercase letter</li>
          <li style={{ color: hasLower ? 'green' : 'red' }}>{hasLower ? '✔' : '✖'} Lowercase letter</li>
          <li style={{ color: hasNumber ? 'green' : 'red' }}>{hasNumber ? '✔' : '✖'} Number</li>
          <li style={{ color: hasSpecial ? 'green' : 'red' }}>{hasSpecial ? '✔' : '✖'} Special character</li>
          <li style={{ color: validLength ? 'green' : 'red' }}>{validLength ? '✔' : '✖'} Length {minLength}-{maxLength}</li>
        </ul>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}



// import React, { useState } from 'react';

// export default function PasswordGenerator({ minLength = 8, maxLength = 20 }) {
//   const [length, setLength] = useState(12);
//   const [password, setPassword] = useState('');
//   const [copied, setCopied] = useState(false);
//   const [custom, setCustom] = useState('');
//   const [error, setError] = useState('');

//   // validation checks
//   const hasUpper = /[A-Z]/.test(custom || password);
//   const hasLower = /[a-z]/.test(custom || password);
//   const hasNumber = /[0-9]/.test(custom || password);
//   const hasSpecial = /[!@#$%^&*()]/.test(custom || password);
//   const validLength = (custom || password).length >= minLength && (custom || password).length <= maxLength;

//   const allValid = hasUpper && hasLower && hasNumber && hasSpecial && validLength;

//   // generate random password
//   const generate = () => {
//     let pass = '';
//     const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     const lower = 'abcdefghijklmnopqrstuvwxyz';
//     const numbers = '0123456789';
//     const special = '!@#$%^&*()';
//     // ensure one of each
//     pass += upper.charAt(Math.floor(Math.random() * upper.length));
//     pass += lower.charAt(Math.floor(Math.random() * lower.length));
//     pass += numbers.charAt(Math.floor(Math.random() * numbers.length));
//     pass += special.charAt(Math.floor(Math.random() * special.length));
//     const allChars = upper + lower + numbers + special;
//     for (let i = 4; i < length; i++) {
//       pass += allChars.charAt(Math.floor(Math.random() * allChars.length));
//     }
//     setPassword(pass);
//     setCustom('');
//     setCopied(false);
//     setError('');
//   };

//   const copyToClipboard = () => {
//     if (!password) return;
//     navigator.clipboard.writeText(password);
//     setCopied(true);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (allValid) {
//       console.log('Password set:', custom || password);
//       setError('');
//     } else {
//       setError('Please meet all criteria before submitting.');
//     }
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={generate}>Generate Password</button>
//         {password && (
//           <>
//             <span style={{ marginLeft: '8px' }}>{password}</span>
//             <button onClick={copyToClipboard} style={{ marginLeft: '8px' }}>Copy</button>
//             {copied && <span style={{ color: 'green', marginLeft: '4px' }}>Copied!</span>}
//           </>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
//         <input
//           type="text"
//           value={custom || password}
//           onChange={e => { setCustom(e.target.value); setPassword(''); }}
//           placeholder="Enter or paste password"
//         />
//         <button type="submit" style={{ marginLeft: '8px' }}>Submit</button>
//       </form>

//       <ul style={{ listStyle: 'none', padding: 0, marginTop: '8px' }}>
//         <li style={{ color: hasUpper ? 'green' : 'red' }}>
//           {hasUpper ? '✔' : '✖'} At least one uppercase letter
//         </li>
//         <li style={{ color: hasLower ? 'green' : 'red' }}>
//           {hasLower ? '✔' : '✖'} At least one lowercase letter
//         </li>
//         <li style={{ color: hasNumber ? 'green' : 'red' }}>
//           {hasNumber ? '✔' : '✖'} At least one number
//         </li>
//         <li style={{ color: hasSpecial ? 'green' : 'red' }}>
//           {hasSpecial ? '✔' : '✖'} At least one special character (!@#$%^&*())
//         </li>
//         <li style={{ color: validLength ? 'green' : 'red' }}>
//           {validLength ? '✔' : '✖'} Length between {minLength} and {maxLength}
//         </li>
//       </ul>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// }
