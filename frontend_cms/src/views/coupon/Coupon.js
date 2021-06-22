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
import { LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Table,
  Space,
  Spin,
  Row,
  Col,
  Input,
  Form,
  notification,
  Button,
  Popconfirm,
  Tag,
  Modal,
  InputNumber,
  DatePicker,
} from "antd";
import Moment from "react-moment";
import commentApi from "../../api/commentApi";
import couponApi from "../../api/couponApi";

function Coupon() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [tabledata, settabledata] = useState([]);
  const [loadingmodal, setloadingmodal] = useState(false);
  const [datecre, setdatecre] = useState({ startTime: "", endTime: "" });
  const deleteComment = (record) => {
    console.log("record: ", record);
    const fetchDeleteCoupon = async () => {
      try {
        setIsLoading(true);
        const response = await couponApi.delete(record._id);
        console.log("Fetch coupon succesfully: ", response);
        settabledata(tabledata.filter((coupon) => coupon._id !== record._id));
        setIsLoading(false);
      } catch (error) {
        console.log("failed to delete comment: ", error);
      }
    };
    fetchDeleteCoupon();
  };

  const columns = [
    {
      title: "Coupon Code",
      dataIndex: "couponCode",
      key: "  ",
      render: (text) => <Tag color="#87d068">{text}</Tag>,
    },
    {
      title: "Discount",
      dataIndex: "percentage",
      key: "percentage",
      render: (text) => <a>{text}%</a>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Start Date",
      dataIndex: "startTime",
      key: "startTime",
      render: (time) => (
        <Tag color="#87d068">
          <Moment format="DD/MM/YYYY">{time}</Moment>
        </Tag>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endTime",
      key: "endTime",
      render: (time) => (
        <Tag color="red">
          <Moment format="DD/MM/YYYY">{time}</Moment>
        </Tag>
      ),
    },
    {
      title: "Note",
      dataIndex: "content",
      key: "content",
      render: (proid) => <a>{proid}</a>,
    },

    {
      title: "Action",
      key: "action",
      width: 200,
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure？"
            onConfirm={() => deleteComment(record)}
          >
            <Button type="primary" danger>
              <span>Delete</span>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  function onselectDate(value, dateString) {
    console.log(
      "start: ",
      formatdate(dateString[0]),
      "end",
      formatdate(dateString[1])
    );
    setdatecre({
      startTime: formatdate(dateString[0]),
      endTime: formatdate(dateString[1]),
    });
  }
  function formatdate(datest) {
    var string = datest;
    string = string.split("-");
    const result = `${string[1]}-${string[0]}-${string[2]}`;
    return result;
  }
  const handleOk = () => {
    form.validateFields().then((values) => {
      const fetchCreateCoupon = async () => {
        try {
          setIsLoading(true);
          const datacreate = { ...values, ...datecre };
          console.log(">>datacreate", datacreate);
          const response = await couponApi.create(datacreate);
          console.log("Fetch create Coupon succesfully: ", response);
          const fetchCouponList = async () => {
            try {
              setIsLoading(true);
              const response = await couponApi.getAll();
              console.log("Fetch Coupon succesfully: ", response);
              settabledata(response.couponcode);
              setIsLoading(false);
            } catch (error) {
              console.log("failed to fetch product list: ", error);
            }
          };
          fetchCouponList();
          notification.info({
            message: `Create Successfully`,
            icon: <CheckCircleOutlined style={{ color: "#33CC33" }} />,
            placement: "bottomRight",
          });
          setIsLoading(false);
        } catch (error) {
          console.log("failed to fetch coupon: ", error);
        }
      };
      fetchCreateCoupon();
    });
  };
  useEffect(() => {
    const fetchCouponList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      try {
        setIsLoading(true);
        const response = await couponApi.getAll();
        console.log("Fetch Coupon succesfully: ", response);
        settabledata(response.couponcode);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchCouponList();
  }, []);
  const [isvisible, SetVisible] = useState(false);
  const toggle = () => {
    SetVisible(!isvisible);
  };
  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">Coupon Code</CCardHeader>
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
          Add Coupon
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
      <Modal
        title="Create Coupon"
        visible={isvisible}
        onOk={handleOk}
        onCancel={toggle}
        style={{ marginTop: "5%" }}
      >
        <Spin spinning={loadingmodal} size="large">
          <Form form={form} size={"large"}>
            <Row>
              <Col span={11}>
                <Form.Item name="amount">
                  <Input placeholder="Amount" />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={12}>
                <Form.Item name="percentage">
                  <Input addonAfter="%" placeholder="Discount" />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col span={24}>
                <DatePicker.RangePicker
                  format="DD-MM-YYYY"
                  onChange={onselectDate}
                  // onOk={onselectDate}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item name="content">
                  <Input.TextArea placeholder="Coupon Note" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}

export default Coupon;
