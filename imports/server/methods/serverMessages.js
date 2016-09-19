import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {ServerMessages} from '../lib/collections';

Meteor.methods({
  'serverMessages.newUser'(username) {
    check(username, String);
    ServerMessages.insert({
      type: 'newUser',
      args: username
    });
  },
});
