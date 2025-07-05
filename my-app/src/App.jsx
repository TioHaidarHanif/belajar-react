import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import './App.css'

function Counter() {
  const [count, setCount] = useState(0);
 useEffect(() => {
  // ini kayak efek samping nya  
  console.log('Component Ter update!');
    
  });
  return (
    <button onClick={() => setCount(count + 1)}>
      Ter klik {count} times
    </button>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </Router>
  );
}

export default App;
