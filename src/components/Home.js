import React, { useContext } from "react";
import { Link } from "react-router-dom";

//styles
import styles from "../styles/home.module.scss";

//icons
import { AiOutlineStar } from "react-icons/ai";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";

//Context
import { MarketCoinContext } from "../context/MarketCoinContextProvider";

//Helper
import { splitName, toFixed, upDown } from "../helper/function";

// Chartjs
import Chart7d from "./shared/Chart7d";

//Components
import PaginationCom from "./shared/PaginationCom";

//Skeleton Lading
import TableSkeleton from "../loading/TableSkeleton";

const Home = () => {
  const { data } = useContext(MarketCoinContext);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.homeTitle}>
          Today's Cryptocurrency Prices by Market Cap
        </h1>
        <div className={styles.coinsContainer}>
          <table className={styles.coinTable}>
            <thead>
              <tr>
                <th className={styles.sticky}> </th>
                <th className={`${styles.sticky} ${styles.rankNumber}`}>#</th>
                <th className={styles.sticky}>Name</th>
                <th>Price</th>
                <th>1h %</th>
                <th>24h %</th>
                <th>7d %</th>
                <th>Volume(24h)</th>
                <th>Market Cap</th>
                <th>Circulating Supply</th>
                <th>Last 7 Days</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
              data.length === 0 ? <TableSkeleton length={10} /> :
              
              data.map((coin) => (
                <tr className={styles.coinRow} key={coin.id}>
                  <td className={styles.sticky}>
                    <AiOutlineStar className={styles.star} />
                  </td>
                  <td className={`${styles.sticky} ${styles.rankNumber}`}>
                    <span>{coin.market_cap_rank}</span>
                  </td>
                  <td className={`${styles.sticky} ${styles.nameTd}`}>
                    <img src={coin.image} alt="logo" loading="lazy" />
                    <Link to={`/currencies/${coin.id}`} className={styles.div}>
                      <span className={styles.nameSpan}>
                        {splitName(coin.name)}
                      </span>
                      <span>
                        <span className={styles.numberMobile}>
                          {coin.market_cap_rank}
                        </span>
                        <span>{coin.symbol.toUpperCase()}</span>
                      </span>
                    </Link>
                  </td>
                  <td>${coin.current_price.toLocaleString()}</td>
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
                  <td>${coin.total_volume.toLocaleString()}</td>
                  <td>${coin.market_cap.toLocaleString()}</td>
                  <td>{`${coin.circulating_supply.toLocaleString()} ${coin.symbol.toUpperCase()}`}</td>
                  <td>
                    {/* <Chart7d
                      data={coin}
                      upDown={upDown(
                        coin.price_change_percentage_7d_in_currency
                      )}
                    /> */}
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationCom page={120} />
      </div>
    </>
  );
};

export default Home;
