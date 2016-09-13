import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {composeWithTracker} from 'react-komposer';
import './PlayerAvatar.scss';

class PlayerAvatar extends Component {
  playerNodes() {
    const {players} = this.props;
    const nodes = players.map(player => {
      // tank type (player or enemy)
      let tankClass = 'tank';
      if (Meteor.userId() === player._id) {
        tankClass += ' player1';
      } else {
        tankClass += ' enemy';
      }

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
      return (
        <div className={tankClass}
          key={player._id}
          style={tankStyle}>
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
