import React, { useState, useEffect, useReducer } from "react";
import { CBadge, CCard, CCardHeader, CButton } from "@coreui/react";
import {
  Table,
  Space,
  Spin,
  Modal,
  Row,
  Col,
  Input,
  Form,
  Checkbox,
  Upload,
  Select,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import ImgCrop from "antd-img-crop";
import "./style.css";
import CIcon from "@coreui/icons-react";
import usersData from "../users/UsersData";
import productApi from "../../api/productApi";
import dataFetchReducer from "./reducer/index";
import {
  doGetList,
  doGetList_error,
  doGetList_success,
} from "./action/actionCreater";
import { PlusOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price",
    dataIndex: "prices",
    key: "prices",
  },
  {
    title: "Create at",
    dataIndex: "create_at",
    key: "create_at",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
function Product() {
  // upload image
  const [form] = Form.useForm();
  const [fileList, setfileList] = useState([]);
  //uploadimage
  const options = [
    { label: "M", value: "m" },
    { label: "L", value: "l" },
  ];
  const [sizecheck, setSizecheck] = useState({ m: false, l: false });
  const toggle = () => {
    SetVisible(!isvisible);
  };

  const uploadimg = (info) => {
    console.log(">>>>info: ", info);
    // let fileList = [...info.fileList];

    // // 1. Limit the number of uploaded files
    // // Only to show two recent uploaded files, and old ones will be replaced by the new
    // fileList = fileList.slice(-2);

    // // 2. Read from response and show file link
    // fileList = fileList.map((file) => {
    //   if (file.response) {
    //     // Component will show file.url as link
    //     file.url = file.response.url;
    //   }
    //   return file;
    // });

    // setfileList({ fileList });
    // console.log(">>>>filelist: ", fileList);
  };
  const props = {
    onChange: uploadimg,
  };
  const handleOk = (values) => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        // onCreate(values);
        console.log(">>>value", values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  function onChangemcb(e) {
    setSizecheck({ ...sizecheck, m: e.target.checked });
    console.log(sizecheck);
  }
  function onChangelcb(e) {
    setSizecheck({ ...sizecheck, l: e.target.checked });
  }
  const initialData = [];
  const [isLoading, setIsLoading] = useState(false);
  const [isvisible, SetVisible] = useState(false);
  // const [productList, setProductList] = useState([]);
  const [productList, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  useEffect(() => {
    const fetchProductList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      dispatch(doGetList);
      try {
        setIsLoading(true);
        // const params = { _page: 1, _limit: 10 };

        const response = await productApi.getAll();
        console.log("Fetch products succesfully: ", response);
        // console.log(response.products);
        // setProductList(response.products);
        // dispatch({ type: "FETCH_SUCCESS", payload: response.products });
        dispatch(doGetList_success(response.products));
        console.log(">>>> productlist: ", productList);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatch(doGetList_error);
      }
    };
    fetchProductList();
  }, []);
  const handleClick = () => {
    SetVisible(!isvisible);
  };
  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">Product</CCardHeader>
        <CButton
          style={{
            width: "200px",
            height: "50px",
            margin: "20px",
          }}
          shape="pill"
          color="info"
          onClick={handleClick}
        >
          {/* <i style={{ fontSize: "20px" }} class="cil-playlist-add"></i>  */}
          Add Product
        </CButton>
      </CCard>
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table columns={columns} dataSource={productList.data} rowKey="_id" />
      )}
      <Modal
        title="Add Product"
        visible={isvisible}
        onOk={handleOk}
        onCancel={toggle}
        style={{ marginTop: "5%" }}
        width={1000}
      >
        <Form
          // initialValues={{ size: componentSize }}
          // onValuesChange={onFormLayoutChange}
          form={form}
          size={"large"}
        >
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={12}>
              <Form.Item name="name">
                <Input placeholder="Product name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="price">
                <Input placeholder="Price" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="quantity">
                <Input type="number" placeholder="Quantity" />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={12} style={{ paddingTop: "15px" }}>
              <Form.Item name="alias">
                <Input placeholder="Alias" />
              </Form.Item>
            </Col>
            <Col span={6} style={{ paddingTop: "15px" }}>
              <Form.Item name="category">
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select Category"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Select.Option value="jack">Jack</Select.Option>
                  <Select.Option value="lucy">Lucy</Select.Option>
                  <Select.Option value="tom">Tom</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item>
                <p>Size</p>
                <Checkbox onChange={onChangemcb}>M</Checkbox>
                <Checkbox onChange={onChangelcb}>L</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={24} style={{ paddingTop: "15px" }}>
              <Form.Item name="description">
                <Input.TextArea placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item>
                <Upload
                  {...props}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  defaultFileList={[...fileList]}
                  className="upload-list-inline"
                  // fileList={fileList}
                >
                  <p style={{ paddingBottom: "10px", fontSize: "15px" }}>
                    Product Image (png only)
                  </p>
                  {fileList.length < 2 && (
                    <Button onClick={uploadimg} icon={<UploadOutlined />}>
                      Upload
                    </Button>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default Product;
