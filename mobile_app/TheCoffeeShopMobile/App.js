import 'react-native-gesture-handler';
import React, {useMemo, useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AuthContext} from './src/config/context';
import Loading from './src/components/loading/Loading';
import {serport} from './src/config/port';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Home from './src/screens/Home/index';
import Profile from './src/screens/Profile/index';
import Product from './src/screens/Product/index';
import Checkout from './src/screens/Checkout/index';
import Login from './src/screens/Login/index';
import {Overlay} from 'react-native-elements';
import {Button} from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MaterialBottomTab = createMaterialBottomTabNavigator();
const MaterialTopTab = createMaterialTopTabNavigator();
// const Drawer = createDrawerNavigator();

const App = () => {
  // const [userToken, setUserToken] = useState(null);
  const createWrongAlert = () =>
    Alert.alert('Login failed', 'Wrong username or password ', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  const createNullAlert = () =>
    Alert.alert('Login failed', 'Username or Password must not be left blank', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.token,
          userName: action.id,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
          userToken: null,
          userName: null,
        };
      case 'REGISTER':
        return {...prevState, isLoading: false};
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, password) => {
        // setUserToken('fgkj');
        const accountinfo = {email: userName, password: password};
        let userToken;
        userToken = null;

        if (userName === '' || password === '') {
          createNullAlert();
        } else {
          axios
            .post(`${serport}/users/login`, accountinfo)
            .then((response) => {
              console.log('>>reponse', response?.data);
              userToken = response?.data.token;
              console.log('>>tokenrp', userToken);

              try {
                dispatch({type: 'LOGIN', id: userName, token: userToken});
                AsyncStorage.setItem('userToken', userToken);
              } catch (e) {
                console.log(e);
              }
            })
            .catch((error) => {
              createWrongAlert();
              console.log('Error: ', error);
            });
          // setTimeout(function(){ if (checkpass) {
          //   try {
          //     dispatch({type: 'LOGIN', id: userName, token: userToken});
          //     await AsyncStorage.setItem('userToken', userToken);
          //   } catch (e) {
          //     console.log(e);
          //   }
          // } else {
          //   createWrongAlert();
          // } }, 2000);
        }
      },
      signOut: async () => {
        // setUserToken(null);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fjsald');
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        loginState.userToken = await AsyncStorage.getItem('userToken');

        console.log('>>token', userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);

  const MyStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: 'tomato'},
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerTitle: 'Thanh toán',
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
  if (loginState.isLoading) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: '#ffae5d',
              color: '#6f7865',
            }}>
            {/* <MaterialBottomTab.Screen name="Home" component={createHomeStack} /> */}
            <Tab.Screen
              name="Home"
              component={MyStack}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color}) => (
                  <FontAwesome5
                    style={{fontSize: 20}}
                    color={color}
                    name={'coffee'}
                    solid
                  />
                ),
              }}
              // children={
              //   <Stack.Navigator>
              //     <Stack.Screen name="Product" component={Product} />
              //   </Stack.Navigator>
              // }
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color}) => (
                  <FontAwesome5
                    style={{fontSize: 20}}
                    color={color}
                    name={'user'}
                    solid
                  />
                ),
              }}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTintColor: 'white',
                headerStyle: {backgroundColor: 'tomato'},
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
    // <NavigationContainer>
    //   <Tab.Navigator
    //     tabBarOptions={{
    //       activeTintColor: '#ffae5d',
    //       color: '#6f7865',
    //     }}>
    //     {/* <MaterialBottomTab.Screen name="Home" component={createHomeStack} /> */}
    //     <Tab.Screen
    //       name="Home"
    //       component={MyStack}
    //       options={{
    //         tabBarLabel: 'Home',
    //         tabBarIcon: ({color}) => (
    //           <FontAwesome5
    //             style={{fontSize: 20}}
    //             color={color}
    //             name={'coffee'}
    //             solid
    //           />
    //         ),
    //       }}
    //       // children={
    //       //   <Stack.Navigator>
    //       //     <Stack.Screen name="Product" component={Product} />
    //       //   </Stack.Navigator>
    //       // }
    //     />
    //     <Tab.Screen
    //       name="Profile"
    //       component={Profile}
    //       options={{
    //         tabBarLabel: 'Profile',
    //         tabBarIcon: ({color}) => (
    //           <FontAwesome5
    //             style={{fontSize: 20}}
    //             color={color}
    //             name={'user'}
    //             solid
    //           />
    //         ),
    //       }}
    //     />
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default App;
