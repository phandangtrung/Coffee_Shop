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
  deletebranch = (branch_id) => {
    const url = `/api/branches/${branch_id}`;
    return axiosClient.delete(url);
  };
  updateproductib = (params) => {
    const url = `/api/branches/${params._id}`;
    return axiosClient.put(url, params.data);
  };
  createbranch = (params) => {
    const url = `/api/branches/`;
    return axiosClient.post(url, params);
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
