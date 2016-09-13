import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {composeWithTracker} from 'react-komposer';
import './PlayerAvatar.scss';

class PlayerAvatar extends Component {
  playerNodes() {
    const {players} = this.props;
    const nodes = players.map(player => {
      return (
        <div key={player._id}>
          <Tank player={player} />
          <Weapon player={player} />
        </div>
      );
    });
    return nodes;
  }
  render() {
    return (
      <div>
        {this.playerNodes()}
      </div>
    );
  }
}

class Tank extends Component {
  tankClass() {
    const {player} = this.props;
    // tank type (player or enemy)
    let tankClass = 'tank';
    if (Meteor.userId() === player._id) {
      tankClass += ' player1';
    } else {
      tankClass += ' enemy';
    }
    return tankClass;
  }
  tankStyle() {
    const {player} = this.props;
    // tank rotation
    let nextRotation = player.tank.rotation;
    let prevRotation = player.tank.prevRotation;
    let tankAnim = `tank${prevRotation}-${nextRotation}`;

    // tank style
    let tankStyle = {
      left: `${player.tank.position.y}px`,
      top: `${player.tank.position.x}px`,
      transform: `rotate(${player.tank.rotation}deg)`,
      animation: `${tankAnim} 0.6s linear 0s`,
    };
    return tankStyle;
  }
  render() {
    return (
      <div className={this.tankClass()}
        style={this.tankStyle()}>
      </div>
    );
  }
}

class Weapon extends Component {
  weaponClass() {
    const {player} = this.props;
    // weapon type
    let weaponClass = '';
    return weaponClass;
  }
  weaponStyle() {
    const {player} = this.props;
    // weapon style
    let weaponStyle = {
      left: `${player.tank.position.y}px`,
      top: `${player.tank.position.x}px`,
      // transform: `rotate(${player.tank.rotation}deg)`,
      // animation: `${tankAnim} 0.6s linear 0s`,
    };
    return weaponStyle;
  }
  render() {
    const {player} = this.props;
    return (
      <div className={this.weaponClass()}
        style={this.weaponStyle()}>
        {player.username} weapon
      </div>
    )
  }
}

PlayerAvatar.propTypes = {
  user: React.PropTypes.object,
};

export default composeWithTracker((props, onData) => {
  const subscription = Meteor.subscribe('userTanks');
  if (subscription.ready()) {
    const players = Meteor.users.find({}).fetch();
    onData(null, {players});
  }
})(PlayerAvatar);
