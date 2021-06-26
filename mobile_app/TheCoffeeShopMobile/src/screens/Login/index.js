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
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../../config/context';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import CommentTag from '../../components/commentTag/index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Avatar, Card, Input} from 'react-native-elements';

const Login = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [account, setAccount] = useState({us: '', pw: ''});
  const [isloading, setIsloading] = useState(false);

  const {signIn} = React.useContext(AuthContext);

  const onchangKey = (usname, password) => {
    if (password === ' ') {
      setAccount({...account, us: usname});
    } else setAccount({...account, pw: password});
  };
  GoogleSignin.configure({
    webClientId:
      '161356782679-supo9tgvceuf5u8ts0d0su6d3eg4sckf.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });
  const GsignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('>>userInfo', userInfo);
      signIn(account.us, account.pw);
    } catch (error) {
      console.log('error', error);
      signIn('kaitrung99@gmail.com', 'Abc@123');
    }
  };
  const loginHandle = () => {
    // setIsloading(true);
    console.log('>>ac', account);
    signIn(account.us, account.pw);
  };
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
            {'Đăng nhập'}
          </Text>
        </View>
        <View style={{width: '100%', alignItems: 'center', flex: 1}}>
          <View style={{width: '90%'}}>
            <Input
              placeholder="Tên đăng nhập"
              leftIcon={
                <FontAwesome5
                  style={{color: 'white', fontSize: 20, color: 'grey'}}
                  name={'envelope'}
                  solid
                />
              }
              onChangeText={(values) => onchangKey(values, ' ')}
            />
          </View>
          <View style={{width: '90%'}}>
            <Input
              placeholder="Mật khẩu"
              leftIcon={
                <FontAwesome5
                  style={{color: 'white', fontSize: 20, color: 'grey'}}
                  name={'lock'}
                  solid
                />
              }
              onChangeText={(values) => onchangKey(' ', values)}
              secureTextEntry={true}
            />
          </View>

          {true ? (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 45,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={() => {
                loginHandle();
              }}>
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
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  {'Đăng nhập'}
                </Text>
                {/* <ActivityIndicator size="large" color="#ffff" /> */}
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                width: '100%',
                height: 45,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
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
                <Image
                  source={require('../../img/post-loader.gif')}
                  style={{width: 130, height: 130}}
                />
                {/* <ActivityIndicator size="large" color="#ffff" /> */}
              </View>
            </View>
          )}

          <View style={{paddingTop: 20}}></View>
          <View
            style={{
              width: '63%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 10,
              marginBottom: 10,
            }}>
            <TouchableOpacity onPress={() => GsignIn()}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '97%',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'grey'}}>{'Đăng nhập bằng Google'}</Text>
                <Image
                  source={require('../../img/google-2981831-2476479.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          width: '71%',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 15, color: 'white'}}>
          {'Bạn không có tài khoản?'}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#e07c58',
            textDecorationLine: 'underline',
            fontStyle: 'italic',
          }}>
          {'Đăng ký ngay'}
        </Text>
      </View>
    </ImageBackground>
  );
};
export default Login;
