import axiosClient from "./axiosClient";
// api/productApi.js
class EmployeeApi {
  createEmployee = (params) => {
    const url = "/api/users/addEmployee";
    console.log(">>params", params);
    return axiosClient.post(url, params.data, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });
  };
}
const employeeApi = new EmployeeApi();
export default employeeApi;
