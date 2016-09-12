import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {composeWithTracker} from 'react-komposer';
import './PlayerAvatar.scss';

class PlayerAvatar extends Component {
  playerNodes() {
    const {players} = this.props;
    return players.map(player => {
      const playerType = () => {
        if (Meteor.userId() === player._id) {
          return 'player player1';
        }
        return 'player enemy';
      };
      const style = {
        top: `${player.tank.position.x}px`,
        left: `${player.tank.position.y}px`,
      };
      return (
        <div className={playerType()}
          key={player._id}
          style={style}>
          {player.username}
        </div>
      );
    });
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
