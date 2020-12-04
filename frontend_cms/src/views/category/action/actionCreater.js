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
const doCreate = (payload) => ({
  type: actionTypes.create,
  payload,
});
const doCreate_success = (payload) => ({
  type: actionTypes.create_success,
  payload,
});
const doCreate_error = () => ({
  type: actionTypes.create_error,
});
export {
  doGetList,
  doGetList_success,
  doGetList_error,
  doCreate,
  doCreate_success,
  doCreate_error,
};
