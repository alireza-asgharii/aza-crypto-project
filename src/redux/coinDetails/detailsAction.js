import axios from "axios";

const fetchDetailsRequest = () => {
  return { type: "FETCH_DETAILS_REQUEST" };
};

const fetchDetailsSuccess = (response) => {
  return { type: "FETCH_DETAILS_SUCCESS", payload: response };
};

const fetchDetailsError = (error) => {
  return { type: "FETCH_DETAILS_ERROR", payload: error };
};

const fetchDetails = (id) => {
  return (dispatch) => {
    dispatch(fetchDetailsRequest());
    axios
      .get(`/api/v3/coins/${id}?localization=true&sparkline=true`)
      .then((res) => {
        dispatch(fetchDetailsSuccess(res));
      })
      .catch((err) => dispatch(fetchDetailsError(err)));
  };
};

export { fetchDetails };
