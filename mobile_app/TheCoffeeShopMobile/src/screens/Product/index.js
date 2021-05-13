import 'react-native-gesture-handler';
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  DrawerLayoutAndroid,
  ScrollView,
  Button,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {SearchBar, Avatar, Rating} from 'react-native-elements';
import {imgport} from '../../config/port';
import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';

import {connect} from 'react-redux';
import {buyProduct} from '../../components/productTag/actions/index';

import CommentTag from '../../components/commentTag/index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import styles from './style';

const Product = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const productID = props.route.params._id;
  const dataProduct = {...props.route.params, id: productID};
  const formatCurrency = (monney) => {
    const mn = String(monney);
    return mn
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + '.') + prev;
      });
  };
  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            width: '100%',
            height: 300,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              height: 270,
              borderRadius: 20,

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,

              paddingTop: 20,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',

                flexDirection: 'row',

                paddingBottom: 5,
              }}>
              <Avatar
                rounded
                source={{
                  uri: `${imgport}/${props.route.params.imagesProduct}`,
                }}
                containerStyle={{
                  width: 120,
                  height: 120,
                }}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {props.route.params.name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'grey',
              }}>
              {`${formatCurrency(props.route.params.prices)} đ`}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <TouchableOpacity onPress={() => props.buyProduct(dataProduct)}>
                <View
                  style={{
                    backgroundColor: '#ffb460',
                    width: '100%',
                    height: 40,
                    borderRadius: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                    }}>
                    {'Thêm vào giỏ'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 220,
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: 'grey', fontSize: 17}}>
              {'Đánh giá/Bình luận'}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <FontAwesome5
                style={{color: 'white', fontSize: 20, color: 'grey'}}
                name={'comment-dots'}
                solid
              />
            </TouchableOpacity>
          </View>
          <View style={{paddingTop: 10, height: 200}}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View
                style={{
                  width: '100%',
                  height: 190,
                  top: 320,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '90%',
                    height: '90%',
                    borderRadius: 20,
                  }}>
                  <View style={{right: 0}}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <FontAwesome5
                        style={{color: 'white', fontSize: 20, color: 'grey'}}
                        name={'times'}
                        solid
                      />
                    </TouchableOpacity>
                  </View>

                  <Rating
                    type="heart"
                    showRating={true}
                    // onFinishRating={this.ratingCompleted}
                    style={{paddingVertical: 10}}
                    imageSize={40}
                    defaultRating={4}
                  />
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View style={{width: '80%', paddingTop: 10}}>
                      <Button
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                        color="#ffb460"
                        title="Đánh giá"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
            <ScrollView>
              <CommentTag accname="Trung phan" cmmdate="01/01/2020" />
              <CommentTag accname="Duy Nguyễn" cmmdate="01/01/2020" />
              <CommentTag accname="Cường Phi" cmmdate="01/01/2020" />
              <CommentTag accname="Trung phan" cmmdate="01/01/2020" />
              <CommentTag accname="Trung phan" cmmdate="01/01/2020" />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cartAr,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    buyProduct: (product_current) => dispatch(buyProduct(product_current)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
