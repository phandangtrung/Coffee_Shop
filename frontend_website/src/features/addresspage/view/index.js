import React from "react";
import "./style.css";
import { Row, Col, Select } from "antd";
function AddressPage() {
  return (
    <>
      <div className="container">
        <Row
          className="fillter-form"
          style={{ display: "flex", alignContent: "center" }}
        >
          <Col span={6} style={{ color: "white", fontSize: "15px" }}>
            Từng ngày đến gần bạn hơn
          </Col>
          <Col span={18} style={{ textAlign: "start" }}>
            <Select
              style={{ width: "50%", marginRight: "20px", fontSize: "15px" }}
            >
              <Select.Option>Quận 1</Select.Option>
              <Select.Option>Quận 1</Select.Option>
              <Select.Option>Quận 1</Select.Option>
              <Select.Option>Quận 1</Select.Option>
            </Select>
            <Select style={{ width: "45%", fontSize: "15px" }}>
              <Select.Option>Quận 1</Select.Option>
              <Select.Option>Quận 1</Select.Option>
              <Select.Option>Quận 1</Select.Option>
              <Select.Option>Quận 1</Select.Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ width: "100%" }}></Row>
      </div>
    </>
  );
}

export default AddressPage;
