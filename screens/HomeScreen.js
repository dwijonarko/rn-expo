import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, View, Button, Text, TextInput, Alert, Image,StyleSheet,TouchableOpacity } from 'react-native'
import MenuButton from '../components/MenuButton';
import * as firebase from "firebase";
import 'firebase/firestore';
import { ImagePicker, Permissions } from "expo";
import uuid from 'uuid';
export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            email: null,
            photoUrl: null,
            hasCameraRollPermission: null,
        }
    }

    async componentWillMount() {
        const { statusCameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: statusCameraRoll === 'granted' })
    }

    componentDidMount() {
        this._getCurrentUser();
    }

    _getCurrentUser = async () => {
        let user = await firebase.auth().currentUser;
        console.log(user);
        if (user != null) {
            this.setState({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            })
        }
    }

    _updateProfile = () => {
        this.setState({ loading: true })
        var user = firebase.auth().currentUser;
        var credential;

        user.updateProfile({
            displayName: this.state.name,
            photoURL: this.state.photoURL,
        }).then( () => {
            Alert.alert('Success', 'Update Data successfull');
        }).catch((error) => {
            Alert.alert('Error', 'Error happened')
        }).finally(() =>{
            this.setState({loading:false})
        });


        user.updateEmail(this.state.email).then((user) => {
            Alert.alert('Success', 'Email update')
        }).catch((error) => {
            Alert.alert('Error', 'Error happened')
        }).finally(() =>{
            this.setState({loading:false})
        });


    }
    _renderButtonOrSpinner = () => {
        if (this.state.loading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this._updateProfile} title="Update" />;
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            // let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1]
        });
        if (!result.cancelled) {
            this._uploadImage(result.uri)
        }
    }

    _uploadImage = async (uri) => {
        this.setState({ loading: true })
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            }
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            }
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        const ref = firebase.storage().ref().child(uuid.v4());
        const snapshot = await ref.put(blob);
        blob.close();
        snapshot.ref.getDownloadURL().then((url) => {
            this.setState({ photoURL: url })
            this.setState({ loading: false })

        });
        return await snapshot.ref.getDownloadURL();
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <MenuButton navigation={this.props.navigation} />
                <TouchableOpacity onPress={this._pickImage}>
                    <Image source={{ uri: this.state.photoURL }} style={{ width: 200, height: 200 }} />
                </TouchableOpacity>
                <TextInput style={{ width: '90%', borderRadius: 5, borderColor: "grey" }} value={this.state.name} onChangeText={(text) => { this.setState({ name: text }) }} placeholder="Name" />
                <TextInput style={{ width: '90%', borderRadius: 5, borderColor: "grey" }} value={this.state.email} onChangeText={(text) => { this.setState({ email: text }) }} placeholder="Email" />
                <View style={{ width: '90%', marginBottom: 10 }}>
                    {this._renderButtonOrSpinner()}
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize: 30,
    }
});
