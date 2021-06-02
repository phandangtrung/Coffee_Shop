import axiosClient from "./axiosClient";
const config = { headers: { "Content-Type": "multipart/form-data" } };
class BranchApi {
  getAll = () => {
    const url = "/api/branches/";
    return axiosClient.get(url);
  };
  getbyId = (product_id) => {
    const url = `/api/branches/${product_id}`;
    return axiosClient.get(url);
  };
  updateproduct = (params) => {
    const url = `/api/branches/${params._id}`;
    return axiosClient.put(url, params.data);
  };
  deleteproduct = (product_id) => {
    const url = `/api/products/${product_id}`;
    return axiosClient.delete(url);
  };
  updateproduct = (product) => {
    const url = `/api/products/${product._id}`;
    return axiosClient.put(url, product.formdata, config);
  };
}
const branchApi = new BranchApi();
export default branchApi;
