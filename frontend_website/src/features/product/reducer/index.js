import * as actionTypes from "../action/actionType";
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.getlist:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.getlist_success:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case actionTypes:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
export default dataFetchReducer;
