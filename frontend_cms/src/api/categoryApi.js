import axiosClient from "./axiosClient";
// api/productApi.js
class CategoryApi {
  getAll = () => {
    const url = "/api/categories";
    return axiosClient.get(url);
  };
  createcategory = (product) => {
    const url = "/api/products";
    return axiosClient.post(url, product);
  };
}
const categoryApi = new CategoryApi();
export default categoryApi;
