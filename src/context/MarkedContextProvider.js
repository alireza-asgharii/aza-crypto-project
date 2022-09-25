import React, { useReducer } from "react";

const initialState = {
  markeds: [],
};

const reducer = (state, action) => {
  console.log(state)
  switch (action.type) {
    case "ADD_TO_MARKEDS":
      if (!state.markeds.find((item) => item === action.payload)) {
        state.markeds.push(action.payload);
      }
      return {markeds: state.markeds};
    case "DELETE_FROM_MARKEDS":
      const filtered = state.markeds.filter((item) => item !== action.payload);
      return { markeds: filtered };
    default:
      return state;
  }
};

export const MarkedContext = React.createContext();

const MarkedContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MarkedContext.Provider value={{ state, dispatch }}>
      {children}
    </MarkedContext.Provider>
  );
};

export default MarkedContextProvider;
