import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
    <div className="font-bold text-xl text-blue-600">My App</div>
    <div className="space-x-4">
      <Link to="/" className="text-blue-600 hover:underline">Home</Link>
      <Link to="/counter" className="text-blue-600 hover:underline">Counter</Link>
    </div>
  </nav>
);

export default Navbar;
