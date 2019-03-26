import React, { Component } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
export default class MenuButton extends Component {
  render() {
    return (
     <Ionicons 
        name="md-menu"
        color="#000"
        size={32}
        style={styles.menuIcon}
        onPress={() => this.props.navigation.toggleDrawer()}
     />
    )
  }
}

const styles = StyleSheet.create({
    menuIcon:{
        position:'absolute',
        zIndex:9,
        top:40,
        left:20
    }
})