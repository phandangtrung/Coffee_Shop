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
  notification,
  Popconfirm,
} from "antd";
import moment from "moment";
import Moment from "react-moment";
import {
  UploadOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
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
  doDelete,
} from "./action/actionCreater";
import { doGetList as doGetListCategory } from "../category/action/actionCreater.js";
import { doGetList_error as doGetList_errorCategory } from "../category/action/actionCreater.js";
import { doGetList_success as doGetList_successCategory } from "../category/action/actionCreater.js";
import categoryApi from "../../api/categoryApi";

function Product() {
  const locallink = "http://localhost:3000";
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      width: 200,
      render: (images) => (
        <img style={{ width: "100%" }} src={`${locallink}/${images}`} />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (category) => <p>{category}</p>,
    },
    {
      title: "Description",
      width: 250,
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "prices",
      key: "prices",
      width: 150,
      render: (text) => <p>{text} VND</p>,
    },
    {
      title: "Create at",
      dataIndex: "createAt",
      key: "createAt",
      render: (time) => (
        <p>
          <Moment format="DD/MM/YYYY hh:mm">{time}</Moment>
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => updateProduct(record)} type="primary">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure？"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onConfirm={() => deleteProduct(record)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          ,
        </Space>
      ),
    },
  ];
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
  const [detail, setdetail] = useState(null);
  const [imgfile, setimgfile] = useState(null);
  const [tabledata, settabledata] = useState([]);
  //uploadimage
  const [sizecheck, setSizecheck] = useState({ size_M: true, size_L: false });
  const [loadingmodal, setloadingmodal] = useState(false);
  const [checkaddimg, setcheck] = useState(false);
  const toggle = () => {
    SetVisible(!isvisible);
    form.resetFields();
    setstate({ ...state, fileList: [] });
  };
  const handleChange = (fileList) => {
    setstate(fileList);
    setimgfile(fileList.file.originFileObj);
    setcheck(true);
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
  const deleteProduct = (record) => {
    console.log("Delete: ", record._id);
    const fetchDeleteProduct = async () => {
      // dispatch({ type: "FETCH_INIT" });

      // dispatch(doDelete(data));
      try {
        setIsLoading(true);
        const response = await productApi.deleteproduct(record._id);
        console.log("Fetch products succesfully: ", response);
        notification.info({
          message: `Deleted Successfully`,
          icon: <DeleteOutlined style={{ color: "#FF0000" }} />,
          description: `You have deleted ${record.name}`,
          placement: "bottomRight",
        });
        settabledata(tabledata.filter((item) => item._id !== record._id));
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchDeleteProduct();
  };
  const updateProduct = (record) => {
    setdetail(record);
    form.setFieldsValue(record);
    setstate({
      ...state,
      fileList: [{ url: `http://localhost:3000/${record.images}` }],
    });
    SetVisible(!isvisible);
    console.log(">>>record ", record);
  };
  const uploadimg = (info) => {
    console.log(">>>>info: ", info);
    console.log(fileList);
  };
  const props = {
    onChange: uploadimg,
  };
  const handleOk = (values) => {
    if (detail === null) {
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
          var form_data = new FormData();

          for (var key in data) {
            form_data.append(key, data[key]);
          }
          const fetchCreateProduct = async () => {
            // dispatch({ type: "FETCH_INIT" });

            dispatch(doCreate(data));
            try {
              setloadingmodal(true);

              // const params = { _page: 1, _limit: 10 };
              const response = await productApi.createproduct(form_data);
              console.log("Fetch products succesfully: ", response);
              // console.log(response.products);
              // setProductList(response.products);
              // dispatch({ type: "FETCH_SUCCESS", payload: response.products });
              // dispatch(doCreate_success(response));
              setstate({ ...state, fileList: [] });
              settabledata([...tabledata, response.newProducts]);
              setimgfile(null);
              setcheck(false);
              setloadingmodal(false);
              notification.info({
                message: `Created Successfully`,
                icon: <CheckCircleOutlined style={{ color: "#33CC33" }} />,
                placement: "bottomRight",
              });

              // console.log(">>>> productlist: ", productList);
            } catch (error) {
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
      console.log(">>>Update");
      form
        .validateFields()
        .then((values) => {
          // onCreate(values);
          console.log(">>>value", values);
          var CurrentDate = moment().toISOString();
          let data = {};
          if (checkaddimg === true) {
            data = {
              ...values,
              createAt: CurrentDate,
              ...sizecheck,
            };
          } else {
            data = {
              ...values,
              images: imgfile,
              createAt: CurrentDate,
              ...sizecheck,
            };
          }
          console.log(">>data product image ", data);

          // console.log("data >>>", data);
          // var form_data = new FormData();

          // for (var key in data) {
          //   form_data.append(key, data[key]);
          // }
          // const fetchCreateProduct = async () => {
          //   // dispatch({ type: "FETCH_INIT" });

          //   dispatch(doCreate(data));
          //   try {
          //     setloadingmodal(true);

          //     // const params = { _page: 1, _limit: 10 };
          //     const response = await productApi.updateproduct(form_data);
          //     console.log("Fetch update products succesfully: ", response);
          //     // console.log(response.products);
          //     // setProductList(response.products);
          //     // dispatch({ type: "FETCH_SUCCESS", payload: response.products });
          //     // dispatch(doCreate_success(response));
          //     setstate({ ...state, fileList: [] });
          //     settabledata([...tabledata, response.newProducts]);
          //     setloadingmodal(false);

          //     notification.info({
          //       message: `Update Successfully`,
          //       icon: <CheckCircleOutlined style={{ color: "#33CC33" }} />,
          //       placement: "bottomRight",
          //     });

          //     // console.log(">>>> productlist: ", productList);
          //   } catch (error) {
          //     console.log("failed to fetch product list: ", error);
          //     // dispatch(doCreate_error);
          //   }
          // };
          // fetchCreateProduct();
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    }
  };
  function onChangemcb(e) {
    setSizecheck({ ...sizecheck, size_M: e.target.checked });
    console.log(sizecheck);
  }
  function onChangelcb(e) {
    setSizecheck({ ...sizecheck, size_L: e.target.checked });
  }
  // const fetchCategorybyID = async (categoryID) => {
  //   try {
  //     // setIsLoading(true);
  //     const response = await categoryApi.getbyID(categoryID);
  //     console.log("Fetch categoryby ID succesfully: ", response);
  //     return response.categories.name;
  //     // settabledata(response.products);
  //     // setIsLoading(false);
  //   } catch (error) {
  //     console.log("failed to fetch category list: ", error);
  //   }
  // };
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
      dispatch(doGetList);
      try {
        setIsLoading(true);
        const response = await productApi.getAll();
        console.log("Fetch products succesfully: ", response);
        dispatch(doGetList_success(response.products));
        settabledata(response.products);
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
        const response = await categoryApi.getAll();
        console.log("Fetch products succesfully: ", response);
        dispatchCategory(doGetList_successCategory(response.categories));
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatchCategory(doGetList_errorCategory);
      }
    };
    fetchCategoryList();
  }, []);
  const handleClick = () => {
    setdetail(null);
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
        <Table columns={columns} dataSource={tabledata} rowKey="_id" />
      )}

      <Modal
        title={detail ? "UPDATE PRODUCT" : "ADD PRODUCT"}
        visible={isvisible}
        onOk={handleOk}
        onCancel={toggle}
        style={{ margin: "5% 0px 0px 25%" }}
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
              {/* <Col span={12} style={{ paddingTop: "15px" }}>
                <Form.Item name="alias">
                  <Input placeholder="Alias" />
                </Form.Item>
              </Col> */}
              <Col span={12} style={{ paddingTop: "15px" }}>
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
              <Col span={1}></Col>
              <Col span={11}>
                Size
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "30%",
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
