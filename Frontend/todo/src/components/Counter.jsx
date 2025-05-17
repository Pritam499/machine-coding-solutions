import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  function decreaseCount() {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click Increase : {count}
      </button>

      <button onClick={decreaseCount}>Click Decrease : {count}</button>
    </div>
  );
}
