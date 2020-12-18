import axiosClient from "./axiosClient";
// api/productApi.js
class OrderApi {
  getall = () => {
    const url = "/api/orders";
    return axiosClient.get(url);
  };
  createorder = (params) => {
    const url = "/api/orders";
    return axiosClient.post(url, params);
  };
}
const orderApi = new OrderApi();
export default orderApi;
