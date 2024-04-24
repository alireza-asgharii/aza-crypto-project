//styles
import styles from "../../styles/home.module.scss";

const TheadTr = () => {
  return (
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
  );
};

export default TheadTr;
