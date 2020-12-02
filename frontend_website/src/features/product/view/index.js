import React, { useState, useEffect, useReducer } from "react";
import { Menu, Row, Col, Carousel, BackTop, Pagination } from "antd";
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
        setIsLoading(true);
        // const params = { _page: 1, _limit: 10 };

        const response = await productApi.getAll();
        console.log("Fetch products succesfully: ", response);
        // console.log(response.products);
        // setProductList(response.products);
        // dispatch({ type: "FETCH_SUCCESS", payload: response.products });
        dispatchProduct(doGetList_success(response.products));
        console.log(">>>> productlist: ", productList);
        setIsLoading(false);
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
            {categoryList.data.map((category) => {
              return <Menu.Item key={category._id}>{category.name}</Menu.Item>;
            })}
          </Menu>
        </div>

        <div className="product-container">
          <div className="product-banner">
            <img alt="product_banner" src={Images.SBANNER} />
          </div>
          <Row>
            {productList.data.map((product) => (
              <Col span={8} key={product._id}>
                <ProductTag
                  _id={product._id}
                  name={product.name}
                  price={product.prices}
                />
              </Col>
            ))}
          </Row>

          <Pagination
            style={{ textAlign: "end" }}
            defaultCurrent={1}
            total={50}
          />
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
