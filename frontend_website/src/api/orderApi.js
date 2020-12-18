import axiosClient from "./axiosClient";
// api/productApi.js
class OrderApi {
  createorder = (params) => {
    const url = "/api/orders";
    return axiosClient.post(url, params);
  };
}
const orderApi = new OrderApi();
export default orderApi;
