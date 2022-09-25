import React, { useContext, useEffect } from "react";

//styles
import styles from "../styles/home.module.scss";

//Context
import { MarketCoinContext } from "../context/MarketCoinContextProvider";
import { LoadingBarRef } from "../App";

//Components
import PaginationCom from "./shared/PaginationCom";

//Skeleton Lading
import TableSkeleton from "../loading/TableSkeleton";
import CoinTr from "./shared/CoinTr";

const Home = () => {
  const { data } = useContext(MarketCoinContext);
  const ref = useContext(LoadingBarRef)
  useEffect(() => {
    ref.current.complete()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
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
              {data.length === 0 ? (
                <TableSkeleton length={10} />
              ) : (
                data.map((item) => (
                 <CoinTr coin={item} key={item.id} />
                ))
              )}
            </tbody>
          </table>
        </div>
        <PaginationCom page={120} />
      </div>
    </>
  );
};

export default Home;
