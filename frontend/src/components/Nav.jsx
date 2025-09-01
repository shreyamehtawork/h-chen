import React from "react";
import "../styling/Nav.css";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logofinal.png";
import slugify from "slugify";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { Link } from "react-router-dom";
import { Badge } from "antd";

function Nav() {
  const categories = [
    "Clo-Aura",
    "Clo-Prime",
    "Clo-Pixie",
    "Clo-Zion",
    "Clo-Bear",
  ];

  const dispatch = useDispatch();
  const { isAuthenticated, userData } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="mynavbar">
      <div className="headline">
        <span>Unique Design • Premium Quality • Unbeatable Prices</span>
      </div>

      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom-navbar">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <div className="logo-circle d-flex align-items-center justify-content-center">
              <img src={logo} alt="logo" className="oval-logo" />
            </div>
            <span className="brand-text">CHLOE'S VENTURE</span>
          </a>
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

          <div
            className="collapse navbar-collapse d-lg-flex "
            id="navbarsExample11"
          >
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item dropdown hover-dropdown">
                <a className="nav-link" href="/shop">
                  Shop
                </a>
                <ul className="dropdown-menu show-on-hover">
                  {categories.map((category, index) => {
                    const slug = slugify(category, { lower: true });
                    return (
                      <li key={index}>
                        <a className="dropdown-item" href={`/shop/${slug}`}>
                          {category}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/blog">
                  Blog
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>
            </ul>

            <div className="d-lg-flex justify-content-lg-end align-items-center">
              {isAuthenticated ? (
                <>
                  <div className="d-flex align-items-center gap-2 search-wrapper">
                    <FaSearch className="search-icon text-dark" />
                    <input
                      type="search"
                      placeholder="Search"
                      className="search"
                    />
                  </div>

                  <div
                    className="d-flex align-items-center"
                    style={{ marginLeft: "5px", marginRight: "10px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-cart-dash text-dark me-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                    <Link
                      to={"/user/cart"}
                      className="text-decoration-none text-dark"
                    >
                      My Cart
                    </Link>
                  </div>

                  <div className="dropdown">
                    <a
                      className=" dropdown-toggle"
                      type="button"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Hi, {userData?.name || "User"}
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end "
                      aria-labelledby="userDropdown"
                    >
                      <li>
                        <button className="dropdown-item">
                          <a
                            href="/user/order"
                            style={{ textDecoration: "none" }}
                          >
                            My Orders
                          </a>
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="d-flex align-items-center"
                    style={{ marginLeft: "5px", marginRight: "20px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                    <Link
                      to={"/login"}
                      className="text-decoration-none text-dark"
                      style={{ padding: " 0px 5px " }}
                    >
                      Login
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Nav;
