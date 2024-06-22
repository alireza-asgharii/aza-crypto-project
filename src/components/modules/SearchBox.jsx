import { useEffect, useRef } from "react";
import styles from "../../styles/navbar.module.scss";

import { MdLocalFireDepartment } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import SearchItem from "./SearchItem";

const SearchBox = ({
  changeHandler,
  setIsShow,
  isShow,
  inputValue,
  isLoading,
  data,
  isError,
  searchIsLoading,
  searchIsError,
  searchData,
  setMobileMenu,
  mobileMenu
}) => {
  const inputRef = useRef(null)

  useEffect(() => {
    if (mobileMenu) inputRef.current.focus()
  }, [mobileMenu])
  return (
    <label className={`${styles.searchLabel} rounded-md ${isShow ? "rounded-b-none" : ""}`}>
      <div className="flex justify-between items-center w-full py-2">
        <div className="flex items-center rounded-md overflow-hidden">
          <FiSearch className="mr-1 opacity-80 font-bold text-sm pt-[1px]" />
          <input
            className={`${styles.navbarSearch} rounded-md text-sm font-medium`}
            type="text"
            placeholder="Search"
            onChange={changeHandler}
            onFocus={() => setIsShow(true)}
            onBlur={() => setTimeout(() => setIsShow(false), 200)}
            ref={inputRef}
          />
        </div>
        <div className="flex justify-center items-center md:hidden">
          <button className="rounded-md bg-[#5463FF] px-3 py-[6px] mt-[5px] text-xs cursor-default" onClick={() => setMobileMenu(prev => !prev)}>Cancel</button>
        </div>
      </div>

      {inputValue === "" &&
        isShow &&
        !isLoading &&
        data.length !== 0 &&
        typeof data === "object" &&
        !isError && (
          <div className={`absolute z-[101] left-0 top-[50px] md:top-[36px]  w-full bg-[#171924] text-white rounded-md p-[25px_0px_15px] block max-h-[400px] overflow-y-auto ${isShow ? "rounded-t-none" : ""}`}>
            <div className="flex items-center px-3">
              <h6 className="text-[#5e6172] font-medium text-xs">Tranding</h6>
              <MdLocalFireDepartment className="text-[#ff775f] ml-1 text-xl pt-1 " />
            </div>
            {data.coins.map((coin) => (
              <SearchItem key={coin.item.id} data={coin.item} setMobileMenu={setMobileMenu} />
            ))}
          </div>
        )}

      {searchIsLoading || searchIsError
        ? null
        : isShow &&
          inputValue !== "" &&
          searchData && (
            <div className={`${styles.searchItemContainer} top-[50px] md:top-[36px] rounded-md  ${isShow ? "rounded-t-none" : ""}`}>
              <div className={styles.trandigContainer}>
                <h6 className="text-[#5e6172] font-medium text-xs px-2 pb-2">
                  Cryptoassets
                </h6>
              </div>
              {searchData.coins.map((item) => (
                <SearchItem
                  key={item.id}
                  data={item}
                  isLoading={searchIsLoading}
                  setMobileMenu={setMobileMenu}
                />
              ))}
            </div>
          )}
    </label>
  );
};

export default SearchBox;
