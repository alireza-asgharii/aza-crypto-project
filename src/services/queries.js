import axios from "axios";

export const fetchCoinsMarket = (page = 1) => {
  return axios.get(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24%2C7d&x_cg_demo_api_key=${
      import.meta.env.VITE_API_KEY
    }`
  );
};

export const fetchTrandData = () => {
  return axios.get(
    `/search/trending?x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`
  );
};

export const fetchSearch = (value) => {
  return axios.get(
    `/search?query=${value}&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`
  );
};

export const fetchGlobalData = () => {
  return axios.get(`/global?x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`);
};
