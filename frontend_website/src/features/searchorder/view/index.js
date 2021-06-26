import React, { useState, useEffect } from "react";
import "./style.css";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Spin,
  Table,
  Tag,
  Modal,
  Space,
  Card,
} from "antd";
import {
  CheckCircleOutlined,
  RightCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Moment from "react-moment";
import { Images } from "../../../config/image";
import orderApi from "../../../api/orderApi";
import CurrencyFormat from "react-currency-format";
import productApi from "../../../api/productApi";
function Searchorder() {
  const { Search } = Input;
  const [data, setdata] = useState([]);
  const [fakedata, setfakedata] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [visible, setvisible] = useState(false);
  const [currentOd, setcurrentOd] = useState({ productList: [] });
  const [branchList, setbranchList] = useState([]);
  const showModal = (dt) => {
    setcurrentOd(dt);
    setvisible(true);
  };
  const hideModal = () => {
    setvisible(false);
  };
  const getBranchName = (_id) => {
    const curbr = branchList.filter((br) => br._id === _id);
    console.log(">>curbr", curbr);
    return curbr[0]?.location;
  };
  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await orderApi.getall();
        console.log("Fetch products succesfully: ", response);
        setfakedata(response.orders);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    const fetchBranchList = async () => {
      try {
        const response = await productApi.getBranch();
        console.log("Fetch branch succesfully: ", response);
        setbranchList(response.branches);
      } catch (error) {
        console.log("failed to fetch branchList list: ", error);
      }
    };
    fetchBranchList();
    fetchOrderList();
  }, []);
  const onSearch = (value) => {
    console.log(value);
    setisloading(true);

    const dataorder = fakedata.filter((od) => od.customerPhone === value);
    setdata(dataorder);
    setisloading(false);
    console.log(">>order", dataorder);
  };
  const gridStyle = {
    width: "100%",
  };

  return (
    <>
      <Modal
        style={{ height: "20px" }}
        title="Sản phẩm của đơn hàng"
        visible={visible}
        onCancel={hideModal}
        footer={[
          <Button key="back" onClick={hideModal}>
            OK
          </Button>,
        ]}
      >
        <div>
          <div>
            {`TỔNG ĐƠN HÀNG: `}{" "}
            <CurrencyFormat
              value={currentOd.totalPrices}
              displayType={"text"}
              thousandSeparator={true}
            />
            VNĐ
          </div>
          <div>{`Chi nhánh: ${getBranchName(currentOd.branchId)}`}</div>

          <div
            style={{ marginTop: "10px", height: "300px", overflowY: "scroll" }}
          >
            <div style={{ width: "100%" }}>
              <Row style={{ display: "flex" }}>
                {currentOd.productList.map((product) => (
                  <Col span={11} style={{ padding: "20px" }}>
                    <Card
                      hoverable
                      style={{ width: "100%", height: "auto" }}
                      cover={
                        <img
                          alt="picture"
                          src={`https://backendcfs.herokuapp.com/${product.pro.imagesProduct}`}
                        />
                      }
                    >
                      <Card.Meta
                        title={product.pro.name}
                        description={`Số lượng: ${product.quantity}`}
                      />

                      <Card.Meta description={`Giá: ${product.pro.prices}`} />
                    </Card>
                  </Col>
                ))}
              </Row>
              ,
            </div>
          </div>
        </div>
        ,
      </Modal>
      <div className="container">
        <div className="search-orer__form">
          <Search
            className="seach_form"
            placeholder="Search by phone"
            onSearch={onSearch}
            enterButton
          />
        </div>
      </div>
      <div className="table__form">
        <Spin spinning={isloading}>
          {/* <Table pagination={false} columns={columns} dataSource={data} /> */}
          {data.map((dt) => (
            <div
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                marginBottom: "50px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: "80%",
                  height: "40vh",
                  borderRadius: "30px",
                  boxShadow: "3px 7px 13px gray",
                  letterSpacing: "2px",
                  lineHeight: "50px",
                  backgroundImage: `url(${Images.BILLB})`,
                  backgroundSize: "cover",
                  textAlign: "start",
                  padding: "30px",
                  fontFamily: "Sansita Swashed",
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <div style={{ color: "white" }}>Khách hàng:</div>
                  <div>{dt.customerName}</div>
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    display: "flex",
                    width: "90%",
                  }}
                >
                  <div style={{ color: "white" }}>Địa chỉ:</div>
                  <div>{` ${dt.customerAddress}`}</div>
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    display: "flex",
                    width: "90%",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      display: "flex",
                      width: "45%",
                    }}
                  >
                    <div style={{ color: "white" }}>Số điện thoại:</div>
                    <div>{dt.customerPhone}</div>
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      display: "flex",
                      width: "50%",
                    }}
                  >
                    <div style={{ color: "white" }}>Ngày mua:</div>
                    <div>
                      <Moment format="DD/MM/YYYY - hh:mm">
                        {dt.createdAt}
                      </Moment>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    display: "flex",
                    width: "35%",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ color: "white" }}>Trạng thái:</div>
                  {dt.status ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>Hoàn thành</div>
                      <CheckCircleOutlined style={{ color: "green" }} />
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>Đang xử lý</div>
                      <ClockCircleOutlined style={{ color: "brown" }} />
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    color: "white",
                    fontStyle: "italic",
                  }}
                >
                  <div
                    style={{
                      width: "33%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => showModal(dt)}
                  >
                    Xem chi tiết hóa đơn <RightCircleOutlined />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Spin>
      </div>
    </>
  );
}

export default Searchorder;
