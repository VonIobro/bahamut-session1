import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.methods({
  'debugMode'(userId, val) {
    check(userId, String);
    check(val, Boolean);
    Meteor.users.update(
      {_id: userId},
      {$set: {debugMode: val}}
    );
  },
  'tank.moveFwd'(userId, rotation) {
    check(userId, String);
    check(rotation, Number);
    let translation = [];
    if (rotation === 0) {
      translation = [ 0, -10 ];
    } else if (rotation === 90) {
      translation = [ 10, 0 ];
    } else if (rotation === 180) {
      translation = [ 0, 10 ];
    } else {
      translation = [ -10, 0 ];
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
      translation = [ 0, 10 ];
    } else if (rotation === 90) {
      translation = [ -10, 0 ];
    } else if (rotation === 180) {
      translation = [ 0, -10 ];
    } else {
      translation = [ 10, 0 ];
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
    let rotate = -90;
    // when rotating past zero
    if (prevRotation === 0) {
      rotate = 270;
    }
    return Meteor.users.update(
      {_id: userId},
      {$inc: {'tank.rotation': rotate}}
    );
  },
  'tank.rotateRight'(userId, prevRotation) {
    check(userId, String);
    check(prevRotation, Number);
    let rotate = 90;
    // when rotating past zero
    if (prevRotation === 270) {
      rotate = -270;
    }
    return Meteor.users.update(
      {_id: userId},
      {$inc: {'tank.rotation': rotate}}
    );
  },
  'tank.fireWeapon'(userId, weapon) {
    check(userId, String);
    check(weapon, Object);
    weapon.area = [];
    return Meteor.users.update(
      {_id: userId},
      {
        $inc: {'tank.weapon.count': 1},
        $set: {
          'tank.weapon.area': weapon.area,
          'tank.weapon.position': weapon.position,
          'tank.weapon.rotation': weapon.rotation
        }
      }
    );
  },
});
