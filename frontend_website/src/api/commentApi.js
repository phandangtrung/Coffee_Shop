import axiosClient from "./axiosClient";
// api/productApi.js
class CommentApi {
  createcomment = (params) => {
    const url = `/api/comments`;
    return axiosClient.post(url, params);
  };
  getcommentbyProId = (params) => {
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
const commentApi = new CommentApi();
export default commentApi;
