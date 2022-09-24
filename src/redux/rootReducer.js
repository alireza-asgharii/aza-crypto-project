import { combineReducers } from "redux";
import coinChartReducer from "./coinChart/coinChartReducer";

const rootReducer = combineReducers({
  coinChartState: coinChartReducer,
});

export default rootReducer;
