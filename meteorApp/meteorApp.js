Items = new Mongo.Collection('items');

Meteor.methods({
  'Items.insert': function(name) {
    return Items.insert({name: name});
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('items');

  Template.items.helpers({
    items: function () {
      return Items.find();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Items.find().count() === 0) {
      console.log('Seeding DB');
      for (i = 0; i < 10; i++) {
        Items.insert({name: 'Todo item ' + i});
      }
    }
  });

  Meteor.publish('items', function() {
    return Items.find();
  });
}
