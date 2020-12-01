import React, { lazy, useEffect, useReducer, useState } from "react";
import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CLink,
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
  Checkbox,
  Upload,
  Select,
  Button,
} from "antd";
import "./style.css";
import CIcon from "@coreui/icons-react";
import { dataFetchReducer } from "./reducer/index";
import {
  doGetList,
  doGetList_error,
  doGetList_success,
} from "./action/actionCreater";
import categoryApi from "../../api/categoryApi";
import usersData from "../users/UsersData";

function Category() {
  const [form] = Form.useForm();
  const [isvisible, SetVisible] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
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
  const toggle = () => {
    SetVisible(!isvisible);
  };
  const [categoryList, dispatchCategory] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
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
        // console.log(">>>> productlist: ", productList);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatchCategory(doGetList_error);
      }
    };
    fetchCategoryList();
  }, []);
  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">Category</CCardHeader>
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
          Add Category
        </CButton>
        <CCardBody>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Spin size="large" />
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={categoryList.data}
              rowKey="_id"
            />
          )}
        </CCardBody>
      </CCard>
      <Modal
        title="Add Category"
        visible={isvisible}
        // onOk={handleOk}
        onCancel={toggle}
        style={{ marginTop: "5%" }}
      >
        <Form
          // initialValues={{ size: componentSize }}
          // onValuesChange={onFormLayoutChange}
          form={form}
          size={"large"}
        >
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={24}>
              <Form.Item name="name">
                <Input placeholder="Category name" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default Category;
