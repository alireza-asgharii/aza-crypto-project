import axios from "axios";

const fetchData = async (page) => {
  const request = await axios.get(
    `/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=true&price_change_percentage=1h%2C24%2C7d`
  );
  return request;
};




export { fetchData };
