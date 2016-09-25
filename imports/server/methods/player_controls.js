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

    // determine affected area of weapon
    const weaponY = weapon.position.y;
    const weaponX = weapon.position.x;
    let areaX = [ weaponX - 10, weaponX + 10 ];
    let areaY = [ weaponY - 10, weaponY + 10 ];
    const range = 60;
    if (weapon.rotation === 0) {
      areaY = [ weaponY - range, weaponY ];
    }
    if (weapon.rotation === 90) {
      areaX = [ weaponX, weaponX + range ];
    }
    if (weapon.rotation === 180) {
      areaY = [ weaponY, weaponY + range ];
    }
    if (weapon.rotation === 270) {
      areaX = [ weaponX - range, weaponX ];
    }

    // update hit enemies by $inc -1 their tank health
    const hitQuery = {
      $and: [
        {
          'tank.position.x': {$gte: areaX[0], $lte: areaX[1]},
          'tank.position.y': {$gte: areaY[0], $lte: areaY[1]}
        },
        {_id: {$ne: Meteor.userId()}}
      ]
    };
    const hitUpdate = {$inc: {'tank.health': -1}};
    Meteor.users.update(hitQuery, hitUpdate, {multi: true});

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
