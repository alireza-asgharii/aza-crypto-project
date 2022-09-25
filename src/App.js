import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoadingBar from "react-top-loading-bar";

//Components
import Loading from "./components/shared/Loading";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

//ContextProvider
import MarketCoinContextProvider from "./context/MarketCoinContextProvider";
import MarkedContextProvider from "./context/MarkedContextProvider";
import React, { useEffect, useRef } from "react";

export const LoadingBarRef = React.createContext();

function App() {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.complete();
  });

  return (
    <div>
      <LoadingBarRef.Provider value={ref}>
        <LoadingBar color="#2998ff" ref={ref} />
        <MarketCoinContextProvider>
          <Provider store={store}>
            <MarkedContextProvider>
              <Loading />
              <Navbar />
              <Main />
            </MarkedContextProvider>
          </Provider>
        </MarketCoinContextProvider>
      </LoadingBarRef.Provider>
    </div>
  );
}

export default App;
