import React from "react";
import "./style.css";
import { Button, Form, Input, InputNumber, Table } from "antd";
import { Images } from "../../../config/image";
import { ShoppingCartOutlined } from "@ant-design/icons";

function ShoppingPage() {
  const dataSource = [
    {
      product: { image: Images.COCF, name: "AMERICANO", size: "M" },
      quantity: 1,
      price: 39000,
      total: 39000,
    },
    {
      product: { image: Images.COCF, name: "AMERICANO", size: "M" },
      quantity: 1,
      price: 39000,
      total: 39000,
    },
  ];

  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "product",
      key: "product",
      render: (product) => (
        <>
          <img src={product.image} />
          <span className="productname">
            {product.name} - SIZE {product.size}
          </span>
        </>
      ),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      render: (amount) => <InputNumber value={amount} />,
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
    },
  ];
  return (
    <div className="shopping-container">
      <div className="shopping-card">
        <div className="cart-container">
          <div className="title-form">
            <div className="title">Shopping Cart</div>
            <div className="item-cart">3 Items</div>
          </div>
          <hr />
          <Table pagination={false} dataSource={dataSource} columns={columns} />
          <div className="back">
            <a>
              <ShoppingCartOutlined style={{ paddingRight: "20px" }} />
              Continue Shopping
            </a>
          </div>
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
              <Button className="button-apply">APPLY</Button>
            </Form>
          </div>
          <hr />
          <div className="totalcost-form">
            <div>TOTAL COST</div>
            <div>30000 VND</div>
          </div>
          <Button className="button-checkout">CHECK OUT</Button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingPage;
