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
  deleteproduct = (product_id) => {
    const url = `/api/products/${product_id}`;
    return axiosClient.delete(url);
  };
}
const productApi = new ProductApi();
export default productApi;
