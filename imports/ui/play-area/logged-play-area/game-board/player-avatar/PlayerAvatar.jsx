import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {composeWithTracker} from 'react-komposer';
import './PlayerAvatar.scss';

class PlayerAvatar extends Component {
  playerNodes() {
    const {players} = this.props;
    const nodes = players.map(player => {
      const playerClass = () => {
        let classes = '';
        // tank type (player or enemy)
        if (Meteor.userId() === player._id) {
          classes = classes + ' player player1';
        } else {
          classes = classes + ' player enemy';
        }
        // tank orientation
        classes = classes + ' ' + player.tank.rotation;
        return classes;
      };
      const tankStyle = {
        top: `${player.tank.position.x}px`,
        left: `${player.tank.position.y}px`,
      };
      return (
        <div className={playerClass()}
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
