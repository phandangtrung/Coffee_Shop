import React, { Component } from "react";
import { Images } from "../../../config/image";

import { Carousel } from "antd";
import Bestseller from "../../../components/Bestseller";
import "./style.css";
const Homepage = () => {
  const contentStyle = {
    height: "92vh",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div>
      <Carousel autoplay={10000}>
        <div>
          <img style={contentStyle} alt={"slide4"} src={Images.SLIDE4} />
        </div>
        <div>
          <img style={contentStyle} alt={"slide2"} src={Images.SLIDE3} />
        </div>
        <div>
          <img style={contentStyle} alt={"slide3"} src={Images.SLIDE2} />
        </div>
      </Carousel>
      <Bestseller />
    </div>
  );
};

export default Homepage;
