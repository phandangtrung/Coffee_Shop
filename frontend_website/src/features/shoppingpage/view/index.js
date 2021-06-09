import React, { useState, useEffect, useRef, useCallback } from "react";
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
import markerlog from "../../../84e468a8fff79b66406ef13d3b8653e2-house-location-marker-icon-by-vexels.png";
import MapGL from "react-map-gl";
import ReactMapGL, { Marker } from "react-map-gl";
import Mapstore from "../../../components/Maps/Maps";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Geocoder from "react-map-gl-geocoder";
import Geocode from "react-geocode";
import productApi from "../../../api/productApi";
import orderApi from "../../../api/orderApi";
import couponApi from "../../../api/couponApi";
import Modal from "antd/lib/modal/Modal";
function ShoppingPage(props) {
  const { Text, Link } = Typography;
  useEffect(() => {
    Geocode.setApiKey("AIzaSyCGncPyxKmV_5JpsaVpg66nw5MuqpL6FT4");
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
  const [locamark, setlocamark] = useState({
    latitude: 10.850753003313997,
    longitude: 106.77191156811507,
  });
  const [viewport, setViewport] = React.useState({
    latitude: 10.850753003313997,
    longitude: 106.77191156811507,

    zoom: 14,
  });
  const onMapClick = (event) => {
    // setPosition({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
    console.log(">>event.lngLat.lng", event.lngLat[0]);
    console.log(">>event.lngLat.lat", event.lngLat[1]);
    setlocamark({
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
    });
  };

  const [cart, setcart] = useState([]);
  const [productList, setproductList] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [totalPrice, settotalPrice] = useState(0);
  const [codeprice, setcodeprice] = useState(0);
  const [codeloading, setcodeloading] = useState(false);
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoidHJ1bmdwaGFuOTkiLCJhIjoiY2twb3VybHVrMGN1azJ2cGJ4OXd0Z3V6ayJ9.8XSBVvSrcYdGvt8xOyj-ag";
  const [form] = Form.useForm();
  const [coordinates, setCoordinates] = useState({
    lat: 10.850899,
    lng: 106.771948,
  });
  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    console.log(">>geocoderDefaultOverrides", geocoderDefaultOverrides);
    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);
  const handleOnResult = (event) => {
    console.log(">>result", event.result.place_name);
    setaddress(event.result.place_name);
  };
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
    setcodeprice(0);
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
    setcodeprice(0);
    setfaketotal(calculateTotal(newCart));
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
      title: "TÊN THỨC UỐNG",
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
      title: "KÍCH CỠ",
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
      title: "SỐ LƯỢNG",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, row) => (
        <InputNumber
          onChange={(e) => updateAmount(row.product_id, e)}
          className="productname"
          placeholder={quantity}
          min={1}
          // max={loadmaxpro(row.product_id)}
          max={row.storequantity}
        />
      ),
    },
    {
      title: "ĐƠN GIÁ",
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
        // setCoordinates({ lat: lat, lng: lng });
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
        setcodeloading(true);
        const response = await couponApi.getAll();
        console.log("Fetch order succesfully: ", response);
        const getbycoupon = response.couponcode.filter(
          (rp) => rp.couponCode === values.couponCode.toUpperCase()
        );
        console.log(">>getbycoupon", getbycoupon);
        if (getbycoupon.length > 0) {
          const perse = Number(getbycoupon[0].percentage);
          const totlapr = faketotal - faketotal * (perse / 100);
          settotalPrice(totlapr);
          setcodeprice(faketotal * (perse / 100));
          setalteraplly(
            `Bạn đã nhập mã  ${getbycoupon[0].content} giảm ${getbycoupon[0].percentage}%`
          );
          setcodeloading(false);
        } else {
          setalteraplly("Mã không hợp lệ");
          settotalPrice(faketotal);
          setcodeprice(0);
          setcodeloading(false);
        }
      } catch (error) {
        console.log("failed to fetch order: ", error);
      }
    };
    if (values.couponCode === undefined) {
      setalteraplly(`Bạn chưa nhập mã`);
    } else {
      fetchCoupon();
    }
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
              <div className="title">Giỏ hàng</div>
              <div className="item-cart">{cart.length} Sản phẩm</div>
            </div>

            <hr />
            {cart.length > 0 ? (
              <Table
                pagination={false}
                dataSource={cart}
                columns={columns}
                rowKey="_id"
              />
            ) : (
              <div
                style={{
                  width: "auto",
                  backgroundImage: `url(${Images.EMPTYC})`,
                  height: "500px",
                  backgroundSize: "cover",
                }}
              ></div>
            )}
            <Button className="button-checkout-repon" onClick={showModal}>
              CHECK OUT DT
            </Button>
          </div>
        </div>
        <div className="order-form">
          <div className="order-content">
            <div className="title-form">Tóm tắt đơn hàng</div>
            <hr />
            <div className="saleoff-form">
              <div className="title">MÃ GIẢM GIÁ</div>
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
                  loading={codeloading}
                >
                  ÁP DỤNG
                </Button>
              </Form>
            </div>
            <hr />
            <div className="totalcost-form">
              <div>TẠM TÍNH</div>
              <div>
                <CurrencyFormat
                  value={faketotal}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                {""} VND
              </div>
            </div>
            {codeprice !== 0 ? (
              <>
                {" "}
                <div style={{ opacity: "0.3" }} className="totalcost-form">
                  <div> </div>
                  <div>
                    -{" "}
                    <CurrencyFormat
                      value={codeprice}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    {""} VND
                  </div>
                </div>
                <div className="totalcost-form">
                  <div>TỔNG TIỀN</div>
                  <div>
                    <CurrencyFormat
                      value={totalPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    {""} VND
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            <Button className="button-checkout" onClick={showModal}>
              THANH TOÁN
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
            <Form
              form={form}
              onFinish={handleOk}
              fields={[
                {
                  name: ["customerAddress"],
                  value: address,
                },
              ]}
            >
              <div className="title-modal">HOÀN THÀNH ĐƠN HÀNG</div>
              <Form.Item>
                <div className="maps-form ">
                  {/* <Mapstore
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    oncheck={oncheck}
                  /> */}
                  {/* <MapGL
                    {...viewport}
                    width="100%"
                    height="100%"
                    mapStyle="mapbox://styles/mapbox/light-v9"
                    onViewportChange={setViewport}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                  /> */}
                  <MapGL
                    {...viewport}
                    ref={mapRef}
                    width="100%"
                    height="100%"
                    onViewportChange={setViewport}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    // onClick={onMapClick}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                  >
                    {/* <Marker
                      latitude={locamark.latitude}
                      longitude={locamark.longitude}
                      offsetLeft={-20}
                      offsetTop={-30}
                    >
                      <img style={{ height: 40, width: 40 }} src={markerlog} />
                    </Marker> */}
                    <Geocoder
                      mapRef={mapRef}
                      containerRef={geocoderContainerRef}
                      onViewportChange={handleGeocoderViewportChange}
                      mapboxApiAccessToken={MAPBOX_TOKEN}
                      position="top-left"
                      placeholder="Tìm vị trí"
                      language="vi-VI"
                      onResult={handleOnResult}
                    />
                    {/* <Geocoder
                      mapRef={ref}
                      onViewportChange={handleGeocoderViewportChange}
                      mapboxApiAccessToken={MAPBOX_TOKEN}
                      position="top-left"
                    /> */}
                  </MapGL>
                </div>
              </Form.Item>
              <Row>
                <Col span={24}>
                  <Form.Item name="customerAddress">
                    <Input
                      prefix={<EnvironmentOutlined />}
                      placeholder="Địa chỉ"
                      size="large"
                      defaultValue={address}
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
