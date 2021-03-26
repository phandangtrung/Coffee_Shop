import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import styles from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const ProductCart = (props) => {
  return (
    <View>
      <View style={styles.cart_tag}>
        <Text style={styles.text_cart}>{'Expresso'}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text_cart}>{'x 1'}</Text>
          </View>
          <View style={{flexDirection: 'column', paddingLeft: 5}}>
            <FontAwesome5
              style={{color: 'white', fontSize: 15, color: 'white'}}
              name={'angle-up'}
              solid
            />
            <FontAwesome5
              style={{color: 'white', fontSize: 15, color: 'white'}}
              name={'angle-down'}
              solid
            />
          </View>
        </View>
        <Text style={styles.text_cart}>{'30.000đ'}</Text>
        <FontAwesome5
          style={{color: 'white', fontSize: 20, color: 'white'}}
          name={'times'}
          solid
        />
      </View>
    </View>
  );
};
export default ProductCart;
