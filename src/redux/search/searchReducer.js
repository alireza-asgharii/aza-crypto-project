const initialState = {
  isLoading: false,
  data: [],
  error: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SEARCH_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_SEARCH_SUCCESS":
      return { error: false, isLoading: false, data: action.payload };
    case "FETCH_SEARCH_ERROR":
      return { ...state, isLoading: false, error: true };
    default:
      return state;
  }
};

export default searchReducer;
