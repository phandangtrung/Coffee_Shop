import React from "react";
import { Menu, Grid, Button } from "antd";
import { Link } from "react-router-dom";
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
        <Button className="button-signup" onClick={props.showSignup}>
          Signup
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default RightMenu;
