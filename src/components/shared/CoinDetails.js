import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../../redux/coinDetails/detailsAction";

//Styles
import styles from "../../styles/CoinDetails.module.scss";

//Components
import IconBreadcrumbs from "./IconBreadcrumbs";

//Icons
import { BsQuestionCircle } from "react-icons/bs";
import { MdMoreHoriz } from "react-icons/md";
import { AiOutlineTwitter } from "react-icons/ai";
import { MdFacebook } from "react-icons/md";
import { RiRedditFill } from "react-icons/ri";
import { RiTelegramFill } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import { RiGithubFill } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { RiArrowDownSFill } from "react-icons/ri";
import { RiArrowUpSFill } from "react-icons/ri";

//Function
import {
  changePercentage,
  findAllMinMax,
  findMinMax,
  getTime,
  splitTime,
  splitWebsiteLink,
  toFixed,
  toLocaleS,
  upDown,
} from "../../helper/function";

//Skeleton Loading
import CoinDetailsSkeleton from "../../loading/CoinDetailsSkeleton";
import { Skeleton } from "@mui/material";

//Chartjs
import ChartCoin from "./ChartCoin";
import axios from "axios";

//Context
import { LoadingBarRef } from "../../App";

const CoinDetails = () => {
  const ref = useContext(LoadingBarRef);

  const [isOpenExplor, setExplor] = useState(false);

  //chartjs
  const [isCopy, setCopy] = useState(false);
  const [range, setRange] = useState(1);
  const isLoading = useSelector((state) => state.coinChartState.isLoading);
  const isError = useSelector((state) => state.coinChartState.error.isErr);

  const [Tooltips, setTooltips] = useState({
    marketCap: false,
    Trabding24: false,
    fullyDiluted: false,
    circulatingSupply: false,
    totalSupply: false,
    maxSupply: false,
  });

  //coinData
  const dispatch = useDispatch();
  const coinDetailsState = useSelector((state) => state.coinDetailsState);
  const coinData = coinDetailsState.coinData;
  const isLoadingCoinData = coinDetailsState.isLoading;
  const coinDataError = coinDetailsState.error.isErr;

  //for MaxMin
  const [dataMaxMin, setDataMaxMin] = useState([]);
  const [minMaxLaoding, seMaxMinLoading] = useState(true);
  const [minMaxError, seMaxMinError] = useState(false);

  const { id } = useParams();
  const path = useLocation();

  useEffect(() => {
    dispatch(fetchDetails(id));
    ref.current.complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //fetch for minmax
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    axios
      .get(
        `/api/v3/coisns/${id}/market_chart?vs_currency=usd&days=max&interval=''`
      )
      .then((res) => {
        setDataMaxMin(res.prices);
        seMaxMinLoading(false);
        seMaxMinError(false);
      })
      .catch((err) => {
        seMaxMinError(true);
        seMaxMinLoading(false);
      });
  }, [id]);

  const copyHandler = () => {
    navigator.clipboard.writeText(coinData.id);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  const selectedRangeHandler = (e) => {
    const range = e.target.getAttribute("data-range");
    if (isNaN(range)) {
      setRange(range);
    } else {
      setRange(+range);
    }
  };

  const hoverTooltipHandler = (value) => {
    setTooltips((prevState) => ({ ...prevState, [value]: true }));
    console.log("event");
  };

  const closeTooltipHandler = () => {
    setTooltips({
      marketCap: false,
      Trabding24: false,
      fullyDiluted: false,
      circulatingSupply: false,
      totalSupply: false,
      maxSupply: false,
    });
  };

  return (
    <div>
      <div className={styles.breadcrumbsContainer}>
        <IconBreadcrumbs path={path} name={coinData?.name} />
      </div>
      {coinData.length === 0 || isLoadingCoinData || coinDataError ? (
        <CoinDetailsSkeleton />
      ) : (
        <section className={styles.topSection}>
          <div className={styles.priceContainer}>
            <span className={styles.badge}>
              Rank #{coinData.market_cap_rank}
            </span>
            <div className={styles.titleContainer}>
              <img src={coinData.image.large} alt="coinLogo" />
              <span className={styles.name}>
                {coinData.name} ({coinData.symbol.toUpperCase()})
              </span>
            </div>
            <div className={styles.priceDiv}>
              <span className={styles.price}>
                ${toLocaleS(coinData.market_data.current_price.usd)}
              </span>
              <span
                className={`${styles.change} ${
                  upDown(coinData.market_data.price_change_percentage_24h)
                    ? styles.changeGreen
                    : styles.changeRed
                }`}
              >
                {upDown(coinData.market_data.price_change_percentage_24h) ? (
                  <RiArrowUpSFill className={styles.upDownIcon} />
                ) : (
                  <RiArrowDownSFill className={styles.upDownIcon} />
                )}
                <span>
                  {toFixed(coinData.market_data.price_change_percentage_24h, 2)}
                  %
                </span>
              </span>
            </div>
            <div className={styles.morePrice}>
              <div className={styles.priceItem}>
                <p>
                  Market Cap
                  <span>
                    <BsQuestionCircle
                      onMouseOver={() => hoverTooltipHandler("marketCap")}
                      onMouseOut={closeTooltipHandler}
                    />
                    <span
                      onMouseOut={closeTooltipHandler}
                      onMouseOver={() => hoverTooltipHandler("marketCap")}
                      className={`${styles.tooltip} ${
                        Tooltips.marketCap ? styles.showTooltip : ""
                      }`}
                    >
                      Market Cap = Current Price x Circulating Supply <br />{" "}
                      <br /> Refers to the total market value of a
                      cryptocurrency’s circulating supply. It is similar to the
                      stock market’s measurement of multiplying price per share
                      by shares readily available in the market (not held &
                      locked by insiders, governments)
                    </span>
                  </span>
                </p>
                <span className={styles.priceSpan}>
                  ${toLocaleS(coinData.market_data.market_cap.usd)}
                </span>
              </div>
              <div className={styles.priceItem}>
                <p>
                  24 Hour Trading Vol
                  <span>
                    <BsQuestionCircle
                      onMouseOver={() => hoverTooltipHandler("Trabding24")}
                      onMouseOut={closeTooltipHandler}
                    />
                    <span
                      onMouseOver={() => hoverTooltipHandler("Trabding24")}
                      onMouseOut={closeTooltipHandler}
                      className={`${styles.tooltip} ${
                        Tooltips.Trabding24 ? styles.showTooltip : ""
                      }`}
                    >
                      A measure of a cryptocurrency trading volume across all
                      tracked platforms in the last 24 hours. This is tracked on
                      a rolling 24-hour basis with no open/closing times.
                    </span>
                  </span>
                </p>
                <span className={styles.priceSpan}>
                  ${toLocaleS(coinData.market_data.total_volume.usd)}
                </span>
              </div>
              <div className={styles.priceItem}>
                <p>
                  Fully Diluted Valuation
                  <span>
                    <BsQuestionCircle
                      onMouseOver={() => hoverTooltipHandler("fullyDiluted")}
                      onMouseOut={closeTooltipHandler}
                    />
                    <span
                      onMouseOver={() => hoverTooltipHandler("fullyDiluted")}
                      onMouseOut={closeTooltipHandler}
                      className={`${styles.tooltip} ${
                        Tooltips.fullyDiluted ? styles.showTooltip : ""
                      }`}
                    >
                      FDV = Current Price x Max Supply
                      <br /> <br /> The market capitalization (valuation) if the
                      max supply of a coin is in circulation. Note that it can
                      take 3, 5, 10 or more years before the FDV can be reached,
                      depending on how the emission schedule is designed.
                    </span>
                  </span>
                </p>
                <span className={styles.priceSpan}>
                  ${toLocaleS(coinData.market_data.fully_diluted_valuation.usd)}
                </span>
              </div>
              <div className={styles.priceItem}>
                <p>
                  Circulating Supply
                  <span>
                    <BsQuestionCircle
                      onMouseOver={() =>
                        hoverTooltipHandler("circulatingSupply")
                      }
                      onMouseOut={closeTooltipHandler}
                    />
                    <span
                      onMouseOver={() =>
                        hoverTooltipHandler("circulatingSupply")
                      }
                      onMouseOut={closeTooltipHandler}
                      className={`${styles.tooltip} ${
                        Tooltips.circulatingSupply ? styles.showTooltip : ""
                      }`}
                    >
                      The amount of coins that are circulating in the market and
                      are tradeable by the public. It is comparable to looking
                      at shares readily available in the market (not held &
                      locked by insiders, governments).
                    </span>
                  </span>
                </p>
                <span className={styles.priceSpan}>
                  ${toLocaleS(coinData.market_data.circulating_supply)}
                </span>
              </div>
              <div className={styles.priceItem}>
                <p>
                  Total Supply
                  <span>
                    <BsQuestionCircle
                      onMouseOver={() => hoverTooltipHandler("totalSupply")}
                      onMouseOut={closeTooltipHandler}
                    />
                    <span
                      onMouseOver={() => hoverTooltipHandler("totalSupply")}
                      onMouseOut={closeTooltipHandler}
                      className={`${styles.tooltip} ${
                        Tooltips.totalSupply ? styles.showTooltip : ""
                      }`}
                    >
                      The amount of coins that have already been created, minus
                      any coins that have been burned (removed from
                      circulation). It is comparable to outstanding shares in
                      the stock market. <br /> <br /> Total Supply = Onchain
                      supply - burned tokens
                    </span>
                  </span>
                </p>
                <span className={styles.priceSpan}>
                  ${toLocaleS(coinData.market_data.total_supply)}
                </span>
              </div>
              <div className={styles.priceItem}>
                <p>
                  Max Supply
                  <span>
                    <BsQuestionCircle
                      onMouseOver={() => hoverTooltipHandler("maxSupply")}
                      onMouseOut={closeTooltipHandler}
                    />
                    <span
                      onMouseOver={() => hoverTooltipHandler("maxSupply")}
                      onMouseOut={closeTooltipHandler}
                      className={`${styles.tooltip} ${
                        Tooltips.maxSupply ? styles.showTooltip : ""
                      }`}
                    >
                      The maximum number of coins coded to exist in the lifetime
                      of the cryptocurrency. It is comparable to the maximum
                      number of issuable shares in the stock market. <br />{" "}
                      <br /> Max Supply = Theoretical maximum as coded
                    </span>
                  </span>
                </p>
                <span className={styles.priceSpan}>
                  ${toLocaleS(coinData.market_data.max_supply)}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <h6>Info</h6>
            <div className={styles.itemInfo}>
              <span className={styles.title}>Website</span>
              <div>
                {coinData.links.homepage.map(
                  (item) =>
                    item !== "" && (
                      <a
                        key={item}
                        href={item}
                        className={`${styles.badge} ${styles.coinLink}`}
                      >
                        {splitWebsiteLink(item)}
                      </a>
                    )
                )}
              </div>
            </div>
            <div className={styles.itemInfo}>
              <span className={styles.title}>Explorers</span>
              <div
                className={
                  coinData.links.blockchain_site.filter((item) => item !== "")
                    .length > 1
                    ? styles.moreLinkContainer
                    : ""
                }
              >
                <a
                  href={coinData.links.blockchain_site[0]}
                  className={`${styles.badge} ${styles.coinLink}`}
                >
                  {splitWebsiteLink(coinData.links.blockchain_site[0])}
                </a>
                {coinData.links.blockchain_site.filter((item) => item !== "")
                  .length > 1 && (
                  <MdMoreHoriz
                    className={styles.moreIcon}
                    onClick={() => setExplor(!isOpenExplor)}
                  />
                )}
                {isOpenExplor && (
                  <div className={styles.explorlinkContainer}>
                    {coinData.links.blockchain_site.map(
                      (item) =>
                        item !== "" &&
                        item !== coinData.links.blockchain_site[0] && (
                          <a
                            key={item}
                            href={item}
                            className={`${styles.coinLink}`}
                          >
                            {splitWebsiteLink(item)}
                          </a>
                        )
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.itemInfo}>
              <span className={styles.title}>Community</span>
              <div>
                {coinData.links.twitter_screen_name && (
                  <a
                    href={`https://twitter.com/${coinData.links.twitter_screen_name}`}
                    className={`${styles.badge} ${styles.coinLink} ${styles.socialBadge}`}
                  >
                    <AiOutlineTwitter className={styles.socialIcon} />
                    Twitter
                  </a>
                )}
                {coinData.links.facebook_username && (
                  <a
                    href={`https://www.facebook.com/${coinData.links.facebook_username}`}
                    className={`${styles.badge} ${styles.coinLink} ${styles.socialBadge}`}
                  >
                    <MdFacebook className={styles.socialIcon} />
                    Facebook
                  </a>
                )}
                {coinData.links.subreddit_url && (
                  <a
                    href={coinData.links.subreddit_url}
                    className={`${styles.badge} ${styles.coinLink} ${styles.socialBadge}`}
                  >
                    <RiRedditFill className={styles.socialIcon} />
                    Reddit
                  </a>
                )}

                {coinData.links.telegram_channel_identifier && (
                  <a
                    href={`https://t.me/${coinData.links.telegram_channel_identifier}`}
                    className={`${styles.badge} ${styles.coinLink} ${styles.socialBadge}`}
                  >
                    <RiTelegramFill className={styles.socialIcon} />
                    Telegram
                  </a>
                )}
              </div>
            </div>
            <div className={styles.itemInfo}>
              <span className={styles.title}>Search on</span>
              <div>
                <a
                  href={`https://twitter.com/search?q=$${coinData.symbol}`}
                  className={`${styles.badge} ${styles.coinLink} ${styles.socialBadge}`}
                >
                  <BiSearchAlt className={styles.socialIcon} />
                  Twitter
                </a>
              </div>
            </div>
            {coinData.links.repos_url.github.length ? (
              <div className={styles.itemInfo}>
                <span className={styles.title}>Source Code</span>
                <div>
                  {Array.isArray(coinData.links.repos_url.github) ? (
                    <a
                      href={coinData.links.repos_url.github[0]}
                      className={`${styles.badge} ${styles.coinLink} ${styles.socialBadge}`}
                    >
                      <RiGithubFill className={styles.socialIcon} />
                      Github
                    </a>
                  ) : (
                    <a
                      href={coinData.links.repos_url.github}
                      className={`${styles.badge} ${styles.coinLink} ${styles.socialBadge}`}
                    >
                      <RiGithubFill className={styles.socialIcon} />
                      Github
                    </a>
                  )}
                </div>
              </div>
            ) : null}
            <div className={styles.itemInfo}>
              <span className={styles.title}>API id</span>
              <div>
                <span
                  href="https://coinmarketcap.com/currencies/bnb/"
                  className={`${styles.badge} ${styles.coinLink} ${styles.socialBadge}`}
                  onClick={copyHandler}
                >
                  {coinData.id}
                  {isCopy ? (
                    <MdOutlineDone className={styles.copyIcon} />
                  ) : (
                    <MdContentCopy className={styles.copyIcon} />
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className={styles.bottomContainer}>
        <div className={styles.chartContainer}>
          <h6 className={styles.titleChart}>{coinData?.name} to USD Chart</h6>
          {isError ? (
            <Skeleton
              variant="rounded"
              width={300}
              height={33}
              sx={{
                bgcolor: "grey.900",
                margin: "0 auto",
                marginBottom: "30px",
                maxWidth: "100%",
              }}
            />
          ) : (
            <div className={styles.buttonContainer}>
              <span
                onClick={selectedRangeHandler}
                data-range={1}
                className={range === 1 ? styles.selected : ""}
              >
                1D
              </span>
              <span
                onClick={selectedRangeHandler}
                data-range={7}
                className={range === 7 ? styles.selected : ""}
              >
                7D
              </span>
              <span
                onClick={selectedRangeHandler}
                data-range={14}
                className={range === 14 ? styles.selected : ""}
              >
                14D
              </span>
              <span
                onClick={selectedRangeHandler}
                data-range={30}
                className={range === 30 ? styles.selected : ""}
              >
                1M
              </span>
              <span
                onClick={selectedRangeHandler}
                data-range={90}
                className={range === 90 ? styles.selected : ""}
              >
                3M
              </span>
              <span
                onClick={selectedRangeHandler}
                data-range={180}
                className={range === 180 ? styles.selected : ""}
              >
                6M
              </span>
              <span
                onClick={selectedRangeHandler}
                data-range={360}
                className={range === 360 ? styles.selected : ""}
              >
                1Y
              </span>
              <span
                onClick={selectedRangeHandler}
                data-range="max"
                className={range === "max" ? styles.selected : ""}
              >
                MAX
              </span>
            </div>
          )}

          <div className={styles.chart}>
            {isLoading || isError ? (
              <div className={styles.loaderContainer}>
                {isLoading && (
                  <>
                    <div className={styles.loader}></div>
                    <h6>Loading Data</h6>
                  </>
                )}
                {isError && (
                  <h6 className={styles.errorMsg}>Something went wrong!</h6>
                )}
              </div>
            ) : null}
            <ChartCoin range={range} id={id} />
          </div>
        </div>

        <div className={styles.coinPrice}>
          <h6 className={styles.title}>
            {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
              <Skeleton
                variant="rounded"
                sx={{ bgcolor: "grey.810" }}
                width={140}
                height={23}
              />
            ) : (
              `${coinData.symbol.toUpperCase()} Price Statistics`
            )}
          </h6>
          <span className={styles.name}>
            {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
              <Skeleton
                variant="rounded"
                sx={{ bgcolor: "grey.810" }}
                width={90}
                height={14}
              />
            ) : (
              `${coinData.name} Price Today`
            )}
          </span>
          <div className={styles.listContainer}>
            <div className={styles.item}>
              <span className={styles.nameItem}>
                {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `${coinData.symbol.toUpperCase()} Price`
                )}
              </span>
              <span className={styles.priceitem}>
                {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `$${toLocaleS(coinData.market_data.current_price.usd)}`
                )}
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.nameItem}>
                {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `24h Low / 24h High`
                )}
              </span>
              <span className={styles.priceitem}>
                {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `$${toLocaleS(
                    coinData.market_data.low_24h.usd
                  )} / ${toLocaleS(coinData.market_data.high_24h.usd)}`
                )}
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.nameItem}>
                {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `7d Low / 7d High`
                )}
              </span>
              <span className={styles.priceitem}>
                {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `$${findMinMax(
                    coinData.market_data.sparkline_7d.price,
                    "min"
                  )} / ${findMinMax(
                    coinData.market_data.sparkline_7d.price,
                    "max"
                  )}`
                )}
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.nameItem}>
                {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `Trading Volume`
                )}
              </span>
              <span className={styles.priceitem}>
                {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `$${toLocaleS(coinData.market_data.total_volume.usd)}`
                )}
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.nameItem}>
                {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `Market Cap Rank`
                )}
              </span>
              <span className={styles.priceitem}>
                {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `#${coinData.market_cap_rank}`
                )}
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.nameItem}>
                {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `Market Cap`
                )}
              </span>
              <span className={styles.priceitem}>
                {isLoadingCoinData || coinDataError || coinData.length === 0 ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `$${toLocaleS(coinData.market_data.market_cap.usd)}`
                )}
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.nameItem}>
                {minMaxLaoding ||
                isLoadingCoinData ||
                coinDataError ||
                minMaxError ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `All-Time High`
                )}
              </span>
              <span className={styles.priceitem}>
                {minMaxLaoding ||
                isLoadingCoinData ||
                coinDataError ||
                minMaxError ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  <div>
                    <div className={styles.changePercentage}>
                      <span>
                        ${toLocaleS(findAllMinMax(dataMaxMin, "max")[1])}
                      </span>
                      <span
                        className={`${styles.change} ${
                          changePercentage(
                            coinData.market_data.current_price.usd,
                            findAllMinMax(dataMaxMin, "max")[1]
                          ).toFixed(1) > 0
                            ? styles.changeGreen
                            : styles.changeRed
                        }`}
                      >
                        {changePercentage(
                          coinData.market_data.current_price.usd,
                          findAllMinMax(dataMaxMin, "max")[1]
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <span className={styles.timeChange}>
                      {splitTime(getTime(findAllMinMax(dataMaxMin, "max")[0]))}
                    </span>
                  </div>
                )}
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.nameItem}>
                {minMaxLaoding ||
                isLoadingCoinData ||
                coinDataError ||
                minMaxError ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  `All-Time Low`
                )}
              </span>
              <span className={styles.priceitem}>
                {minMaxLaoding ||
                isLoadingCoinData ||
                coinDataError ||
                minMaxError ? (
                  <Skeleton
                    variant="rounded"
                    sx={{ bgcolor: "grey.810" }}
                    width={90}
                    height={15}
                  />
                ) : (
                  <div>
                    <div className={styles.changePercentage}>
                      <span>
                        ${toLocaleS(findAllMinMax(dataMaxMin, "min")[1])}
                      </span>
                      <span
                        className={`${styles.change} ${
                          changePercentage(
                            coinData.market_data.current_price.usd,
                            findAllMinMax(dataMaxMin, "min")[1]
                          ).toFixed(1) > 0
                            ? styles.changeGreen
                            : styles.changeRed
                        }`}
                      >
                        {changePercentage(
                          coinData.market_data.current_price.usd,
                          findAllMinMax(dataMaxMin, "min")[1]
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <span className={styles.timeChange}>
                      {splitTime(getTime(findAllMinMax(dataMaxMin, "min")[0]))}
                    </span>
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
      </section>
      {isLoadingCoinData || minMaxLaoding || coinDataError || minMaxError ? null : (
        <section className={styles.descriptionContainer}>
          <h6 className={styles.title}>
            {coinData.symbol.toUpperCase()} Price Today
          </h6>
          <p className={styles.text}>
            <strong>{coinData.name} price </strong> today is $
            {toLocaleS(coinData.market_data.current_price.usd)} with a 24-hour
            trading volume of $
            {toLocaleS(coinData.market_data.total_volume.usd)} .{" "}
            {coinData.symbol.toUpperCase()} price is down{" "}
            {coinData.market_data.price_change_percentage_24h}% in the last 24
            hours. It has a circulating supply of 19 Million BTC coins and a
            total supply of {toLocaleS(coinData.market_data.circulating_supply)}{" "}
            .
          </p>
          <div className={styles.item}>
            <h6 className={styles.title}>
              What was the highest price for {coinData.name}?
            </h6>
            <p className={styles.text}>
              {`${coinData.name} hit an all time high of $${toLocaleS(
                findAllMinMax(dataMaxMin, "max")[1]
              )} on ${getTime(findAllMinMax(dataMaxMin, "max")[0])}`}
            </p>
          </div>
          <div className={styles.item}>
            <h6 className={styles.title}>
              What was the lowest price for {coinData.name}?
            </h6>
            <p className={styles.text}>
              {`${coinData.name} hit an all time low of $${toLocaleS(
                findAllMinMax(dataMaxMin, "min")[1]
              )} on ${getTime(findAllMinMax(dataMaxMin, "min")[0])}`}
            </p>
          </div>
          <div className={styles.item}>
            <h6 className={styles.title}>
              What was the 24 hour trading volume of {coinData.name}?
            </h6>
            <p className={styles.text}>
              The 24 hour trading volume of Bitcoin is $
              {toLocaleS(coinData.market_data.current_price.usd)} .
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default CoinDetails;
