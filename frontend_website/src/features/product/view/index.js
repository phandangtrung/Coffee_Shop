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
} from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
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

const { SubMenu } = Menu;
function Product() {
  const initialData = [];
  const [isLoading, setIsLoading] = useState(false);
  const [isloadProduct, setloadProduct] = useState(false);
  const [productList, dispatchProduct] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });
  const [categoryList, dispatchCategory] = useReducer(dataFetchCategory, {
    isLoading: false,
    isError: false,
    data: [],
  });

  useEffect(() => {
    // productapi
    const fetchProductList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      dispatchProduct(doGetList);
      try {
        setloadProduct(true);
        const response = await productApi.getAll();
        console.log("Fetch products succesfully: ", response);
        dispatchProduct(doGetList_success(response.products));
        console.log(">>>> productlist: ", productList);
        setloadProduct(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatchProduct(doGetList_error);
      }
    };
    fetchProductList();

    // categoryapi
    const fetchCategoryList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      dispatchCategory(doGetList);
      try {
        setIsLoading(true);
        // const params = { _page: 1, _limit: 10 };

        const response = await categoryApi.getAll();
        console.log("Fetch products succesfully: ", response);
        // console.log(response.products);
        // setProductList(response.products);
        // dispatch({ type: "FETCH_SUCCESS", payload: response.products });
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
  const getallProduct = () => {
    const fetchProductList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      dispatchProduct(doGetList);
      try {
        setloadProduct(true);
        const response = await productApi.getAll();
        console.log("Fetch products succesfully: ", response);
        dispatchProduct(doGetList_success(response.products));
        console.log(">>>> productlist: ", productList);
        setloadProduct(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatchProduct(doGetList_error);
      }
    };
    fetchProductList();
  };
  const fillterPro = (cateid) => {
    console.log(">>>cateid", cateid);
    const fetchCategoryList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      dispatchProduct(doGetList);
      try {
        setloadProduct(true);
        const response = await categoryApi.getProbyid(cateid);
        console.log("Fetch products succesfully: ", response);
        dispatchProduct(doGetList_success(response.products));
        setloadProduct(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatchProduct(doGetList_error);
      }
    };
    fetchCategoryList();
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
            <Menu.Item className="category-title">CATEGORIES</Menu.Item>
            <Menu.Item
              style={{ textTransform: "uppercase" }}
              key="getall"
              onClick={() => getallProduct()}
            >
              ALL PRODUCT
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
          <Row>
            {isloadProduct ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                <Spin size="large" />
              </div>
            ) : (
              productList.data.map((product) => (
                <Col lg={8} xs={24} sm={24} key={product._id}>
                  <ProductTag
                    _id={product._id}
                    name={product.name}
                    img={product.imagesProduct}
                    price={product.prices}
                    description={product.description}
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
