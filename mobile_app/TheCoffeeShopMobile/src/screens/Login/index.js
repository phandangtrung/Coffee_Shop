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
  ImageBackground,
} from 'react-native';

import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';

import CommentTag from '../../components/commentTag/index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Avatar, Card, Input, Icon} from 'react-native-elements';

const Login = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ImageBackground
      style={{
        flex: 1,
        width: '100%',
        height: 570,
        opacity: 0.9,
        alignItems: 'center',
      }}
      source={require('../../img/05a902c987f2ef1988a8432b49687ad8.jpg')}>
      <View style={{height: 150, flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../img/LogoCoffee-Shop.png')}
          style={{width: 187, height: 70}}
        />
      </View>
      <View
        style={{
          height: 320,
          // flexDirection: 'row',
          backgroundColor: '#ffffff',
          width: '80%',
          borderRadius: 10,
          opacity: 0.9,
        }}>
        <View style={{width: '100%', padding: 10}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: '#4a507a',
            }}>
            {'Login'}
          </Text>
        </View>
        <View style={{width: '100%', alignItems: 'center', flex: 1}}>
          <View style={{width: '90%'}}>
            <Input
              placeholder="User name"
              leftIcon={
                <FontAwesome5
                  style={{color: 'white', fontSize: 20, color: 'grey'}}
                  name={'envelope'}
                  solid
                />
              }
            />
          </View>
          <View style={{width: '90%'}}>
            <Input
              placeholder="Password"
              leftIcon={
                <FontAwesome5
                  style={{color: 'white', fontSize: 20, color: 'grey'}}
                  name={'lock'}
                  solid
                />
              }
              secureTextEntry={true}
            />
          </View>
          <View
            style={{
              width: '75%',
              height: 45,
              backgroundColor: '#4a507a',
              borderRadius: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              {'Login'}
            </Text>
          </View>
          <View style={{paddingTop: 20}}></View>
          <View
            style={{
              width: '70%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <Text style={{color: 'grey'}}>{'Or Login using social media'}</Text>
            <Image
              source={require('../../img/google-2981831-2476479.png')}
              style={{width: 20, height: 20}}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          width: '75%',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 15, color: 'white'}}>
          {"Don't you have an account?"}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#e07c58',
            textDecorationLine: 'underline',
            fontStyle: 'italic',
          }}>
          {'Resiger Now'}
        </Text>
      </View>
    </ImageBackground>
  );
};
export default Login;
