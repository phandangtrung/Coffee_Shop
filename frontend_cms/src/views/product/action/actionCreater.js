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

const doDelete = (payload) => ({
  type: actionTypes.deleteproduct,
  payload,
});
const doDelete_success = (payload) => ({
  type: actionTypes.deleteproduct_success,
  payload,
});
const doDelete_error = () => ({
  type: actionTypes.deleteproduct_error,
});
export {
  doGetList,
  doGetList_success,
  doGetList_error,
  doCreate,
  doCreate_success,
  doCreate_error,
  doDelete,
  doDelete_success,
  doDelete_error,
};
