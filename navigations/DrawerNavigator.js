import React, { Component } from 'react';

import { Dimensions,Platform } from 'react-native';
import { createAppContainer, createDrawerNavigator, createBottomTabNavigator,createStackNavigator   } from "react-navigation";
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import MenuDrawer from '../components/MenuDrawer';
import CameraScreen from '../screens/CameraScreen';
import MapScreen from '../screens/MapScreen';
import LocationScreen from '../screens/LocationScreen';
import TodoScreen from '../screens/TodoScreen';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth:WIDTH*0.75 ,
    contentComponent:({navigation}) =>{
        return (<MenuDrawer navigation={navigation} />)
    }
}

const Tabs = createBottomTabNavigator({
    Home: HomeScreen,
    About: ProfileScreen,
    Contact: SettingScreen,
}, {
    tabBarOptions: {
        activeTintColor: '#000',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: '#fff',
        },
        indicatorStyle: {
            backgroundColor: '#000',
        },
    }
});

const DrawerNavigator = createDrawerNavigator(
    {
        Home:{
            screen: Tabs
        },
        Profile: {
            screen: ProfileScreen
        },
        Setting: {
            screen: SettingScreen
        },
        Camera: {
            screen: CameraScreen
        },
        Location:{
            screen: LocationScreen
        },
        Map:{
            screen: MapScreen
        },
        Todo:{
            screen: TodoScreen
        }
    },
    DrawerConfig
);

const StackNavigator = createStackNavigator({
    DrawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: {
            header: null,
        }
    }
});
export default createAppContainer(StackNavigator);