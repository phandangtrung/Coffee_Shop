import React from "react";
import "./style.css";
import {
  Row,
  Col,
  Button,
  Form,
  InputNumber,
  Tabs,
  Rate,
  Pagination,
} from "antd";
import { Images } from "../../../config/image";
const { TabPane } = Tabs;
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
          <Col style={{ textAlign: "start" }} span={12}>
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
        <Row>
          <div className="tabs-rating">
            <Tabs type="card" size="large">
              <TabPane tab="Rate and Comment" key="1">
                <div className="rate-container">
                  <div className="rate-form">
                    <div className="rate-username">Nguyễn Hùng Duy</div>
                    <div className="rate-start">
                      <Rate disabled defaultValue={5} />
                    </div>
                    <div className="rate-comment">
                      Cafe ngon, đúng điệu cafe, sẽ ủng hộ dài dài.
                    </div>
                  </div>
                  <div className="rate-form">
                    <div className="rate-username">Phạm Quốc Việt</div>
                    <div className="rate-start">
                      <Rate disabled defaultValue={4} />
                    </div>
                    <div className="rate-comment">
                      Cà phê ngon, giao nhanh, nhưng chưa được đậm đà. Mong shop
                      tiếp tục phát triển chất lượng cà phê của mình.
                    </div>
                  </div>
                  <div className="rate-form">
                    <div className="rate-username">Đỗ Phi Cường</div>
                    <div className="rate-start">
                      <Rate disabled defaultValue={1} />
                    </div>
                    <div className="rate-comment">
                      Quán này của đối thủ mình nên mình đánh giá 1 sao, dù Cà
                      phê quán rất ngon.
                    </div>
                  </div>
                </div>
                <div className="pagination-form">
                  <Pagination defaultCurrent={1} total={50} />
                </div>
              </TabPane>
              <TabPane tab="Your Review" key="3">
                <p>Content of Tab Pane 3</p>
                <p>Content of Tab Pane 3</p>
                <p>Content of Tab Pane 3</p>
              </TabPane>
            </Tabs>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default SingleProduct;
