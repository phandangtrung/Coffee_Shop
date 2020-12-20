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
}
const couponApi = new CouponApi();
export default couponApi;
