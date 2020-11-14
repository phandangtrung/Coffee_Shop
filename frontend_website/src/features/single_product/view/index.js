import React from "react";
import "./style.css";
import { Row, Col, Button } from "antd";
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
            <div className="button-form">
              <a target="_blank">
                <div class="button">
                  <span>Mua ngay</span>
                </div>
                <div
                  style={{ backgroundImage: `url(${Images.BICON})` }}
                  class="sun"
                ></div>
              </a>
            </div>
            <div className="description-form">
              <div className="title">Mô tả</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SingleProduct;
