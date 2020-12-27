import axiosClient from "./axiosClient";
// api/productApi.js
class CommentApi {
  getall = () => {
    const url = `/api/comments/`;
    return axiosClient.get(url);
  };
  deletecomment = (params) => {
    const url = `/api/comments/${params}`;
    return axiosClient.delete(url);
  };
}
const commentApi = new CommentApi();
export default commentApi;
