import {Meteor} from 'meteor/meteor';

export default function HandleServerMessages(id, fields) {
  // filter out messages older than 500ms
  const cutTime = new Date().valueOf() - 1000;
  const msgTime = fields.date.valueOf();
  if (msgTime < cutTime) {
    return;
  }
  // depending on 'type', do stuff
  if (fields.type === 'notification') {
    const message = {
      _id: id,
      text: fields.text
    };
    system.addNotification(message);
  }

  if (fields.type === 'newUser') {
    const message = {
      _id: id,
      text: `Enter ${fields.username}`,
      style: 'warning'
    };
    system.addNotification(message);
  }

  if (fields.type === 'hitUpdate') {
    // define player
    let player;
    if (fields.player.id === Meteor.userId()) {
      player = 'You';
    } else {
      player = fields.player.username;
    }
    // define text
    let result;
    if (fields.data.length === 0) {
      result = ' missed!';
    } else {
      let hitEnemyNames = 'none';
      fields.data.forEach((enemy) => {
        hitEnemyNames += `${enemy.username} `;
      });
      hitEnemyNames = hitEnemyNames.slice(0, -1);
      result = ` hit ${hitEnemyNames}!`;
    }
    const message = {
      _id: id,
      text: `${player} ${result}`,
      style: 'warning'
    };
    system.addNotification(message);
  }
}

class System {
  addNotification(message) {
    this.message = message;
  }
  addTank(id, fields) {
    // adds a notification that a new player has entered
    // if player1 (this.userId) animates player1 tank
    // based on position (color, style?)
    // if enemy animates eneny tank
  }
  gameIntro() {
    // intro animations
  }
  gameOutro() {
    // outro animations
  }
  hitUpdate() {
  }
}

export const system = new System();
