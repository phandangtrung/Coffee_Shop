import actionType from "./actionType";

export const getallProduct = (data) => {
  return {
    type: actionType.GETALL_PRODUCT,
    data,
  };
};

export const addProduct = (data) => {
  return {
    type: actionType.ADD_PRODUCT,
    data,
  };
};

export const dellProduct = (sid) => {
  return {
    type: actionType.DELETE_PRODUCT,
    sid: sid,
  };
};
export const updateProduct = (sid) => {
  return {
    type: actionType.UPDATE_PRODUCT,
    sid: sid,
  };
};
