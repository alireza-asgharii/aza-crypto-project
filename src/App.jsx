import React, { createContext, useEffect, useRef, useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoadingBar from "react-top-loading-bar";
import Layout from "./layout/Layout";

//raect query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//Routers component
import Routers from "./routes/Routes";

//ContextProvider
import MarkedContextProvider from "./context/MarkedContextProvider";
import Spiner from "./components/modules/Spiner";

export const LoadingBarRef = React.createContext();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: 1,
    },
  },
});


function App() {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.complete();
  }, []);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <LoadingBarRef.Provider value={ref}>
          <LoadingBar color="#2998ff" ref={ref} />
          <Provider store={store}>
            <MarkedContextProvider>
              <Layout>
                <Routers />
              </Layout>
              <Spiner />
            </MarkedContextProvider>
          </Provider>
        </LoadingBarRef.Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
