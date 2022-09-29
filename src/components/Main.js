import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

//Components
import Home from "./Home";
import CoinDetails from "./shared/CoinDetails";
import AboutUs from "./AboutUs";

const Div = styled.div`
  color: #fff;
  padding: 0 15px;

  @media screen and (min-width: 1700px) {
    max-width: 1700px;
    margin: 0 auto;
    background: linear-gradient(to bottom, #17171a, #17171a);
  }
`;

const Main = () => {
  return (
    <Div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/currencies" element={<Home />} />
        <Route path="/currencies/:id" element={<CoinDetails />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Div>
  );
};

export default Main;
