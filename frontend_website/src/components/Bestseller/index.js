import React, { useEffect, useState } from "react";
import "./style.css";
import { Row, Col } from "antd";

import ProductTag from "../ProductTag/index";
import productApit from "../../api/productApi";
function index() {
  return (
    <div className="container">
      <div className="best__seller-form">
        <div className="best__seller-title ">Best Seller</div>

        <Row style={{ paddingTop: "30px" }}>
          <Col className="productsell" span={8}>
            <div style={{ zoom: "1.2" }}>
              <ProductTag />
            </div>
          </Col>
          <Col className="productsell" span={8}>
            <div style={{ zoom: "1.2" }}>
              <ProductTag />
            </div>
          </Col>
          <Col className="productsell" span={8}>
            <div style={{ zoom: "1.2" }}>
              <ProductTag />
            </div>
          </Col>
          <Col className="productsell" span={8}>
            <div style={{ zoom: "1.2" }}>
              <ProductTag />
            </div>
          </Col>
          <Col className="productsell" span={8}>
            <div style={{ zoom: "1.2" }}>
              <ProductTag />
            </div>
          </Col>
          <Col className="productsell" span={8}>
            <div style={{ zoom: "1.2" }}>
              <ProductTag />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default index;
