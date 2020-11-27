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
} from "antd";
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
  const [state_img, setstate_img] = useState({
    previewImage: "",
    previewTitle: "",
    fileList: [],
  });

  const { fileList } = state_img;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = ({ fileList }) => setstate_img({ fileList });
  //uploadimage
  const options = [
    { label: "M", value: "m" },
    { label: "L", value: "l" },
  ];

  const toggle = () => {
    SetVisible(!isvisible);
  };
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
        // onOk={handleOk}
        onCancel={toggle}
        style={{ marginTop: "5%" }}
        width={1000}
      >
        <Form
          // initialValues={{ size: componentSize }}
          // onValuesChange={onFormLayoutChange}
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
              <Form.Item name="price">
                <Input placeholder="Price" />
              </Form.Item>
            </Col>
            <Col span={6} style={{ paddingTop: "15px" }}>
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Select.Option value="jack">Jack</Select.Option>
                <Select.Option value="lucy">Lucy</Select.Option>
                <Select.Option value="tom">Tom</Select.Option>
              </Select>
            </Col>
            <Col span={5}>
              <Form.Item name="size">
                <p>Size</p>
                <Checkbox.Group
                  options={options}
                  defaultValue={["m"]}
                  size="large"
                  // onChange={onChange}
                />
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
              <Form.Item name="image">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
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
