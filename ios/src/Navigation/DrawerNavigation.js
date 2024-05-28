import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerNavigationCard from '../Components/DrawerComp/DrawerCard';
import BottomTabNavigation from './BottomTabNavigation';
import HomePage from '../Screens/Home/HomePage';
import Wallet from '../Screens/DrawerScreens/Wallet';
import Activity from '../Screens/DrawerScreens/Activity';
import Recharge from '../Screens/DrawerScreens/Recharge';
import Report from '../Screens/DrawerScreens/Report';
import UploadScreen from '../Screens/Upload/UploadScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerNavigationCard {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 370,
        },
      }}>
      <Drawer.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
      {/* <Drawer.Screen name="HomePage" component={HomePage} /> */}
      <Drawer.Screen name="Wallet" component={Wallet} />
      <Drawer.Screen name="Activity" component={Activity} />
      <Drawer.Screen name="Recharge" component={Recharge} />
      <Drawer.Screen name="Report" component={Report} />
      <Drawer.Screen name="Uplaod" component={UploadScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
