const initialState = {
  isLoading: false,
  coinChart: [],
  error: "",
};

const coinChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COIN_REQUEST":
      return { ...state, isLoading: true, error: '' };
    case "FETCH_COIN_SUCCESS":
      return { error: '', isLoading: false, coinChart: action.payload };
    case "FETCH_COIN_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default coinChartReducer;
