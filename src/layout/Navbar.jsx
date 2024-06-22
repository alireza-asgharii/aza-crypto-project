import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { searchCoin } from "../redux/search/searchAction";

// styles
import styles from "../styles/navbar.module.scss";

//icons
import { BsCoin } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import SearchItem from "../components/modules/SearchItem";
import { MdLocalFireDepartment } from "react-icons/md";
import GlobalData from "../components/templates/GlobalData";
import { useGetSearch, useGetTrandData } from "../hooks/useQueries";
import SearchBox from "../components/modules/SearchBox";

const Navbar = () => {
  const [isShow, setIsShow] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const { data, isPending: isLoading, isError } = useGetTrandData();
  const {
    data: searchData,
    isLoading: searchIsLoading,
    isError: searchIsError,
  } = useGetSearch(searchValue);

  useEffect(() => {
    const setState = setTimeout(() => {
      setSearchValue(inputValue);
    }, 700);

    return () => {
      clearTimeout(setState);
    };
  }, [inputValue]);
  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const mobileMenuHandler =() => {
    setMobileMenu(prev => !prev)
  }

  return (
    <div
      className={`d-flex flex-xl-column flex-column-reverse ${styles.container}`}
    >
      <div className={`${styles.topDataResponse}`}>
        <div className={styles.topData} style={{ color: "#fff" }}>
          <GlobalData />
        </div>
      </div>
      <nav className="text-white bg-[#212529]">
        <div className="flex justify-between items-center px-4 py-[10px] text-sm md:text-base">
          <div className="flex items-center">
            <Link
              className="flex justify-center items-center font-bold mr-4"
              to="/"
            >
              <BsCoin className="me-2" />
              AZA Crypto app
            </Link>
            <div className="relative ">
              <NavLink
                to="/watchlist"
                className="px-2 py-1 mx-2 transition-colors border-2 border-transparent rounded-md hover:border-[#5463FF]
border-[#5463FF] "
              >
                Watchlist
              </NavLink>
              <NavLink
                to="/aboutus"
                className="px-2 py-1 mx-2 transition-colors border-2 border-transparent rounded-md hover:border-[#5463FF]
border-[#5463FF] "
              >
                About Us
              </NavLink>
            </div>
          </div>
          <div onClick={mobileMenuHandler} className="md:hidden">
            <FiSearch className="opacity-80 font-semibold" />
          </div>

          <div className={`${styles.searchContainer} ${mobileMenu ? "block" : "hidden md:block"}`}>
            <SearchBox
              changeHandler={changeHandler}
              data={data}
              inputValue={inputValue}
              isError={isError}
              isLoading={isLoading}
              isShow={isShow}
              searchData={searchData}
              searchIsError={searchIsError}
              searchIsLoading={searchIsLoading}
              setIsShow={setIsShow}
              setMobileMenu={setMobileMenu}
              mobileMenu={mobileMenu}

            />
          </div>
          {/* 
          <label className={styles.searchLabel}>
            <FiSearch className="mr-1 opacity-80 font-bold text-sm" />
            <input
              className={`${styles.navbarSearch} py-2 rounded-md text-sm font-medium`}
              type="text"
              placeholder="Search"
              onChange={changeHandler}
              onFocus={() => setIsShow(true)}
              onBlur={() => setTimeout(() => setIsShow(false), 200)}
            />

            {inputValue === "" &&
              isShow &&
              !isLoading &&
              data.length !== 0 &&
              typeof data === "object" &&
              !isError && (
                <div className="absolute z-[101] left-0 top-[35px] w-full bg-[#171924] text-white rounded-b-inherit p-[25px_0px_15px] block max-h-[400px] overflow-y-auto">
                  <div className="flex items-center px-3">
                    <h6 className="text-[#5e6172] font-medium text-xs">
                      Tranding
                    </h6>
                    <MdLocalFireDepartment className="text-[#ff775f] ml-1 text-xl pt-1 " />
                  </div>
                  {data.coins.map((coin) => (
                    <SearchItem key={coin.item.id} data={coin.item} />
                  ))}
                </div>
              )}

            {searchIsLoading || searchIsError
              ? null
              : isShow &&
                inputValue !== "" &&
                searchData && (
                  <div className={styles.searchItemContainer}>
                    <div className={styles.trandigContainer}>
                      <h6 className="text-[#5e6172] font-medium text-xs px-2 pb-2">Cryptoassets</h6>
                    </div>
                    {searchData.coins.map((item) => (
                      <SearchItem key={item.id} data={item} isLoading={searchIsLoading} />
                    ))}
                  </div>
                )}
          </label> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
