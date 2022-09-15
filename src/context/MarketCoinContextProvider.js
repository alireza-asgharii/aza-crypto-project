import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import queryString from "query-string";

//Api
import { fetchData } from "../services/api";

export const MarketCoinContext = React.createContext();

const MarketCoinContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(1);

  const location = useLocation();
  const query = queryString.parse(location.search);

  useEffect(() => {
    setNumber(query.page);
  }, [query.page]);

  useEffect(() => {
    const get = async () => {
      const data = await fetchData(number);
      setData(data);
      console.log('render market')
    };
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  return (
    <MarketCoinContext.Provider value={{ data, setData, setNumber }}>
      {children}
    </MarketCoinContext.Provider>
  );
};

export default MarketCoinContextProvider;
