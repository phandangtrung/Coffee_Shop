import React, { useEffect, useState } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";
import userApi from "../../api/userApi";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import Cookies from "js-cookie";
import orderApi from "../../api/orderApi";
const WidgetsDropdown = () => {
  const [accountList, setaccountList] = useState([]);
  const [cateList, setcateList] = useState([]);
  const [proList, setproList] = useState([]);
  const [orderList, setorderList] = useState([]);
  useEffect(() => {
    const fetchAccountList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      try {
        const tokenUser = Cookies.get("tokenUser");
        const response = await userApi.getallUser(tokenUser);
        console.log("Fetch products succesfully: ", response);
        setaccountList(response.users);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchAccountList();
    const fetchcategoryList = async () => {
      try {
        const response = await categoryApi.getAll();
        console.log("Fetch products succesfully: ", response);
        setcateList(response.categories);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchcategoryList();
    const fetchproductList = async () => {
      try {
        const response = await productApi.getAll();
        console.log("Fetch products succesfully: ", response);
        setproList(response.products);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchproductList();
    const fetchorderList = async () => {
      try {
        const response = await orderApi.getAll();
        console.log("Fetch order succesfully: ", response);
        setorderList(response.orders);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchorderList();
  }, []);
  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={accountList.length}
          text="Account User"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        >
          {/* <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={cateList.length}
          text="Category"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={proList.length}
          text="Product"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: "70px" }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        ></CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={orderList.length}
          text="Oder"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
