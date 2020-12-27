import React from "react";
import { Result, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function signupsucess() {
  return (
    <div>
      <Result
        icon={<CheckCircleOutlined />}
        title="Great, your account have been created!"
        extra={
          <Link to="/">
            <Button style={{ border: "0px" }} type="primary">
              Back to Homepage
            </Button>
          </Link>
        }
      />
      ,
    </div>
  );
}

export default signupsucess;
