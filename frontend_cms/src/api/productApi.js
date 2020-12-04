import axiosClient from "./axiosClient";
// api/productApi.js
const config = { headers: { "Content-Type": "multipart/form-data" } };
class ProductApi {
  getAll = () => {
    const url = "/api/products";
    return axiosClient.get(url);
  };
  createproduct = (product) => {
    const url = "/api/products";
    return axiosClient.post(url, product, config);
  };
}
const productApi = new ProductApi();
export default productApi;
