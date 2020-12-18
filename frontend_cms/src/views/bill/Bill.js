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
  Tag,
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
import orderApi from "../../api/orderApi";
function Bill() {
  const [isLoading, setIsLoading] = useState(false);
  const [tabledata, settabledata] = useState([]);
  const [isvisible, SetVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        setIsLoading(true);

        const response = await orderApi.getAll();
        console.log("Fetch order succesfully: ", response);
        settabledata(response.orders);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch order list: ", error);
      }
    };
    fetchCategoryList();
  }, []);
  const [userId, setuserId] = useState("Guess");
  const [address, setaddress] = useState("");
  const [detaildata, setdetaildata] = useState([]);
  const onViewdetail = (record) => {
    SetVisible(!isvisible);
    // form.setFieldsValue(record);
    if (record.userId !== "") setuserId(record.userId);
    else setuserId("Guess");
    setaddress(record.customerAddress);
    setdetaildata(record.productlist);
  };
  const columnsDetail = [
    {
      title: "PRODUCT ID",
      dataIndex: "product_id",
      key: "_id",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "SIZE",
      dataIndex: "size",
      key: "size",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text) => (
        <>
          {text === false ? (
            <Tag color="#f50">UNCONFIRM</Tag>
          ) : (
            <Tag color="#87d068">CONFIRMED</Tag>
          )}
        </>
      ),
    },

    {
      title: "Done at",
      dataIndex: "doneAt",
      key: "doneAt",
      width: 200,
      render: (time) => (
        <>
          {time === undefined ? (
            <Tag color="#f50">UNFINISHED</Tag>
          ) : (
            <p>
              <Moment format="DD/MM/YYYY hh:mm">{time}</Moment>
            </p>
          )}
        </>
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
          <Button onClick={() => onViewdetail(record)} type="primary">
            Detail
          </Button>

          <Button type="primary" danger>
            Conform
          </Button>
        </Space>
      ),
    },
  ];
  const toggle = () => {
    SetVisible(!isvisible);
  };
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
        <Modal
          title="ORDER DETAIL"
          visible={isvisible}
          onCancel={toggle}
          style={{ marginTop: "5%" }}
          width={800}
          footer={[
            <Button key="submit" type="primary">
              Conform
            </Button>,
          ]}
        >
          <Form form={form} size={"large"}>
            <Row style={{ paddingBottom: "20px" }}>
              <Col span={12}>
                <a>UserID: {userId}</a>
              </Col>
              <Col span={12}>
                <a>Address: {address}</a>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Table
                  columns={columnsDetail}
                  dataSource={detaildata}
                  rowKey="_id"
                />
              </Col>
            </Row>
          </Form>
        </Modal>
      </CCard>
    </>
  );
}

export default Bill;
