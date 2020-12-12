import axiosClient from "./axiosClient";
// api/productApi.js
const config = { headers: { "Content-Type": "multipart/form-data" } };
class ShippersApi {
  getAll = () => {
    const url = "/api/shippers";
    return axiosClient.get(url);
  };
  createShipper = (params) => {
    const url = "/api/shippers";
    return axiosClient.post(url, params, config);
  };
}
const shippersApi = new ShippersApi();
export default shippersApi;
