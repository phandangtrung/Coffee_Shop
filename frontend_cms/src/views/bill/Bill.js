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
  Form,
  notification,
  Button,
  Tag,
  DatePicker,
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
import Cookies from "js-cookie";
import orderApi from "../../api/orderApi";
import shippersApi from "../../api/shippersApi";
function Bill() {
  const [isLoading, setIsLoading] = useState(false);
  const [tabledata, settabledata] = useState([]);
  const [fakedata, setfakedata] = useState([]);
  const [isvisible, SetVisible] = useState(false);
  const [branchId, setbranchId] = useState("");
  const [employeeId, setemployeeId] = useState("");
  const [form] = Form.useForm();
  useEffect(() => {
    fetchOrderList();
  }, []);
  const [userId, setuserId] = useState("Guess");
  const [ShId, setShId] = useState("None");
  const [address, setaddress] = useState("");
  const [totalpricaed, settotalpricaed] = useState(0);
  const [detaildata, setdetaildata] = useState([]);
  const fetchOrderList = async () => {
    try {
      setIsLoading(true);
      const response = await orderApi.getAll();
      console.log("Fetch order succesfully: ", response);
      const branchIDE = Cookies.get("BranchId");

      const isAdmin = Cookies.get("isAdmin");
      if (!isAdmin) {
        const userIDE = Cookies.get("UserId");
        setemployeeId(userIDE);
      } else {
        setemployeeId("admin");
      }
      setbranchId(branchIDE);
      const neworList = response.orders.filter(
        (od) => od.branchId === branchIDE
      );
      if (isAdmin) {
        settabledata(response.orders);
      } else {
        settabledata(neworList);
      }

      setfakedata(response.orders);
      setIsLoading(false);
    } catch (error) {
      console.log("failed to fetch order list: ", error);
    }
  };
  const fetchUpdateShipper = async (shid) => {
    try {
      var form_data = new FormData();
      form_data.append("status", true);
      const params = { shid: shid, data: form_data };
      const response = await shippersApi.updateShipper(params);
      console.log("Fetch update shipper succesfully: ", response);
    } catch (error) {
      console.log("failed to fetch update shipper list: ", error);
    }
  };
  const formatCurrency = (monney) => {
    const mn = String(monney);
    return mn
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  };
  const onConfirmorder = (record) => {
    var CurrentDate = moment().toISOString();

    let employeeID = Cookies.get("UserId");
    const fetchConfirmOrder = async () => {
      setIsLoading(true);
      const params = {
        orderid: record._id,
        data: { status: true, doneAt: CurrentDate, userId: employeeID },
      };
      try {
        const response = await orderApi.confirmorder(params);
        console.log("Fetch update status succesfully: ", response);
        // fetchUpdateShipper(randomshipper);
        fetchOrderList();
        setIsLoading(false);
        notification.info({
          message: `Confirm Successfully`,
          placement: "bottomRight",
        });
      } catch (error) {
        console.log("failed to fetch update status : ", error);
      }
    };
    fetchConfirmOrder();
    // const fetchShipperList = async () => {
    //   try {
    //     setIsLoading(true);
    //     const response = await shippersApi.getAll();
    //     console.log("Fetch shipper succesfully: ", response);
    //     const shipperfreeList = response.shippers.filter(
    //       (spf) => spf.status === false
    //     );
    //     if (shipperfreeList.length > 0) {
    //       randomshipper =
    //         shipperfreeList[Math.floor(Math.random() * shipperfreeList.length)]
    //           ._id;
    //       console.log(">>randomshipper", randomshipper);
    //       fetchConfirmOrder();
    //     } else
    //       notification.info({
    //         message: `All delivery staff are currently busy`,
    //         placement: "bottomRight",
    //       });
    //   } catch (error) {
    //     console.log("failed to fetch shipper list: ", error);
    //   }
    // };
    // fetchShipperList();
  };
  const onViewdetail = (record) => {
    SetVisible(!isvisible);
    console.log(">>record.productList", record);
    // form.setFieldsValue(record);
    if (record.userId !== undefined && record.userId !== null)
      setuserId(record.userId);
    else setuserId("Admin");
    // const fetchShipperList = async () => {
    //   try {
    //     const response = await shippersApi.getAll();
    //     console.log("Fetch shipper succesfully: ", response);
    //     const shipperfreeList = response.shippers.filter(
    //       (spf) => spf._id === record.shipperId
    //     );
    //     console.log(">>>shipperfreeList", shipperfreeList);
    //     if (shipperfreeList !== []) setShId(shipperfreeList[0].name);
    //     else setShId("None");
    //   } catch (error) {
    //     setShId("None");
    //     console.log("failed to fetch shipper list: ", error);
    //   }
    // };
    // fetchShipperList();
    setaddress(record.customerAddress);
    settotalpricaed(record.totalPrices);
    let newprolist = [];
    record.productList.map((pd) =>
      newprolist.push({ ...pd.pro, quantity: pd.quantity })
    );
    console.log(">>newprolist", newprolist);
    setdetaildata([...newprolist]);
  };
  const columnsDetail = [
    {
      title: "PRODUCT ID",
      dataIndex: "_id",
      key: "_id",
      // render: (text) => <a>{text.pro._id}</a>,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "SIZE",
    //   dataIndex: "size",
    //   key: "size",
    //   // render: (text) => <a>{text}</a>,
    // },
    {
      title: "PRICE",
      dataIndex: "prices",
      key: "prices",
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      // render: () => <a>{detaildata.quantity}</a>,
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
            <>
              <Tag color="#87d068">
                <Moment format="DD/MM/YYYY hh:mm">{time}</Moment>
              </Tag>
            </>
          )}
        </>
      ),
    },
    {
      title: "Create at",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      render: (time) => (
        <p>
          <Moment format="YYYY/MM/DD hh:mm">{time}</Moment>
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
          {record.status === true ? (
            <Button
              onClick={() => onConfirmorder(record)}
              type="primary"
              disabled
            >
              Confirm
            </Button>
          ) : (
            <Button
              onClick={() => onConfirmorder(record)}
              type="primary"
              style={{ backgroundColor: "#87d068", border: "0px" }}
            >
              Confirm
            </Button>
          )}
        </Space>
      ),
    },
  ];
  const onChange = (date, dateString) => {
    console.log(">>>dateString", dateString);
    if (dateString === "") {
      settabledata(fakedata);
    } else {
      console.log(">>fakedata", fakedata);
      const newdatafilter = fakedata.filter(
        (fd) => fd.createdAt.substring(0, 10) === dateString
      );
      settabledata(newdatafilter);
      console.log(">>newdatafilter", newdatafilter);
    }
  };
  const toggle = () => {
    SetVisible(!isvisible);
  };
  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">Bill</CCardHeader>

        <CCardBody>
          <span style={{ float: "right", paddingBottom: "20px" }}>
            Filter by date <DatePicker onChange={onChange} />
          </span>
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
          footer={[]}
        >
          <Form form={form} size={"large"}>
            <Row style={{ paddingBottom: "20px" }}>
              <Col span={12}>
                <a>EmployeeID: {userId}</a>
              </Col>
              <Col span={12}>
                <a>Address: {address}</a>
              </Col>
            </Row>
            <Row style={{ paddingBottom: "10px" }}>
              <Col span={12}>
                <a>Total Price: {`${formatCurrency(totalpricaed)}đ`}</a>
              </Col>
            </Row>
            {/* <Row>
              <Col span={12}>
                <a>Shipper: {ShId}</a>
              </Col>
            </Row> */}
            <Row style={{ paddingBottom: "20px" }}>
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
