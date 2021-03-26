import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './src/screens/Home/index';
import Profile from './src/screens/Profile/index';
import Product from './src/screens/Product/index';
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Product} />
        <Tab.Screen name="Settings" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
