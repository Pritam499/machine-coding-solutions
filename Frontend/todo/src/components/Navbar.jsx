import React, { useState } from 'react';

function Navbar() {
  const [showMenu, setShowMenu] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <h3>MySite</h3>
      <button onClick={() => setShowMenu(!showMenu)}>
        ☰
      </button>

      {showMenu && (
        <div>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <button onClick={() => setShowDropdown(!showDropdown)}>
            Services ⬇
          </button>

          {showDropdown && (
            <div>
              <a href="/design">Design</a>
              <a href="/dev">Development</a>
            </div>
          )}

          <a href="/contact">Contact</a>
        </div>
      )}
    </div>
  );
}

export default Navbar;
