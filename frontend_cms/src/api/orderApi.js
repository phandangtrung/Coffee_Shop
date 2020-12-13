import axiosClient from "./axiosClient";
// api/productApi.js
class OrderApi {
  getAll = () => {
    const url = "/api/orders";
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
const orderApi = new OrderApi();
export default orderApi;
