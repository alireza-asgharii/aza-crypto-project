import axios from "axios";

const fecthCoinRequest = () => {
  return { type: "FETCH_COIN_REQUEST" };
};

const fetchCoinSuccess = (data) => {
  return { type: "FETCH_COIN_SUCCESS", payload: data };
};

const fetchCoinError = (error) => {
  return { type: "FETCH_COIN_ERROR", payload: error };
};

const fetchCoin = (id, day, interval = '') => {
  return (dispatch) => {
    dispatch(fecthCoinRequest());
    axios
      .get(
        `/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${day}&interval=${interval}`
      )
      .then((res) => dispatch(fetchCoinSuccess(res)))
      .catch((err) => dispatch(fetchCoinError(err)));
  };
};

export { fetchCoin };
