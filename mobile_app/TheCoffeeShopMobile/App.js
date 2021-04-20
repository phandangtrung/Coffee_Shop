import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Home from './src/screens/Home/index';
import Profile from './src/screens/Profile/index';
import Product from './src/screens/Product/index';
import Checkout from './src/screens/Checkout/index';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MaterialBottomTab = createMaterialBottomTabNavigator();
const MaterialTopTab = createMaterialTopTabNavigator();
// const Drawer = createDrawerNavigator();

const App = () => {
  MyStack = () => (
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

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default App;
