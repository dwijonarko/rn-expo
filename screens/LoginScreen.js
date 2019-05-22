import React from 'react';
import { Alert, StyleSheet, Text, Image, View, TextInput, Button,KeyboardAvoidingView,ActivityIndicator } from 'react-native';
import firebase from "firebase";
export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error:'',
            success:'',
            loading:false
        }
    }
    _onPressLogin = () => {
        this.setState({
            success: '',
            error:'',
            loading: true 
        });
        const{email,password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(data => {
                this.setState({ 
                    email: '',
                    password:'',
                    success:'Login Success',
                    loading:false 
                });
                this.props.navigation.navigate('Home');
            }).catch(e => {
                this.setState({
                    error:'Login failed',
                    success:'',
                    loading:false
                })
            })
    }

    _onPressCancel = () => {
        this.setState({ email: '' })
        this.setState({ password: '' })
    }

    _loading(){
        if (this.state.loading) {
            return <ActivityIndicator />;
        }
        
        return <Text>{this.state.success}{this.state.error}</Text>;
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behaviour="padding enabled">
                <Image style={styles.image} source={require('../assets/logo.png')} ></Image>
                {this._loading()}
                <TextInput style={styles.username} placeholder="Email" value={this.state.email} onChangeText={(text) => this.setState({ email: text })}></TextInput>
                <TextInput style={styles.password} placeholder="Password" value={this.state.password} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} ></TextInput>
                <View style={styles.loginButton}>
                    <Button title="Login" onPress={this._onPressLogin} color="#841584" ></Button>
                </View>
                <View style={styles.loginButton}>
                    <Button title="Cancel" onPress={this._onPressCancel} color="#FFEB3B" ></Button>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue'
    },
    image: {
        height: 100,
        width: 100
    },
    username: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '90%',
        padding: 5,
        marginBottom: 10,
    },
    password: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '90%',
        padding: 5,
        marginBottom: 10,
    },
    loginButton: {
        width: '90%',
        marginBottom: 10,
    }
});