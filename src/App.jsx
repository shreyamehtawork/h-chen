import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./pages/sections/Footer";
import SingleProductsView from "./components/SingleProductsView";
import CategoryPage from "./pages/CategoryPage";
import BlogPage from "./pages/BlogPage";
import SingleBlogPage from "./components/SingleBlogPage";
import slugify from "slugify";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/shop/:category" element={<CategoryPage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/blog" element={<BlogPage />} />
        <Route exact path="/:category/:slug" element={<SingleProductsView />} />
        <Route
          exact
          path="/singleproductview"
          element={<SingleProductsView />}
        />
        <Route exact path="/singleblogview" element={<SingleBlogPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
