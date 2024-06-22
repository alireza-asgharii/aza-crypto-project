import { Skeleton } from "@mui/material";

//Icons
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";

//Helper
import { toLocaleS, upDown } from "../../helper/function";

//Styles
import styles from "../../styles/globalData.module.scss";

import { useGetGlobalData } from "../../hooks/useQueries";

const GlobalData = () => {
  const {data, isPending, isError} = useGetGlobalData()

  return (
    <>
      <div className={`${styles.item}`}>
        <span className={styles.name}>Cryptos:</span>
        <span className={styles.value}>
          {isPending || !data?.data || isError ? (
            <Skeleton
              variant="rounded"
              width={38}
              height={16.8}
              sx={{ bgcolor: "grey.800", marginTop: "2px" }}
            />
          ) : (
            toLocaleS(data?.data?.active_cryptocurrencies)
          )}
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.name}>Exchanges:</span>
        <span className={styles.value}>
          {isPending || !data?.data || isError ? (
            <Skeleton
              variant="rounded"
              width={38}
              height={16.8}
              sx={{ bgcolor: "grey.800", marginTop: "2px" }}
            />
          ) : (
            toLocaleS(data?.data?.markets)
          )}
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.name}>Market Cap:</span>
        <span className={styles.value}>
          {isPending || !data?.data|| isError ? (
            <Skeleton
              variant="rounded"
              width={170}
              height={16.8}
              sx={{ bgcolor: "grey.800", marginTop: "2px" }}
            />
          ) : (
            <>
              ${toLocaleS(data?.data?.total_market_cap.usd)}
              <span
                className={`${styles.priceChange} ${
                  upDown(data?.data?.market_cap_change_percentage_24h_usd)
                    ? styles.greenChange
                    : styles.redChange
                }`}
              >
                {data?.data?.market_cap_change_percentage_24h_usd.toFixed(
                  2
                )}
                %
                {upDown(
                  data?.data?.market_cap_change_percentage_24h_usd
                ) ? (
                  <RiArrowUpSFill className={styles.upDownIcons} />
                ) : (
                  <RiArrowDownSFill className={styles.upDownIcons} />
                )}
              </span>
            </>
          )}
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.name}>24h Vol:</span>
        <span className={styles.value}>
          {isPending || !data?.data || isError ? (
            <Skeleton
              variant="rounded"
              width={120}
              height={16.8}
              sx={{ bgcolor: "grey.800", marginTop: "2px" }}
            />
          ) : (
            `$${toLocaleS(data?.data.total_volume.usd)}`
          )}
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.name}>Dominance:</span>
        <span className={styles.value}>
        {isPending || !data?.data || isError ? (
            <Skeleton
              variant="rounded"
              width={38}
              height={16.8}
              sx={{ bgcolor: "grey.800", marginTop: "2px" }}
            />
          ) : (
            `BTC: ${data?.data.market_cap_percentage.btc.toFixed(2)}% ETH: ${data?.data.market_cap_percentage.eth.toFixed(2)}%`
          )}
          </span>
      </div>
    </>
  );
};

export default GlobalData;
