import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.methods({
  'tank.moveFwd'(userId, rotation) {
    check(userId, String);
    check(rotation, String);
    let translation = [];
    if (rotation === 'tank-up') {
      translation = [ -10, 0 ];
    } else if (rotation === 'tank-right') {
      translation = [ 0, 10 ];
    } else if (rotation === 'tank-down') {
      translation = [ 10, 0 ];
    } else {
      translation = [ 0, -10 ];
    }
    Meteor.users.update(
      {_id: userId},
      {$inc: {
        'tank.position.x': translation[0],
        'tank.position.y': translation[1],
      }}
    );
  },
  'tank.moveBack'(userId, rotation) {
    check(userId, String);
    check(rotation, String);
    let translation = [];
    if (rotation === 'tank-up') {
      translation = [ 10, 0 ];
    } else if (rotation === 'tank-right') {
      translation = [ 0, -10 ];
    } else if (rotation === 'tank-down') {
      translation = [ -10, 0 ];
    } else {
      translation = [ 0, 10 ];
    }
    Meteor.users.update(
      {_id: userId},
      {$inc: {
        'tank.position.x': translation[0],
        'tank.position.y': translation[1],
      }}
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
