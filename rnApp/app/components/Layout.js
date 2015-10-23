'use strict';

let React = require('react-native');
let {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} = require('react-native');

let Meteor = require('meteor-client');
require('ddp');
var Mongo = require('mongo');
let Tracker = require('tracker');

let Layout = React.createClass({
  getInitialState() {
    return {
      items: []
    };
  },

  componentWillMount() {
    let self = this;

    // Replace 'localhost' with your local ip address
    Meteor.connect('ws://localhost:3000/websocket');

    let items = new Mongo.Collection('items')

    Tracker.autorun(() => {
      self.setState({items: items.find()});
    });

    Meteor.subscribe('items');
  },

  renderAddItem() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Meteor.call('Items.insert', `new item ${Math.floor(Math.random() * 10)}!`);
        }}>
        <Text>Add an Item</Text>
      </TouchableOpacity>
    )
  },

  renderItems() {
    let items = this.state.items.map((item) => {
      return (
        <View key={item._id} style={styles.row}>
          <Text>{item.name}</Text>
        </View>
      )
    });
    return items;
  },

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderAddItem()}
          {this.renderItems()}
        </ScrollView>
      </View>
    )
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 10
  },
  row: {
    paddingVertical: 10
  },
  button: {
    backgroundColor: 'red',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Layout;
