import React, { useEffect, useState, PureComponent } from "react";
import { CChartLine, CChartBar } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils/src";
import branchApi from "../../api/branchApi";
import orderApi from "../../api/orderApi";
import { DatePicker, Space, Row, Col } from "antd";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ComposedChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const MainChartExample = (attributes) => {
  const [branchList, setbranchList] = useState([]);
  const [rlist, setrlist] = useState([]);
  const [orderLi, setorderLi] = useState([]);
  const [prochartLi, setprochartLi] = useState([{ name: "", sold: 0 }]);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await orderApi.getAll();
        console.log("Fetch order succesfully: ", response);
        setorderLi(response.orders);
        getprood(response.orders);
        fetchbranchList(response.orders);
      } catch (error) {
        console.log("failed to fetch order list: ", error);
      }
    };
    const fetchbranchList = async (orderdata) => {
      try {
        const response = await branchApi.getAll();
        console.log("Fetch branch succesfully: ", response);
        let newbr = response.branches;
        newbr.map((nb) => {
          const bder = orderdata.filter((od) => od.branchId === nb._id);
          console.log(">>bder", bder);
          let sumto = 0;
          bder.map((bd) => {
            if (bd.status) sumto += bd.totalPrices;
          });

          const obinde = newbr.findIndex((elem) => elem._id === nb._id);
          newbr[obinde] = { ...newbr[obinde], revenue: sumto };
        });
        console.log(">>newbr", newbr);
        let dfdatset = [];
        newbr.map((nr) => {
          dfdatset.push({
            name: nr.name,
            revenue: nr.revenue,
          });
        });
        setrlist([...dfdatset]);
        setbranchList(newbr);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchOrderList();
  }, []);
  const getprood = (orderda) => {
    let pronamerr = [];
    orderda.map((od) => {
      od.productList.map((prod) => {
        if (pronamerr.indexOf(prod.pro.name) === -1) {
          pronamerr.push(prod.pro.name);
        }
      });
    });
    console.log(">>pronamerr", pronamerr);
    let listprosold = [];
    pronamerr.map((pn) => {
      let sumsold = 0;
      orderda.map((od) => {
        od.productList.map((prod) => {
          if (pn === prod.pro.name) sumsold += prod.quantity;
        });
      });
      let objpn = { name: pn, sold: sumsold };
      listprosold.push(objpn);
    });
    console.log(">>listprosold", listprosold);
    setprochartLi(listprosold);
  };
  // const randomcolor = () => {
  //   console.log(">>màu", Math.floor(Math.random() * 16777215).toString(16));
  //   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  // };
  function onChangeDate(date, dateString) {
    // console.log(dateString);
    filterord("date", dateString);
  }
  function onChangeMonth(date, dateString) {
    // console.log(dateString);
    filterord("month", dateString);
  }
  function onChangeYear(date, dateString) {
    // console.log(dateString);
    filterord("year", dateString);
  }
  const getrevenue = (newodta) => {
    let newbr = branchList;
    newbr.map((nb) => {
      const bder = newodta.filter((od) => od.branchId === nb._id);
      console.log(">>orderdata", newodta);
      let sumto = 0;
      bder.map((bd) => {
        if (bd.status) sumto += bd.totalPrices;
      });

      const obinde = newbr.findIndex((elem) => elem._id === nb._id);
      newbr[obinde] = { ...newbr[obinde], revenue: sumto };
    });
    console.log(">>newbr", newbr);
    let dfdatset = [];
    newbr.map((nr) => {
      dfdatset.push({
        name: nr.name,
        revenue: nr.revenue,
      });
    });
    setrlist([...dfdatset]);
    // setbranchList(newbr);
  };
  const filterord = (typed, datev) => {
    const newdatev = new Date(datev);
    switch (typed) {
      case "date":
        const newdtad = orderLi.filter((ol) => {
          const date = new Date(ol.updatedAt);
          return date.getDate() == newdatev.getDate();
        });
        console.log(">>newdta", newdtad);
        getrevenue(newdtad);
        break;
      case "month":
        const newdtam = orderLi.filter((ol) => {
          const date = new Date(ol.updatedAt);
          return date.getMonth() + 1 == newdatev.getMonth() + 1;
        });
        console.log(">>newdta", newdtam);
        getrevenue(newdtam);
        break;
      case "year":
        const newdtay = orderLi.filter((ol) => {
          const date = new Date(ol.updatedAt);
          return date.getFullYear() == newdatev.getFullYear();
        });
        console.log(">>newdta", newdtay);
        getrevenue(newdtay);
        break;

      default:
        break;
    }
  };
  const data = [
    {
      name: "Page A",
      uv: 590,
      pv: 800,
      amt: 1400,
    },
    {
      name: "Page B",
      uv: 868,
      pv: 967,
      amt: 1506,
    },
    {
      name: "Page C",
      uv: 1397,
      pv: 1098,
      amt: 989,
    },
    {
      name: "Page D",
      uv: 1480,
      pv: 1200,
      amt: 1228,
    },
    {
      name: "Page E",
      uv: 1520,
      pv: 1108,
      amt: 1100,
    },
    {
      name: "Page F",
      uv: 1400,
      pv: 680,
      amt: 1700,
    },
  ];
  // render
  return (
    <div>
      <div style={{ width: "100%", display: "flex", justifyItems: "flex-end" }}>
        <Row
          style={{
            width: "100%",
            marginBottom: 20,
            backgroundColor: "white",
            borderRadius: 20,
            height: 60,
          }}
        >
          <Col
            style={{ paddingLeft: 20, display: "flex", alignItems: "center" }}
            span={12}
          >
            <div style={{ fontSize: 20, fontWeight: "bold" }}>
              REVENUE STATISTICS{" "}
            </div>
          </Col>
          <Col style={{ display: "flex", alignItems: "center" }} span={4}>
            <DatePicker onChange={onChangeDate} />
          </Col>
          <Col style={{ display: "flex", alignItems: "center" }} span={4}>
            <DatePicker onChange={onChangeMonth} picker="month" />
          </Col>
          <Col style={{ display: "flex", alignItems: "center" }} span={4}>
            <DatePicker onChange={onChangeYear} picker="year" />
          </Col>
        </Row>
      </div>
      <BarChart
        width={1100}
        height={350}
        data={rlist}
        // margin={{
        //   top: 20,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" stackId="a" fill="#8884d8" />
      </BarChart>
      <ComposedChart
        layout="vertical"
        width={1100}
        height={500}
        data={prochartLi}
        margin={{
          top: 20,
          right: 25,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" scale="band" />
        <Tooltip />
        <Legend />
        <Bar dataKey="sold" fill="#f79d0e" stroke="#f79d0e" />
        {/* <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        <Line dataKey="uv" stroke="#ff7300" /> */}
      </ComposedChart>
    </div>
  );
};

export default MainChartExample;
