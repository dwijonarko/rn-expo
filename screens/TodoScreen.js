import React, { Component } from 'react'
import { KeyboardAvoidingView,TextInput, Text, View,Button,ActivityIndicator,StatusBar,FlatList } from 'react-native'
import * as firebase from "firebase";
import 'firebase/firestore';
import Todo from './Todo';

export default class TodoScreen extends Component {
    static navigationOptions = {
        title: 'Todos',
    };
    constructor(props) {
        super(props)
        this.ref = firebase.firestore().collection('todos');
        this.unsubcribe = null;
        this.state = {
             title:'',
             todos:[],
             loading:true,
        }
    }

    componentDidMount() {
        this.unsubcribe =this.ref.onSnapshot(this.onCollectionUpdate);
    }

    componentWillUnmount() {
        this.unsubcribe();
    }

    onCollectionUpdate = (querySnashot) =>{
        const todos = [];
        querySnashot.forEach((doc)=>{
            const {title,complete}=doc.data();
            todos.push({
                key:doc.id,
                doc,
                title,
                complete
            });
        });

        this.setState({todos,loading:false});
    }
    
    _addData=()=>{
        this.ref.add({
            title:this.state.title,
            complete: false
        });
        this.setState({title:''})
        this.unsubcribe=this.ref.onSnapshot(this.onCollectionUpdate);
    }
    
    
    render() {
        if (this.state.loading) {
            return(
                <ActivityIndicator />
            )
        }
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={{ marginTop: 40, }}>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <TextInput
                        placeholder="Todos"
                        value={this.state.title}
                        onChangeText={(text) => this.setState({ title: text })}
                        style={{ width: '80%', padding: 5, borderColor: '#ccc', borderBottomWidth: 1, }}
                    />
                    <Button
                        title="Add"
                        disable={!this.state.title.length}
                        onPress={this._addData}
                    />
                </View>
                <FlatList
                    data={this.state.todos}
                    renderItem={({ item }) => <Todo {...item} />}
                    style={{ margin: 10 }}
                />
            </KeyboardAvoidingView>
        )
    }
}
