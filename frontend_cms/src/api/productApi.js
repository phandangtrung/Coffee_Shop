import axiosClient from "./axiosClient";
// api/productApi.js
class ProductApi {
  getAll = () => {
    const url = "/api/products";
    return axiosClient.get(url);
  };
  createproduct = (product) => {
    const url = "/api/products";
    return axiosClient.post(url, product);
  };
}
const productApi = new ProductApi();
export default productApi;
