import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

//Components
import Home from "../pages/Home";
import CoinDetails from "../pages/CoinDetails";
import AboutUs from "../pages/AboutUs";
import Watchlist from "../pages/Watchlist";


const Div = styled.div`
  color: #fff;
  padding: 0 15px;
  min-height: 100vh;

  @media screen and (min-width: 1700px) {
    max-width: 1700px;
    margin: 0 auto;
    background: linear-gradient(to bottom, #17171a, #17171a);
  }
`;

const Routers = () => {
  return (
    <Div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/currencies" element={<Home />} />
        <Route path="/currencies/:id" element={<CoinDetails />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Div>
  );
};

export default Routers;
