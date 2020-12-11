import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Menu,
  Grid,
  Button,
  Badge,
  Modal,
  Tabs,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Radio,
  Checkbox,
  notification,
  Spin,
} from "antd";

import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  CheckCircleOutlined,
} from "@ant-design/icons";
import userApi from "../../../api/userApi";
import Cookies from "js-cookie";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = (props) => {
  const location = useLocation();
  const { md } = useBreakpoint();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [loadingmodal, setloadingmodal] = useState(false);
  const [form] = Form.useForm();
  const onSignup = (values) => {
    console.log("value sign up", values);
    const data = {
      ...values,

      // email: `${values.email}@gmail.com`,
    };
    console.log("data", data);

    const fetchCreateProduct = async () => {
      // dispatch({ type: "FETCH_INIT" });
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          // onCreate(values);
          console.log(">>>value", values);

          const fetchCreateProduct = async () => {
            // dispatch({ type: "FETCH_INIT" });

            try {
              setloadingmodal(true);

              // const params = { _page: 1, _limit: 10 };
              const response = await userApi.createuser(data);
              console.log("Fetch user succesfully: ", response);
              // console.log(response.products);
              // setProductList(response.products);
              // dispatch({ type: "FETCH_SUCCESS", payload: response.products });
              // dispatch(doCreate_success(response));
              setloadingmodal(false);

              notification.info({
                message: `Signup Successfully`,
                description: "Please check email to conform your account",
                icon: <CheckCircleOutlined style={{ color: "#33CC33" }} />,
                placement: "bottomRight",
              });

              // console.log(">>>> productlist: ", productList);
            } catch (error) {
              console.log("failed to fetch product list: ", error);
              // dispatch(doCreate_error);
            }
          };
          fetchCreateProduct();
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };
    fetchCreateProduct();
  };
  const [isLoading, setIsLoading] = useState(false);

  const onSignIn = (values) => {
    const datalogin = { ...values, email: `${values.email}@gmail.com` };
    console.log("login >>", datalogin);
    const fetchCategoryList = async () => {
      try {
        setIsLoading(true);
        const response = await userApi.signinUser(datalogin);
        console.log("Fetch login succesfully: ", response);
        const token = response.token;
        Cookies.set("tokenUser", token);
        // console.log(">>>token", token);
      } catch (error) {
        console.log("failed to fetch login: ", error);
        notification.open({
          message: "Fail Login",
          description: "Your email or password is wrong",
        });
      }
      setIsLoading(false);
    };
    fetchCategoryList();
  };
  return (
    <>
      <Menu
        mode={md ? "horizontal" : "inline"}
        onClick={props.handleClickMenu}
        selectedKeys={[props.current.current]}
        className="menutitle"
      >
        <Menu.Item className="button-signup" key="mail">
          <Button onClick={showModal} className="button-signup">
            Signin
          </Button>
        </Menu.Item>
        <Menu.Item className="button-signup" key="app">
          {/* <Button className="button-signup" onClick={props.showSignup}>
          Signup
        </Button> */}
          <Link to="/shoppingpage">
            <Badge count={0}>
              <ShoppingCartOutlined style={{ fontSize: "25px" }} />
            </Badge>
          </Link>
        </Menu.Item>
      </Menu>
      <Modal
        visible={isModalVisible}
        width={400}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <div className="header_modal-title">
          <Tabs style={{ fontSize: "30px" }} tabPosition={"top"}>
            <Tabs.TabPane tab="Sign In" key="signin" className="loginmodal">
              <Spin spinning={isLoading}>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  size="large"
                  onFinish={onSignIn}
                  // onFinishFailed={onFinishFailed}
                >
                  <Row>
                    <Col
                      span={24}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Form.Item
                        style={{
                          width: "600px",
                        }}
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email!",
                          },
                        ]}
                      >
                        <Input
                          addonAfter="@gmail.com"
                          // defaultValue="kaitrung"
                          placeholder="Email"
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={24}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Form.Item
                        name="password"
                        style={{
                          width: "600px",
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password
                          style={{ width: "100%" }}
                          placeholder="Password"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={24}
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Form.Item>
                        <Button
                          style={{
                            width: "300px",
                            border: "0px",
                            fontSize: "20px",
                          }}
                          type="primary"
                          htmlType="submit"
                        >
                          Sign in
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Spin>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Sign Up" key="signup">
              <Spin spinning={loadingmodal}>
                <Form
                  layout="horizontal"
                  form={form}
                  // initialValues={{ size: componentSize }}
                  // onValuesChange={onFormLayoutChange}
                  onFinish={onSignup}
                  size="large"
                >
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="fName"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Fullname!",
                          },
                        ]}
                      >
                        <Input
                          style={{ width: "100%" }}
                          placeholder="Full name"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email!",
                          },
                        ]}
                      >
                        <Input
                          // addonAfter="@gmail.com"
                          // defaultValue="kaitrung"
                          placeholder="Email"
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* <Row>
                  <Col span={12}>
                    <Form.Item name="phone">
                      <Input placeholder="Phone number" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="birthday">
                      <DatePicker />
                    </Form.Item>
                  </Col>
                </Row> */}
                  <Row>
                    {/* <Col span={12}>
                    <Form.Item name="gender">
                      <Radio.Group buttonStyle="solid" size="large">
                        <Radio.Button value="male">Male</Radio.Button>
                        <Radio.Button value="female">Female</Radio.Button>
                        <Radio.Button value="orther">Orther</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </Col> */}
                    <Col span={24}>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password
                          style={{
                            width: "100%",
                          }}
                          placeholder="input password"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={24}
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        style={{
                          width: "300px",
                          border: "0px",
                          fontSize: "20px",
                        }}
                        type="primary"
                        htmlType="submit"
                      >
                        Sign up
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Spin>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Modal>
    </>
  );
};

export default RightMenu;
