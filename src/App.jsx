import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import ShopAll from "./pages/ShopAll";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./pages/sections/Footer";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shopall" element={<ShopAll />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
