const initialState = {
  isLoading: false,
  data: [],
  error: { isErr: false, errMsg: {} },
};

const coinMarketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "COIN_MARKET_REQUEST":
      return { ...state, isLoading: true };
    case "COIN_MARKET_SUCCESS":
      return {
        isLoading: false,
        data: action.payload,
        error: { isErr: false, errMsg: {} },
      };
    case "COIN_MARKET_ERROR":
      return {
        ...state,
        isLoading: false,
        errMsg: { isErr: true, errMsg: action.payload },
      };
    default:
      return state;
  }
};

export default coinMarketReducer;
