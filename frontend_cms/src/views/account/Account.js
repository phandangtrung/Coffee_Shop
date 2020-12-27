import React, { lazy, useState, useEffect } from "react";
import { CCard, CCardHeader } from "@coreui/react";
import { LockOutlined } from "@ant-design/icons";
import "./style.css";
import Cookies from "js-cookie";
import {
  Table,
  Space,
  Spin,
  Form,
  notification,
  Button,
  Popconfirm,
  Tag,
} from "antd";

import userApi from "../../api/userApi";

function Account() {
  const [isLoading, setIsLoading] = useState(false);
  const [tabledata, settabledata] = useState([]);
  const lockUser = (record) => {
    console.log("record: ", record);
    const fetchLockUser = async () => {
      try {
        setIsLoading(true);
        const tokenUser = Cookies.get("tokenUser");
        const params = {
          id: record._id,
          token: tokenUser,
        };
        const response = await userApi.lockUser(params);
        const fetchgetuserList = async () => {
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
        fetchgetuserList();
        console.log("Fetch user succesfully: ", response);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch user lock: ", error);
      }
    };
    fetchLockUser();
  };
  const unlockUser = (record) => {
    console.log("record: ", record);
    const fetchLockUser = async () => {
      try {
        setIsLoading(true);
        const tokenUser = Cookies.get("tokenUser");
        const params = {
          id: record._id,
          token: tokenUser,
        };
        const response = await userApi.unlockUser(params);
        const fetchgetuserList = async () => {
          try {
            setIsLoading(true);
            const tokenUser = Cookies.get("tokenUser");
            const response = await userApi.getallUser(tokenUser);
            console.log("Fetch products succesfully: ", response);
            settabledata(response.users);
            setIsLoading(false);
          } catch (error) {
            console.log("failed to fetch product list: ", error);
          }
        };
        fetchgetuserList();
        console.log("Fetch user succesfully: ", response);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch user lock: ", error);
      }
    };
    fetchLockUser();
  };
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
          {record.isLock === false ? (
            <Popconfirm
              title="Are you sure？"
              icon={<LockOutlined style={{ color: "red" }} />}
              onConfirm={() => lockUser(record)}
            >
              <Button style={{ width: "110px" }} type="primary" danger>
                <span>Lock User </span>
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Are you sure？"
              icon={<LockOutlined style={{ color: "red" }} />}
              onConfirm={() => unlockUser(record)}
            >
              <Button style={{ width: "110px" }} type="primary">
                <span>UnLock User</span>
              </Button>
            </Popconfirm>
          )}
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
