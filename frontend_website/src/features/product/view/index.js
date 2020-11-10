import React, { useState } from "react";
import { Menu, Row, Col } from "antd";
import "./style.css";
import ProductTag from "../../../components/ProductTag";

import data from "../dummy";

const { SubMenu } = Menu;
function Product() {
  const handleClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div className="container">
      <div className="menu-container">
        <Menu
          onClick={handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <Menu.Item className="category-title">DANH MỤC</Menu.Item>
          {data.map((category) => {
            return <Menu.Item key={category.id}>{category.name}</Menu.Item>;
          })}
        </Menu>
      </div>

      <div className="product-container">
        <Row>
          <Col span={8}>
            <ProductTag />
          </Col>
          <Col span={8}>
            <ProductTag />
          </Col>
          <Col span={8}>
            <ProductTag />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <ProductTag />
          </Col>
          <Col span={8}>
            <ProductTag />
          </Col>
          <Col span={8}>
            <ProductTag />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Product;