// Quiz.js
import React, { useState } from 'react';

export default function Quiz() {
  // 1️⃣ Define questions, each with text, options, and correct index
  const questions = [
    { question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: 1 },
    { question: 'Capital of France?', options: ['Berlin', 'London', 'Paris'], answer: 2 },
    { question: 'Which is a mammal?', options: ['Shark', 'Dolphin', 'Trout'], answer: 1 }
  ];

  // 2️⃣ State for current question, selected option, and feedback
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // 3️⃣ Handle option click: record and show feedback
  const handleOption = (idx) => {
    setSelected(idx);
    setShowFeedback(true);
  };

  // 4️⃣ Move to next question or end
  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    setCurrent(curr => curr + 1);
  };

  // 5️⃣ If all done
  if (current >= questions.length) {
    return <p>Quiz complete! Thanks for playing.</p>;
  }

  const q = questions[current];

  return (
    <div>
      <p>{q.question}</p>
      <ul>
        {q.options.map((opt, i) => (
          <li key={i}>
            <button
              onClick={() => handleOption(i)}
              disabled={showFeedback}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>

      {/* 6️⃣ Conditional feedback */}
      {showFeedback && (
        <p>
          {selected === q.answer
            ? '✅ Correct!'
            : `❌ Wrong! Correct answer: ${q.options[q.answer]}`}
        </p>
      )}

      {/* 7️⃣ Next button when feedback shown */}
      {showFeedback && (
        <button onClick={handleNext}>
          {current < questions.length - 1 ? 'Next Question' : 'Finish'}
        </button>
      )}
    </div>
  );
}
