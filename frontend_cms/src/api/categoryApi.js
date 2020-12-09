import axiosClient from "./axiosClient";
// api/productApi.js
class CategoryApi {
  getAll = () => {
    const url = "/api/categories";
    return axiosClient.get(url);
  };
  getbyID = (categoryid) => {
    const url = `/api/categories/${categoryid}`;
    return axiosClient.get(url);
  };
  createcategory = (category) => {
    const url = "/api/categories";
    return axiosClient.post(url, category);
  };
}
const categoryApi = new CategoryApi();
export default categoryApi;
