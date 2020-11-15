import React from "react";
import "./style.css";
import { Button, Form, Input, Table } from "antd";

function ShoppingPage() {
  const dataSource = [
    {
      key: "1",
      product: "Mike",
      quantity: 32,
      price: "10 Downing Street",
      total: "200",
    },
  ];

  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
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
