import axiosClient from "./axiosClient";
// api/productApi.js
class ProductApi {
  getAll = () => {
    const url = "/api/products";
    return axiosClient.get(url);
  };
  getbyId = (proid) => {
    const url = `/api/products/${proid}`;
    return axiosClient.get(url);
  };
}
const productApi = new ProductApi();
export default productApi;
