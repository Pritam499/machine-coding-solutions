import React, { useState } from 'react';

export default function SnakeAndLadderBoard({ size = 25 }) {
  // 1️⃣ Snakes & ladders mapping
  const jumps = {
    5: 15,    // ladder up
    18: 3,    // snake down
    11: 22,   // ladder
    24: 16,   // snake
  };

  // 2️⃣ State: current position, last roll, roll count and best score
  const [position, setPosition]   = useState(1);
  const [roll, setRoll]           = useState(null);
  const [rollCount, setRollCount] = useState(0);
  const [bestScore, setBestScore] = useState(null);

  // 3️⃣ Roll handler
  const handleRoll = () => {
    if (position === size) return; // no more rolls once finished

    const die = Math.floor(Math.random() * 6) + 1;
    let newPos = position + die;
    if (newPos > size) newPos = size;
    if (jumps[newPos]) newPos = jumps[newPos];

    const newCount = rollCount + 1;
    setPosition(newPos);
    setRoll(die);
    setRollCount(newCount);

    // update best score if finished
    if (newPos === size) {
      if (bestScore === null || newCount < bestScore) {
        setBestScore(newCount);
      }
    }
  };

  // 4️⃣ Reset handler
  const handleReset = () => {
    setPosition(1);
    setRoll(null);
    setRollCount(0);
    // keep bestScore
  };

  // 5️⃣ Prepare grid squares (reverse order so highest is top‑left)
  const squares = Array.from({ length: size }, (_, i) => size - i);

  return (
    <div>
      <h2>Snake &amp; Ladder</h2>

      <div style={{ marginBottom: 8 }}>
        <button onClick={handleRoll} disabled={position === size}>
          Roll Dice
        </button>{' '}
        <button onClick={handleReset}>Reset</button>
      </div>

      {roll !== null && <p>You rolled: {roll}</p>}
      <p>Total rolls: {rollCount}</p>
      {bestScore !== null && <p>Best score: {bestScore} rolls</p>}
      <p>Position: {position}</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 50px)',
          gap: '4px',
          marginTop: '12px',
        }}
      >
        {squares.map(n => (
          <div
            key={n}
            style={{
              width: '50px',
              height: '50px',
              border: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: n === position ? '#a2d5f2' : '#fff',
            }}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}
