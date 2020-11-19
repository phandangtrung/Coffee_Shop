import React from "react";
import "./style.css";
import { Images } from "../../config/image";
function NoFound() {
  return (
    <div className="notfound-container">
      <img src={Images.NFIM} />
    </div>
  );
}

export default NoFound;
