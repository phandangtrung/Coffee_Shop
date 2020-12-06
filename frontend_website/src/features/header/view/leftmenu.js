import React, { useState } from "react";
import { setState } from "react";
import { Link } from "react-router-dom";
import { Menu, Grid, Modal } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;
const state = { visible: false };
const LeftMenu = () => {
  const { md } = useBreakpoint();
  //Modal
  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const handleOk = (e) => {
    console.log(e);
    setState({
      visible: false,
    });
  };

  const handleCancel = (e) => {
    console.log(e);
    setState({
      visible: false,
    });
  };
  const [current, setcurrent] = useState({ current: "" });
  //--Modal
  const handleClickMenu = (e) => {
    console.log("click ", e);
    setcurrent({ current: e.key });
    localStorage.setItem("current", e.key);
  };
  return (
    <div>
      <Menu
        mode={md ? "horizontal" : "inline"}
        className="rightmenu-containner menutitle"
        onClick={handleClickMenu}
        selectedKeys={[current.current]}
      >
        <Menu.Item name="home" key="home">
          <div clasname="titlemenu">
            <Link to="/"> Home</Link>
          </div>
        </Menu.Item>
        <Menu.Item key="product">
          <div clasname="titlemenu">
            <Link to="/product">Product</Link>
          </div>
        </Menu.Item>

        <Menu.Item key="menu">
          <a href="" clasname="titlemenu">
            Menu
          </a>
        </Menu.Item>
        <Menu.Item key="alipay">
          <a onClick={showModal}>Contact Us</a>
        </Menu.Item>
      </Menu>
      <Modal
        title="Basic Modal"
        visible={state.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default LeftMenu;
