import 'react-native-gesture-handler';
import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Modal,
  Picker,
} from 'react-native';
import {Avatar, Card, Input, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import ProductCheckout from '../../components/productCheckout/index';
import {Backport} from '../../config/port';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Checkout = (props) => {
  const formatCurrency = (monney) => {
    const mn = String(monney);
    return mn
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + '.') + prev;
      });
  };
  const formatDate = (date) => {
    const dateT = new Date(date);
    return (
      dateT.getDate() + '.' + (dateT.getMonth() + 1) + '.' + dateT.getFullYear()
    ); //prints expected format.
  };
  const [Isloading, setIsloading] = useState(false);
  const [fakeprice, setfakeprice] = useState(0);
  const [price, setprice] = useState(0);
  const [couponList, setCouponList] = useState([]);
  const getListCode = () => {
    const apiURL = `${Backport}/couponCode/discount/user`;

    setIsloading(true);
    fetch(apiURL)
      .then((res) => res.json())
      .then((resJson) => {
        console.log('>>Abcd');
        setCouponList(resJson.couponcode);
        console.log('>>resJson.couponcode', resJson.couponcode);
        setIsloading(false);
        return resJson.couponcode;
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };
  const addCode = (code) => {
    const percentage = code.percentage;
    const disprice = fakeprice - fakeprice * (percentage / 100);
    setprice(disprice);
  };
  useEffect(() => {
    getListCode();
    setfakeprice(props.totalprice);
    setprice(props.totalprice);
  }, []);
  return (
    <SafeAreaView
      style={{
        // backgroundColor: 'white',
        height: '100%',
        backgroundColor: '#f7f9fa',
      }}>
      <ScrollView>
        <View style={{width: '100%', paddingLeft: 15, paddingRight: 15}}>
          {/* <View style={{height: 80}}>
            <View style={{height: 20, width: '100%', paddingTop: 20}}>
              <View>
                <FontAwesome5
                  style={{color: 'white', fontSize: 25, color: 'grey'}}
                  name={'arrow-left'}
                  solid
                />
              </View>
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: 'grey',
                  }}>
                  {'Thanh toán'}
                </Text>
              </View>
            </View>
          </View> */}

          <View
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              height: 160,
              borderRadius: 0.5,
              marginTop: 20,
              paddingRight: 10,

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}>
            <View
              style={{
                width: '100%',
                height: 70,
                paddingTop: 20,
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{fontSize: 18, fontStyle: 'italic', color: 'grey'}}>
                  {`Loại sản phẩm: ${props.cart.length}`}
                </Text>
              </View>
              {/* <View>
                <FontAwesome5
                  style={{color: '#ffb460', fontSize: 20}}
                  name={'trash-alt'}
                  solid
                />
              </View> */}
            </View>
            <ScrollView
              style={{paddingLeft: 10, paddingRight: 10}}
              horizontal={true}>
              {props.cart.map((pro) => (
                <View
                  key={pro.id}
                  style={{
                    height: 70,
                    width: 250,
                    paddingRight: 20,
                    marginRight: 5,
                  }}>
                  <ProductCheckout
                    name={pro.name}
                    prices={pro.prices}
                    quantity={pro.quantity}
                    imagesProduct={pro.imagesProduct}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        <Card>
          <Card.Title
            style={{
              width: '100%',

              textAlign: 'left',
            }}>
            <View
              style={{
                width: 300,
                height: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 17, color: 'grey', fontStyle: 'italic'}}>
                {'Địa chỉ'}
              </Text>
              <Text style={{fontSize: 17, color: '#ffb460'}}>{'Thay đổi'}</Text>
            </View>
          </Card.Title>
          <Card.Divider />
          <Text style={{color: 'grey', lineHeight: 20}}>
            {
              'Phan Đăng Trung Phan Đắng trung phan đăng trung phan đăng trung phan đăng trung phan đăng trung'
            }
          </Text>
        </Card>
        <Card>
          <Card.Title
            style={{
              width: '100%',

              textAlign: 'left',
            }}>
            <View
              style={{
                width: 300,
                height: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 17, color: 'grey', fontStyle: 'italic'}}>
                {'Mã giảm giá'}
              </Text>
            </View>
          </Card.Title>
          <Card.Divider />
          <ScrollView
            style={{backgroundColor: 'white', height: 75}}
            horizontal={true}>
            {Isloading === false ? (
              couponList.map((coupon) => (
                <View
                  key={coupon._id}
                  style={{
                    height: 70,
                    width: 270,

                    borderRadius: 5,

                    flexDirection: 'row',
                    marginRight: 15,
                  }}>
                  <View
                    style={{
                      width: '75%',
                      backgroundColor: '#e79b4e',
                      borderBottomRightRadius: 10,
                      borderTopRightRadius: 10,
                      paddingLeft: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        height: 70,

                        borderBottomRightRadius: 10,
                        borderTopRightRadius: 10,
                      }}>
                      <View style={{paddingLeft: 10, paddingTop: 5}}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'grey',
                            textTransform: 'uppercase',
                          }}>
                          {coupon.content}
                        </Text>
                        <Text style={{fontWeight: 'bold', paddingTop: 3}}>
                          {`Giảm ${coupon.percentage}% cho đơn`}
                        </Text>
                        <Text
                          style={{fontSize: 12, color: 'grey', paddingTop: 5}}>
                          {`HSD: ${formatDate(coupon.endTime)}`}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 70,
                      width: '25%',
                      backgroundColor: 'white',
                      borderBottomRightRadius: 5,
                      borderTopRightRadius: 5,
                      borderBottomLeftRadius: 10,
                      borderTopLeftRadius: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,

                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity onPress={() => addCode(coupon)}>
                      <View>
                        <Text style={{color: '#ffb460', fontWeight: 'bold'}}>
                          {'Chọn'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Image
                source={require('../../img/id-loading-5.gif')}
                style={{width: 300, height: 80}}
              />
            )}
          </ScrollView>
        </Card>
        <Card style={{borderRadius: 20}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>{'Tổng'}</Text>
            </View>
            <View>
              <Text style={{fontSize: 17}}>{`${formatCurrency(price)}đ`}</Text>
            </View>
          </View>
        </Card>
        <View style={{padding: 15}}>
          <Button title="Đặt hàng" color="#ffb460" />
        </View>

        <View style={{height: 5}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cartAr,
    totalprice: state.cart.totalprice,
  };
};

export default connect(mapStateToProps, {})(Checkout);
