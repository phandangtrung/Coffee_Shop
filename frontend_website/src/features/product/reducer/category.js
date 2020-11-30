import * as actionTypes from "../action/actionType";
const dataFetchCategory = (state, action) => {
  switch (action.type) {
    case actionTypes.getlistcategory:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.getlistcategory_success:
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
    default:
      return state;
  }
};
export default dataFetchCategory;
