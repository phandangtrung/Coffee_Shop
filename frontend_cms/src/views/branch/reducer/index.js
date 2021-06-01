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
    case actionTypes.getlist_error:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.create:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.create_success:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case actionTypes.create_error:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.deleteproduct:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.deleteproduct_success:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case actionTypes.deleteproduct_error:
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
