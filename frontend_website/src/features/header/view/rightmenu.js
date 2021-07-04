import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
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
  Dropdown,
} from "antd";

import {
  ShoppingCartOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  CheckCircleOutlined,
  ExclamationCircleFilled,
  LogoutOutlined,
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
} from "@ant-design/icons";
import userApi from "../../../api/userApi";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { keyp } from "../../../config/keyp";
import Cookies from "js-cookie";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = (props) => {
  const location = useLocation();
  const { md } = useBreakpoint();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cartcount, setcartcount] = useState(0);
  const [currentStorage, SyncWithLocalStorage] = useState(localStorage || {});
  const eventListenerFun = (e) => {
    console.log("localStorage", JSON.parse(localStorage.cart));
    let sumquanti = 0;
    const lccart = JSON.parse(localStorage.cart);
    lccart.map((lc) => {
      sumquanti += lc.quantity;
    });
    setcartcount(sumquanti);
    SyncWithLocalStorage({ ...localStorage.cart }); //<----spread it which will cause refrence to change
  };
  useEffect(() => {
    window.addEventListener("storage", eventListenerFun);

    return () => window.removeEventListener("storage", eventListenerFun);
  }, [currentStorage]);
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

  const responseSuccessGoogle = (response) => {
    setIsLoading(true);
    console.log(">> này nè", response);
    axios({
      method: "POST",
      url: "https://betcsvn.herokuapp.com/api/users/googlelogin",
      data: { tokenId: response.tokenId },
    }).then((response) => {
      console.log("Google Login Success", response);
      Cookies.set("CustomerEmail", response.data.email);
      Cookies.set("gglg", true);
      Cookies.set("tokenCustomer", response.data.token);
      setIsLoading(false);
      setIsModalVisible(false);
    });
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };

  const onSignIn = (values) => {
    const datalogin = { ...values };
    console.log("login >>", datalogin);
    const fetchCategoryList = async () => {
      try {
        setIsLoading(true);
        const response = await userApi.signinUser(datalogin);
        console.log("Fetch login succesfully: ", response);
        const token = response.token;
        Cookies.set("tokenCustomer", token);
        Cookies.set("CustomerEmail", datalogin.email);
        Cookies.set("gglg", false);
        let pwcg = `${keyp}${values.password}`;
        Cookies.set("yassuozed", pwcg);
        setIsModalVisible(false);
        // console.log(">>>token", token);
      } catch (error) {
        console.log("failed to fetch login: ", error);
        notification.open({
          message: "Đăng nhập không thành công",
          description: "Email hoặc mật khẩu không đúng",
          icon: <ExclamationCircleFilled style={{ color: "red" }} />,
        });
      }
      setIsLoading(false);
    };
    fetchCategoryList();
  };
  const onsignout = () => {
    Cookies.remove("tokenCustomer");

    notification.open({
      message: "Bạn đã đăng xuất",
      icon: <LogoutOutlined style={{ color: "red" }} />,
      placement: "bottomRight",
    });
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/myprofile">
          <SolutionOutlined /> Cá nhân
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/changepass">
          <LockOutlined /> Đổi mật khẩu
        </Link>
      </Menu.Item>
      <Menu.Item danger>
        <Link to="/" rel="noopener noreferrer" onClick={onsignout}>
          <LogoutOutlined /> Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );
  let islogin = Cookies.get("tokenCustomer");
  return (
    <>
      <Menu
        mode={md ? "horizontal" : "inline"}
        onClick={props.handleClickMenu}
        // selectedKeys={[props.current.current]}
        className="menutitle"
      >
        <Menu.Item className="button-signup" key="mail">
          {islogin === undefined ? (
            <Button onClick={showModal} className="button-signup">
              <UserOutlined style={{ fontSize: "25px" }} />
            </Button>
          ) : (
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <UserOutlined style={{ fontSize: "25px" }} />
              </a>
            </Dropdown>
          )}
        </Menu.Item>
        <Menu.Item className="button-signup" key="app">
          {/* <Button className="button-signup" onClick={props.showSignup}>
          Signup
        </Button> */}
          <Link to="/shoppingpage">
            <Badge count={cartcount}>
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
            <Tabs.TabPane tab="Đăng nhập" key="signin" className="loginmodal">
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
                            message: "Nhập địa chỉ email!",
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
                            message: "Nhập mật khẩu!",
                          },
                        ]}
                      >
                        <Input.Password
                          style={{ width: "100%" }}
                          placeholder="Mật khẩu"
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
                          Đăng nhập
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "5px",
                  }}
                >
                  <GoogleLogin
                    clientId="161356782679-supo9tgvceuf5u8ts0d0su6d3eg4sckf.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
              </Spin>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đăng ký" key="signup">
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
                            message: "Nhập họ và tên",
                          },
                        ]}
                      >
                        <Input
                          style={{ width: "100%" }}
                          placeholder="Họ và tên"
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
                            message: "Nhập địa chỉ email!",
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
                            message: "Nhập mật khẩu!",
                          },
                        ]}
                      >
                        <Input.Password
                          style={{
                            width: "100%",
                          }}
                          placeholder="Nhập mật khẩu"
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
                        Đăng ký
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
