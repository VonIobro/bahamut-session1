import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.methods({
  'tank.moveUp'(userId) {
    check(userId, String);
    console.log('moveUp ' + userId)
  },
});
