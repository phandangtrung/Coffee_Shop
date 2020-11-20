import React from "react";
import "./style.css";
import Mapstore from "../Maps/Maps";
import { Images } from "../../config/image";

function index() {
  return (
    <div className="container">
      <div className="store__info-form">
        <div className="best__seller-title " style={{ width: "10%" }}>
          Store
        </div>
        <div className="info_form">
          <div className="info_content">
            <div className="content_text">
              <div className="title">THE COFFEE SHOP SIGNATURE</div>
              <br />
              <div className="discription">
                Với những nghệ nhân rang tâm huyết và đội ngũ Barista tài năng
                cùng những câu chuyện cà phê đầy cảm hứng, ngôi nhà Signature
                19B Phạm Ngọc Thạch, Q.3, TP.HCM là không gian dành riêng cho
                những ai trót yêu say đắm hương vị của những hạt cà phê tuyệt
                hảo.
              </div>
            </div>
          </div>
          <img className="info_img" src={Images.IFIM} />
        </div>
        {/* <div className="map-form">
          <div>
            <Mapstore />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default index;
