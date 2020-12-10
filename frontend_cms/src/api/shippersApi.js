import axiosClient from "./axiosClient";
// api/productApi.js
const config = { headers: { "Content-Type": "multipart/form-data" } };
class ShippersApi {
  getAll = () => {
    const url = "/api/shippers";
    return axiosClient.get(url);
  };
}
const shippersApi = new ShippersApi();
export default shippersApi;
