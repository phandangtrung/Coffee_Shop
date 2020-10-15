import React, { Component } from 'react';

import "./style.css";

import LeftMenu from './leftmenu'
import RightMenu from './rightmenu'
import { Drawer, Button } from 'antd';
class Header extends Component {
 
  state = {
		current: 'mail',
		visible: false
	}
	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};
  render() {
    return (
      <nav className="menuBar">
      <div className="logo">
        <a href=""  className="fontmenu shopname" >Coffee Shop</a>
      </div>
      <div className="menuCon" >
        <div className="leftMenu">
          <LeftMenu />
        </div>
        <div className="rightMenu">
          <RightMenu />
        </div>
        <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer
          title="Menu bar"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <LeftMenu />
          <RightMenu />
        </Drawer>

      </div>
    </nav>
    );
  }
}

export default Header;
