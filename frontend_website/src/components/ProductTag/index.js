import React, { useState } from "react";
import "./style.css";
import { Images } from "../../config/image";
import { Empty, notification } from "antd";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import {
  ShoppingCartOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

function ProductTag(props) {
  console.log(props);
  const addtoCart = () => {
    // console.log(">>>product : ", props.name, " ", props._id, " ", props.price);
    // localStorage.clear();
    try {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart === null) {
        cart = [];
        cart.push({
          key: props._id,
          product_id: props._id,
          name: props.name,
          size: "M",
          quantity: 1,
          price: props.price,
        });
      } else {
        let check_available = false;
        for (let i = 0; i < cart.length; i++) {
          if (cart[i]._id === props._id) {
            cart[i].quantity = cart[i].quantity + 1;
            check_available = true;
          }
        }
        if (check_available !== true) {
          cart.push({
            key: props._id,
            product_id: props._id,
            name: props.name,
            size: "M",
            quantity: 1,
            price: props.price,
          });
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Cart>>", localStorage.cart);
      notification.open({
        message: `${props.name}`,
        description: `${props.name} has been added to your cart`,
        placement: "bottomRight",
        icon: <ShoppingCartOutlined style={{ color: "# rgb(164, 115, 67)" }} />,
      });
    } catch {
      notification.open({
        message: "Add is Error",
        description: "Something went wrong",
        icon: <ExclamationCircleFilled style={{ color: "#red" }} />,
      });
    }
  };
  return (
    <div>
      <div className="menu-item">
        <div className="menu-image">
          <img alt="picture" src={`http://localhost:3000/${props.img}`} />
        </div>
        <div className="menu-detail">
          <Link
            // to={`singleproduct/${props._id}`}
            // idpro={props._id}
            // namepro={props.name}
            to={{
              pathname: `singleproduct/${props._id}`,
              state: {
                idpro: props._id,
                namepro: props.name,
                pricepro: props.price,
                despro: props.description,
                img: props.img,
                quantity: props.quantity,
              },
            }}
          >
            <div className="title-name">{props.name}</div>
          </Link>

          <div className="price">
            <CurrencyFormat
              value={props.price}
              displayType={"text"}
              thousandSeparator={true}
            />{" "}
            VND
          </div>
          <div className="button-form">
            {props.quantity === 0 ? (
              <a style={{ fontSize: "20px" }}>Out of stock</a>
            ) : (
              <button onClick={addtoCart}>BUY NOW</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTag;
