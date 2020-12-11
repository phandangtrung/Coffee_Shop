import axiosClient from "./axiosClient";
// api/productApi.js
class UserApi {
  postUser = (params) => {
    const url = "/api/users/login/admin";
    return axiosClient.post(url, params);
  };
  getallUser = (token) => {
    const url = "/api/users";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
const userApi = new UserApi();
export default userApi;
