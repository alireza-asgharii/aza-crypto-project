import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";

//ContextProvider
import MarketCoinContextProvider from "./context/MarketCoinContextProvider";
import MarkedContextProvider from "./context/MarkedContextProvider";

function App() {
  return (
    <MarketCoinContextProvider>
      <Provider store={store}>
        <MarkedContextProvider>
          <Navbar />
          <Main />
        </MarkedContextProvider>
      </Provider>
    </MarketCoinContextProvider>
  );
}

export default App;
