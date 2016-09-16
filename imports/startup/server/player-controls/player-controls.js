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
    let range = 60;
    /* TODO: LIMIT PLAYERS TO SEARCH */
    // if rotation is 0 (up) or 180 (down)
    // search users on player1's pos.x (directly above/below)
    // if rotation is 90 (right) or 270 (left)
    // search users on player1's pos.y (directly left/right)

    // DETERMINE TILES AFFECTED
    // if 0, beg [100, 100] -> end [100, 40] => pos.y $gt: 40, $lt: 100
    // if 90, beg [100, 100] -> end [40, 100] => pos.x $gt: 40, $lt: 100
    // if 180, beg [100, 100] -> end [100, 160] => pos.y $gt: 100, $lt: 160
    // if 270, beg [100, 100] -> end [160, 100] => pos.x $gt: 100, $lt: 160
    // determine tiles affected, based on range, and starting pos.x
    // then search for users $gt $lt in the pos.y

    // COMMON ACTION
    // update hit enemies by $inc -1 their tank health
    // update player1 with hit enemy list
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
