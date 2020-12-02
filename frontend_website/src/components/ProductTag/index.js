import React, { useState } from "react";
import "./style.css";
import { Images } from "../../config/image";
import { Empty } from "antd";

function ProductTag(props) {
  const [cart, setCart] = useState({});

  console.log(props);
  const addtoCart = () => {
    // console.log(">>>product : ", props.name, " ", props._id, " ", props.price);
    // localStorage.clear();
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) {
      cart = [];
      cart.push({
        _id: props._id,
        name: props.name,
        amount: 1,
        price: props.price,
      });
    } else {
      let check_available = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i]._id === props._id) {
          cart[i].amount = cart[i].amount + 1;
          cart[i].price = cart[i].amount * props.price;
          check_available = true;
        }
      }
      if (check_available !== true) {
        cart.push({
          _id: props._id,
          name: props.name,
          amount: 1,
          price: props.price,
        });
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart>>", localStorage.cart);
  };
  return (
    <div>
      <div className="menu-item">
        <div className="menu-image">
          <img alt="picture" src={Images.COCF} />
        </div>
        <div className="menu-detail">
          <div className="title-name">{props.name}</div>
          <div className="price">{props.price} VND</div>
          <div className="button-form">
            <button onClick={addtoCart}>MUA NGAY</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTag;
