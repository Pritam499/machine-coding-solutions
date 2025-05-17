import React, { useState } from 'react';

// Reusable ProgressBar component
export default function ProgressBar({ totalTasks = 5 }) {
  // 1️⃣ Track completed tasks
  const [completed, setCompleted] = useState(0);

  // 2️⃣ Calculate percentage
  const percentage = Math.round((completed / totalTasks) * 100);

  // 3️⃣ Handlers
  const handleComplete = () => {
    if (completed < totalTasks) {
      setCompleted(prev => prev + 1);
    }
  };
  const handleReset = () => setCompleted(0);

  return (
    <div>
      {/* 4️⃣ Bar container */}
      <div style={{
        width: '100%',
        height: '20px',
        border: '1px solid #000',
        marginBottom: '8px'
      }}>
        {/* 5️⃣ Filled portion */}
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: percentage === 100 ? 'green' : 'blue'
        }} />
      </div>

      {/* 6️⃣ Percentage label */}
      <p>{percentage}% completed</p>

      {/* 7️⃣ Controls */}
      <button onClick={handleComplete} disabled={completed >= totalTasks}>
        Complete Task
      </button>
      <button onClick={handleReset} style={{ marginLeft: '8px' }}>
        Reset
      </button>
    </div>
  );
}
