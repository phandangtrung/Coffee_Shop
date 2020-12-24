import axiosClient from "./axiosClient";
// api/productApi.js
class OrderApi {
  getAll = () => {
    const url = "/api/orders";
    return axiosClient.get(url);
  };
  confirmorder = (params) => {
    const url = `/api/orders/${params.orderid}`;
    return axiosClient.put(url, params.data);
  };
}
const orderApi = new OrderApi();
export default orderApi;
