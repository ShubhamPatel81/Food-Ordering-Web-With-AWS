import "./menuBar.css";
import assets from "../assets/assets.js";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";

const MenuBar = () => {
  const [active, setActive] = useState("home");

  const { quantities, token, setToken, setQuantities } =
    useContext(StoreContext);
  const uniqueItemsInCart = Object.values(quantities).filter(
    (qty) => qty > 0
  ).length;

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
  };

  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to="/">
            <img
              src={assets.logo}
              alt="Logo"
              height={49}
              width={102}
              style={{ cursor: "pointer" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={
                    active === "home" ? "nav-link fw-bold active" : "nav-link"
                  }
                  aria-current="page"
                  to="/"
                  onClick={() => setActive("home")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    active === "explore"
                      ? "nav-link fw-bold active"
                      : "nav-link"
                  }
                  to="/explore"
                  onClick={() => setActive("explore")}
                >
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    active === "contact"
                      ? "nav-link fw-bold active"
                      : "nav-link"
                  }
                  to="/contact"
                  onClick={() => setActive("contact")}
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            <div className="menu-bar d-flex align-items-center gap-3">
              <div className="position-relative">
                <Link to={"/cart"}>
                  {" "}
                  <img src={assets.cart} alt="cart" height={28} width={29} />
                </Link>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {uniqueItemsInCart}
                </span>
              </div>

              {!token ? (
                <>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    type="submit"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>

                  <button
                    className="btn btn-outline-success btn-sm"
                    type="submit"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </button>
                </>
              ) : (
                <div className="dropdown text-end">
                  <a
                    href=""
                    className="d-block link-body-emphasis text-decoration-none dropdown-toggle "
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={assets.profile}
                      alt=""
                      width={32}
                      height={32}
                      className="rounded-circle"
                    />
                  </a>
                  <ul className="dropdown-menu text-small ">
                    <li
                      className="dropdown-item"
                      onClick={() => navigate("/myorders")}
                    >
                      {" "}
                      Orders
                    </li>
                    <li className="dropdown-item" onClick={logout}>
                      {" "}
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MenuBar;
