import React, { Component } from "react";
import "./style.css";
import { Images } from "../../../config/image";
import {
  PhoneOutlined,
  HomeOutlined,
  MailOutlined,
  ClockCircleOutlined,
  FacebookOutlined,
  InstagramOutlined,
  SkypeOutlined,
} from "@ant-design/icons";
import { Row, Col } from "antd";

export class Footer extends Component {
  render() {
    return (
      <div
        className="footer"
        style={{ backgroundImage: `url(${Images.FTBG})` }}
      >
        <Row className="footer-content" style={{ textAlign: "start" }}>
          <Col className="footer-column" span={8}>
            <div className="title-footer">About Us</div>
            <div className="detail">
              Mỗi ngày, chúng tôi đi làm với hi vọng thực hiện hai việc: chia sẻ
              ly cà phê tuyệt vời với bạn bè và giúp cho thế giới hoàn thiện hơn
              một chút. Điều đó đã thành sự thực khi cửa hàng Starbucks đầu tiên
              khai trương vào năm 1971 và ngày nay, điều đó cũng vẫn giữ đúng
              như thế.
            </div>
          </Col>
          <Col span={1}></Col>
          <Col className="footer-column" span={8}>
            <div className="title-footer">Get In Touch</div>
            <div className="detail">
              <div className="detail-text">
                <PhoneOutlined /> 0566439754
              </div>
              <div className="detail-text">
                <HomeOutlined /> Số 1, Võ Văn Ngân, Linh Trung, Thủ Đức
              </div>
              <div className="detail-text">
                <MailOutlined /> 17110244@student.hcmute.edu.vn
              </div>
              <div className="detail-text">
                <ClockCircleOutlined /> 6:00am - 10:00pm
              </div>
            </div>
          </Col>
          <Col className="footer-column" span={5}>
            <div className="title-footer">Social Contact</div>
            <div className="detail">
              <div className="detail-text">
                <FacebookOutlined /> facebook.com/coffeeshop
              </div>
              <div className="detail-text">
                <InstagramOutlined /> instagram.com/coffeeshop
              </div>
              <div className="detail-text">
                <SkypeOutlined /> skype.com/coffeeshop
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Footer;
