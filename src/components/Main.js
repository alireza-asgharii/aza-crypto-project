import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import Home from './Home';
import CoinDetalis from './shared/CoinDetalis'

const Div = styled.div`
  background-color: #171924;
  color: #fff;
`

const Main = () => {
  return (
    <Div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/currencies/:bitcoin' element={<CoinDetalis />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Div>
  );
};

export default Main;