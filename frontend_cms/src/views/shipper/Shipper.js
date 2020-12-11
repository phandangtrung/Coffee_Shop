import React, { lazy, useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CButton,
  CCardBody,
  useReducer,
} from "@coreui/react";
import {
  Table,
  Space,
  Spin,
  Modal,
  Row,
  Col,
  Input,
  Form,
  notification,
  Checkbox,
  Upload,
  Select,
  Button,
  Popconfirm,
} from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.css";
import CIcon from "@coreui/icons-react";
import shippersApi from "../../api/shippersApi";
import usersData from "../users/UsersData";
import moment from "moment";
import Moment from "react-moment";

function Shipper() {
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Images",
      dataIndex: "imagesShipper",
      key: "imagesShipper",
      width: 250,
      render: (img) => (
        <img
          style={{ width: "100%", height: "auto" }}
          src={`http://localhost:3000/${img}`}
        />
      ),
    },
    {
      title: "Create at",
      dataIndex: "createAt",
      key: "createAt",
      width: 200,
      render: (time) => (
        <p>
          <Moment format="DD/MM/YYYY hh:mm">{time}</Moment>
        </p>
      ),
    },

    {
      title: "Action",
      key: "action",
      width: 200,
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Popconfirm
            title="Are you sure？"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            // onConfirm={() => deleteProduct(record)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const [tabledata, settabledata] = useState([]);
  useEffect(() => {
    const fetchCategoryList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      try {
        setIsLoading(true);
        const response = await shippersApi.getAll();
        console.log("Fetch products succesfully: ", response);
        settabledata(response.shippers);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchCategoryList();
  }, []);
  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">Shipper</CCardHeader>
        <CButton
          style={{
            width: "200px",
            height: "50px",
            marginTop: "20px",
            marginLeft: "20px",
          }}
          shape="pill"
          color="info"
        >
          {/* <i style={{ fontSize: "20px" }} class="cil-playlist-add"></i>  */}
          Add Shipper
        </CButton>
        <CCardBody>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Spin size="large" />
            </div>
          ) : (
            <Table columns={columns} dataSource={tabledata} rowKey="_id" />
          )}
        </CCardBody>
      </CCard>
    </>
  );
}

export default Shipper;
