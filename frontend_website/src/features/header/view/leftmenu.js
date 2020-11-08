import React from "react";
import { setState } from "react";
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
  //--Modal
  return (
    <div>
      <Menu
        mode={md ? "horizontal" : "inline"}
        className="rightmenu-containner menutitle"
      >
        <Menu.Item key="mail">
          <a href="" clasname="titlemenu">
            Home
          </a>
        </Menu.Item>
        <SubMenu key="sub1" className="fontmenu" title={<span>Product</span>}>
          <MenuItemGroup title="Product" className="fontmenu">
            <Menu.Item key="setting:1">Product list</Menu.Item>
            <Menu.Item key="setting:2">Product single</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <SubMenu key="sub2" className="fontmenu" title={<span>Shop</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
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
