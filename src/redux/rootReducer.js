import { combineReducers } from "redux";
import coinChartReducer from "./coinChart/coinChartReducer";
import searchReducer from "./search/searchReducer";
import detailsReducer from "./coinDetails/detailsReducer";

const rootReducer = combineReducers({
  coinChartState: coinChartReducer,
  searchState: searchReducer,
  coinDetailsState: detailsReducer,
});

export default rootReducer;
