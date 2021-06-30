import React, { useState, useEffect, useReducer } from "react";
import dataFetchReducer from "./reducer/index";
import userApi from "../../../api/userApi";
import Cookies from "js-cookie";
import axios from "axios";
import {
  doGetList,
  doGetList_error,
  doGetList_success,
} from "./action/actionCreater.js";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg,
} from "@coreui/react";
import { Input, Form, Checkbox, Button, notification, Radio } from "antd";
import {
  UserOutlined,
  LockOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import { keyp } from "../../../config";
import { fakeAuth } from "../../../fakeAuth";
import CIcon from "@coreui/icons-react";
const setUserSession = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};
const Login = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Directstate, setDirectstate] = useState({ redirectToReferrer: false });
  const [rolelogin, setrolelogin] = useState("admin");
  // const [state, setstate] = useState({ email: " ", password: "" });
  const onLogin = (values) => {
    // console.log(values);
    // setstate({ email: values.email, password: values.password });
    // props.history.push("/dashboard");
    const fetchCreateProduct = async () => {
      setIsLoading(true);
      try {
        let response;
        if (rolelogin === "admin") {
          response = await userApi.adminLogin(values);
          Cookies.set("isAdmin", true);
        } else {
          response = await userApi.employeeLogin(values);
          Cookies.set("isAdmin", false);
        }

        console.log("Login succesfully: ", response);
        fakeAuth.authenticate(() => {
          setDirectstate(() => ({
            redirectToReferrer: true,
          }));
        });
        let pwc = `${keyp}${values.password}`;
        Cookies.set("yassuozed", pwc);
        Cookies.set("tokenUser", response.token);
        Cookies.set("BranchId", response.branchId);
        Cookies.set("UserId", response.userId);
        setTimeout(() => {
          Cookies.remove("tokenUser");
        }, 600000);
        // console.log("token: ", response.token);
      } catch (error) {
        Cookies.remove("isAdmin");
        setIsLoading(false);
        console.log("failed to fetch login: ", error);
        notification.open({
          message: "Login Fail",
          description: "Your email or password is incorrect",
          icon: <InfoCircleFilled style={{ color: "red" }} />,
        });
      }
    };
    fetchCreateProduct();
    setError(null);
    setLoading(true);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [productList, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });
  const { from } = props.location.state || { from: { pathname: "/" } };
  const { redirectToReferrer } = Directstate;
  if (redirectToReferrer === true) {
    return <Redirect to={from} />;
  }
  function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
    setrolelogin(e.target.value);
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form form={form} onFinish={onLogin}>
                    <h1>CMS LOGIN</h1>
                    {/* <p className="text-muted">Sign In to admin account</p> */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Radio.Group
                        defaultValue="admin"
                        buttonStyle="solid"
                        style={{ marginBottom: 16 }}
                        onChange={onChange}
                      >
                        <Radio.Button value="admin">Admin</Radio.Button>
                        <Radio.Button value="employ">Employee</Radio.Button>
                      </Radio.Group>
                    </div>

                    <Form.Item
                      name="email"
                      className="mb-3"
                      rules={[{ required: true }]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      className="mb-3"
                      rules={[{ required: true }]}
                    >
                      <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </Form.Item>

                    <CRow>
                      <CCol xs="12">
                        <Button
                          loading={isLoading}
                          color="primary"
                          style={{
                            width: "100%",
                            backgroundColor: "blue",
                            color: "white",
                          }}
                          htmlType="submit"
                        >
                          Login
                        </Button>
                      </CCol>
                      {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </Form>
                </CCardBody>
              </CCard>
              <CCard className="text-white d-md-down-none">
                <CImg
                  src={"img/login_bg.jpg"}
                  style={{ width: "100%", height: "auto" }}
                  // fluid
                  // className="mb-2"
                />
                {/* <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>

                </CCardBody> */}
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
