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
  updateShipper = (params) => {
    const url = `/api/shippers/${params.shid}`;
    return axiosClient.put(url, params.data, config);
  };
  deleteShipper = (params) => {
    const url = `/api/shippers/${params}`;
    return axiosClient.delete(url);
  };
}
const shippersApi = new ShippersApi();
export default shippersApi;
