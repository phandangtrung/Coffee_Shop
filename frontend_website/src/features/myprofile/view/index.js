import React, { useEffect, useState } from "react";
import "./style.css";
import Cookies from "js-cookie";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Radio,
  DatePicker,
  Button,
  Avatar,
  Spin,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import userApi from "../../../api/userApi";
function MyProfile() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const tokenCus = Cookies.get("tokenCustomer");
  const [userinfo, setuserinfo] = useState({});
  useEffect(() => {
    const fetchCategoryList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      try {
        setIsLoading(true);
        const response = await userApi.getMyprofile(tokenCus);
        console.log("Fetch products succesfully: ", response);
        setuserinfo(response.users);
        console.log(">>userinfo", userinfo);
        form.setFieldsValue({
          fname: response.users.fName,
          phone: response.users.phone,
        });
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchCategoryList();
  }, []);
  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="container">
      <Spin spinning={isLoading}>
        <div className="myprofile-form">
          <Card
            title="MY PROFILE"
            style={{ width: "100%", textAlign: "start" }}
          >
            <Row>
              <Col span={16}>
                <Form
                  form={form}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 14 }}
                >
                  <Form.Item name="email" label="Email">
                    <span>{userinfo.email}</span>
                  </Form.Item>
                  <Form.Item
                    // initialValue={userinfo.fName}
                    key="fname"
                    name="fname"
                    label="Full name"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="phone" label="Phone">
                    <Input />
                  </Form.Item>
                  <Form.Item name="gender" initialValue="male" label="Gender">
                    <Radio.Group onChange={onChange} value={value}>
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                      <Radio value="other">Other</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label="Date of birth">
                    <DatePicker style={{ width: "100%" }} onChange={onChange} />
                  </Form.Item>
                  <Button
                    style={{ float: "right", border: "0px" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Update Profile
                  </Button>
                </Form>
              </Col>
              <Col span={8}>
                <div className="user-form" style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    <Avatar
                      size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                      }}
                      icon={<UserOutlined />}
                    />
                  </div>

                  <p>ID: {userinfo._id}</p>
                  <p style={{ fontStyle: "italic" }}>
                    Coffee is a lot more than just a drink; it’s something
                    happening. Not as in hip, but like an event, a place to be,
                    but not like a location, but like somewhere within yourself.
                  </p>
                </div>
              </Col>
            </Row>
          </Card>
        </div>{" "}
      </Spin>
    </div>
  );
}

export default MyProfile;
