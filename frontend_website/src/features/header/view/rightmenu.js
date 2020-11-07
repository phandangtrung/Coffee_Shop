import React from "react";
import { Menu, Grid } from "antd";
import { Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = () => {
  const { md } = useBreakpoint();
  return (
    <Menu mode={md ? "horizontal" : "inline"} className="menutitle">
      <Menu.Item key="mail">
        <Link to={"/login"}>
          <a>Signin</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="app">
        <a>Signup</a>
      </Menu.Item>
    </Menu>
  );
};

export default RightMenu;
