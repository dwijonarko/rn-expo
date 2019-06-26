import React from 'react';
import DrawerNavigator from './navigations/DrawerNavigator';
import LoginScreen from "./screens/LoginScreen";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from "firebase";
import AuthLoadingScreen from './screens/AuthLoadingScreen';

const AuthStack = createStackNavigator({ Login: LoginScreen }, { headerMode: 'none' });

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    App: DrawerNavigator,
    Auth: AuthStack,
    AuthLoading: AuthLoadingScreen
  },
  {
    initialRouteName: 'AuthLoading',
  }
));


export default class App extends React.Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBq04XlU-UXRL7rkt1JjcnXtITjdsJYPEQ",
      authDomain: "expo-tutorial.firebaseapp.com",
      databaseURL: "https://expo-tutorial.firebaseio.com",
      projectId: "expo-tutorial",
      storageBucket: "expo-tutorial.appspot.com",
      messagingSenderId: "659860840254",
      appId: "1:659860840254:web:952208ed587c17d1"
    })
  }
  
  render() {
    return (
      <AppContainer />
    );
  }
}