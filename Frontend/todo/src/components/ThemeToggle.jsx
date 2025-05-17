// App.js
import React, { useState } from 'react';

// A child button component that receives current theme and a toggle function via props
function ThemeToggleButton({ theme, onToggle }) {
  return (
    <button onClick={onToggle}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}

export default function ThemeToggle() {
  // useState to track current theme: 'light' or 'dark'
  const [theme, setTheme] = useState('light');

  // flip between light and dark
  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // inline styles based on current theme
  const appStyle = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#222222',
    color: theme === 'light' ? '#000000' : '#ffffff',
    minHeight: '100vh',
    padding: '2rem',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={appStyle}>
      {/* Conditional rendering of header text */}
      <h1>{theme === 'light' ? '🌞 Light Theme' : '🌜 Dark Theme'}</h1>

      {/* Pass theme and toggle function as props */}
      <ThemeToggleButton theme={theme} onToggle={toggleTheme} />
    </div>
  );
}