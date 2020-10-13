import React, { Component } from 'react';
import { Menu } from 'antd';


import {SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import "./style.css";
const { SubMenu } = Menu;
class Header extends Component {
 
  render() {
    return (
      <div  className="header-containner">
        <div  className="header-contents">
            <div  className="logo">

            </div>
            <div className="menu">
            <Menu>       
        
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
              <Menu.ItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>        
          </Menu>
            </div>
        </div>
     </div>
    );
  }
}

export default Header;
