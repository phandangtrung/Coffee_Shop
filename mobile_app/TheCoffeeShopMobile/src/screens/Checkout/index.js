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

import ProductCheckout from "../../components/productCheckout/index";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const  Checkout = () => {


  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%',backgroundColor:"#f7f9fa"}}>
       <View style={{width:"100%",paddingLeft:15,paddingRight:15}}>
         <View style={{height:80}}>
         <View style={{height:20, width:"100%",paddingTop:20}}><View>
      <FontAwesome5
          style={{color: 'white', fontSize: 25, color: 'grey'}}
          name={'arrow-left'}
          solid
        />
    </View>
       <View>
      <Text style={{textAlign:"center",fontSize:22,fontWeight:"bold",color:"grey"}}>
        {"Thanh toán"}
      </Text>
      </View>
       </View>
         </View>

       <View style={{width:"100%",backgroundColor:"#ffffff",height:141,borderRadius:0.5,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,}}>
  <ScrollView><View style={{height:70,width:"100%"}}>
<ProductCheckout />

</View>
<View style={{height:70,width:"100%"}}>
<ProductCheckout />

</View>
<View style={{height:70,width:"100%"}}>
<ProductCheckout />

</View>
<View style={{height:70,width:"100%"}}>
<ProductCheckout />

</View>
</ScrollView>

</View>



      </View>
    </SafeAreaView>
  );
};
export default Checkout;
