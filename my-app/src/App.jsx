import React from "react";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";

function App() {
  return (
<div className="App">
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/about" element= {<About  />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </main>
    <Footer />
</div>
);

}
export default App;

/**
 * aku mau buat apa aja?
 * landing page
 * about
 * profile
 * itu dulu hehehe
 * oia sama navbar dan footer sederhana
 * 
 */