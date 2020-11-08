import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./style.css";
// import { SignupPage } from "../SignupPage";
import { Images } from "../../../config/image";
import { Form, Input, Button, Space, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
    notification.open({
      message: "Đăng nhập thất bại",
      description: "Sai mật khẩu hoặc tên đăng nhập",
      icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
    });
  };
  return (
    <div
      className="login"
      // style={{ backgroundImage: `url(${Images.BGLOGIN})` }}
    >
      <div className="login-form">
        <div
          className="login-temp"
          style={{ backgroundImage: `url(${Images.LGTEMP})` }}
        ></div>
        <div className="login-inputform">
          <div className="login-title-input">
            <div className="login-title">Log In</div>
            <Form className="login-input-item" onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input className="input-bar input-password" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  className="input-bar"
                  autoComplete="off"
                  type="password"
                />
              </Form.Item>
              <Form.Item>
                <Space className="login-signup">
                  <div className="text">Sign up</div>
                </Space>
              </Form.Item>
              <Form.Item style={{ width: "100%" }}>
                <div className="login-button">
                  <Button className="button" htmlType="submit">
                    SIGN IN
                  </Button>
                </div>
              </Form.Item>
            </Form>
            {/* <div>
              <div className="login-signup">
                <Link to={"/signup"}>
                <div className="text">Sign up</div>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
