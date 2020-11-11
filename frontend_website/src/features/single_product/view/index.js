import React from "react";
import "./style.css";
import { Row, Col } from "antd";
import { Images } from "../../../config/image";

function SingleProduct() {
  return (
    <div className="container">
      <div className="sproduct-form">
        <Row>
          <Col span={12}>
            <img alt="single-product" src={Images.COCF} />
          </Col>
          <Col span={12}>
            <div className="title">AMERICANO</div>
            <div className="price">39,000 VND</div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SingleProduct;
