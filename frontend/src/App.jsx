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
import Login from "./auth/Login";
import Register from "./auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./auth/RegisterComplete";

function App() {
  return (
    <div>
      <Nav />

      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/shop/:category" element={<CategoryPage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/blog" element={<BlogPage />} />
        <Route exact path="/:category/:id" element={<SingleProductsView />} />
        <Route
          exact
          path="/singleproductview"
          element={<SingleProductsView />}
        />
        <Route exact path="/:slug" element={<SingleBlogPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/register/complete" element={<RegisterComplete />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
