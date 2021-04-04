import 'react-native-gesture-handler';
import React, {useRef, useState} from 'react';
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

import ProductCheckout from '../../components/productCheckout/index';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Checkout = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: '100%',
        backgroundColor: '#f7f9fa',
      }}>
      <ScrollView>
        <View style={{width: '100%', paddingLeft: 15, paddingRight: 15}}>
          <View style={{height: 80}}>
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
          </View>

          <View
            style={{
              width: '100%',
              backgroundColor: '#ffffff',
              height: 220,
              borderRadius: 0.5,
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
                  {'Tổng số: 4'}
                </Text>
              </View>
              <View>
                <FontAwesome5
                  style={{color: '#f46151', fontSize: 20}}
                  name={'trash-alt'}
                  solid
                />
              </View>
            </View>
            <ScrollView>
              <View>
                <View style={{height: 70, width: '100%'}}>
                  <ProductCheckout />
                </View>
                <View style={{height: 70, width: '100%'}}>
                  <ProductCheckout />
                </View>
                <View style={{height: 70, width: '100%'}}>
                  <ProductCheckout />
                </View>
                <View style={{height: 70, width: '100%'}}>
                  <ProductCheckout />
                </View>
              </View>
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default Checkout;
