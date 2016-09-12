import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {composeWithTracker} from 'react-komposer';
import './PlayerAvatar.scss';

class PlayerAvatar extends Component {
  render() {
    const {players} = this.props;
    const playerNodes = players.map(player => {
      const style = {
        top: `${player.tank.position.x}px`,
        left: `${player.tank.position.y}px`,
      };
      return (
        <div className="player1" style={style}>{player.username}</div>
      );
    });
    return (
      <div>
        {playerNodes}
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
