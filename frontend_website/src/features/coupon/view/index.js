import React, { useEffect, useState } from "react";
import "./style.css";
import { Card, Col, Row, Input } from "antd";
import { Images } from "../../../config/image";
import couponApi from "../../../api/couponApi";
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
                <Card
                  style={{ width: 300 }}
                  cover={<img alt="couponImage" src={Images.CPIM} />}
                >
                  <Meta
                    title={cp.couponCode}
                    description={`${cp.note} ${cp.discount}%`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default CouponPage;
