import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function () {
  var options = {
    fields: {
      tank: 1,
    }
  };
  if (this.userId) {
    return Meteor.users.find({_id: this.userId}, options);
  }
  return this.ready();
});
