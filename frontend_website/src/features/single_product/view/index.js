import React, { useEffect, useState } from "react";
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
  Input,
  Result,
  Spin,
  notification,
  Empty,
  Menu,
  Dropdown,
  Popconfirm,
} from "antd";
import Cookies from "js-cookie";
import CurrencyFormat from "react-currency-format";
import commentApi from "../../../api/commentApi";
import {
  SmileOutlined,
  ExceptionOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useLocation, useParams } from "react-router-dom";

import { Images } from "../../../config/image";
const { TabPane } = Tabs;

function SingleProduct({ props }) {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = (values) => {
    console.log("Value: ", values);
    console.log(">>productname: ", location.state.namepro);
  };
  const changePage = (values) => {
    if (values <= 1) {
      setpaginaPage({
        minValue: 0,
        maxValue: 3,
      });
    } else {
      setpaginaPage({
        minValue: paginaPage.maxValue,
        maxValue: values * 3,
      });
    }
  };
  const onChange = () => {
    console.log("Change!");
  };
  const ondeleteComment = (_id) => {
    console.log("avcd", _id);
    const fetchCommentList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      try {
        setloadcomment(true);
        // const params = { _page: 1, _limit: 10 };
        const response = await commentApi.deletecomment(_id);
        console.log("Fetch comment succesfully: ", response);
        setcommentList(commentList.filter((cmmt) => cmmt._id !== _id));
        setloadcomment(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchCommentList();
  };

  useEffect(() => {
    // productapi
    const fetchProductList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      try {
        setloadcomment(true);
        // const params = { _page: 1, _limit: 10 };

        const response = await commentApi.getcommentbyProId(
          location.state.idpro
        );
        console.log("Fetch products succesfully: ", response);
        setcommentList(response.comments);
        setloadcomment(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  }, []);
  const hanldecomment = (values) => {
    const datacomment = {
      ...values,
      rating: ratevalue,
      productId: location.state.idpro,
      email: emailCustomer,
    };
    const fetchProductList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      try {
        setloadcomment(true);
        const response = await commentApi.createcomment(datacomment);
        console.log("Fetch products succesfully: ", response);
        setcommentList([...commentList, response.newComment]);
        setloadcomment(false);
        notification.open({
          message: "You posted a comment",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
      } catch (error) {
        notification.open({
          message: "Comment fail",
          icon: <ExceptionOutlined style={{ color: "#red" }} />,
        });
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchProductList();
    console.log(">>comment", datacomment);
  };
  const tokenCustomer = Cookies.get("tokenCustomer");
  const emailCustomer = Cookies.get("CustomerEmail");
  const [commentList, setcommentList] = useState([]);
  const [loadcomment, setloadcomment] = useState(false);
  const [paginaPage, setpaginaPage] = useState({
    minValue: 0,
    maxValue: 1,
  });
  const { TextArea } = Input;
  const [ratevalue, setratevalue] = useState(3);
  const desc = ["TERRIBLE", "BAD", "NORMAL", "GOOD", "WONDERFUL"];
  const handleChangeRate = (value) => {
    setratevalue(value);
  };
  return (
    <div className="container">
      <div className="sproduct-form">
        <Row>
          <Col style={{ textAlign: "start" }} span={12}>
            <img
              alt="single-product"
              src={`http://localhost:3000/${location.state.img}`}
            />
          </Col>
          <Col span={12}>
            <div className="title">{location.state.namepro}</div>
            <div className="price">
              <CurrencyFormat
                value={location.state.pricepro}
                displayType={"text"}
                thousandSeparator={true}
              />{" "}
              VND
            </div>

            <Form onFinish={handleSubmit}>
              <div className="description-form">
                <div className="content">{location.state.despro}</div>
              </div>

              <div className="button-form">
                {location.state.quantity > 0 ? (
                  <Button className="button-buy" htmlType="submit">
                    BUY NOW
                  </Button>
                ) : (
                  <a className="amount">Out of stock</a>
                )}
              </div>
            </Form>
          </Col>
        </Row>
        <Row>
          <div className="tabs-rating">
            <Tabs type="card" size="large">
              <TabPane tab="Rate and Comment" key="1">
                <Spin spinning={loadcomment}>
                  {commentList.length > 0 ? (
                    <div className="rate-container">
                      {commentList.map((comment) => (
                        <div className="rate-form" key={comment._id}>
                          <div className="rate-username">
                            {comment.email}
                            {comment.email === emailCustomer ? (
                              <Popconfirm
                                title="Are you sure？"
                                onConfirm={() => ondeleteComment(comment._id)}
                                icon={
                                  <QuestionCircleOutlined
                                    style={{ color: "red" }}
                                  />
                                }
                              >
                                <DeleteOutlined
                                  style={{
                                    marginLeft: "10px",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                    color: "#808080",
                                  }}
                                />
                              </Popconfirm>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="rate-start">
                            <Rate disabled defaultValue={comment.rating} />
                          </div>
                          <div className="rate-comment">{comment.content}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Empty description={false} />
                  )}
                </Spin>
              </TabPane>
              <TabPane
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "30px",
                }}
                tab="Your Review"
                key="3"
              >
                {tokenCustomer !== undefined ? (
                  <Form style={{ width: "80%" }} onFinish={hanldecomment}>
                    <Spin spinning={loadcomment}>
                      <Form.Item name="content">
                        <TextArea
                          placeholder="Type your comment here"
                          autoSize={{ minRows: 5, maxRows: 8 }}
                        />
                      </Form.Item>
                      <div
                        style={{
                          textAlign: "start",
                          zoom: "1.2",
                          paddingBottom: "20px",
                        }}
                      >
                        <Rate
                          tooltips={desc}
                          onChange={handleChangeRate}
                          value={ratevalue}
                        />
                        {ratevalue ? (
                          <span className="ant-rate-text">
                            {desc[ratevalue - 1]}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <Button
                        htmlType="submit"
                        type="primary"
                        style={{ float: "left", border: "0px" }}
                      >
                        Comment
                      </Button>
                    </Spin>
                  </Form>
                ) : (
                  <Result
                    status="warning"
                    title="You must be logged in to comment."
                  />
                )}
              </TabPane>
            </Tabs>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default SingleProduct;
