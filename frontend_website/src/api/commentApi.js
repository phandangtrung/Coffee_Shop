import axiosClient from "./axiosClient";
// api/productApi.js
class UserApi {
  createcomment = (params) => {
    const url = `/api/comments`;
    return axiosClient.post(url, params);
  };
  getcommentbyId = (params) => {
    const url = `/api/comments/${params}`;
    return axiosClient.get(url);
  };
  updateMyprofile = (params) => {
    const url = "/api/comments";
    return axiosClient.put(url, params.data, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });
  };
}
const userApi = new UserApi();
export default userApi;
