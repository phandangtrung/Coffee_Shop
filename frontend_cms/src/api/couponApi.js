import axiosClient from "./axiosClient";
// api/productApi.js
class CouponApi {
  getAll = () => {
    const url = "/api/couponCode";
    return axiosClient.get(url);
  };
  create = (params) => {
    const url = "/api/couponCode";
    return axiosClient.post(url, params);
  };
  delete = (cpid) => {
    const url = `/api/couponCode/${cpid}`;
    return axiosClient.delete(url);
  };
}
const couponApi = new CouponApi();
export default couponApi;
