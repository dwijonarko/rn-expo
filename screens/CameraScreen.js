import React, { Component } from 'react';
import { Alert, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class CameraScreen extends Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
            imageSrc: null,
            type: Camera.Constants.Type.back,
        };
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleSwitchCameraPress = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    };

    handleTakePicturePress = async () => {
        const photo = await this.camera.takePictureAsync({ base64: true, quality: 0.9 });
        const imageSrc = 'data:image/jpg;base64,' + photo.base64;
        this.setState({ imageSrc });
    };

    handleSavePicture = () => {
        Alert.alert('Image saved');
    }

    render() {
        const { hasCameraPermission, imageSrc, type } = this.state;
        if (hasCameraPermission === null) {
            return null;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        if (imageSrc) {
            return (
                <ImageBackground
                    resizeMode="stretch"
                    source={{ uri: imageSrc }}
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}
                >
                    <View style={{
                        flex: 0.1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}
                    >
                        <TouchableOpacity onPress={this.handleSavePicture}>
                            <Ionicons
                                name="md-save"
                                color="white"
                                size={32}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ imageSrc: null })}>
                            <Ionicons
                                name="md-trash"
                                color="white"
                                size={32}
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

            );
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Camera
                    ref={(ref) => (this.camera = ref)}
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}
                    type={type}
                >
                    <View style={{
                        flex: 0.1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}
                    >
                        <TouchableOpacity onPress={this.handleTakePicturePress} style={{}}>
                            <Ionicons
                                name="md-camera"
                                color="white"
                                size={32}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleSwitchCameraPress} style={{}}>
                            <Ionicons
                                name="md-refresh"
                                color="white"
                                size={32}
                            />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </SafeAreaView>
        );
    }
}

