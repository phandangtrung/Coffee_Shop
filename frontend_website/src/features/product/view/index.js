import React, { useState } from "react";
import { Menu, Row, Col, Carousel, BackTop, Pagination } from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
import "./style.css";
import ProductTag from "../../../components/ProductTag";
import { Images } from "../../../config/image";
import data from "../dummy";

const { SubMenu } = Menu;
function Product() {
  const handleClick = (e) => {
    console.log("click ", e);
  };
  function onChange(a, b, c) {
    console.log(a, b, c);
  }
  const contentStyle = {
    color: " rgb(164, 115, 67)",
    textAlign: "center",
  };
  return (
    <>
      <div className="hot-new">
        <div className="item">
          <Carousel autoplay={5000} dots={false}>
            <div>
              <h3 style={contentStyle}>
                Coffee Shope đồng hành cùng bạn trên chặn đường thưởng thức cà
                phê thật
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                Thoải mái đổi mua hàng để nhận nhiều phần quà cực hấp dẫn!
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                Tận hưởng các đặc quyền chỉ dành riêng cho thành viên Kim Cương
                Tham gia ngay
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                Chúng tôi lấy khách hàng, nhân viên và cộng đồng làm trọng tâm
                cho mọi quyết định.
              </h3>
            </div>
          </Carousel>
        </div>
      </div>
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
          <div className="product-banner">
            <img alt="product_banner" src={Images.SBANNER} />
          </div>
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
          <Pagination
            style={{ textAlign: "end" }}
            defaultCurrent={1}
            total={50}
          />
        </div>
      </div>
      <BackTop>
        <div className="backtotop">
          <CaretUpOutlined />
        </div>
      </BackTop>
    </>
  );
}

export default Product;
