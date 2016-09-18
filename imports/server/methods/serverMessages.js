import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {ServerMessages} from '../lib/collections';

Meteor.methods({
  'serverMessages.consoleLog'(userId) {
    check(userId, String);
    ServerMessages.insert({
      _id: Meteor.Collection.ObjectID(),
      from: userId,
      type: 'somecommand',
    });
  },
});
