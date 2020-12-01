import axiosClient from "./axiosClient";
// api/productApi.js
class UserApi {
  postUser = () => {
    const url = "/api/users/login/admin";
    return axiosClient.post(url);
  };
}
const userApi = new UserApi();
export default userApi;
