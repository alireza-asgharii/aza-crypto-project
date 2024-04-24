import React, { useContext } from "react";
import { Link } from "react-router-dom";

//Styles
import styles from "../../styles/navbar.module.scss";

//Context
import { LoadingBarRef } from "../../App";

const SearchItem = ({data}) => {
  const ref = useContext(LoadingBarRef)
  return (
    <div className={styles.item}>
      <Link className={styles.titleContainer} to={`/currencies/${data.id}`} onClick={() => ref.current.continuousStart()}>
        <img
          src={data.large}
          alt="coin"
        />
        <span className={styles.name}>{data.name}</span>
        <span className={styles.symbol}>{data.symbol.toUpperCase()}</span>
      </Link>
      <span className={styles.rank}>#{data.market_cap_rank}</span>
    </div>
  );
};

export default SearchItem;
