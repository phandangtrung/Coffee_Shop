import { Col, Row } from "antd";
import React from "react";
import { Images } from "../../../config/image";
import "./style.css";
function index() {
  return (
    <>
      <Row className="coffee-intro_form">
        <Col lg={12} sm={8} className="text-form">
          <div className="big_title ">CÀ PHÊ</div>
          <div className="text-content">
            Sự kết hợp hoàn hảo giữa hạt cà phê Robusta & Arabica thượng hạng
            được trồng trên những vùng cao nguyên Việt Nam màu mỡ, qua những bí
            quyết rang xay độc đáo, Highlands Coffee chúng tôi tự hào giới thiệu
            những dòng sản phẩm Cà phê mang hương vị đậm đà và tinh tế.
          </div>
        </Col>
        <Col lg={10} sm={12}>
          <img style={{ width: "100%" }} src={Images.COCFTP} />
        </Col>
      </Row>
      <Row className="fastcoffee-intro_form">
        <Col lg={10}>
          <img src={Images.CFFTP} />
        </Col>
        <Col lg={12} className="text-form">
          <div className="big_title ">TAKE-AWAY</div>
          <div className="text-content">
            Thuận tiện cho số đông những người cần cà phê mỗi sáng nhưng lại eo
            hẹp về thời gian cũng như hòa nhập vào nhịp sống của cộng đồng thì
            sự xuất hiện của hình thức cà phê “take away” lại rất được lòng đại
            bộ phận tín đồ của cà phê bởi những tiện ích mà nó mang lại.
          </div>
        </Col>
      </Row>
      <Row className="bagcoffee-intro_form">
        <Col lg={12} className="text-form">
          <div className="big_title ">CÀ PHÊ TÚI</div>
          <div className="text-content">
            Cà phê sạch được hiểu đơn giản là loại cà phê được tạo ra từ 100% cà
            phê, không trộn lẫn bất kỳ loại hương liệu, hóa chất hay tạp chất
            nào khác.Nói như vậy không có nghĩa là cà phê sạch là loại cà phê
            ngon nhất, tuyệt vời nhất có thể làm bạn hài lòng mà chỉ muốn nhấn
            mạnh rằng cà phê sạch thật sự “tốt” cho sức khỏe...
          </div>
        </Col>
        <Col lg={10}>
          <img src={Images.CBTP} />
        </Col>
      </Row>
      <Row
        className="breadcoffee-intro_form"
        style={{ backgroundImage: `url(${Images.BBG})` }}
      >
        <Col lg={10}>
          <img src={Images.BCFF} />
        </Col>
        <Col lg={12} className="text-form">
          <div className="big_title ">BÁNH MÌ</div>
          <div className="text-content">
            Bạn đã quá quen thuộc với Bánh mì Việt Nam. Hãy nếm thử một miếng
            Bánh mì ngon, giòn, nóng hổi tại Highlands Coffee. Một kết hợp hoàn
            hảo giữa lớp nhân chua, cay, mặn, ngọt quyện với lớp vỏ bánh mì giòn
            tan, mịn màng tạo ra tầng tầng lớp lớp dư vị cho thực khách.
          </div>
        </Col>
      </Row>
    </>
  );
}

export default index;
