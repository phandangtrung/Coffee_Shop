import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import styles from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const ProductCheckout = (props) => {
  return (
    <View style={{width:"100%",height:"100%",flexDirection:"row"}}>
        <View>
        <Image
          source={{
            uri:
              'https://product.hstatic.net/1000075078/product/latte_dd6427d058294df5aa4745e5a6035a93_master.jpg ',
          }}
          style={{
            height: "100%",
            width: 70,
            resizeMode: 'cover',
          }}
        />
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-between",width:"70%"}}>
        <View style={{paddingLeft:20,paddingTop:10}}>
          <Text style={{color:"grey",fontSize:17,paddingBottom:5}}>{"Expresso"}</Text>
          <Text style={{color:"black",fontSize:20}}>{"50.000đ"}</Text>
        </View>
        <View style={{paddingTop:45,}}>
          <Text style={{color:"grey"}}>
            {"1x"}
          </Text>
        </View>
        </View>

    </View>
  );
};
export default ProductCheckout;
