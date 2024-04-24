import React, { useContext } from "react";
import styles from "../../styles/home.module.scss";
import { Link } from "react-router-dom";

//icons
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";

//Helper
import { checkStar, splitName, toFixed, toLocaleS, upDown } from "../../helper/function";

// Chartjs
import Chart7d from "./Chart7d";

//Context
import { MarkedContext } from "../../context/MarkedContextProvider";
import { LoadingBarRef } from "../../App";


const CoinTr = ({ coin }) => {
  const { state, dispatch } = useContext(MarkedContext);
  const ref = useContext(LoadingBarRef)
  return (
    <tr className={styles.coinRow}>
      <td className={styles.sticky}>
        {checkStar(state.markeds, coin.id) ? (
          <AiFillStar
            className={styles.starYellow}
            onClick={() => {
              dispatch({
                type: "DELETE_FROM_MARKEDS",
                payload: coin,
              });
            }}
          />
        ) : (
          <AiOutlineStar
            className={styles.star}
            onClick={() =>
              dispatch({
                type: "ADD_TO_MARKEDS",
                payload: coin,
              })
            }
          />
        )}
      </td>
      <td className={`${styles.sticky} ${styles.rankNumber}`}>
        <span>{coin.market_cap_rank}</span>
      </td>
      <td className={`${styles.sticky} ${styles.nameTd}`}>
        <img src={coin.image} alt="logo" loading="lazy" />
        <Link to={`/currencies/${coin.id}`} className={styles.div} onClick={() => ref.current.continuousStart()}>
          <span className={styles.nameSpan}>{splitName(coin.name)}</span>
          <span>
            <span className={styles.numberMobile}>{coin.market_cap_rank}</span>
            <span>{coin.symbol.toUpperCase()}</span>
          </span>
        </Link>
      </td>
      <td>${toLocaleS(coin.current_price)}</td>
      <td
        className={
          upDown(coin.price_change_percentage_1h_in_currency)
            ? styles.upColor
            : styles.downColor
        }
      >
        {upDown(coin.price_change_percentage_1h_in_currency) ? (
          <RiArrowUpSFill className={styles.upDownIcon} />
        ) : (
          <RiArrowDownSFill className={styles.upDownIcon} />
        )}
        {toFixed(coin.price_change_percentage_1h_in_currency, 2)}%
      </td>
      <td
        className={
          upDown(coin.price_change_percentage_24h)
            ? styles.upColor
            : styles.downColor
        }
      >
        {upDown(coin.price_change_percentage_24h) ? (
          <RiArrowUpSFill className={styles.upDownIcon} />
        ) : (
          <RiArrowDownSFill className={styles.upDownIcon} />
        )}
        {toFixed(coin.price_change_percentage_24h, 2)}%
      </td>
      <td
        className={
          upDown(coin.price_change_percentage_7d_in_currency)
            ? styles.upColor
            : styles.downColor
        }
      >
        {upDown(coin.price_change_percentage_7d_in_currency) ? (
          <RiArrowUpSFill className={styles.upDownIcon} />
        ) : (
          <RiArrowDownSFill className={styles.upDownIcon} />
        )}
        {toFixed(coin.price_change_percentage_7d_in_currency, 2)}%
      </td>
      <td>${toLocaleS(coin.total_volume)}</td>
      <td>${toLocaleS(coin.market_cap)}</td>
      <td>{`${toLocaleS(coin.circulating_supply)} ${coin.symbol.toUpperCase()}`}</td>
      <td>
        <Chart7d
          data={coin}
          upDown={upDown(coin.price_change_percentage_7d_in_currency)}
        />
      </td>
      <td></td>
    </tr>
  );
};

export default CoinTr;
