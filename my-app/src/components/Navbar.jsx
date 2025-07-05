import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
        <h1>My App</h1>
        <ul>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/about">About</Link>
            </li>
            <li>
            <Link to="/profile">Profile</Link>
            </li>
        </ul>
        </nav>
    );
    }
export default Navbar;