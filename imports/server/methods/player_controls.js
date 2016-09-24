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
    let areaX = []; // [start, end]
    let areaY = []; // [start, end]
    /* TODO: LIMIT PLAYERS TO SEARCH */
    if (weapon.rotation === 0) {
      areaX = [ weapon.position.x, weapon.position.x ];
      areaY[0] = weapon.position.y;
      areaY[1] = weapon.position.y - range;
    }
    if (weapon.rotation === 90) {
      areaX[0] = weapon.position.x;
      areaX[1] = weapon.position.x + range;
      areaY = [ weapon.position.y, weapon.position.y ];
    }
    if (weapon.rotation === 180) {
      areaX = [ weapon.position.x, weapon.position.x ];
      areaY[0] = weapon.position.y;
      areaY[1] = weapon.position.y + range;
    }
    if (weapon.rotation === 270) {
      areaX[0] = weapon.position.x;
      areaX[1] = weapon.position.x - range;
      areaY = [ weapon.position.y, weapon.position.y ];
    }

    // COMMON ACTION
    // update hit enemies by $inc -1 their tank health
    // update player1 with hit enemy list
    return Meteor.users.update(
      {_id: userId},
      {
        $inc: {'tank.weapon.count': 1},
        $set: {
          'tank.weapon.area': `x${areaX}, y${areaY}`,
          'tank.weapon.position': weapon.position,
          'tank.weapon.rotation': weapon.rotation
        }
      }
    );
  },
});
