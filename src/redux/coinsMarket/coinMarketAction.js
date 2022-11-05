import axios from "axios";

const coinMarketRequset = () => {
  return { type: "COIN_MARKET_REQUEST" };
};

const coinMarketSuccess = (payload) => {
  return { type: "COIN_MARKET_SUCCESS", payload: payload };
};

const coinMarketError = (error) => {
  return { type: "COIN_MARKET_ERROR", payload: error };
};

const coinMarket = (page) => {
  return (dispatch) => {
    dispatch(coinMarketRequset());
    axios
      .get(
        `/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=true&price_change_percentage=1h%2C24%2C7d`
      )
      .then((res) => dispatch(coinMarketSuccess(res)))
      .catch((err) => dispatch(coinMarketError(err)));
  };
};

export { coinMarket };
