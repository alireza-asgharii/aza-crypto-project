import React from "react";
import { Link } from "react-router-dom";

//Styles
import styles from "../../styles/footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>CoinMarketEy</h4>
      </div>
      <div className={styles.linksContainer}>
        <div className={styles.item}>
          <ul>
            <h6 className={styles.title}>Main Links</h6>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/currencies">currencies</Link>
            </li>
            <li>
              <Link to="/watchlist">Watchlist</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
          </ul>
        </div>
        <div className={styles.item}>
          <ul>
            <h6 className={styles.title}>Coins</h6>
            <li>
              <Link to="/currencies/bitcoin">Bitcoin</Link>
            </li>
            <li>
              <Link to="/currencies/ethereum">Ethereum</Link>
            </li>
            <li>
              <Link to="/currencies/tether">Tether</Link>
            </li>
          </ul>
        </div>
        <div className={styles.item}>
          <ul>
            <h6 className={styles.title}>Api</h6>
            <li>
              <a href="https://www.coingecko.com/">CoinGecko</a>
            </li>
            <li>
              <a href="https://coinmarketcap.com/">CoinMarketCap</a>
            </li>
          </ul>
        </div>
        <div className={styles.item}>
          <ul>
            <h6 className={styles.title}>Developer links</h6>
            <li>
              <a href="https://www.github.com/alireza-asgharii">Github</a>
            </li>
            <li>
              <a href="https://t.me/Alirezwa03/">Telegram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerText}>
        <span>Developed with &#128153; by Alireza Asghari</span>
      </div>
    </div>
  );
};

export default Footer;
