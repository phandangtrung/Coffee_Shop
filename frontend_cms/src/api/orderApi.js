import axiosClient from "./axiosClient";
// api/productApi.js
class OrderApi {
  getAll = () => {
    const url = "/api/orders";
    return axiosClient.get(url);
  };
  conformorder = (params) => {
    const url = `/api/orders/${params.orderid}`;
    return axiosClient.get(url, params.data);
  };
}
const orderApi = new OrderApi();
export default orderApi;
