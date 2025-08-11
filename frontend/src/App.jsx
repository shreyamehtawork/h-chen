import { useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./pages/sections/Footer";
import SingleProductsView from "./components/SingleProductsView";
import CategoryPage from "./pages/CategoryPage";
import BlogPage from "./pages/BlogPage";
import SingleBlogPage from "./components/SingleBlogPage";
import Register from "./auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterComplete from "./auth/RegisterComplete";
import AllProducts from "./pages/AllProducts";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "./store/authSlice";

function App() {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticated && pathname.includes("/login")) {
      navigate("/");
    }
  }, [isAuthenticated, pathname, navigate]);

  useEffect(()=>{
    if(token){
      const user = jwtDecode(token);
      dispatch(loginUser(user))
    }
  }, [token, dispatch])


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
        <Route exact path="/auth/callback" element={<AuthCallback />} />

        <Route exact path="/register" element={<Register />} />
        <Route exact path="/register/complete" element={<RegisterComplete />} />
        <Route exact path="/shop" element={<AllProducts />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
