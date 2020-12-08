import React, { useState, useEffect } from "react";
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
} from "antd";
import { Link } from "react-router-dom";
import {
  ShoppingCartOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = (props) => {
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
        width={800}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <div className="header_modal-title">
          <Tabs style={{ fontSize: "30px" }} tabPosition={"top"}>
            <Tabs.TabPane tab="Sign In" key="signin" className="loginmodal">
              <Form
                name="basic"
                initialValues={{ remember: true }}
                size="large"
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
              >
                <Row>
                  <Col
                    span={24}
                    style={{
                      paddingLeft: "20px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item
                      style={{
                        width: "600px",
                      }}
                      name="email"
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
                      paddingLeft: "20px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item
                      name="fName"
                      style={{
                        width: "600px",
                      }}
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
                    <Form.Item name="fName">
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
            </Tabs.TabPane>
            <Tabs.TabPane tab="Sign Up" key="signup">
              <Form
                layout="horizontal"
                // initialValues={{ size: componentSize }}
                // onValuesChange={onFormLayoutChange}
                size="large"
              >
                <Row>
                  <Col span={12}>
                    <Form.Item name="fName">
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Full name"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="email">
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
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item name="gender">
                      <Radio.Group buttonStyle="solid" size="large">
                        <Radio.Button value="male">Male</Radio.Button>
                        <Radio.Button value="female">Female</Radio.Button>
                        <Radio.Button value="orther">Orther</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="gender">
                      <Input.Password
                        style={{
                          width: "100%",
                        }}
                        placeholder="input password"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row style={{ paddingTop: "50px" }}>
                  <Col
                    span={24}
                    style={{
                      width: "90%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item name="fName">
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
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Modal>
    </>
  );
};

export default RightMenu;
