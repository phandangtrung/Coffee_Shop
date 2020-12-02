import React, { useState, useEffect } from "react";
import { Menu, Grid, Button, Badge } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const RightMenu = (props) => {
  const { md } = useBreakpoint();

  return (
    <Menu mode={md ? "horizontal" : "inline"} className="menutitle">
      <Menu.Item className="button-signup" key="mail">
        <Link to={"/login"}>
          <Button className="button-signup">Signin</Button>
        </Link>
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
  );
};

export default RightMenu;
