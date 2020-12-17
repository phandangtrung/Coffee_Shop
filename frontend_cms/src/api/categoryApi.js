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
  updatecategory = (category) => {
    const url = `/api/categories/${category._id}`;
    return axiosClient.put(url, category.data);
  };
  deletecategory = (categoryid) => {
    const url = `/api/categories/${categoryid}`;
    return axiosClient.delete(url);
  };
}
const categoryApi = new CategoryApi();
export default categoryApi;
