import React, { useState, useEffect } from "react";
import "./style.css";
import { Row, Col, Form, Input, Button, Spin, Table, Tag } from "antd";
import orderApi from "../../../api/orderApi";
function Searchorder() {
  const { Search } = Input;
  const [data, setdata] = useState([]);
  const [fakedata, setfakedata] = useState([]);
  const [isloading, setisloading] = useState(false);
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Customer Address",
      dataIndex: "customerAddress",
      key: "customerAddress",
    },
    {
      title: "Customer Phone",
      dataIndex: "customerPhone",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "address",
      render: (stt) => (
        <>
          {stt === false ? (
            <Tag color="volcano" key="tag">
              UNCONFIRM
            </Tag>
          ) : (
            <Tag color="green" key="tag">
              CONFIRMED
            </Tag>
          )}
        </>
      ),
    },
  ];
  useEffect(() => {
    const fetchOrderList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      try {
        const response = await orderApi.getall();
        console.log("Fetch products succesfully: ", response);
        setfakedata(response.orders);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
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
  return (
    <>
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
          <Table pagination={false} columns={columns} dataSource={data} />
        </Spin>
      </div>
    </>
  );
}

export default Searchorder;
