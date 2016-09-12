import { Meteor } from 'meteor/meteor';

Meteor.publish('userTanks', function () {
  var options = {
    fields: {
      _id: 1,
      username: 1,
      tank: 1,
    }
  };
  if (this.userId) {
    return Meteor.users.find({}, options);
  }
  return this.ready();
});
