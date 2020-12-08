import axiosClient from "./axiosClient";
// api/productApi.js
class UserApi {
  createuser = (params) => {
    const url = `/api/users/signup${params}`;
    return axiosClient.get(url);
  };
}
const userApi = new UserApi();
export default userApi;
