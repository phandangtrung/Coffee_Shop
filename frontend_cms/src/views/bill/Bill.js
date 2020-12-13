import React, { lazy, useState, useEffect } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CLink,
  CButton,
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
  Button,
  Popconfirm,
} from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./style.css";
import CIcon from "@coreui/icons-react";
import moment from "moment";
import Moment from "react-moment";
function Bill() {
  const [isLoading, setIsLoading] = useState(false);
  const [tabledata, settabledata] = useState([]);
  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "_id",
      key: "_id",
      width: 200,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      width: 250,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "customerPhone",
      key: "customerPhone",
      width: 200,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "customerAddress",
      key: "customerAddress",
      width: 200,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Total",
      dataIndex: "totalPrices",
      key: "totalPrices",
      width: 200,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      // render: (text) => <a>{text}</a>,
    },

    {
      title: "Done at",
      dataIndex: "doneAt",
      key: "doneAt",
      width: 200,
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
          <Button type="primary">Detail</Button>

          <Button type="primary" danger>
            Conform
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">Bill</CCardHeader>

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

export default Bill;
