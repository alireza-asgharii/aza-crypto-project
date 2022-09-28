const initialState = {
  isLoading: false,
  data: [],
  error: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SEARCH_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_SEARCH_SUCCESS":
      return { error: "", isLoading: false, data: action.payload };
    case "FETCH_SEARCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default searchReducer;
