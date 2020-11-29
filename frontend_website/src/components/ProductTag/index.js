import React from "react";
import "./style.css";
import { Images } from "../../config/image";

function ProductTag(props) {
  console.log(props);
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
            <button>MUA NGAY</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTag;
