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
  Tag,
} from "antd";

import {
  CheckCircleOutlined,
  DeleteOutlined,
  UploadOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import "./style.css";
import CIcon from "@coreui/icons-react";
import shippersApi from "../../api/shippersApi";
import usersData from "../users/UsersData";
import moment from "moment";
import Moment from "react-moment";

function Shipper() {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [detail, setdetail] = useState(null);
  const uploadimg = (info) => {
    console.log(">>>>info: ", info);
    console.log(fileList);
  };
  const props = {
    onChange: uploadimg,
  };
  const fetchShipperList = async () => {
    // dispatch({ type: "FETCH_INIT" });
    try {
      setIsLoading(true);
      const response = await shippersApi.getAll();
      console.log("Fetch shipper succesfully: ", response);
      settabledata(response.shippers);
      setIsLoading(false);
    } catch (error) {
      console.log("failed to fetch shipper list: ", error);
    }
  };
  const releaseShipper = (shid) => {
    const fetchUpdateShipper = async () => {
      try {
        setIsLoading(true);
        var form_data = new FormData();
        form_data.append("status", false);
        const params = { shid: shid, data: form_data };
        const response = await shippersApi.updateShipper(params);
        console.log("Fetch update shipper succesfully: ", response);
        fetchShipperList();
      } catch (error) {
        console.log("failed to fetch update shipper list: ", error);
      }
    };
    fetchUpdateShipper();
  };
  const updateShipper = (record) => {
    setdetail(record);
    console.log(">>", record);
    if (record.status === null)
      setidShupdate({ id: record._id, status: false });
    else setidShupdate({ id: record._id, status: record.status });
    setstate({
      ...state,
      fileList: [{ url: `http://localhost:3000/${record.imagesShipper}` }],
    });
    form.setFieldsValue(record);
    SetVisible(!isvisible);
  };
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
      width: 150,
      render: (img) => (
        <img
          style={{ width: "100%", height: "auto" }}
          src={`http://localhost:3000/${img}`}
        />
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 200,
    },
    {
      title: "Identity Card",
      dataIndex: "identityCard",
      key: "identityCard",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (status) =>
        status === false ? (
          <Tag color="#87d068">FREE</Tag>
        ) : (
          <Tag color="volcano">BUSY</Tag>
        ),
    },

    {
      title: "Action",
      key: "action",
      width: 200,
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => updateShipper(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Are you sure？"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onConfirm={() => deleteShipper(record)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          {record.status === true ? (
            <Button onClick={() => releaseShipper(record._id)} type="ghost">
              Release
            </Button>
          ) : (
            ""
          )}
        </Space>
      ),
    },
  ];
  const [fileList, setfileList] = useState([]);
  const [isvisible, SetVisible] = useState(false);
  const [tabledata, settabledata] = useState([]);
  const [loadingmodal, setloadingmodal] = useState(false);
  const [state, setstate] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: [],
  });
  const deleteShipper = (record) => {
    console.log(">>>record", record);
    const fetchDelteShiper = async () => {
      try {
        setloadingmodal(true);

        // const params = { _page: 1, _limit: 10 };
        const response = await shippersApi.deleteShipper(record._id);
        console.log("Fetch deleteshipper succesfully: ", response);
        console.log(">>>response.shipper", response);
        settabledata(tabledata.filter((item) => item._id !== record._id));

        notification.info({
          message: `Deleted Successfully`,
          icon: <DeleteOutlined style={{ color: "#FF0000" }} />,
          description: `You have deleted ${record.name}`,
          placement: "bottomRight",
        });
        setloadingmodal(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        // dispatch(doCreate_error);
      }
    };
    fetchDelteShiper();
  };
  const handlePreview = (file) => {
    setstate({
      ...state,
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  const toggle = () => {
    setdetail(null);
    SetVisible(!isvisible);
  };
  const [imgfile, setimgfile] = useState(null);
  const [checkaddimg, setcheck] = useState(false);
  const [idShupdate, setidShupdate] = useState({ id: "", status: false });
  const handleChange = (fileList) => {
    setstate(fileList);
    setimgfile(fileList.file.originFileObj);
    setcheck(true);
    console.log(">>state", state);
    console.log(">>fileList", fileList);
    console.log(">>originFileObj", imgfile);
  };
  const handleOk = () => {
    if (detail === null) {
      form
        .validateFields()
        .then((values) => {
          // onCreate(values);
          console.log(">>>value", values);
          var CurrentDate = moment().toISOString();
          const data = {
            ...values,
            imagesShipper: imgfile,
            createAt: CurrentDate,
          };
          console.log("data >>>", data);
          var form_data = new FormData();

          for (var key in data) {
            form_data.append(key, data[key]);
          }
          const fetchCreateProduct = async () => {
            try {
              setloadingmodal(true);

              // const params = { _page: 1, _limit: 10 };
              const response = await shippersApi.createShipper(form_data);
              console.log("Fetch shipper succesfully: ", response);
              console.log(">>>response.shipper", response.newShippers);
              setstate({ ...state, fileList: [] });
              settabledata([...tabledata, response.newShippers]);
              setloadingmodal(false);
              setcheck(false);
              setimgfile(null);
              form.resetFields();
              notification.info({
                message: `Created Successfully`,
                icon: <CheckCircleOutlined style={{ color: "#33CC33" }} />,
                placement: "bottomRight",
              });
            } catch (error) {
              setloadingmodal(false);
              notification.info({
                message: `Created Fail`,
                icon: <ExclamationCircleFilled style={{ color: "red" }} />,
                placement: "bottomRight",
              });
              console.log("failed to fetch product list: ", error);
              // dispatch(doCreate_error);
            }
          };
          fetchCreateProduct();
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    } else {
      form.validateFields().then((values) => {
        var CurrentDate = moment().toISOString();
        let data = {};
        if (checkaddimg === false) {
          data = {
            ...values,
            _id: idShupdate.id,
            status: idShupdate.status,
            createAt: CurrentDate,
          };
        } else {
          data = {
            ...values,
            _id: idShupdate.id,
            status: idShupdate.status,
            imagesShipper: imgfile,
            createAt: CurrentDate,
          };
        }

        console.log("data >>>", data);
        var form_data = new FormData();

        for (var key in data) {
          form_data.append(key, data[key]);
        }
        const params = { shid: data._id, data: form_data };
        const fetchCreateProduct = async () => {
          try {
            setloadingmodal(true);

            // const params = { _page: 1, _limit: 10 };
            const response = await shippersApi.updateShipper(params);
            console.log("Fetch shipper succesfully: ", response);
            // console.log(">>>response.shipper", response.newShippers);
            setstate({ ...state, fileList: [] });

            setloadingmodal(false);
            setimgfile(null);
            form.resetFields();
            fetchShipperList();
            notification.info({
              message: `Update Successfully`,
              icon: <CheckCircleOutlined style={{ color: "#33CC33" }} />,
              placement: "bottomRight",
            });
          } catch (error) {
            setloadingmodal(false);
            notification.info({
              message: `Update Fail`,
              icon: <ExclamationCircleFilled style={{ color: "red" }} />,
              placement: "bottomRight",
            });
            console.log("failed to fetch product list: ", error);
            // dispatch(doCreate_error);
          }
        };
        fetchCreateProduct();
      });
    }
  };
  useEffect(() => {
    fetchShipperList();
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
          onClick={toggle}
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
      <Modal
        title={detail ? "UPDATE SHIPPER" : "ADD SHIPPER"}
        visible={isvisible}
        onOk={handleOk}
        onCancel={toggle}
        style={{ marginTop: "5%" }}
      >
        <Spin spinning={loadingmodal} size="large">
          <Form
            // initialValues={{ size: componentSize }}
            // onValuesChange={onFormLayoutChange}
            form={form}
            size={"large"}
          >
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: "Please input Name!" }]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="identityCard"
                  rules={[
                    { required: true, message: "Please input Identity Card!" },
                  ]}
                >
                  <Input placeholder="Identity Card" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: "Please input Phone!" }]}
                >
                  <Input placeholder="Phone" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item>
                  <Upload
                    {...props}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    defaultFileList={[...fileList]}
                    className="upload-list-inline"
                    onPreview={handlePreview}
                    onChange={handleChange}
                    fileList={state.fileList}
                  >
                    <p style={{ paddingBottom: "10px", fontSize: "15px" }}>
                      Product Image (png only)
                    </p>
                    {state?.fileList.length < 1 && (
                      <Button onClick={uploadimg} icon={<UploadOutlined />}>
                        Upload
                      </Button>
                    )}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}

export default Shipper;
