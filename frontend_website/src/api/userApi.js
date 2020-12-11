import axiosClient from "./axiosClient";
// api/productApi.js
class UserApi {
  createuser = (params) => {
    const url = `/api/users/signup`;
    return axiosClient.post(url, params);
  };
  signinUser = (params) => {
    const url = "/api/users/login/";
    return axiosClient.post(url, params);
  };
}
const userApi = new UserApi();
export default userApi;
