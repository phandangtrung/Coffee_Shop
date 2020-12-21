import axiosClient from "./axiosClient";
// api/productApi.js
class CouponApi {
  getAll = () => {
    const url = "/api/couponCode";
    return axiosClient.get(url);
  };
}
const couponApi = new CouponApi();
export default couponApi;
