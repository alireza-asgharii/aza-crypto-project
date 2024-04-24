import React, { useEffect, useRef } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoadingBar from "react-top-loading-bar";
import Layout from "./layout/Layout";


//Routers component
import Routers from "./routes/Routes";

//ContextProvider
import MarkedContextProvider from "./context/MarkedContextProvider";

export const LoadingBarRef = React.createContext();

function App() {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.complete();
  }, []);

  return (
    <div>
      <LoadingBarRef.Provider value={ref}>
        <LoadingBar color="#2998ff" ref={ref} />
        <Provider store={store}>
          <MarkedContextProvider>
            <Layout>
              <Routers />
            </Layout>
          </MarkedContextProvider>
        </Provider>
      </LoadingBarRef.Provider>
    </div>
  );
}

export default App;
