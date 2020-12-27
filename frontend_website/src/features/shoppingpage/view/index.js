import React, { useState, useEffect } from "react";
import "./style.css";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  Steps,
  Spin,
  notification,
  Typography,
} from "antd";
import Moment from "react-moment";
import moment from "moment";
import { Images } from "../../../config/image";
import CurrencyFormat from "react-currency-format";
import {
  ShoppingCartOutlined,
  EnvironmentOutlined,
  UserOutlined,
  PhoneOutlined,
  AudioOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Mapstore from "../../../components/Maps/Maps";
import Geocode from "react-geocode";
import productApi from "../../../api/productApi";
import orderApi from "../../../api/orderApi";
import couponApi from "../../../api/couponApi";
import Modal from "antd/lib/modal/Modal";
function ShoppingPage(props) {
  const { Text, Link } = Typography;
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        setisloading(true);
        const response = await productApi.getAll();
        console.log("Fetch products succesfully: ", response);
        setproductList(response.products);
        setisloading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchProductList();
    // categoryapi
    if (JSON.parse(localStorage.getItem("cart")) !== null) {
      setcart(JSON.parse(localStorage.getItem("cart")));
      settotalPrice(calculateTotal(JSON.parse(localStorage.getItem("cart"))));
      setfaketotal(calculateTotal(JSON.parse(localStorage.getItem("cart"))));
    }
  }, []);
  const [cart, setcart] = useState([]);
  const [productList, setproductList] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [totalPrice, settotalPrice] = useState(0);
  Geocode.setApiKey("AIzaSyB_eKxh8KTsPy6aPPJPROh2yP75dTvg92o");
  const [form] = Form.useForm();
  const [coordinates, setCoordinates] = useState({
    lat: 10.850899,
    lng: 106.771948,
  });
  const [address, setaddress] = useState("");
  const [loadCart, setloadCart] = useState(false);
  const [isloadorder, setisloadorder] = useState(false);
  const [position, setPosition] = useState({
    title: "The marker`s title will appear as a tooltip.",
    name: "SOMA",
    position: { lat: 37.778519, lng: -122.40564 },
  });

  const updateAmount = (proid, e) => {
    console.log(">>amount", e);
    console.log(">>proid", proid);
    let newcart = cart;
    for (var i in cart) {
      if (newcart[i].product_id === proid) {
        newcart[i].quantity = e;
        break;
      }
    }
    setcart(newcart);
    localStorage.setItem("cart", JSON.stringify(newcart));
    settotalPrice(calculateTotal(newcart));
    form.setFieldsValue({
      couponCode: "",
    });
    setalteraplly(null);
    setfaketotal(calculateTotal(newcart));
  };
  const loadmaxpro = (proid) => {
    const proindex = productList.findIndex((prox) => prox.product_id === proid);
    const prooj = productList[proindex]?.quantity;
    // return productList[proindex]?.quantity;
    return prooj;
  };
  const deleteitem = (proid) => {
    const newCart = cart.filter((cartitem) => cartitem.product_id !== proid);
    setcart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const handleOk = (values) => {
    console.log("form value", values);
    const timeorder = moment().format();
    const orderdata = {
      ...values,
      createAt: timeorder,
      userId: "",
      totalPrices: totalPrice,
      productlist: cart,
    };
    console.log(">>>data order", orderdata);
    const fetchOrder = async () => {
      try {
        setisloadorder(true);
        const response = await orderApi.createorder(orderdata);
        console.log("Fetch order succesfully: ", response);
        setisloadorder(false);
        localStorage.removeItem("cart");
        setcart([]);
        notification.open({
          message: "Order Successfully",
          description: "Thanks you verry much",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
      } catch (error) {
        console.log("failed to fetch order: ", error);
      }
    };
    fetchOrder();
  };
  const calculateTotal = (cart) => {
    if (cart.length > 0) {
      let totalprice = 0;
      for (var i in cart) {
        totalprice = totalprice + cart[i].price * cart[i].quantity;
      }
      return totalprice;
    }
    return 0;
  };
  const columns = [
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (name, row) => (
        <CloseOutlined
          onClick={() => deleteitem(row.product_id)}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <>
          <span style={{ textAlign: "start" }} className="productname">
            {name}
          </span>
        </>
      ),
    },
    {
      title: "SIZE",
      dataIndex: "size",
      key: "size",
      render: (size) => (
        <Select
          className="productname"
          defaultValue="m"
          style={{ width: 80, textAlign: "center" }}
        >
          <Select.Option className="productname" value="m">
            M
          </Select.Option>
          <Select.Option className="productname" value="l">
            L
          </Select.Option>
        </Select>
      ),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, row) => (
        <InputNumber
          onChange={(e) => updateAmount(row.product_id, e)}
          className="productname"
          placeholder={quantity}
          min={1}
          max={loadmaxpro(row.product_id)}
        />
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="productname">
          <CurrencyFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
          />
          {""} VND
        </span>
      ),
    },
  ];

  const handleSearch = (value) => {
    Geocode.fromAddress(value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log({ lat: lat, lng: lng });
        setCoordinates({ lat: lat, lng: lng });
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const oncheck = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setPosition({
      title: "",
      name: "",
      position: { lat, lng },
    });
    setCoordinates({ lat: lat, lng: lng });
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setaddress(address);
        form.setFieldsValue({ customerAddress: address });
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const [alteraplly, setalteraplly] = useState(null);
  const [faketotal, setfaketotal] = useState(0);
  const applycode = (values) => {
    console.log(">>values", values);
    const fetchCoupon = async () => {
      try {
        const response = await couponApi.getAll();
        console.log("Fetch order succesfully: ", response);
        const getbycoupon = response.couponcode.filter(
          (rp) => rp.couponCode === values.couponCode.toUpperCase()
        );
        console.log(">>getbycoupon", getbycoupon);
        if (getbycoupon.length > 0) {
          const perse = Number(getbycoupon[0].discount);
          const totlapr = faketotal - faketotal * (perse / 100);
          settotalPrice(totlapr);
          setalteraplly(
            `Bạn đã nhập mã  ${getbycoupon[0].note} ${getbycoupon[0].discount}%`
          );
        } else {
          setalteraplly("Mã không hợp lệ");
          settotalPrice(faketotal);
        }
      } catch (error) {
        console.log("failed to fetch order: ", error);
      }
    };
    fetchCoupon();
  };
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const { Step } = Steps;
  return (
    <>
      <div className="shopping-container">
        <div className="shopping-card">
          <div className="cart-container">
            <div className="title-form">
              <div className="title">Shopping Cart</div>
              <div className="item-cart">{cart.length} Items</div>
            </div>

            <hr />
            <Spin spinning={isloading}>
              <Table
                pagination={false}
                dataSource={cart}
                columns={columns}
                rowKey="_id"
              />
            </Spin>
            <Button className="button-checkout-repon" onClick={showModal}>
              CHECK OUT DT
            </Button>
          </div>
        </div>
        <div className="order-form">
          <div className="order-content">
            <div className="title-form">Order Summary</div>
            <hr />
            <div className="saleoff-form">
              <div className="title">PROMO CODE</div>
              <Form form={form} onFinish={applycode}>
                <Form.Item
                  name="couponCode"
                  extra={
                    alteraplly !== null ? (
                      <Text type="warning">{alteraplly}</Text>
                    ) : (
                      ""
                    )
                  }
                >
                  <Input />
                </Form.Item>

                <Button
                  htmlType="submit"
                  className="button-apply"
                  type="dashed"
                  danger
                >
                  APPLY
                </Button>
              </Form>
            </div>
            <hr />
            <div className="totalcost-form">
              <div>TOTAL COST</div>
              <div>
                <CurrencyFormat
                  value={totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                {""} VND
              </div>
            </div>
            <Button className="button-checkout" onClick={showModal}>
              CHECK OUT
            </Button>
          </div>
        </div>
      </div>
      <Modal
        closable={false}
        visible={visible}
        onCancel={handleCancel}
        width={1000}
        footer={[]}
      >
        <Spin spinning={isloadorder}>
          <div className="modal-order">
            <Form form={form} onFinish={handleOk}>
              <div className="title-modal">COMPLETE ORDER</div>
              <Form.Item>
                <div className="maps-form ">
                  <Mapstore
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    oncheck={oncheck}
                  />
                </div>
              </Form.Item>
              <Row>
                <Col span={24}>
                  <Form.Item name="customerAddress">
                    <Input.Search
                      enterButton="Find on Map"
                      prefix={<EnvironmentOutlined />}
                      placeholder="Address"
                      size="large"
                      onSearch={handleSearch}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ paddingRight: "5px" }}>
                  <Form.Item name="customerName">
                    <Input
                      prefix={<UserOutlined />}
                      className="input-modal"
                      placeholder="Name of consignee"
                    />
                  </Form.Item>
                </Col>
                <Col span={12} style={{ paddingLeft: "5px" }}>
                  <Form.Item name="customerPhone">
                    <Input
                      prefix={<PhoneOutlined />}
                      className="input-modal"
                      placeholder="Phone"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item>
                    <Input className="input-modal" placeholder="Note" />
                  </Form.Item>
                </Col>
              </Row>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Steps
                  style={{
                    width: "80%",
                  }}
                >
                  <Step
                    status="finish"
                    title="Select Product"
                    icon={<UserOutlined />}
                  />
                  <Step
                    status="process"
                    title="Fill order"
                    icon={<SolutionOutlined />}
                  />
                  <Step status="wait" title="Done" icon={<SmileOutlined />} />
                </Steps>
              </div>

              <Button
                style={{ border: "0px", float: "right" }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        </Spin>
      </Modal>
    </>
  );
}

export default ShoppingPage;
