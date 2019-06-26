import React, { Component } from 'react';
import { Platform, Dimensions,StyleSheet,View,Text,TouchableOpacity,Image,ScrollView } from 'react-native';
import {ImagePicker,Permissions} from 'expo'
import firebase from "firebase"
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default class MenuDrawer extends Component {
    constructor(props) {
      super(props)
      this.state = {
          image:'http://bit.ly/gbr-pisang',
          hasCameraPermission: null,
          hasCameraRollPermission:null,
      }
    }

    async componentWillMount() {
        const { statusCameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: statusCameraRoll === 'granted' });
        const { statusCamera } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: statusCamera === 'granted' });
    }
    

    navlink(nav,text){
        return(
            <TouchableOpacity style={{ height: 50 }} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        // let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    _signOut = () => {
        firebase.auth().signOut().then(function () {
            this.props.navigation.navigate('Auth');
        }).catch(function (error) {
            console.log(error)
        });
    };

    render() {
    return (
    <View style={styles.container}>
        <View style={styles.topLink}>
            <View style={styles.profile}>
                <TouchableOpacity style={styles.imgView} onPress={this._pickImage}>
                        <Image style={styles.img} source={{ uri: this.state.image}}  />
                </TouchableOpacity>
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
            {this.navlink('Location', 'Location')}
            {this.navlink('Map', 'Map')}
            {this.navlink('Todo', 'Todo')}
            
            <TouchableOpacity style={{ height: 50 }} onPress={this._signOut}>
                <Text style={styles.link}>Logout</Text>
            </TouchableOpacity>
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