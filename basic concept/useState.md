
yang aku tangkep usestate itu function yang return perta=manya adalah nilai saat ini, dan yang index kedua nya itu function untuk nge update nilai saat ini. gitu aja sih

misal 
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Counter() {
  const [count, setCount] = useState(0); // Initial count = 0

  return (
    <div>
      <h1>Counter: {count}</h1>
      
      {/* Increase Button */}
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>

      {/* Decrease Button */}
      <button onClick={() => setCount(count - 1)}>
        Decrease
      </button>
    </div>
  );
}

ReactDOM.render(<Counter />, document.getElementById('root'));

nah itu kan aad count, sama setCount
count sebenernya variabel untuk nyimpen nilai dari usestate, 
terus setCount disitu function untuk nge update count nya

jadi count itu awalnya nilainya 0, terus bisa di update nilainya lewat setCount. itu aja sebenernnya