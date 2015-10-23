/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Meteor = require('meteor-client');
var Mongo = require('mongo');
// This implements `Meteor.connect`
require('ddp');

var rnApp = React.createClass({
  componentWillMount() {
    // Replace 'localhost' with your local ip address
    Meteor.connect('ws://localhost:3000/websocket');

    var collection = new Mongo.Collection('users', {
      connection: Meteor.connection,        // The DDP connection to use (defaults to Meteor.connection)
      autoPublish: false,                   // Used in place of "meteor/autopublish"
      insecure: false,                      // Used in place of "meteor/insecure"
      idGeneration: 'MONGO',                // The method of generating the `_id` fields of new documents in this collection (defaults to 'STRING')
      transform: function () { /* ... */ }, // Function that is passed the results of `fetch()` or `findOne()`
    });
    console.log(collection.find().fetch());
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('rnApp', () => rnApp);
