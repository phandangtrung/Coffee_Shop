import React, { lazy, useState, useEffect } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CLink,
} from "@coreui/react";
import { LockOutlined } from "@ant-design/icons";
import "./style.css";
import Cookies from "js-cookie";
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
  Tag,
} from "antd";

import usersData from "../users/UsersData";
import userApi from "../../api/userApi";
const fields = [
  // { key: "id", label: "INDEX", _style: { width: "5%" } },
  { key: "fname", label: "FULL NAME", _style: { width: "15%" } },
  { key: "username", label: "USERNAME", _style: { width: "15%" } },
  { key: "address", label: "ADDRESS", _style: { width: "23%" } },
  { key: "gmail", label: "GMAIL", _style: { width: "20%" } },
  { key: "phone", label: "PHONE", _style: { width: "17%" } },
  { key: "action", label: "ACTION", _style: { width: "10%" } },
  // { key: "registered", _style: { width: "40%" } },
  // "role",
  // "status",
];

function Account() {
  const [isLoading, setIsLoading] = useState(false);
  const [tabledata, settabledata] = useState([]);
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Full Name",
      dataIndex: "fName",
      key: "fName",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "isAdmin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (text) => (
        <>
          {text === false ? (
            <Tag color="#87d068">USER</Tag>
          ) : (
            <Tag color="#f50">ADMIN</Tag>
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "isLock",
      key: "isLock",
      render: (text) => (
        <>
          {text === true ? (
            <Tag color="#f50">BLOCKED</Tag>
          ) : (
            <Tag color="#87d068">ACTIVE</Tag>
          )}
        </>
      ),
    },
    {
      title: "isConfirm",
      dataIndex: "isConfirm",
      key: "isConfirm",
      render: (text) => (
        <>
          {text === false ? (
            <Tag color="#f50">UNVERIFIED</Tag>
          ) : (
            <Tag color="#87d068">VERIFIED</Tag>
          )}
        </>
      ),
    },

    {
      title: "Action",
      key: "action",
      width: 200,
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure？"
            // icon={<DeleteOutlined style={{ color: "red" }} />}
          >
            <Button type="primary" danger>
              <span>Lock User</span>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const fetchCategoryList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      try {
        setIsLoading(true);
        const tokenUser = Cookies.get("tokenUser");
        // const params = { _page: 1, _limit: 10 };

        const response = await userApi.getallUser(tokenUser);
        console.log("Fetch products succesfully: ", response);
        settabledata(response.users);
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
        <CCardHeader className="CCardHeader-title ">Account</CCardHeader>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table columns={columns} dataSource={tabledata} rowKey="_id" />
        )}
      </CCard>
    </>
  );
}

export default Account;
