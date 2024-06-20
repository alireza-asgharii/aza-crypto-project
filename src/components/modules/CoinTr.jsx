import React, { useContext } from "react";
import { Link } from "react-router-dom";

//styles
import styles from "../../styles/home.module.scss";

//icons
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";

//Helper
import {
  checkStar,
  splitName,
  toFixed,
  toLocaleS,
  upDown,
} from "../../helper/function";

// Chartjs
import Chart7d from "./Chart7d";

//Context
import { MarkedContext } from "../../context/MarkedContextProvider";
import { LoadingBarRef } from "../../App";

const CoinTr = ({ coin }) => {
  const { state, dispatch } = useContext(MarkedContext);
  const ref = useContext(LoadingBarRef);
  return (
    <tr className="border-y-[#222531] border-y-[1px] bg-inherit text-sm [&_td]:py-[10px] [&_td]:px-[11px] md:[&_td]:py-[25px] md:[&_td]:px-[11px] hover:bg-[#171924] transition-colors">
      <td className="tdStyle sticky left-0 z-10 bg-inherit">
        {checkStar(state.markeds, coin.id) ? (
          <AiFillStar
            className='text-[#ffd000] text-[1.2rem] md:cursor-pointer'
            onClick={() => {
              dispatch({
                type: "DELETE_FROM_MARKEDS",
                payload: coin,
              });
            }}
          />
        ) : (
          <AiOutlineStar
            className='text-[#797d91] hover:text-[#ffd000] text-[1.2rem] md:cursor-pointer transition-colors'
            onClick={() =>
              dispatch({
                type: "ADD_TO_MARKEDS",
                payload: coin,
              })
            }
          />
        )}
      </td>
      <td className="tdStyle md:table-cell hidden">{coin.market_cap_rank}</td>
      <td className="tdStyle text-center font-semibold sticky md:left-[36px] left-[41px] z-10 bg-inherit ">
        <div className="flex items-center">
          <div className="w-7 h-7 mr-2">
            <img
              className="w-auto mr-2"
              src={coin.image}
              alt="logo"
              loading="lazy"
            />
          </div>
          <Link
            to={`/currencies/${coin.id}`}
            className="mr-2 flex md:inline-block flex-col"
            onClick={() => ref.current.continuousStart()}
          >
            <span className="mr-2">{splitName(coin.name)}</span>
            <span className="max-md:text-left">
              <span className="md:hidden mr-2">{coin.market_cap_rank}</span>
              <span>{coin.symbol.toUpperCase()}</span>
            </span>
          </Link>
        </div>
      </td>
      <td className="tdStyle text-right font-bold">${toLocaleS(coin.current_price)}</td>
      <td className="tdStyle text-right">
        <div className={`flex items-center justify-end ${upDown(coin.price_change_percentage_1h_in_currency) ? 'upColor' : 'downColor'}`}>
          {upDown(coin.price_change_percentage_1h_in_currency) ? (
            <RiArrowUpSFill className="upDownIcon" />
          ) : (
            <RiArrowDownSFill className="upDownIcon" />
          )}
          {toFixed(coin.price_change_percentage_1h_in_currency, 2)}%
        </div>
      </td>
      <td className="tdStyle ">
        <div className={`flex items-center justify-end ${upDown(coin.price_change_percentage_24h) ? 'upColor' : 'downColor'}`}>
          {upDown(coin.price_change_percentage_24h) ? (
            <RiArrowUpSFill className="upDownIcon" />
          ) : (
            <RiArrowDownSFill className="upDownIcon" />
          )}
          {toFixed(coin.price_change_percentage_24h, 2)}%
        </div>
      </td>
      <td className="tdStyle">
        <div className={`flex items-center justify-end ${upDown(coin.price_change_percentage_7d_in_currency) ? 'upColor' : 'downColor'}`}>
          {upDown(coin.price_change_percentage_7d_in_currency) ? (
            <RiArrowUpSFill className="upDownIcon" />
          ) : (
            <RiArrowDownSFill className="upDownIcon" />
          )}
          {toFixed(coin.price_change_percentage_7d_in_currency, 2)}%
        </div>
      </td>
      <td className="tdStyle text-right">${toLocaleS(coin.total_volume)}</td>
      <td className="tdStyle text-right">${toLocaleS(coin.market_cap)}</td>
      <td className="tdStyle text-right">{`${toLocaleS(
        coin.circulating_supply
      )} ${coin.symbol.toUpperCase()}`}</td>
      <td className="tdStyle w-[150px] !py-0">
        <Chart7d
          data={coin}
          upDown={upDown(coin.price_change_percentage_7d_in_currency)}
        />
      </td>
      <td className="tdStyle"></td>
    </tr>
  );
};

export default CoinTr;
