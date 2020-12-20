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
  lockUser = (params) => {
    const url = `/api/users/lock/${params._id}`;
    return axiosClient.put(url);
  };
}
const userApi = new UserApi();
export default userApi;
