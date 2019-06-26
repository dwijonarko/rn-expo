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
      apiKey: "YOUR KEY",
      authDomain: "YOUR DOMAIN",
      databaseURL: "YOUR DATABASEURL",
      projectId: "YOUR PROJECT ID",
      storageBucket: "YOUR STORAGE BUCKET",
      messagingSenderId: "YOUR SENDER ID",
      appId: "YOUR APP ID"
    })
  }
  
  render() {
    return (
      <AppContainer />
    );
  }
}