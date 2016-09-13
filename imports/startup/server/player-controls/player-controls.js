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
  'tank.rotateLeft'(userId, prevRotation) {
    check(userId, String);
    check(prevRotation, String);
    let newRotation;
    if (prevRotation === 'tank-up') {
      newRotation = 'tank-left';
    } else if (prevRotation === 'tank-left') {
      newRotation = 'tank-down';
    } else if (prevRotation === 'tank-down') {
      newRotation = 'tank-right';
    } else {
      newRotation = 'tank-up';
    }
    return Meteor.users.update(
      {_id: userId},
      {$set: {'tank.rotation': newRotation}}
    );
  },
  'tank.rotateRight'(userId, prevRotation) {
    check(userId, String);
    check(prevRotation, String);
    let newRotation;
    if (prevRotation === 'tank-up') {
      newRotation = 'tank-right';
    } else if (prevRotation === 'tank-right') {
      newRotation = 'tank-down';
    } else if (prevRotation === 'tank-down') {
      newRotation = 'tank-left';
    } else {
      newRotation = 'tank-up';
    }
    return Meteor.users.update(
      {_id: userId},
      {$set: {'tank.rotation': newRotation}}
    );
  },
});
