import React, { lazy, useState, useEffect } from "react";
import { CCard, CCardHeader, CButton } from "@coreui/react";
import { LockOutlined, InfoCircleFilled } from "@ant-design/icons";
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
  Modal,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
} from "antd";

import userApi from "../../api/userApi";
import branchApi from "../../api/branchApi";
import employeeApi from "../../api/employeeApi";
function Employee() {
  const [isLoading, setIsLoading] = useState(false);
  const [tabledata, settabledata] = useState([]);
  const [iscreatemp, setiscreatemp] = useState(false);
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
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [datacus, setdatacus] = useState({
    gender: "",
    birthday: "",
    branchId: "",
  });
  const toggle = () => {
    setIsModalVisible(!isModalVisible);
  };
  const fetchbranchList = async (produclist) => {
    try {
      const response = await branchApi.getAll();
      console.log("Fetch branch succesfully: ", response);
      setbranchL(response.branches);
    } catch (error) {
      console.log("failed to fetch product list: ", error);
    }
  };
  const fetchUserList = async () => {
    // dispatch({ type: "FETCH_INIT" });
    try {
      setIsLoading(true);
      const tokenUser = Cookies.get("tokenUser");
      // const params = { _page: 1, _limit: 10 };

      const response = await userApi.getallUser(tokenUser);
      console.log("Fetch products succesfully: ", response);
      const emparr = response.users.filter((us) => us.isEmployee === true);
      settabledata(emparr);
      setIsLoading(false);
    } catch (error) {
      console.log("failed to fetch product list: ", error);
    }
  };
  useEffect(() => {
    fetchUserList();
    fetchbranchList();
  }, []);
  const [branchL, setbranchL] = useState([]);
  const onCreateEm = (values) => {
    const newdata = { ...values, ...datacus };
    const tokenUser = Cookies.get("tokenUser");
    const dataparams = { token: tokenUser, data: newdata };
    console.log(">>", dataparams);
    const fetchcreateemp = async (params) => {
      try {
        setiscreatemp(true);
        const response = await employeeApi.createEmployee(params);
        console.log("Fetch create employee succesfully: ", response);
        notification.open({
          message: "Create Employee",
          description: "Create Employee Successfull",
          placement: "bottomRight",
        });
        fetchUserList();

        setiscreatemp(false);
      } catch (error) {
        console.log("failed to fetch create employee : ", error);
        setiscreatemp(false);
        notification.open({
          message: "Login Fail",
          description: "Your email incorrect",
          icon: <InfoCircleFilled style={{ color: "red" }} />,
          placement: "bottomRight",
        });
      }
    };
    fetchcreateemp(dataparams);
  };

  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">Employee</CCardHeader>
        <CButton
          style={{
            width: "200px",
            height: "50px",
            marginTop: "20px",
            marginLeft: "20px",
          }}
          shape="pill"
          color="info"
          onClick={toggle}
        >
          {/* <i style={{ fontSize: "20px" }} class="cil-playlist-add"></i>  */}
          Add Employee
        </CButton>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table columns={columns} dataSource={tabledata} rowKey="_id" />
        )}
      </CCard>
      <Modal
        title="Create Employee"
        visible={isModalVisible}
        onCancel={toggle}
        style={{ marginTop: "5%" }}
        footer={[]}
      >
        <Spin spinning={iscreatemp}>
          <Form onFinish={onCreateEm}>
            <Row>
              <Col span={11}>
                <Form.Item name="fName">
                  <Input placeholder="Full name" />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={12}>
                <Form.Item name="email">
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Form.Item name="phone">
                  <Input placeholder="Phone" />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={12}>
                <Form.Item name="address">
                  <Input placeholder="Adress" />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ paddingBottom: 20 }}>
              <Col span={11}>
                <Select
                  onSelect={(value) =>
                    setdatacus({ ...datacus, gender: value })
                  }
                  placeholder="Gender"
                  style={{ width: "100%" }}
                >
                  <Select.Option value="Nam">Nam</Select.Option>
                  <Select.Option value="Nữ">Nữ</Select.Option>
                  <Select.Option value="Khác">Khác</Select.Option>
                </Select>
              </Col>
              <Col span={1}></Col>
              <Col span={12}>
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  placeholder="Date of birth"
                  onChange={(date, dateString) =>
                    setdatacus({ ...datacus, birthday: dateString })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div></div>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Select
                  onSelect={(value) =>
                    setdatacus({ ...datacus, branchId: value })
                  }
                  placeholder="Select Branch"
                  style={{ width: "100%" }}
                >
                  {branchL.map((br) => (
                    <Select.Option key={br._id} value={br._id}>
                      {br.name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col span={1}></Col>
              <Col span={12}>
                <Form.Item name="password">
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Row
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button style={{ width: 100 }} type="primary" htmlType="submit">
                  OK
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}

export default Employee;
