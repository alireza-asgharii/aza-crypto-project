import React, { useContext, useState } from "react";
import styled from "styled-components";

import TableSkeleton from "../loading/TableSkeleton";
import CoinTr from "./shared/CoinTr";

//Context
import { MarkedContext } from "../context/MarkedContextProvider";

//Styles
import styles from "../styles/home.module.scss";

const Tbody = styled.tbody`
  filter: ${(props) => (props.isEmpty ? "blur(10px)" : "")};
`;


const Watchlist = () => {
  const { state } = useContext(MarkedContext);

  return (
    <div>
      <h2 className="mb-5 mt-3">Watchlist</h2>
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
          <Tbody isEmpty={state.markeds.length === 0}>
            {state.markeds.length === 0 ? (
              <TableSkeleton length={6} />
              ) : (
              state.markeds.map((item) => <CoinTr coin={item} key={item.id} />)
            )}
          </Tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
