const initialState = {
  isLoading: false,
  coinData: [],
  error: { isErr: false, payload: {} },
};

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DETAILS_REQUEST":
      return { ...state, isLoading: true, error: { isErr: false, payload: action.payload } };
    case "FETCH_DETAILS_SUCCESS":
      return { error: { isErr: false, payload: action.payload }, isLoading: false, coinData: action.payload };
    case "FETCH_DETAILS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: { isErr: true, payload: action.payload },
      };
    default:
      return state;
  }
};

export default detailsReducer;
