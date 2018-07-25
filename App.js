import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Gun from 'gun/gun.js'

const gun = new Gun('https://gun-test-rn.herokuapp.com/gun')
Component.prototype.$gun = gun
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.$hello = this.$gun.get('hello')
    let _this = this
    this.$hello.on(function (data, key) {
      let name = data.name
      _this.setState({ name: name })
    });
  }


  render() {

    return (
      <View style={styles.container}>

        <View style={styles.messageArea}>
          <Text>Common message :</Text>
          <Text style={styles.messageText}> {this.state.name}</Text>
        </View>
        <TextInput style={styles.inputArea}
          onChangeText={(text) => this.setState({ text })}
        />
        <Button title='Update'
          onPress={() => {
            this.$hello.put({ name: this.state.text })
          }}
        />

      </View>
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
  inputArea: {

    borderWidth: 1,
    paddingVertical: 10,

    width: "80%"
  },
  messageArea: {

    flexDirection: 'row'
  },
  messageText: {
    color: 'red'

  }
});