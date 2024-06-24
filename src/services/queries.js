import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchCoinsMarket = (page = 1) => {
  return axios.get(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24%2C7d&x_cg_demo_api_key=${apiKey}`
  );
};

export const fetchTrandData = () => {
  return axios.get(`/search/trending?x_cg_demo_api_key=${apiKey}`);
};

export const fetchSearch = (value) => {
  return axios.get(`/search?query=${value}&x_cg_demo_api_key=${apiKey}`);
};

export const fetchGlobalData = () => {
  return axios.get(`/global?x_cg_demo_api_key=${apiKey}`);
};

export const fetchCoinDetails = (id) => {
  return axios.get(
    `coins/${id}?localization=true&sparkline=true&x_cg_demo_api_key=${apiKey}`
  );
};

export const fetchCoinChart = (id, range, interval = "") => {
  return axios.get(
    `/coins/${id}/market_chart?vs_currency=usd&days=${range}&interval=${
      range == 30 || range == 90 ? "daily" : interval
    }&x_cg_demo_api_key=${apiKey}`
  );
};
