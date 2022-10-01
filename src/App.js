import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoadingBar from "react-top-loading-bar";

//Components
import Main from "./components/Main";
import Navbar from "./components/Navbar";

//ContextProvider
import MarketCoinContextProvider from "./context/MarketCoinContextProvider";
import MarkedContextProvider from "./context/MarkedContextProvider";
import React, { useRef } from "react";
import Footer from "./components/Footer";

export const LoadingBarRef = React.createContext();

function App() {
  const ref = useRef(null);

  return (
    <div>
      <LoadingBarRef.Provider value={ref}>
        <LoadingBar color="#2998ff" ref={ref} />
        <MarketCoinContextProvider>
          <Provider store={store}>
            <MarkedContextProvider>
              <Navbar />
              <Main />
              <Footer />
            </MarkedContextProvider>
          </Provider>
        </MarketCoinContextProvider>
      </LoadingBarRef.Provider>
    </div>
  );
}

export default App;
