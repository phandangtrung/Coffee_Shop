import React from 'react';
import { Menu, Grid } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const LeftMenu = () => {
  const { md } = useBreakpoint()
  return (
    <Menu mode={md ? "horizontal" : "inline"} className="rightmenu-containner menutitle" >
      <Menu.Item key="mail">
        <a href="" clasname="titlemenu">Home</a>
      </Menu.Item>
      <SubMenu key="sub1" className="fontmenu" title={<span>Product</span>}>
        <MenuItemGroup title="Product"  className="fontmenu">
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
      <Menu.Item key="alipay">
        <a href="">Contact Us</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;