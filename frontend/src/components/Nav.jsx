import React, { useEffect, useState } from "react";
import "../styling/Nav.css";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logofinal.png";
import slugify from "slugify";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";

function Nav() {
  const categories = [
    "Clo-Aura",
    "Clo-Prime",
    "Clo-Pixie",
    "Clo-Zion",
    "Clo-Bear",
  ];
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const dispatch = useDispatch();
  const { isAuthenticated, userData } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts({});
      if (res) setProducts(res);
      setLoadingProducts(false);
    };
    fetchProducts();
  }, []);

  const handleLogout = () => dispatch(logoutUser());

  const handleSearch = (e) => {
    let query = e.target.value;
    setSearchQuery(query);
    const results = products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResult(results);
  };

  return (
    <div className="mynavbar">
      <div className="headline">
        <span>Unique Design • Premium Quality • Unbeatable Priceses</span>
      </div>

      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom-navbar">
          {/* Left Logo */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <div className="logo-circle d-flex align-items-center justify-content-center">
              <img src={logo} alt="logo" className="oval-logo" />
            </div>
            <span className="brand-text">CHLOE'S VENTURE</span>
          </a>

          {/* Mobile Search + Toggler */}
          <div className="d-flex d-lg-none align-items-center ms-auto">
            <FaSearch
              className="text-dark me-3"
              data-bs-toggle="collapse"
              data-bs-target="#searchCollapse"
            />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample11"
              aria-controls="navbarsExample11"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Collapsing Menu */}
          <div className="collapse navbar-collapse" id="navbarsExample11">
            <ul className="navbar-nav mx-lg-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item dropdown hover-dropdown">
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
                <ul className="dropdown-menu show-on-hover">
                  {categories.map((category, i) => {
                    const slug = slugify(category, { lower: true });
                    return (
                      <li key={i}>
                        <Link className="dropdown-item" to={`/shop/${slug}`}>
                          {category}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Desktop Right Side */}
            <div className="d-none d-lg-flex align-items-center">
              {/* Search */}
              <div className="d-flex align-items-center position-relative search-wrapper me-3">
                <FaSearch className="text-dark me-2" />
                <input
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="search-input"
                />
                {searchQuery && (
                  <ul className="list-group position-absolute w-100 mt-1 shadow-sm">
                    {loadingProducts ? (
                      <li className="list-group-item text-center">
                        Loading...
                      </li>
                    ) : searchResult.length === 0 ? (
                      <li className="list-group-item text-center text-muted">
                        No results found
                      </li>
                    ) : (
                      searchResult.map((p, i) => (
                        <Link
                          key={i}
                          to={`/product/${p._id}`}
                          className="list-group-item list-group-item-action"
                          onClick={() => setSearchQuery("")}
                        >
                          {p.title}
                        </Link>
                      ))
                    )}
                  </ul>
                )}
              </div>

              {/* Cart */}
              <Link to="/user/cart" className="text-dark me-3">
                🛒 My Cart
              </Link>

              {/* User */}
              {isAuthenticated ? (
                <div className="dropdown">
                  <a className="dropdown-toggle" data-bs-toggle="dropdown">
                    Hi, {userData?.name || "User"}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/user/order">
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/user/wishlist">
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="text-dark">
                  Login / Register
                </Link>
              )}
            </div>

            {/* Mobile User & Cart */}
            <div className="d-lg-none mt-3">
              <Link to="/user/cart" className="d-block mb-2">
                🛒 My Cart
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/user/order" className="d-block mb-1">
                    My Orders
                  </Link>
                  <Link to="/user/wishlist" className="d-block mb-1">
                    Wishlist
                  </Link>
                  <button
                    className="btn btn-link p-0 text-start"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="d-block">
                  Login / Register
                </Link>
              )}
            </div>
          </div>

          {/* Collapsible Search for Mobile */}
          <div className="collapse" id="searchCollapse">
            <div className="p-2">
              <input
                type="search"
                className="form-control"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
