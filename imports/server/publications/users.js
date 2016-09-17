import { Meteor } from 'meteor/meteor';

Meteor.publish('users.tanks', function () {
  var options = {
    fields: {
      _id: 1,
      username: 1,
      tank: 1,
      debugMode: 1
    }
  };
  if (!this.userId) {
    return this.ready();
  }
  return Meteor.users.find({}, options);
});
Meteor.publish('users.player1', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Meteor.users.find({_id: this.userId});
});
