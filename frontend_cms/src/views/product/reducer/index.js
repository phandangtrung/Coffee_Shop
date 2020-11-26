import "../action/actionCreater";
import actionType from "../action/actionType";
import productApi from "../../../api/productApi";
function productAdmin(state, action) {
  const fetchProductList = async () => {
    try {
      // const params = { _page: 1, _limit: 10 };
      const response = await productApi.getAll();
      console.log("Fetch products succesfully: ", response);
      return response.products;
      // console.log(response.products);
      // setProductList(response.products);
    } catch (error) {
      console.log("failed to fetch product list: ", error);
    }
  };
  switch (action.type) {
    case actionType.GETALL_PRODUCT:
      return fetchProductList();

    case actionType.ADD_PRODUCT:
      return [action.data, ...state];
    case actionType.DELETE_PRODUCT: {
      return state.filter((state) => state.sid !== action.sid);
    }
    default:
      return state;
  }
}
export default productAdmin;
