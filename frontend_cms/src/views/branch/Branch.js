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
  InputNumber,
  Tag,
} from "antd";
import moment from "moment";
import Moment from "react-moment";
import {
  UploadOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  FilterOutlined,
  SelectOutlined,
  ReloadOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
// import ImgCrop from "antd-img-crop";
import "./style.css";
import productApi from "../../api/productApi";
import branchApi from "../../api/branchApi";
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
import { Backport } from "../../config";
import { doGetList_error as doGetList_errorCategory } from "../category/action/actionCreater.js";
import { doGetList_success as doGetList_successCategory } from "../category/action/actionCreater.js";
import categoryApi from "../../api/categoryApi";
import Cookies from "js-cookie";
function Branch() {
  const { Search } = Input;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Image",
      dataIndex: "imagesProduct",
      key: "imagesProduct",
      width: 200,
      render: (images) => (
        <img style={{ width: "100%" }} src={`${Backport}/${images}`} />
      ),
    },
    {
      title: "Category",
      dataIndex: "catName",
      key: "catName",
      width: 100,
      // render: (category) => <p>{category}</p>,
      // render: (category) => getCatenamebyid(category),
    },
    {
      title: "Description",
      width: 250,
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      width: 250,
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "prices",
      key: "prices",
      width: 150,
      render: (text) => <p>{text} VND</p>,
      sorter: (a, b) => a.prices - b.prices,
    },
    {
      title: "Update at",
      dataIndex: "updatedAt",
      key: "updatedAt",

      render: (time) => (
        <p>
          <Moment format="DD/MM/YYYY hh:mm">{time}</Moment>
        </p>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   width: 50,
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button onClick={() => updateProduct(record)} type="primary">
    //         Edit
    //       </Button>
    //       <Popconfirm
    //         title="Are you sure？"
    //         icon={<DeleteOutlined style={{ color: "red" }} />}
    //         onConfirm={() => deleteProduct(record)}
    //       >
    //         <Button type="primary" danger>
    //           Delete
    //         </Button>
    //       </Popconfirm>
    //       ,
    //     </Space>
    //   ),
    // },
  ];
  const columnsmb = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <>
          {text === false ? (
            <Tag color="#f50">CLOSED</Tag>
          ) : (
            <Tag color="#87d068">OPENING</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 50,
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure？"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onConfirm={() => {
              console.log(">>record", record);
              fetchdeletebranch(record._id);
            }}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          {record.status ? (
            <Popconfirm
              title="Are you sure？"
              icon={<UnlockOutlined style={{ color: "red" }} />}
              onConfirm={() => csttbranch(record._id, false)}
            >
              <Button type="primary" danger>
                Close
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Are you sure？"
              icon={<UnlockOutlined style={{ color: "blue" }} />}
              onConfirm={() => csttbranch(record._id, true)}
            >
              <Button type="primary">Open</Button>
            </Popconfirm>
          )}
          ,
        </Space>
      ),
    },
  ];
  // upload image
  const [form] = Form.useForm();
  const [fileList, setfileList] = useState([]);
  const [empBranch, setempBranch] = useState();
  const [isloadselect, setisloadselect] = useState(false);
  const [state, setstate] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: [],
  });
  const [isaddprod, setisaddprod] = useState(false);
  const [detail, setdetail] = useState(null);
  const [imgfile, setimgfile] = useState(null);
  const [issizeL, setissizL] = useState(true);
  const [tabledata, settabledata] = useState([]);
  const [cateList, setcateList] = useState([]);
  const [currentBranch, setcurrentBranch] = useState({});
  const getCatenamebyid = (cateL, cateid) => {
    console.log(">>cateL", cateL, "cateid", cateid);
    const cateobj = cateL.filter((dataget) => cateid === dataget._id);
    return cateobj[0]?.name;
  };
  //uploadimage
  const [isselectpro, setisselectpro] = useState(true);
  const [sizecheck, setSizecheck] = useState({ size_M: true, size_L: false });
  const [loadingmodal, setloadingmodal] = useState(false);
  const [checkaddimg, setcheck] = useState(false);
  const [branchList, setbranchList] = useState([]);
  const [choosebr, setchoosebr] = useState(false);
  const [proListcreate, setproListcreate] = useState([{ name: "" }]);
  const [dataadd, setdataadd] = useState({
    proname: "",
    da: { _id: "", quantity: 0 },
  });
  const [ismabr, setismabr] = useState(false);
  const [productBranch, setproductBranch] = useState([]);
  const toggle = () => {
    SetVisible(!isvisible);
    form.resetFields();
    setstate({ ...state, fileList: [] });
  };
  const onReloadBr = () => {
    loaddatapro();
  };
  const csttbranch = (brid, statusbr) => {
    console.log(">>id", brid);
    console.log(">>statusbr", statusbr);
    const indxa = branchList.findIndex((br) => br._id === brid);
    console.log(">>indxa", branchList[indxa]);
    const dataupdate = {
      _id: brid,
      data: { ...branchList[indxa], status: statusbr },
    };
    const updatesttbr = async () => {
      try {
        const response = await branchApi.updateproductib(dataupdate);
        console.log("Fetch update stt in branch succesfully: ", response);
        let newbr = [...branchList];
        for (var i in newbr) {
          if (newbr[i]._id == brid) {
            newbr[i].status = statusbr;
            break;
          }
        }
        setbranchList([...newbr]);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    updatesttbr();
  };
  const submitNewBr = (value) => {
    const fetchcreateBranch = async (params) => {
      console.log(">>params", params);
      const datacr = { ...params, listProduct: [] };
      try {
        setisaddprod(true);
        const response = await branchApi.createbranch(datacr);
        console.log("Fetch create branch succesfully: ", response);

        setisaddprod(false);
      } catch (error) {
        console.log("failed to fetch create branch: ", error);
      }
    };
    fetchcreateBranch(value);
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
  const fetchupdateproBranch = async (params) => {
    let dataupdate = params;
    delete dataupdate.data["_id"];
    delete dataupdate.data["alias"];
    delete dataupdate.data["createdAt"];
    delete dataupdate.data["updatedAt"];
    delete dataupdate.data["__v"];
    console.log(">>dataupdate.formdata", dataupdate.data);
    try {
      setisaddprod(true);
      const response = await branchApi.updateproductib(dataupdate);
      console.log("Fetch update product in branch succesfully: ", response);
      fetchproductBranchList(currentBranch._idd);
      // console.log(">>currentBranch", currentBranch);
      setisaddprod(false);
    } catch (error) {
      console.log("failed to fetch product list: ", error);
    }
  };
  const deleteProduct = (record) => {
    console.log("Delete: ", record._id);
    const fetchDeleteProduct = async () => {
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
  const [isaddproModal, setisaddproModal] = useState(false);
  const [isaddbrModal, setisaddbrModal] = useState(false);
  const [idProdupdate, setidProdupdate] = useState(null);
  const updateProduct = (record) => {
    setdetail(record);
    form.setFieldsValue(record);
    setstate({
      ...state,
      fileList: [{ url: `${Backport}/${record.imagesProduct}` }],
    });
    SetVisible(!isvisible);
    console.log(">>>record ", record);
    setidProdupdate(record._id);
  };
  const uploadimg = (info) => {
    console.log(">>>>info: ", info);
    console.log(fileList);
  };
  const props = {
    onChange: uploadimg,
  };
  const fetchproductBranchList = async (value) => {
    try {
      setIsLoading(true);
      const response = await branchApi.getbyId(value);
      console.log(">>đay nè", value);
      const crb = { ...response.branches, _idd: value };
      setcurrentBranch(crb);
      console.log("Fetch product by branch succesfully: ", response);
      const responsepro = await productApi.getAll();
      let producreponse = responsepro.productList;
      let newBraL = [];
      let newproLi = { ...response.branches, listProduct: [] };
      response.branches.listProduct.map((brpro) => {
        const found = producreponse.find(
          (element) => element._id === brpro._id
        );
        newproLi.listProduct.push({ ...brpro, ...found });
      });
      newBraL.push(newproLi);
      console.log(">>newBraLlistProduct", newBraL);
      // setproductBranch(response.listProduct);
      newBraL[0].listProduct.map((pdl) => {
        const cateName = getCatenamebyid(cateList, pdl.categoryId);
        const index = newBraL[0].listProduct.findIndex(
          (x) => x._id === pdl._id
        );
        newBraL[0].listProduct[index] = {
          ...newBraL[0].listProduct[index],
          catName: cateName,
        };
      });
      settabledata(newBraL[0].listProduct);
      setfakeProductList(newBraL[0].listProduct);
      setIsLoading(false);
    } catch (error) {
      console.log("failed to fetch product list: ", error);
      dispatch(doGetList_error);
    }
  };

  function onChangeBranch(value) {
    console.log(`selected ${value}`);

    fetchproductBranchList(value);
    setchoosebr(true);
  }
  const handleOk = (values) => {
    if (detail === null) {
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          // onCreate(values);
          console.log(">>>value", values);
          let data;
          if (values.size_L === undefined) {
            data = {
              ...values,
              imagesProduct: imgfile,
              size_M: 0,
              size_L: -1,
            };
          } else {
            data = {
              ...values,
              imagesProduct: imgfile,
              size_M: 0,
            };
          }

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
              const response = await productApi.createproduct(form_data);
              console.log("Fetch products succesfully: ", response);
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
            } catch (error) {
              console.log("failed to fetch product list: ", error);
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
          if (checkaddimg === false) {
            data = {
              ...values,
              _id: idProdupdate,
            };
          } else {
            data = {
              ...values,
              _id: idProdupdate,
              imagesProduct: imgfile,
            };
          }
          console.log(">>data product image ", data);

          var form_data = new FormData();

          for (var key in data) {
            form_data.append(key, data[key]);
          }
          const dataapi = { _id: data._id, formdata: form_data };
          const fetchUpdateProduct = async () => {
            // dispatch({ type: "FETCH_INIT" });

            try {
              setloadingmodal(true);
              const response = await productApi.updateproduct(dataapi);
              console.log("Fetch update products succesfully: ", response);
              loaddatapro();
              setloadingmodal(false);
              notification.info({
                message: `Update Successfully`,
                icon: <CheckCircleOutlined style={{ color: "#33CC33" }} />,
                placement: "bottomRight",
              });
            } catch (error) {
              console.log("failed to fetch product list: ", error);
            }
          };
          fetchUpdateProduct();
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
  const [fakeproductList, setfakeProductList] = useState([]);
  // const [productList, setProductList] = useState([]);
  // const onSearch = (values) => {
  //   if (values === "") {
  //     settabledata(fakeproductList);
  //   } else {
  //     const filteredProduct = fakeproductList.filter((product) => {
  //       return product.name.toLowerCase().indexOf(values.toLowerCase()) !== -1;
  //     });
  //     console.log(">>>filteredProduct", filteredProduct);
  //     if (filteredProduct.length > 0) settabledata(filteredProduct);
  //   }
  // };
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
  const fetchbranchList = async (produclist) => {
    try {
      const response = await branchApi.getAll();
      console.log("Fetch branch succesfully: ", response);
      let newBraL = [];
      response.branches.map((bl) => {
        let newproLi = { ...bl, listProduct: [] };
        bl.listProduct.map((brpro) => {
          const found = produclist.find((element) => element._id === brpro._id);
          newproLi.listProduct.push({ ...brpro, ...found });
        });
        newBraL.push(newproLi);
      });
      console.log(">>newBraL", newBraL);

      setbranchList(response.branches);
    } catch (error) {
      console.log("failed to fetch product list: ", error);
      dispatch(doGetList_error);
    }
  };
  const fetchdeletebranch = async (br_id) => {
    try {
      const response = await branchApi.deletebranch(br_id);
      console.log("Fetch branch succesfully: ", response);
      const newbrlist = branchList.filter((br) => br._id !== br_id);
      setbranchList(newbrlist);
    } catch (error) {
      console.log("failed to fetch product list: ", error);
    }
  };
  const loaddatapro = () => {
    setIsLoading(true);
    setisloadselect(true);
    const fetchProductList = async (cateL) => {
      dispatch(doGetList);
      try {
        const response = await productApi.getAll();
        console.log("Fetch products succesfully: ", response);
        dispatch(doGetList_success(response.productList));

        let producreponse = response.productList;
        response.productList.map((pdl) => {
          const cateName = getCatenamebyid(cateL, pdl.categoryId);
          const index = producreponse.findIndex((x) => x._id === pdl._id);
          producreponse[index] = { ...producreponse[index], catName: cateName };
        });
        fetchbranchList(response.productList);
        console.log(">>producreponse", producreponse);
        setisloadselect(false);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatch(doGetList_error);
      }
    };

    const fetchCategoryList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      dispatchCategory(doGetListCategory);
      try {
        const response = await categoryApi.getAll();
        console.log("Fetch cate succesfully: ", response);
        dispatchCategory(doGetList_successCategory(response.categories));
        setcateList(response.categories);
        fetchProductList(response.categories);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatchCategory(doGetList_errorCategory);
      }
    };
    fetchCategoryList();
  };
  useEffect(() => {
    loaddatapro();
    const fetchCategoryList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      dispatchCategory(doGetListCategory);
      try {
        const response = await categoryApi.getAll();
        console.log("Fetch cate succesfully: ", response);
        dispatchCategory(doGetList_successCategory(response.categories));
        setcateList(response.categories);
        // fetchProductList(response.categories);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatchCategory(doGetList_errorCategory);
      }
    };
    fetchCategoryList();
    const branchIDE = Cookies.get("BranchId");
    console.log(">>branchIDE", branchIDE);

    setempBranch(branchIDE);
    if (branchIDE !== "undefined") {
      fetchproductBranchList(branchIDE);
      setchoosebr(true);
    }
  }, []);
  const handleClick = () => {
    setdetail(null);
    SetVisible(!isvisible);
  };
  const { Option } = Select;
  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">Branch</CCardHeader>
        <Row>
          <Col lg={5}>
            {empBranch === "undefined" ? (
              // <CButton
              //   style={{
              //     width: "200px",
              //     height: "50px",
              //     margin: "20px 0px 20px 20px",
              //   }}
              //   shape="pill"
              //   color="info"
              //   onClick={() => setisaddbrModal(true)}
              // >
              //   {/* <i style={{ fontSize: "20px" }} class="cil-playlist-add"></i>  */}
              //   Add Branch
              // </CButton>
              <CButton
                style={{
                  width: "200px",
                  height: "50px",
                  margin: "20px 0px 20px 20px",
                }}
                shape="pill"
                color="info"
                onClick={() => setismabr(true)}
              >
                {/* <i style={{ fontSize: "20px" }} class="cil-playlist-add"></i>  */}
                Manage Branch
              </CButton>
            ) : (
              <div
                style={{
                  width: "200px",
                  height: "50px",
                  margin: "20px 0px 20px 20px",
                }}
              ></div>
            )}
          </Col>
          <Col lg={9}>
            {choosebr !== false ? (
              <CButton
                style={{
                  width: "200px",
                  height: "50px",
                  margin: "20px 0px 20px 20px",
                }}
                shape="pill"
                color="info"
                onClick={() => setisaddproModal(true)}
              >
                {/* <i style={{ fontSize: "20px" }} class="cil-playlist-add"></i>  */}
                Add Product
              </CButton>
            ) : (
              <div
                style={{
                  width: "200px",
                  height: "50px",
                  margin: "20px 0px 20px 20px",
                }}
              ></div>
            )}
          </Col>

          <Col lg={8} style={{ display: "flex", alignItems: "center" }}>
            {empBranch === "undefined" ? (
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a Branch"
                onChange={onChangeBranch}
                loading={isloadselect}
              >
                {branchList.map((bl) => (
                  <Select.Option key={bl._id} value={bl._id}>
                    {`Chi nhánh: ${bl.location}`}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              ""
            )}
          </Col>
          <Col
            style={{ display: "flex", paddingLeft: 10, alignItems: "center" }}
            span={1}
          >
            <ReloadOutlined
              onClick={onReloadBr}
              style={{ fontSize: 20, cursor: "pointer" }}
            />
          </Col>
        </Row>
      </CCard>
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : choosebr === false ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px",
            fontWeight: "bold",
            height: "300px",
            color: "white",
            backgroundColor: "RGB(60, 75, 100)",
          }}
        >
          <div style={{ paddingRight: "10px" }}>Please Select Branch First</div>{" "}
          <SelectOutlined />
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
              <Col span={1}></Col>
              <Col span={11}>
                <Form.Item
                  name="prices"
                  rules={[{ required: true, message: "Please input Price!" }]}
                >
                  <Input placeholder="Price" />
                </Form.Item>
              </Col>
              {/* <Col span={5}>
                <Form.Item
                  name="quantity"
                  rules={[
                    { required: true, message: "Please input Quantity!" },
                  ]}
                >
                  <Input type="number" placeholder="Quantity" />
                </Form.Item>
              </Col> */}
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

              <Col
                style={{
                  alignItems: "center",
                  width: "70%",
                }}
                span={11}
              >
                {/* <Form.Item>
                    <Checkbox defaultChecked onChange={onChangemcb}>
                      M
                    </Checkbox>
                  </Form.Item> */}
                <div
                  style={{
                    width: "15%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Size
                  <Checkbox onChange={() => setissizL(!issizeL)}>L</Checkbox>
                </div>
                <Form.Item name="size_L">
                  <Input
                    style={{ width: "100%" }}
                    disabled={issizeL}
                    placeholder="Price"
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
      <Modal
        title="ADD PRODUCT"
        visible={isaddproModal}
        style={{ margin: "5% 0px 0px 35%" }}
        onOk={() => {
          console.log(">>currenbranch", currentBranch);

          let newcurrent = currentBranch;
          const checkpro = () => {
            return currentBranch.listProduct.find(
              (fr) => fr._id === dataadd.da._id
            );
          };
          if (checkpro() === undefined) {
            newcurrent.listProduct.push(dataadd.da);
            console.log(">>>chuatontai");
          } else {
            console.log(">>datontai");

            for (var i in newcurrent.listProduct) {
              if (newcurrent.listProduct[i]._id === dataadd.da._id) {
                newcurrent.listProduct[i].quantity = dataadd.da.quantity;
                break;
              }
            }
            console.log(">>newcurrent", newcurrent);
          }

          const dataup = { _id: newcurrent._id, data: newcurrent };
          console.log(">>dataup", dataup);
          fetchupdateproBranch(dataup);
          // setcurrentBranch({
          //   ...currentBranch,
          //   listProduct: [...currentBranch.listProduct, ...dataadd],
          // });
          console.log(">>dataadd OK", dataadd);
        }}
        width={600}
        onCancel={() => {
          setisaddproModal(false);
          setisselectpro(true);
          setdataadd({ ...dataadd, proname: "" });
        }}
      >
        <Spin size="large" spinning={isaddprod}>
          <Row>
            <Col span={11}>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select Category"
                onChange={(value) => {
                  setisselectpro(false);
                  const newpl = productList.data.filter(
                    (pl) => pl.categoryId === value
                  );
                  if (newpl.length === 0) {
                    setdataadd({ ...dataadd, proname: "" });
                    setproListcreate([]);
                  } else {
                    setdataadd({
                      ...dataadd,
                      proname: newpl[0].name,
                      da: { ...dataadd.da, _id: newpl[0]._id },
                    });
                    setproListcreate(newpl);
                  }
                }}
              >
                {cateList.map((cate) => (
                  <Select.Option key={cate._id} value={cate._id}>
                    {cate.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={1}></Col>
            <Col span={12}>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select Product"
                disabled={isselectpro}
                value={dataadd.proname}
                onChange={(value) => {
                  setdataadd({
                    ...dataadd,
                    proname: value,
                    da: { ...dataadd.da, _id: value },
                  });
                }}
              >
                {proListcreate.map((pl) => (
                  <Select.Option key={pl._id} value={pl._id}>
                    {pl.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div style={{ height: "20px" }}></div>
            </Col>
          </Row>
          {dataadd.proname !== "" ? (
            <Row>
              <Col span={8}>
                <InputNumber
                  style={{ width: "95%" }}
                  addonAfter={<div>items</div>}
                  placeholder="Quantity"
                  min={1}
                  max={100}
                  onChange={(value) => {
                    setdataadd({
                      ...dataadd,
                      da: { ...dataadd.da, quantity: value },
                    });
                  }}
                />
              </Col>
              <Col span={14}>Items</Col>
            </Row>
          ) : (
            ""
          )}
        </Spin>
      </Modal>
      <Modal
        title="ADD BRANCH"
        visible={isaddbrModal}
        style={{ margin: "5% 0px 0px 35%" }}
        onOk={() => {}}
        width={600}
        onCancel={() => {
          setisaddbrModal(false);
        }}
        footer={[]}
      >
        <Spin size="large" spinning={isaddprod}>
          <Form onFinish={(value) => submitNewBr(value)}>
            <Row>
              <Col span={11}>
                <Form.Item name="name">
                  <Input placeholder="Branch name" />
                </Form.Item>
              </Col>

              <Col span={1}></Col>
              <Col span={12}>
                <Form.Item name="location">
                  <Input placeholder="Address" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={15}></Col>
              <Col span={9}>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    style={{ width: "100%" }}
                    type="primary"
                  >
                    OK
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
      <Modal
        title="MANAGE BRANCH"
        style={{ margin: "2% 0px 0px 25%" }}
        width={900}
        visible={ismabr}
        onOk={() => setismabr(false)}
        onCancel={() => setismabr(false)}
      >
        <CButton
          style={{
            width: "150px",
            height: "50px",
            marginBottom: 10,
          }}
          shape="pill"
          color="info"
          onClick={() => setisaddbrModal(true)}
        >
          {/* <i style={{ fontSize: "20px" }} class="cil-playlist-add"></i>  */}
          Add Branch
        </CButton>

        <Table dataSource={branchList} columns={columnsmb} />
      </Modal>
    </>
  );
}

export default Branch;
