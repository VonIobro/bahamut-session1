import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.methods({
  'tank.moveFwd'(userId, rotation) {
    check(userId, String);
    check(rotation, Number);
    let translation = [];
    if (rotation === 0) {
      translation = [ -10, 0 ];
    } else if (rotation === 90) {
      translation = [ 0, 10 ];
    } else if (rotation === 180) {
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
    check(rotation, Number);
    let translation = [];
    if (rotation === 0) {
      translation = [ 10, 0 ];
    } else if (rotation === 90) {
      translation = [ 0, -10 ];
    } else if (rotation === 180) {
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
    check(prevRotation, Number);
    let rotate;
    // when rotating past zero
    if (prevRotation === 0) {
      rotate = 270;
    } else {
      rotate = -90;
    }
    return Meteor.users.update(
      {_id: userId},
      {$inc: {'tank.rotation': rotate}}
    );
  },
  'tank.rotateRight'(userId, prevRotation) {
    check(userId, String);
    check(prevRotation, Number);
    let rotate;
    // when rotating past zero
    if (prevRotation === 270) {
      rotate = -270;
    } else {
      rotate = 90;
    }
    return Meteor.users.update(
      {_id: userId},
      {$inc: {'tank.rotation': rotate}}
    );
  },
});
