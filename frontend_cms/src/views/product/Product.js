import React, { useState, useEffect, useReducer } from "react";
import { CCard, CCardHeader, CButton } from "@coreui/react";
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
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
// import ImgCrop from "antd-img-crop";
import "./style.css";
import productApi from "../../api/productApi";
import dataFetchReducer from "./reducer/index";
import { dataFetchReducer as dataFetchReducerCategory } from ".././category/reducer/index";
import {
  doGetList,
  doGetList_error,
  doGetList_success,
  doCreate,
  doCreate_success,
  doCreate_error,
} from "./action/actionCreater";
import { doGetList as doGetListCategory } from "../category/action/actionCreater.js";
import { doGetList_error as doGetList_errorCategory } from "../category/action/actionCreater.js";
import { doGetList_success as doGetList_successCategory } from "../category/action/actionCreater.js";
import categoryApi from "../../api/categoryApi";

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
    dataIndex: "createAt",
    key: "createAt",
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
  const [state, setstate] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: [],
    // [{
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // }],
  });
  const [imgfile, setimgfile] = useState({});
  //uploadimage
  const [sizecheck, setSizecheck] = useState({ size_M: true, size_L: false });
  const [loadingmodal, setloadingmodal] = useState(false);
  const toggle = () => {
    SetVisible(!isvisible);
  };
  const handleChange = (fileList) => {
    setstate(fileList);
    setimgfile(fileList.file.originFileObj);
    console.log(">>state", state);
    console.log(">>fileList", fileList);
    console.log(">>originFileObj", imgfile);
  };
  const handlePreview = (file) => {
    setstate({
      ...state,
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  const uploadimg = (info) => {
    console.log(">>>>info: ", info);
    console.log(fileList);
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
        var CurrentDate = moment().toISOString();

        const data = {
          ...values,
          images: imgfile,
          createAt: CurrentDate,
          ...sizecheck,
        };
        console.log("data >>>", data);

        const fetchCreateProduct = async () => {
          // dispatch({ type: "FETCH_INIT" });

          dispatch(doCreate(data));
          try {
            setloadingmodal(true);

            // const params = { _page: 1, _limit: 10 };
            const response = await productApi.createproduct(data);
            console.log("Fetch products succesfully: ", response);
            // console.log(response.products);
            // setProductList(response.products);
            // dispatch({ type: "FETCH_SUCCESS", payload: response.products });
            dispatch(doCreate_success(response));
            setloadingmodal(false);

            // console.log(">>>> productlist: ", productList);
          } catch (error) {
            console.log("failed to fetch product list: ", error);
            dispatch(doCreate_error);
          }
        };
        fetchCreateProduct();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  function onChangemcb(e) {
    setSizecheck({ ...sizecheck, size_M: e.target.checked });
    console.log(sizecheck);
  }
  function onChangelcb(e) {
    setSizecheck({ ...sizecheck, size_L: e.target.checked });
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
  const [categoryList, dispatchCategory] = useReducer(
    dataFetchReducerCategory,
    {
      isLoading: false,
      isError: false,
      data: initialData,
    }
  );
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
        // console.log(">>>> productlist: ", productList);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatch(doGetList_error);
      }
    };
    fetchProductList();
    const fetchCategoryList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      dispatchCategory(doGetListCategory);
      try {
        setIsLoading(true);
        // const params = { _page: 1, _limit: 10 };

        const response = await categoryApi.getAll();
        console.log("Fetch products succesfully: ", response);
        // console.log(response.products);
        // setProductList(response.products);
        // dispatch({ type: "FETCH_SUCCESS", payload: response.products });
        dispatchCategory(doGetList_successCategory(response.categories));
        // console.log(">>>> productlist: ", productList);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatchCategory(doGetList_errorCategory);
      }
    };
    fetchCategoryList();
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
        <Spin spinning={loadingmodal} size="large">
          <Form
            // initialValues={{ size: componentSize }}
            // onValuesChange={onFormLayoutChange}
            form={form}
            size={"large"}
          >
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input Product name!" },
                  ]}
                >
                  <Input placeholder="Product name" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="prices"
                  rules={[{ required: true, message: "Please input Price!" }]}
                >
                  <Input placeholder="Price" />
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item
                  name="quantity"
                  rules={[
                    { required: true, message: "Please input Quantity!" },
                  ]}
                >
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
                <Form.Item
                  name="categoryId"
                  rules={[
                    { required: true, message: "Please Select Category!" },
                  ]}
                >
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
                    {categoryList.data.map((category) => (
                      <Select.Option key={category._id} value={category._id}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={5}>
                Size
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "50%",
                  }}
                >
                  <Form.Item>
                    <Checkbox defaultChecked onChange={onChangemcb}>
                      M
                    </Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Checkbox onChange={onChangelcb}>L</Checkbox>
                  </Form.Item>
                </div>
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

export default Product;
