import React, { Component } from 'react';
import { Platform, Dimensions,StyleSheet,View,Text,TouchableOpacity,Image,ScrollView } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default class MenuDrawer extends Component {
    navlink(nav,text){
        return(
            <TouchableOpacity style={{ height: 50 }} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    }
  render() {
    return (
      <View style={styles.container}>
      
        <View style={styles.topLink}>
            <View style={styles.profile}>
                <View style={styles.imgView}>
                    <Image style={styles.img} source={require('../assets/profile.jpg')} />
                </View>
                <View style={styles.profileText}>
                    <Text style={styles.name}>Dwi Wijonarko</Text>
                </View>
            </View>
        </View>
        <ScrollView style={styles.scroller}>
        <View style={styles.bottomLink}>
            {this.navlink('Home', 'Home')}
            {this.navlink('Setting', 'Setting')}
            {this.navlink('Profile', 'Profile')}
            {this.navlink('Camera', 'Camera')}
            
        </View>
        </ScrollView>
        <View style={styles.footer}>
            <View style={styles.description}>
                <Text>Mobile Terapan</Text>
            </View>
            <View style={styles.version}>
                <Text>@2019</Text>
            </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000'
    },
    scroller:{
        flex:1,
    },
    link:{
        flex:1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin:5,
        textAlign:'left'
    },
    topLink:{
        height:160,
        backgroundColor:'black'
    },
    bottomLink:{
        flex: 1,
        backgroundColor:'white',
        paddingTop: 10,
        paddingBottom: 540,
    },
    profile:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        paddingTop: 25,
        borderBottomWidth:1,
        borderBottomColor: '#777777',
    },
    profileText:{
        flex:3,
        flexDirection:'column',
        justifyContent: 'center',
    },
    imgView:{
        flex:1,
        paddingLeft:20,
        paddingRight:20
    },
    img:{
        width:70,
        height:70,
        borderRadius: 50,
    },
    name:{
        fontSize:20,
        color:'white',
        paddingBottom:5,
        textAlign:'left'
    },
    footer:{
        height:50,
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:'white',
        borderTopColor: 'lightgrey',
        borderTopWidth: 1,
    },
    description:{
        paddingLeft: 10,
    },
    version:{
        paddingLeft: 10,
    }
});