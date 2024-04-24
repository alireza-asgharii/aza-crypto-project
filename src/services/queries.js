import axios from "axios"

export const fetchCoinsMarket  = (page=1) => {
  return axios.get(`${import.meta.env.VITE_BASE_USRL_MAIN}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24%2C7d&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`)
}