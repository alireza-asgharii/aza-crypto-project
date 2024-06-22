import React, { useContext } from "react";
import { Link } from "react-router-dom";

//Context
import { LoadingBarRef } from "../../App";

const SearchItem = ({ data, setMobileMenu }) => {
  const ref = useContext(LoadingBarRef);
  return (
    <Link
      className={`flex justify-between py-2 px-2 text-sm hover:bg-[#323546] transition-colors`}
      to={`/currencies/${data.id}`}
      onClick={() => {
        ref.current.continuousStart();
        setMobileMenu(false);
      }}
    >
      <div className="flex">
        <img src={data.large} alt="coin" className="w-6 rounded-full mr-2" />
        <div>
          <span className="font-medium">{data.name}</span>
          <span className="ml-3 font-medium text-xs">
            {data.symbol.toUpperCase()}
          </span>
        </div>
      </div>
      {data.market_cap_rank && (
        <span className="text-[#5e6172] font-medium">
          #{data.market_cap_rank}
        </span>
      )}
    </Link>
  );
};

export default SearchItem;
