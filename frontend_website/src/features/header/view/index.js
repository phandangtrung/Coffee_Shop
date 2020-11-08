import React, { useState } from "react";

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
} from "antd";
const { Option } = Select;
const Header = () => {
  const [state, setState] = useState({
    current: "mail",
    visible: false,
    Signupvisible: false,
  });

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
            <LeftMenu />
          </div>
          <div className="rightMenu">
            <RightMenu showSignup={showSignup} />
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
      {/* Sign Up Drawer Form */}
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onCloseSignup}
        visible={state.Signupvisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              onClick={onCloseSignup}
              style={{ marginRight: 8, zoom: "1.5" }}
            >
              Cancel
            </Button>
            <Button
              style={{
                border: "0px",
                zoom: "1.5",
              }}
              onClick={onCloseSignup}
              type="primary"
            >
              Submit
            </Button>
          </div>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Form.Item label="Form Size" name="size">
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Input">
            <Input />
          </Form.Item>
          <Form.Item label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="TreeSelect">
            <TreeSelect
              treeData={[
                {
                  title: "Light",
                  value: "light",
                  children: [{ title: "Bamboo", value: "bamboo" }],
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Cascader">
            <Cascader
              options={[
                {
                  value: "zhejiang",
                  label: "Zhejiang",
                  children: [
                    {
                      value: "hangzhou",
                      label: "Hangzhou",
                    },
                  ],
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker />
          </Form.Item>
          <Form.Item label="InputNumber">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Switch">
            <Switch />
          </Form.Item>
          <Form.Item label="Button">
            <Button>Button</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Header;
