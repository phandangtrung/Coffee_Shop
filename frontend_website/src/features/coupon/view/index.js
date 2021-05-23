import React, { useEffect, useState } from "react";
import "./style.css";
import { message, Card, Col, Row, Input } from "antd";
import { Images } from "../../../config/image";
import couponApi from "../../../api/couponApi";
import { CopyOutlined } from "@ant-design/icons";
import Moment from "react-moment";
function CouponPage() {
  const { Meta } = Card;
  const [couponList, setcouponList] = useState([]);
  const [fakeCouponList, setfakeCouponList] = useState([]);
  const [loadCoupon, setloadCoupon] = useState(false);
  const { Search } = Input;
  useEffect(() => {
    const fetchCouponList = async () => {
      try {
        setloadCoupon(true);
        const response = await couponApi.getAll();
        console.log("Fetch Coupon succesfully: ", response);
        setcouponList(response.couponcode);
        setfakeCouponList(response.couponcode);
        setloadCoupon(false);
      } catch (error) {
        console.log("failed to fetch coupon list: ", error);
      }
    };
    fetchCouponList();
  }, []);
  const success = () => {
    message.success("Đã sao chép mã");
  };
  const onSearch = (values) => {
    if (values === "") {
      setcouponList(fakeCouponList);
    } else {
      const filteredProduct = fakeCouponList.filter((cp) => {
        return cp.note.toLowerCase().indexOf(values.toLowerCase()) !== -1;
      });
      setcouponList(filteredProduct);
    }
  };

  return (
    <>
      <Search
        className="search_coupon"
        placeholder="Search by coupon event"
        onSearch={onSearch}
      />
      <div className="container">
        <div className="coupon__form">
          <Row style={{ width: "100%" }}>
            {couponList.map((cp) => (
              <Col key={cp._id} className="coupon__card" sm={24} lg={8}>
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "20px",

                    boxShadow: "0px 10px 6px -6px #999999",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "70%",
                      position: "relative",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                    alt="couponImage"
                    src={Images.CPIM}
                  />
                  <div
                    style={{
                      top: "20%",
                      position: "absolute",
                      display: "flex",
                      justifyContent: "center",
                      width: "87%",
                      fontFamily: "Sansita Swashed",
                      fontSize: "70px",
                      fontStyle: "italic",
                      textShadow: "2px 2px #ffff",
                    }}
                  >
                    <div>{`-${cp.percentage}%`}</div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "30%",
                      border: "0.005px solid grey",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                      paddingTop: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        textAlign: "center",
                        width: "100%",
                        justifyContent: "center ",
                      }}
                    >
                      <div style={{ fontWeight: "bold", fontSize: "17px" }}>
                        {cp.couponCode}
                      </div>
                      {/* <div>
                        <Meta
                          title={cp.couponCode}
                          description={`Khuyến mãi ${cp.content}`}
                        />
                      </div> */}
                      <div style={{ paddingLeft: "5px", cursor: "pointer" }}>
                        <CopyOutlined
                          onClick={() => {
                            navigator.clipboard.writeText(cp.couponCode);
                            success();
                          }}
                          style={{ fontSize: "15px" }}
                        />
                      </div>
                    </div>
                    <div style={{}}>{`Khuyến mãi ${cp.content}`}</div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "53%",
                        }}
                      >
                        <div
                          style={{ fontWeight: "bold" }}
                        >{`Kết thúc lúc `}</div>{" "}
                        <Moment format="DD/MM/YYYY">{cp.endTime}</Moment>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Card
                  style={{ width: 300 }}
                  cover={<img alt="couponImage" src={Images.CPIM} />}
                >
                  <Meta
                    title={cp.couponCode}
                    description={`${cp.content} ${cp.percentage}%`}
                  />
                  <div>
                    {`Hết hạn lúc: `}
                    <Moment format="DD/MM/YYYY">{cp.endTime}</Moment>
                  </div>
                </Card> */}
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default CouponPage;
