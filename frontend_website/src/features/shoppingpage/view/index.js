import React, { useState } from "react";
import "./style.css";
import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  Steps,
} from "antd";
import { Images } from "../../../config/image";
import {
  ShoppingCartOutlined,
  EnvironmentOutlined,
  UserOutlined,
  PhoneOutlined,
  AudioOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import Mapstore from "../../../components/Maps/Maps";
import Geocode from "react-geocode";

import Modal from "antd/lib/modal/Modal";
function ShoppingPage(props) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  }
  Geocode.setApiKey("AIzaSyB_eKxh8KTsPy6aPPJPROh2yP75dTvg92o");
  const [form] = Form.useForm();
  const [coordinates, setCoordinates] = useState({
    lat: 10.850899,
    lng: 106.771948,
  });
  const [address, setaddress] = useState("");
  const [position, setPosition] = useState({
    title: "The marker`s title will appear as a tooltip.",
    name: "SOMA",
    position: { lat: 37.778519, lng: -122.40564 },
  });

  const columns = [
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
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <InputNumber className="productname" defaultValue={amount} />
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (price) => <span className="productname">{price} VND</span>,
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
      render: (total) => <span className="productname">{total} VND</span>,
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
        form.setFieldsValue({ addressinput: address });
      },
      (error) => {
        console.error(error);
      }
    );
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
            <Table
              pagination={false}
              dataSource={cart}
              columns={columns}
              rowKey="_id"
            />

            <Button className="button-checkout-repon" onClick={showModal}>
              CHECK OUT DT
            </Button>
          </div>
        </div>
        <div className="order-form">
          <div className="order-content">
            <div className="title-form">Order Summary</div>
            <hr />
            <div className="amount__price">
              <div className="item-amount">ITEMS 3</div>
              <div className="price">30000 VND</div>
            </div>
            <div className="saleoff-form">
              <div className="title">PROMO CODE</div>
              <Form>
                <Form.Item name="code">
                  <Input />
                </Form.Item>
                <Button className="button-apply" type="dashed" danger>
                  APPLY
                </Button>
              </Form>
            </div>
            <hr />
            <div className="totalcost-form">
              <div>TOTAL COST</div>
              <div>30000 VND</div>
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
        // onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <div className="modal-order">
          <Form form={form}>
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
                <Form.Item name="addressinput">
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
                <Form.Item>
                  <Input
                    prefix={<UserOutlined />}
                    className="input-modal"
                    placeholder="Name of consignee"
                  />
                </Form.Item>
              </Col>
              <Col span={12} style={{ paddingLeft: "5px" }}>
                <Form.Item>
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
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default ShoppingPage;
