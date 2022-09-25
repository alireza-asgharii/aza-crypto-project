import React, { useContext } from "react";
import { useSelector } from "react-redux";

//Styles
import styles from "../../styles/Loading.module.scss";

//Context
import { MarketCoinContext } from "../../context/MarketCoinContextProvider";

const Loading = () => {
  const state = useSelector(state => state.coinChartState.isLoading)
  const { data } = useContext(MarketCoinContext);
  
  if (!data.length || state) {
    return <div className={styles.loading}></div>;
  }
};

export default Loading;
