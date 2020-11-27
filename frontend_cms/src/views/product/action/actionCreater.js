import * as actionTypes from "../action/actionType";

const doGetList = () => ({
  type: actionTypes.getlist,
});
const doGetList_success = (payload) => ({
  type: actionTypes.getlist_success,
  payload,
});
const doGetList_error = () => ({
  type: actionTypes.getlist_error,
});
export { doGetList, doGetList_success, doGetList_error };
