import React, { useState, useEffect, useReducer } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CLink,
  CButton,
  CSpinner,
} from "@coreui/react";
import "./style.css";
import CIcon from "@coreui/icons-react";
import usersData from "../users/UsersData";
import productApi from "../../api/productApi";
import dataFetchReducer from "./reducer/index";
const fields = [
  // { key: "id", label: "INDEX", _style: { width: "5%" } },
  { key: "name", label: "NAME", _style: { width: "15%" } },
  { key: "quantity", label: "QUANTITY", _style: { width: "15%" } },
  { key: "description", label: "DESCRIPTION", _style: { width: "23%" } },
  { key: "prices", label: "PRICE", _style: { width: "20%" } },
  { key: "create_at", label: "CREATE AT", _style: { width: "17%" } },
  { key: "action", label: "ACTION", _style: { width: "10%" } },
  // { key: "registered", _style: { width: "40%" } },
  // "role",
  // "status",
];
const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

function Product() {
  const initialData = [];
  const [isLoading, setIsLoading] = useState(false);
  // const [productList, setProductList] = useState([]);
  const [productList, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  useEffect(() => {
    const fetchProductList = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        setIsLoading(true);
        // const params = { _page: 1, _limit: 10 };

        const response = await productApi.getAll();
        console.log("Fetch products succesfully: ", response);
        // console.log(response.products);
        // setProductList(response.products);
        dispatch({ type: "FETCH_SUCCESS", payload: response.products });
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
        dispatch({ type: "FETCH_FAILURE" });
      }
    };
    fetchProductList();
  }, []);
  const handleClick = () => {
    console.log(">>>> product: ", productList.data);
  };
  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">Product</CCardHeader>
        <CButton
          style={{
            width: "200px",
            height: "50px",
            marginTop: "20px",
            marginLeft: "20px",
          }}
          shape="pill"
          color="info"
          onClick={handleClick}
        >
          {/* <i style={{ fontSize: "20px" }} class="cil-playlist-add"></i>  */}
          Add Product
        </CButton>
        <CCardBody>
          {isLoading ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: "10%",
                textAlign: "center",
              }}
            >
              <CSpinner color="info" />
            </div>
          ) : (
            <CDataTable
              items={productList.data}
              fields={fields}
              striped
              itemsPerPage={8}
              pagination
              scopedSlots={{
                index: (item) => <td>{item.id}</td>,
                status: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                ),
                action: () => (
                  <td style={{ display: "flex", justifyContent: "start" }}>
                    <div
                      style={{
                        display: "flex",
                        width: "80%",
                        justifyContent: "space-between",
                      }}
                    >
                      <CLink className="c-subheader-nav-link" href="#">
                        <CIcon name="cil-pencil" alt="Edit" />
                        {/* &nbsp;Edit */}
                      </CLink>
                      <CLink className="c-subheader-nav-link" href="#">
                        <CIcon
                          style={{ color: "red" }}
                          name="cil-trash"
                          alt="Delete"
                        />
                        {/* &nbsp;Edit */}
                      </CLink>
                    </div>
                  </td>
                ),
              }}
            />
          )}
        </CCardBody>
      </CCard>
    </>
  );
}

export default Product;
