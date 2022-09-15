import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";


//ContextProvider
import MarketCoinContextProvider from "./context/MarketCoinContextProvider";

function App() {
  return (
    <MarketCoinContextProvider>
      <Navbar />
      <Main />
    </MarketCoinContextProvider>
  );
}

export default App;
