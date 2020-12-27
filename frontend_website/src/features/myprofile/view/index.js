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
  notification,
  Typography,
} from "antd";
import moment from "moment";
import Moment from "react-moment";
import { UserOutlined, SmileOutlined, EditOutlined } from "@ant-design/icons";
import userApi from "../../../api/userApi";
function MyProfile() {
  const { Text, Link } = Typography;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const tokenCus = Cookies.get("tokenCustomer");
  const [userinfo, setuserinfo] = useState({});
  const [datetime, setdatetime] = useState("");
  const [genderpick, setgenderpick] = useState("");
  const [opendate, setopendate] = useState(false);
  useEffect(() => {
    const fetchUserList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      try {
        setIsLoading(true);
        const response = await userApi.getMyprofile(tokenCus);
        console.log("Fetch products succesfully: ", response);
        setuserinfo(response.users);
        console.log(">>userinfo", userinfo);
        form.setFieldsValue({
          fName: response.users.fName,
          phone: response.users.phone,
        });
        // if (response.users.birthday === undefined) setdatetime("2015/01/01");
        // else setdatetime(response.users.birthday);
        if (response.users.gender === undefined) setgenderpick("male");
        else setgenderpick(response.users.gender);
        if (response.users.birthday !== undefined)
          setdatetime(response.users.birthday);
        else setdatetime("2015-01-01");

        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchUserList();
  }, []);
  const openDatepick = () => {
    setopendate(!opendate);
  };
  const handleUpdate = (values) => {
    const dataupdate = { ...values, birthday: datetime, gender: genderpick };
    const datafetch = {
      token: tokenCus,
      data: dataupdate,
    };
    const fetchCategoryList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      try {
        setIsLoading(true);
        const response = await userApi.updateMyprofile(datafetch);
        console.log("Fetch products succesfully: ", response);
        setopendate(!opendate);
        setIsLoading(false);
        notification.open({
          message: "Update Success",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
      } catch (error) {
        console.log("failed to fetch update user: ", error);
      }
    };
    fetchCategoryList();
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setgenderpick(e.target.value);
  };
  function onChangeDate(date, dateString) {
    console.log("date", dateString);
    setdatetime(dateString);
  }
  return (
    <div className="container">
      <Spin spinning={isLoading}>
        <div className="myprofile-form">
          <Card
            title="MY PROFILE"
            style={{ width: "100%", textAlign: "start" }}
          >
            <Row>
              <Col lg={16} sm={24}>
                <Form
                  form={form}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 14 }}
                  onFinish={handleUpdate}
                >
                  <Form.Item label="Email">
                    <span>{userinfo.email}</span>
                  </Form.Item>
                  <Form.Item
                    // initialValue={userinfo.fName}
                    key="fName"
                    name="fName"
                    label="Full name"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="phone" label="Phone">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Gender">
                    <Radio.Group
                      defaultValue={genderpick}
                      onChange={onChange}
                      value={genderpick}
                    >
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                      <Radio value="other">Other</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label="Date of birth">
                    {opendate === false ? (
                      <>
                        <Text>{datetime}</Text>
                        <Button
                          style={{
                            border: "0px",
                            marginLeft: "5px",
                          }}
                          onClick={openDatepick}
                          shape="circle"
                        >
                          <EditOutlined />
                        </Button>{" "}
                      </>
                    ) : (
                      <DatePicker
                        style={{ width: "100%" }}
                        onChange={onChangeDate}
                      />
                    )}
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
              <Col lg={8}>
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
        </div>
      </Spin>
    </div>
  );
}

export default MyProfile;
