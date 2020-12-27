import axiosClient from "./axiosClient";
// api/productApi.js
class CategoryApi {
  getAll = () => {
    const url = "/api/categories";
    return axiosClient.get(url);
  };
  getProbyid = (cateid) => {
    const url = `/api/categories/Products/${cateid}`;
    return axiosClient.get(url);
  };
}
const categoryApi = new CategoryApi();
export default categoryApi;
