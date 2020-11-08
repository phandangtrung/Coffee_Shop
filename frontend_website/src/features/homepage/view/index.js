import React, { Component } from "react";
import Header from "../../header/view";
import Footer from "../../footer/view";
import { Images } from "../../../config/image";

import { Carousel } from "antd";

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
    <div className="Hompage">
      <Header />
      <Carousel autoplay={4000}>
        <div>
          <img
            style={contentStyle}
            alt={"slide2"}
            src={Images.SLIDE2}
            // className="reponsive-img"
          />
        </div>
        <div>
          <img style={contentStyle} alt={"slide2"} src={Images.SLIDE2} />
        </div>
        <div>
          <img style={contentStyle} alt={"slide3"} src={Images.SLIDE3} />
        </div>
        <div>
          <img style={contentStyle} alt={"slide2"} src={Images.SLIDE2} />
        </div>
      </Carousel>
      {/* <Footer />             */}
    </div>
  );
};

export default Homepage;
