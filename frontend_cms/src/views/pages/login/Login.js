import React, { useState, useEffect, useReducer } from "react";
import dataFetchReducer from "./reducer/index";
import userApi from "../../../api/userApi";
import axios from "axios";
import {
  doGetList,
  doGetList_error,
  doGetList_success,
} from "./action/actionCreater.js";
import { Link } from "react-router-dom";
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
import { Input, Form, Checkbox, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import CIcon from "@coreui/icons-react";
const setUserSession = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};
const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, setstate] = useState({ email: " ", password: "" });
  const onLogin = (values) => {
    console.log(values);
    setstate({ email: values.email, password: values.password });
    // props.history.push("/dashboard");
    setError(null);
    setLoading(true);
    axios
      .post("http://localhost:3000/api/users/login/admin", {
        email: state.email,
        password: state.password,
      })
      .then((response) => {
        console.log(">>>>reponse: ", response);
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [productList, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });

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
                  <Form onFinish={onLogin}>
                    <h1>ADMIN LOGIN</h1>
                    <p className="text-muted">Sign In to admin account</p>
                    <Form.Item name="email" className="mb-3">
                      <Input
                        prefix={<UserOutlined />}
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </Form.Item>
                    <Form.Item name="password" className="mb-3">
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
