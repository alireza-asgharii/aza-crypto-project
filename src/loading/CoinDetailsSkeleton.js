import React from "react";

import { Skeleton } from "@mui/material";
import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";

//Icons
import { BsQuestionCircle } from "react-icons/bs";

//Styles
import styles from "../styles/CoinDetails.module.scss";

const SkeletonDemo = styled(Skeleton)`
  @media screen and (min-width: 999px) {
    margin-top: 20px;
  }
`;

const CoinDetailsSkeleton = () => {
  return (
    <section className={styles.topSection}>
      <div className={styles.priceContainer}>
        <SkeletonDemo
          variant="rounded"
          width={50}
          height={20}
          sx={{ bgcolor: "grey.900" }}
        />
        <div className={styles.titleContainer}>
          <Skeleton
            variant="circular"
            sx={{ bgcolor: "grey.900" }}
            width={40}
            height={40}
          />

          <span className={styles.name}>
            <Skeleton
              variant="rounded"
              width={100}
              height={25}
              sx={{ bgcolor: "grey.900", marginLeft: "10px" }}
            />
          </span>
        </div>
        <div className={styles.priceDiv}>
          <span className={styles.price}>
            <Skeleton
              variant="rounded"
              width={130}
              height={30}
              sx={{ bgcolor: "grey.900", marginTop: "10px" }}
            />
          </span>
          <span className={styles.change}>
            <Skeleton
              variant="rounded"
              width={70}
              height={25}
              sx={{ bgcolor: "grey.900", marginTop: "10px" }}
            />
          </span>
        </div>
        <div className={styles.morePrice}>
          <div className={styles.priceItem}>
            <p>
              Market Cap
              <span>
                <BsQuestionCircle />
              </span>
            </p>
            <span className={styles.priceSpan}>
              <Skeleton
                variant="rounded"
                width={150}
                height={23}
                sx={{ bgcolor: "grey.900" }}
              />
            </span>
          </div>
          <div className={styles.priceItem}>
            <p>
              24 Hour Trading Vol
              <span>
                <BsQuestionCircle />
              </span>
            </p>
            <span className={styles.priceSpan}>
              <Skeleton
                variant="rounded"
                width={150}
                height={23}
                sx={{ bgcolor: "grey.900" }}
              />
            </span>
          </div>
          <div className={styles.priceItem}>
            <p>
              Fully Diluted Valuation
              <span>
                <BsQuestionCircle />
              </span>
            </p>
            <span className={styles.priceSpan}>
              <Skeleton
                variant="rounded"
                width={150}
                height={23}
                sx={{ bgcolor: "grey.900" }}
              />
            </span>
          </div>
          <div className={styles.priceItem}>
            <p>
              Circulating Supply
              <span>
                <BsQuestionCircle />
              </span>
            </p>
            <span className={styles.priceSpan}>
              <Skeleton
                variant="rounded"
                width={150}
                height={23}
                sx={{ bgcolor: "grey.900" }}
              />
            </span>
          </div>
          <div className={styles.priceItem}>
            <p>
              Total Supply
              <span>
                <BsQuestionCircle />
              </span>
            </p>
            <span className={styles.priceSpan}>
              <Skeleton
                variant="rounded"
                width={150}
                height={23}
                sx={{ bgcolor: "grey.900" }}
              />
            </span>
          </div>
          <div className={styles.priceItem}>
            <p>
              Max Supply
              <span>
                <BsQuestionCircle />
              </span>
            </p>
            <span className={styles.priceSpan}>
              <Skeleton
                variant="rounded"
                width={150}
                height={23}
                sx={{ bgcolor: "grey.900" }}
              />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <h6>Info</h6>
        <div className={`${`${styles.itemInfo} ${styles.itemInfoSkeleton}`}`}>
          <span className={styles.title}>Website</span>
          <div>
            <span className={` ${styles.coinLink} ${styles.skeletonSpan} `}>
              <Skeleton
                variant="rounded"
                width={130}
                height={25}
                sx={{ bgcolor: "grey.900" }}
              />
            </span>
          </div>
        </div>
        <div className={`${styles.itemInfo} ${styles.itemInfoSkeleton}`}>
          <span className={styles.title}>Explorers</span>
          <div>
            <span className={`${styles.coinLink} ${styles.skeletonSpan} `}>
              <Skeleton
                variant="rounded"
                width={130}
                height={25}
                sx={{ bgcolor: "grey.900" }}
              />
            </span>
          </div>
        </div>
        <div className={`${styles.itemInfo} ${styles.itemInfoSkeleton}`}>
          <span className={styles.title}>Community</span>
          <div>
            <span
              className={`${styles.coinLink} ${styles.skeletonSpan}  ${styles.socialBadge}`}
            >
              <Skeleton
                variant="rounded"
                width={130}
                height={25}
                sx={{ bgcolor: "grey.900" }}
              />
            </span>
          </div>
        </div>
        <div className={`${styles.itemInfo} ${styles.itemInfoSkeleton}`}>
          <span className={styles.title}>Search on</span>
          <div>
            <span
              className={`${styles.coinLink} ${styles.skeletonSpan}  ${styles.socialBadge}`}
            >
              <Skeleton
                variant="rounded"
                width={130}
                height={25}
                sx={{ bgcolor: "grey.900" }}
              />
            </span>
          </div>
        </div>

        <div className={`${styles.itemInfo} ${styles.itemInfoSkeleton}`}>
          <span className={styles.title}>Source Code</span>
          <div>
            <span
              className={`${styles.coinLink} ${styles.skeletonSpan}  ${styles.socialBadge}`}
            >
              <Skeleton
                variant="rounded"
                width={130}
                height={25}
                sx={{ bgcolor: "grey.900" }}
              />
            </span>
          </div>
        </div>

        <div className={`${styles.itemInfo} ${styles.itemInfoSkeleton}`}>
          <span className={styles.title}>API id</span>
          <div>
            <span
              className={`${styles.coinLink} ${styles.skeletonSpan}  ${styles.socialBadge}`}
            >
              <Skeleton
                variant="rounded"
                width={130}
                height={25}
                sx={{ bgcolor: "grey.900" }}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinDetailsSkeleton;
