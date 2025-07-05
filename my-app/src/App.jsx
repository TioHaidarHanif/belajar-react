import { useState } from 'react'
import './App.css'
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Ter klik {count} times
    </button>
  );
}
export default Counter
