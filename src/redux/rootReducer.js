import { combineReducers } from "redux";
import coinChartReducer from "./coinChart/coinChartReducer";
import searchReducer from "./search/searchReducer";
import detailsReducer from "./coinDetails/detailsReducer";
import coinMarketReducer from "./coinsMarket/coinMarketReducer";

const rootReducer = combineReducers({
  coinChartState: coinChartReducer,
  searchState: searchReducer,
  coinDetailsState: detailsReducer,
  coinMarketState: coinMarketReducer,
});

export default rootReducer;
