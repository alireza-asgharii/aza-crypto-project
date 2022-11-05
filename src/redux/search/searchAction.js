import axios from "axios";

const fecthSearchRequest = () => {
  return { type: "FETCH_SEARCH_REQUEST" };
};

const fetchSearchSuccess = (data) => {
  return { type: "FETCH_SEARCH_SUCCESS", payload: data };
};

const fetchSearchError = (error) => {
  return { type: "FETCH_SEARCH_ERROR", payload: error };
};

const searchCoin = (query) => {
  return (dispatch) => {
    dispatch(fecthSearchRequest());

    //for performance
    if (query === "") {
      axios
        .get(`/api/v3/search?query=btc`)
        .then((res) => dispatch(fetchSearchSuccess(res)))
        .catch((err) => dispatch(fetchSearchError(err)));
    } else {
      //main fetch
      axios
        .get(`/api/v3/search?query=${query}`)
        .then((res) => dispatch(fetchSearchSuccess(res)))
        .catch((err) => dispatch(fetchSearchError(err)));
    }
  };
};

export { searchCoin };
