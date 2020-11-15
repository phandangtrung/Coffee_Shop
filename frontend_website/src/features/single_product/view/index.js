import React from "react";
import "./style.css";
import { Row, Col, Button, Form, InputNumber } from "antd";
import { Images } from "../../../config/image";

function SingleProduct() {
  const handleSubmit = (values) => {
    console.log("Value: ", values);
  };
  const onChange = () => {
    console.log("Change!");
  };
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

            <Form onFinish={handleSubmit} initialValue={{ amount: 1 }}>
              <Form.Item>
                <div className="description-form">
                  {/* <div className="title">Mô tả</div> */}
                  <div className="content">
                    Một tách cà phê đen thơm ngào ngạt, phảng phất mùi cacao là
                    món quà tự thưởng tuyệt vời nhất cho những ai mê đắm tinh
                    chất nguyên bản nhất của cà phê. Một tách cà phê trầm lắng,
                    thi vị giữa dòng đời vồn vã.
                  </div>
                </div>
              </Form.Item>
              <Form.Item className="amount" name="amount">
                <span style={{ marginRight: "20px" }}>Số lượng: </span>
                <InputNumber
                  min={1}
                  max={10}
                  onChange={onChange}
                  size="large"
                  style={{ border: "1px solid rgb(185, 115, 67)" }}
                />
              </Form.Item>
              <Form.Item className="button-form">
                <Button className="button-buy" htmlType="submit">
                  MUA NGAY
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SingleProduct;
