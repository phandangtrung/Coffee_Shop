import React, { useState, useEffect, useReducer } from "react";
import {
  Menu,
  Row,
  Col,
  Carousel,
  BackTop,
  Pagination,
  Spin,
  Skeleton,
  Input,
  Alert,
  Select,
  Popconfirm,
  Form,
  message,
} from "antd";
import { CaretUpOutlined, CompassOutlined } from "@ant-design/icons";
import "./style.css";
import ProductTag from "../../../components/ProductTag";
import { Images } from "../../../config/image";
import data from "../dummy";
import productApi from "../../../api/productApi";
import categoryApi from "../../../api/categoryApi";
import dataFetchReducer from "../reducer/index";
import dataFetchCategory from "../reducer/index";
import {
  doGetList,
  doGetList_error,
  doGetList_success,
  doGetListCate,
  doGetListCate_success,
  doGetListCate_error,
} from "../action/actionCreater";
import { set } from "js-cookie";

const { SubMenu } = Menu;
function Product() {
  const initialData = [];
  const [isLoading, setIsLoading] = useState(false);
  const [isloadProduct, setloadProduct] = useState(false);
  const [isalter, setisalter] = useState(false);
  const [productList, setProductList] = useState([]);
  const [fakeproductList, setfakeProductList] = useState([]);
  const [BraProList, setBraProList] = useState([]);
  const [dfSelect, setDfSelect] = useState("");
  const [categoryList, dispatchCategory] = useReducer(dataFetchCategory, {
    isLoading: false,
    isError: false,
    data: [],
  });
  const [form] = Form.useForm();
  const { Search } = Input;
  const fetchBranchList = async () => {
    try {
      setloadProduct(true);
      const Brresponse = await productApi.getBranch();
      console.log("Fetch branch succesfully: ", Brresponse.branches);
      const Prresponse = await productApi.getAll();
      console.log("Fetch products succesfully: ", Prresponse.productList);
      let newBraL = [];
      Brresponse.branches.map((bl) => {
        let newproLi = { ...bl, listProduct: [] };
        bl.listProduct.map((brpro) => {
          const found = Prresponse.productList.find(
            (element) => element._id === brpro._id
          );
          newproLi.listProduct.push({ ...brpro, ...found });
        });
        newBraL.push(newproLi);
      });
      console.log(">>newBraL", newBraL);
      setBraProList(newBraL);

      const checkidb = JSON.parse(localStorage.getItem("branchID"));
      console.log(">>checkidb", checkidb);
      if (checkidb === null) {
        localStorage.setItem("branchID", JSON.stringify(newBraL[0]._id));
        form.setFieldsValue({
          selectBrid: newBraL[0].name,
        });
        setProductList(newBraL[0].listProduct);
      } else {
        const bralready = newBraL.filter((nb) => nb._id === checkidb);
        console.log(">>bralready", bralready);
        form.setFieldsValue({
          selectBrid: bralready[0].name,
        });
        setProductList(bralready[0].listProduct);
      }

      setDfSelect(String(newBraL[0].name));
      console.log(">>newBraL[0].name", newBraL[0].name);
      setfakeProductList(newBraL[0].listProduct);
      setloadProduct(false);
    } catch (error) {
      console.log("failed to fetch product list: ", error);
    }
  };
  const warning = () => {
    message.warning("Đã thay đổi cửa hàng. Giỏ hàng của bạn sẽ được làm mới");
  };

  const fetchProductList = async () => {
    try {
      setloadProduct(true);
      const response = await productApi.getAll();
      console.log("Fetch products succesfully: ", response);
      setProductList(response.productList);
      setfakeProductList(response.productList);
      setloadProduct(false);
      return response.productList;
    } catch (error) {
      console.log("failed to fetch product list: ", error);
    }
  };
  useEffect(() => {
    fetchBranchList();

    // categoryapi
    const fetchCategoryList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      dispatchCategory(doGetList);
      try {
        setIsLoading(true);
        const response = await categoryApi.getAll();
        console.log("Fetch products succesfully: ", response);
        dispatchCategory(doGetList_success(response.categories));
        console.log(">>>>categorylist: ", categoryList);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatchCategory(doGetList_error);
      }
    };
    fetchCategoryList();
  }, []);
  const handleClick = (e) => {
    console.log("click ", e);
  };

  const onSearch = (values) => {
    setisalter(false);
    if (values === "") {
      setProductList(fakeproductList);
    } else {
      const filteredProduct = fakeproductList.filter((product) => {
        return product.name.toLowerCase().indexOf(values.toLowerCase()) !== -1;
      });
      if (filteredProduct.length > 0) setProductList(filteredProduct);
      else setisalter(true);
    }
  };
  const handleChangeLoca = (value) => {
    const found = BraProList.find((element) => element.name === value);
    console.log(">>BraProList", BraProList);
    console.log(">>found", found);
    setProductList(found.listProduct);
    setfakeProductList(found.listProduct);
    localStorage.setItem("branchID", JSON.stringify(found._id));
    localStorage.removeItem("cart");
    // localStorage.removeItem("branchId");
    warning();
  };

  const fillterPro = (cateid) => {
    console.log(">>>cateid", cateid);
    const newprolist = fakeproductList.filter(
      (pro) => pro.categoryId === cateid
    );
    console.log(">>>newproList", newprolist);
    setProductList(newprolist);
  };
  function onChange(a, b, c) {
    console.log(a, b, c);
  }
  const contentStyle = {
    color: " rgb(164, 115, 67)",
    textAlign: "center",
  };
  return (
    <>
      <div className="hot-new">
        <div className="item">
          <Carousel autoplay={5000} dots={false}>
            <div>
              <h3 style={contentStyle}>
                Coffee Shope đồng hành cùng bạn trên chặn đường thưởng thức cà
                phê thật
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                Thoải mái đổi mua hàng để nhận nhiều phần quà cực hấp dẫn!
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                Tận hưởng các đặc quyền chỉ dành riêng cho thành viên Kim Cương
                Tham gia ngay
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                Chúng tôi lấy khách hàng, nhân viên và cộng đồng làm trọng tâm
                cho mọi quyết định.
              </h3>
            </div>
          </Carousel>
        </div>
      </div>
      <div className="container">
        <div className="menu-container">
          <Menu
            onClick={handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            <Menu.Item className="category-title">DANH MỤC</Menu.Item>
            <Menu.Item
              style={{ textTransform: "uppercase" }}
              key="getall"
              onClick={() => fetchBranchList()}
            >
              HIỆN TẤT CẢ
            </Menu.Item>
            {isLoading ? (
              <Skeleton active />
            ) : (
              categoryList.data.map((category) => {
                return (
                  <Menu.Item
                    style={{ textTransform: "uppercase" }}
                    key={category._id}
                    onClick={() => fillterPro(category._id)}
                  >
                    {category.name}
                  </Menu.Item>
                );
              })
            )}
          </Menu>
        </div>

        <div className="product-container">
          <div className="product-banner">
            <img alt="product_banner" src={Images.SBANNER} />
          </div>
          {isloadProduct ? (
            ""
          ) : (
            <div style={{ display: "flex", paddingLeft: "20px" }}>
              <div
                style={{
                  width: "60%",
                  marginRight: "40px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <img
                  alt="icon_location"
                  style={{ width: "40px", height: "40px" }}
                  src={Images.LOCATE}
                />
                <Form
                  style={{
                    // justifyContent: "space-between",
                    display: "flex",
                    alignItems: "center",
                    width: "90%",
                  }}
                  form={form}
                >
                  <Form.Item name="selectBrid">
                    <Select
                      style={{ width: "100%" }}
                      onChange={(values) => handleChangeLoca(values)}
                    >
                      {BraProList.map((bp) => (
                        <Select.Option
                          key={bp._id}
                          value={bp.name}
                        >{`${bp.name} - ${bp.location}`}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form>
              </div>

              <Search
                placeholder="Tìm sản phẩm"
                onSearch={onSearch}
                style={{ width: "30%", height: 35 }}
              />
            </div>
          )}

          <div className="altersearch__form">
            {isalter === true ? (
              <Alert
                className="altersearch"
                message="Could not find any Products"
                type="warning"
                showIcon
                closable
              />
            ) : (
              ""
            )}
          </div>

          <Row>
            {isloadProduct ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                <Spin size="large" />
              </div>
            ) : (
              productList.map((product) => (
                <Col lg={8} xs={24} sm={24} key={product._id}>
                  <ProductTag
                    _id={product._id}
                    name={product.name}
                    img={product.imagesProduct}
                    price={product.prices}
                    quantity={product.quantity}
                    size_L={product.size_L}
                    description={product.description}
                    storequantity={product.quantity}
                  />
                </Col>
              ))
            )}
          </Row>

          {/* <Pagination
            style={{ textAlign: "end" }}
            defaultCurrent={1}
            total={50}
          /> */}
        </div>
      </div>
      <BackTop>
        <div className="backtotop">
          <CaretUpOutlined />
        </div>
      </BackTop>
    </>
  );
}

export default Product;
