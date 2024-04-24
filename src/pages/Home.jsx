import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

//redux
import { useSelector, useDispatch } from "react-redux";
import { coinMarket } from "../redux/coinsMarket/coinMarketAction";

//styles
import styles from "../styles/home.module.scss";

//Context
import { LoadingBarRef } from "../App";

//Components
import PaginationCom from "../components/modules/PaginationCom";

//Skeleton Lading
import TableSkeleton from "../loading/TableSkeleton";
import CoinTr from "../components/modules/CoinTr";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchCoinsMarket } from "../services/queries";
import TheadTr from "../components/modules/TheadTr";
import Error from "../components/templates/Error";
import { useGetCoinsMarket } from "../hooks/useQueries";

const Home = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const ref = useContext(LoadingBarRef);

  //react query
  const { isPending, isFetching, isLoading, data, error, isPlaceholderData } =
    useGetCoinsMarket(query.page);

  console.log({
    isLoading,
    isPending,
    isFetching,
    data,
    isPlaceholderData,
    error,
  });

  useEffect(() => {
    ref.current.complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.page]);

  return (
    <>
      <div className={styles.container}>
        {!error && (
          <h1 className={styles.homeTitle}>
            Today's Cryptocurrency Prices by Market Cap
          </h1>
        )}

        <div className={styles.coinsContainer}>
          {error && <Error />}
          {!error && (
            <table className={styles.coinTable}>
              <thead>
                <TheadTr />
              </thead>
              <tbody>
                {isPending ? (
                  <TableSkeleton length={10} />
                ) : (
                  data &&
                  !error &&
                  data.map((item) => <CoinTr coin={item} key={item.id} />)
                )}
              </tbody>
            </table>
          )}
        </div>
        {!error && <PaginationCom page={120} />}
      </div>
    </>
  );
};

export default Home;
