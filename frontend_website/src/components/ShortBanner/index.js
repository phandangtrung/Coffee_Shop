import React from "react";
import "./style.css";
import { Images } from "../../config/image";

function ShortBanner() {
  return (
    <div className="short-banner">
      <img alt="short_banner" src={Images.SBANNER} />
    </div>
  );
}

export default ShortBanner;
