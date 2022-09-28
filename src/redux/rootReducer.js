import { combineReducers } from "redux";
import coinChartReducer from "./coinChart/coinChartReducer";
import searchReducer from "./search/searchReducer";

const rootReducer = combineReducers({
  coinChartState: coinChartReducer,
  searchState: searchReducer,
});

export default rootReducer;
