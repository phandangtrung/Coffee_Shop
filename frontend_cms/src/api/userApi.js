import axiosClient from "./axiosClient";
// api/productApi.js
class UserApi {
  postUser = (params) => {
    const url = "/api/users/login/admin";
    return axiosClient.post(url, params);
  };
}
const userApi = new UserApi();
export default userApi;
