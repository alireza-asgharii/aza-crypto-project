import React from "react";
import { Link } from "react-router-dom";

// styles
import styles from "../styles/navbar.module.scss";

//icons
import { BsCoin } from "react-icons/bs";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <BsCoin className="me-2" />
            CoinMarketEy
          </Link>
          <button
            className={`navbar-toggler ${styles.navbarHam}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cryptocurrencies">
                  Cryptocurrencies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  About Us
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className={`form-control me-2 ${styles.navbarSearch}`}
                type="text"
                placeholder="Search"
              />
              <button className="btn btn-primary" type="button">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
