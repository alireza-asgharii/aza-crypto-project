import React from "react";
import Skeleton from "@mui/material/Skeleton";

import styles from "../styles/home.module.scss";

const TableSkeleton = (props) => {
  return (
    <>
      {Array(props.length)
        .fill(0)
        .map((item, i) => (
          <tr className={styles.coinRow} key={i}>
            <td className={styles.sticky}>
              <Skeleton variant="circular" animation='wave' width={20} height={20} sx={{bgcolor: 'grey.900'}}/>
            </td>
            <td className={`${styles.sticky} ${styles.rankNumber}`}>
              <span>
                <Skeleton variant="rounded" animation="wave" width={20} height={20} sx={{bgcolor: 'grey.900'}} />
              </span>
            </td>
            <td className={`${styles.sticky} ${styles.nameTd}`}>
              <Skeleton variant="text" animation="wave" width={120} height={40} sx={{bgcolor: 'grey.900'}} />
            </td>
            <td colSpan={8}>
              <Skeleton variant="text" animation="wave" width={1000} height={40} sx={{bgcolor: 'grey.900'}} />
            </td>
          </tr>
        ))}
    </>
  );
};

export default TableSkeleton;
