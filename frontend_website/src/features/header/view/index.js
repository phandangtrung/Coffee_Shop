import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";

import LeftMenu from "./leftmenu";
import RightMenu from "./rightmenu";
import {
  Drawer,
  Button,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Radio,
  TreeSelect,
  Cascader,
  Switch,
  Modal,
} from "antd";
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const Header = () => {
  const [state, setState] = useState({
    current: "home",
    visible: false,
    Signupvisible: false,
  });
  const [current, setcurrent] = useState({ current: "" });
  //--Modal
  const handleClickMenu = (e) => {
    console.log("click ", e);
    setcurrent({ current: e.key });
  };
  const showDrawer = () => {
    setState({
      ...state,
      visible: true,
    });
    console.log(state);
  };
  const showSignup = () => {
    setState({
      ...state,
      Signupvisible: true,
    });
    console.log("OK");
  };
  const onCloseSignup = () => {
    setState({
      ...state,
      Signupvisible: false,
    });
  };
  const onClose = () => {
    setState({
      ...state,
      visible: false,
    });
    console.log(state);
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <div>
      <nav className="menuBar">
        <div className="logo">
          <a href="" className="fontmenu shopname">
            Coffee Shop
          </a>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu handleClickMenu={handleClickMenu} current={current} />
          </div>
          <div className="rightMenu">
            <RightMenu
              showSignup={showSignup}
              handleClickMenu={handleClickMenu}
              current={current}
            />
          </div>
          <Button className="barsMenu" type="primary" onClick={showDrawer}>
            <span className="barsBtn"></span>
          </Button>
          <Drawer
            title="Menu bar"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={state.visible}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer>
        </div>
      </nav>
      <Modal
        title="ĐĂNG KÍ"
        visible={state.Signupvisible}
        onOk={showSignup}
        onCancel={onCloseSignup}
      >
        <Form {...layout}>
          <Form.Item
            label="User name"
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Header;
