import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { searchCoin } from "../redux/search/searchAction";

// styles
import styles from "../styles/navbar.module.scss";

//icons
import { BsCoin } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import SearchItem from "./shared/SearchItem";
import { MdLocalFireDepartment } from "react-icons/md";
import GlobalData from "./GlobalData";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.searchState);
  const [isShow, setIsShow] = useState(false);
  const [trandData, setTrandData] = useState({
    data: [],
    isLoadingTranding: true,
    err: "",
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get("/api/v3/search/trending")
      .then((res) =>
        setTrandData({ ...trandData, data: res, isLoadingTranding: false })
      )
      .catch((err) =>
        setTrandData({
          data: [],
          err: err,
          isLoadingTranding: false,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeHandler = (e) => {
    dispatch(searchCoin(e.target.value));
    setInputValue(e.target.value);
  };
  return (
    <div className={`d-flex flex-xl-column flex-column-reverse ${styles.container}`}>
      <div className={styles.topDataResponse}>
        <div className={styles.topData} style={{ color: "#fff" }}>
          <GlobalData />
        </div>
      </div>
      <nav className="navbar navbar-expand-xl navbar-dark bg-dark py-xl-3">
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
                <Link className="nav-link" to="/currencies">
                  Cryptocurrencies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/watchlist">
                  Watchlist
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  About Us
                </Link>
              </li>
            </ul>
            <div className={styles.rightContainer}>
              <div className={styles.loginButtonContainer}>
                <button className={styles.login}>Login</button>
                <button className={styles.signup}>Sign Up</button>
              </div>
              <label className={styles.searchLabel}>
                <FiSearch className={styles.searhIcon} />
                <input
                  className={`form-control me-2 ${styles.navbarSearch}`}
                  type="text"
                  placeholder="Search"
                  onChange={changeHandler}
                  onFocus={() => setIsShow(true)}
                  onBlur={() => setTimeout(() => setIsShow(false), 200)}
                />

                {inputValue === "" &&
                  isShow &&
                  !trandData.isLoadingTranding &&
                  trandData.data.coins.length !== 0 && (
                    <div className={styles.searchItemContainer}>
                      <div className={styles.trandigContainer}>
                        <h6>Tranding</h6>
                        <MdLocalFireDepartment className={styles.fireIcon} />
                      </div>
                      {trandData.data.coins.map((coin) => (
                        <SearchItem key={coin.item.id} data={coin.item} />
                      ))}
                    </div>
                  )}

                {searchState.data.length === 0
                  ? null
                  : isShow &&
                    inputValue !== "" && (
                      <div className={styles.searchItemContainer}>
                        <div className={styles.trandigContainer}>
                          <h6>Cryptoassets</h6>
                        </div>
                        {searchState.data.coins.map((item) => (
                          <SearchItem key={item.id} data={item} />
                        ))}
                      </div>
                    )}
              </label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
