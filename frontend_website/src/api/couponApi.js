import axiosClient from "./axiosClient";
// api/productApi.js
class CouponApi {
  getAll = () => {
    const url = "/api/couponCode/discount/user";
    return axiosClient.get(url);
  };
  getbyCode = (value) => {
    console.log(">>params", value);
    const url = "/api/couponCode/code";
    return axiosClient.get(url, {
      params: value,
    });
  };
}
const couponApi = new CouponApi();
export default couponApi;
