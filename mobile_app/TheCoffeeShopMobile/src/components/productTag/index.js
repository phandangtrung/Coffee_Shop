import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import styles from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const ProductTag = (props) => {
  return (
    <View
      style={{
        paddingLeft: 13,
      }}>
      <View style={styles.product_box}>
        <Image
          source={{
            uri:
              'https://product.hstatic.net/1000075078/product/latte_dd6427d058294df5aa4745e5a6035a93_master.jpg ',
          }}
          style={{
            height: 100,
            width: '100%',
            resizeMode: 'cover',
            borderTopRightRadius: 13,
            borderTopLeftRadius: 13,
          }}
        />
        <View
          style={{
            width: '100%',
            height: 80,
            backgroundColor: '#ffb460',
            borderBottomLeftRadius: 13,
            borderBottomRightRadius: 13,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Oswald-VariableFont_wght',
              fontSize: 20,
              paddingLeft: 5,
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 5,
              // fontWeight: 'bold',
            }}>{`Expresso`}</Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Oswald-VariableFont_wght',
              fontSize: 10,
              paddingLeft: 5,
            }}>{`Cà phê Hùng Duy là loại cà phê ngon đậm đà`}</Text>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Oswald-VariableFont_wght',
              fontSize: 15,
            }}>{`34.000`}</Text>
          <View
            style={{
              paddingTop: 6,
              color: 'white',
              fontFamily: 'Oswald-VariableFont_wght',
              fontSize: 15,
            }}>
            <FontAwesome5 style={{color: 'white'}} name={'plus'} solid />
          </View>
        </View>
      </View>
    </View>
  );
};
export default ProductTag;
