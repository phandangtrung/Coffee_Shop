import axiosClient from "./axiosClient";
// api/productApi.js
class UserApi {
  adminLogin = (params) => {
    const url = "/api/users/login/admin";
    return axiosClient.post(url, params);
  };
  employeeLogin = (params) => {
    const url = "/api/users/login/employee/loginEmployee";
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
    const url = `/api/users/lock/${params.id}`;
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });
  };
  unlockUser = (params) => {
    const url = `/api/users/unlock/userUnlocked/${params.id}`;
    return axiosClient.put(url, params, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });
  };
  changePass = (params) => {
    const url = `/api/users/changePassword`;
    return axiosClient.put(url, params.data, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });
  };
}
const userApi = new UserApi();
export default userApi;
