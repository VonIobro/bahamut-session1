import {Meteor} from 'meteor/meteor';

Meteor.methods({
  'debugMode'() {
    const debugState = Meteor.user().debugMode;
    Meteor.users.update(
      {_id: Meteor.userId()},
      {$set: {debugMode: !debugState}}
    );
  },
  'tank.moveFwd'() {
    const pos = Meteor.user().tank.position;
    const rot = Meteor.user().tank.rotation;
    // ignore if beyond bounds
    if (rot === 0 && pos.y <= 0) {
      throw new Meteor.Error(
        'tank.moveFwd',
        'top!',
        'out of bounds'
      );
    }
    if (rot === 90 && pos.x >= 580) {
      throw new Meteor.Error(
        'tank.moveFwd',
        'right!',
        'out of bounds'
      );
    }
    if (rot === 180 && pos.y >= 430) {
      throw new Meteor.Error(
        'tank.moveFwd',
        'bottom!',
        'out of bounds'
      );
    }
    if (rot === 270 && pos.x <= 0) {
      throw new Meteor.Error(
        'tank.moveFwd',
        'left!',
        'out of bounds'
      );
    }

    // calc trajectory based on rotation
    let translation = [];
    if (rot === 0) {
      translation = [ 0, -10 ];
    } else if (rot === 90) {
      translation = [ 10, 0 ];
    } else if (rot === 180) {
      translation = [ 0, 10 ];
    } else {
      translation = [ -10, 0 ];
    }
    Meteor.users.update(
      {_id: Meteor.userId()},
      {$inc: {
        'tank.position.x': translation[0],
        'tank.position.y': translation[1],
      }}
    );
  },
  'tank.moveBack'() {
    const pos = Meteor.user().tank.position;
    const rot = Meteor.user().tank.rotation;
    // ignore if beyond bounds
    if (rot === 0 && pos.y >= 430) {
      throw new Meteor.Error(
        'tank.moveBack',
        'bottom!',
        'out of bounds'
      );
    }
    if (rot === 90 && pos.x <= 0) {
      throw new Meteor.Error(
        'tank.moveBack',
        'left!',
        'out of bounds'
      );
    }
    if (rot === 180 && pos.y <= 0) {
      throw new Meteor.Error(
        'tank.moveBack',
        'top!',
        'out of bounds'
      );
    }
    if (rot === 270 && pos.x >= 580) {
      throw new Meteor.Error(
        'tank.moveBack',
        'right!',
        'out of bounds'
      );
    }

    // calc trajectory based on rotation
    let translation = [];
    if (rot === 0) {
      translation = [ 0, 10 ];
    } else if (rot === 90) {
      translation = [ -10, 0 ];
    } else if (rot === 180) {
      translation = [ 0, -10 ];
    } else {
      translation = [ 10, 0 ];
    }
    Meteor.users.update(
      {_id: Meteor.userId()},
      {$inc: {
        'tank.position.x': translation[0],
        'tank.position.y': translation[1],
      }}
    );
  },
  'tank.rotateLeft'() {
    const prevRotation = Meteor.user().tank.rotation;
    let rotate = -90;
    // when rotating past zero
    if (prevRotation === 0) {
      rotate = 270;
    }
    return Meteor.users.update(
      {_id: Meteor.userId()},
      {$inc: {'tank.rotation': rotate}}
    );
  },
  'tank.rotateRight'() {
    const prevRotation = Meteor.user().tank.rotation;
    let rotate = 90;
    // when rotating past zero
    if (prevRotation === 270) {
      rotate = -270;
    }
    return Meteor.users.update(
      {_id: Meteor.userId()},
      {$inc: {'tank.rotation': rotate}}
    );
  },
  'tank.fireWeapon'() {
    // determine area of weapon effect
    const posY = Meteor.user().tank.position.y;
    const posX = Meteor.user().tank.position.x;
    const rot = Meteor.user().tank.rotation;
    let areaX = [ posX - 10, posX + 10 ];
    let areaY = [ posY - 10, posY + 10 ];
    const range = 60;
    if (rot === 0) {
      areaY = [ posY - range, posY ];
    }
    if (rot === 90) {
      areaX = [ posX, posX + range ];
    }
    if (rot === 180) {
      areaY = [ posY, posY + range ];
    }
    if (rot === 270) {
      areaX = [ posX - range, posX ];
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
    const projection = {
      fields: {
        _id: 1,
        username: 1
      }
    };
    const hitPlayers = Meteor.users.find(hitQuery, projection).fetch();
    // update all players with hits notification
    // modify server system object
    Meteor.call('serverMessages.hitUpdate', hitPlayers);

    // update player with debug information
    Meteor.users.update(
      {_id: Meteor.userId()},
      {
        $inc: {'weapon.count': 1},
        $set: {
          'weapon.area': `x${areaX}, y${areaY}`,
          'weapon.position': {x: posX, y: posY},
          'weapon.rotation': rot
        }
      }
    );
    return;
  },
});
