import React from "react";
import { Result, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function signupsucess() {
  return (
    <div>
      <Result
        icon={<CheckCircleOutlined />}
        title="Tuyệt vời, tài khoản của bạn đã được tạo thành công!"
        extra={
          <Link to="/">
            <Button style={{ border: "0px" }} type="primary">
              Quay lại trang chủ
            </Button>
          </Link>
        }
      />
      ,
    </div>
  );
}

export default signupsucess;
