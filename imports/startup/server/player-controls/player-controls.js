import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.methods({
  'tank.moveUp'(userId) {
    check(userId, String);
    Meteor.users.update(
      {_id: userId},
      {$inc: {'tank.position.x': -10}}
    );
  },
  'tank.moveDown'(userId) {
    check(userId, String);
    Meteor.users.update(
      {_id: userId},
      {$inc: {'tank.position.x': 10}}
    );
  },
  'tank.moveLeft'(userId) {
    check(userId, String);
    Meteor.users.update(
      {_id: userId},
      {$inc: {'tank.position.y': -10}}
    );
  },
  'tank.moveRight'(userId) {
    check(userId, String);
    Meteor.users.update(
      {_id: userId},
      {$inc: {'tank.position.y': 10}}
    );
  },
});
