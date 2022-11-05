const initialState = {
  isLoading: false,
  coinChart: [],
  error: { isErr: false, payload: {} }
};

const coinChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COIN_REQUEST":
      return { ...state, isLoading: true, error: '' };
    case "FETCH_COIN_SUCCESS":
      return { error: { isErr: false, payload: action.payload }, isLoading: false, coinChart: action.payload };
    case "FETCH_COIN_ERROR":
      return { ...state, isLoading: false, error: { isErr: true, payload: action.payload } };
    default:
      return state;
  }
};

export default coinChartReducer;
