import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {composeWithTracker} from 'react-komposer';
import './PlayerAvatar.scss';

class PlayerAvatar extends Component {
  playerNodes() {
    const {players} = this.props;
    const nodes = players.map(player => {
      let classes = '';
      let tankStyles = {};
      // tank type (player or enemy)
      if (Meteor.userId() === player._id) {
        classes += ' tank player1';
      } else {
        classes += ' tank enemy';
      }
      tankStyles = {
        top: `${player.tank.position.x}px`,
        left: `${player.tank.position.y}px`,
        transform: `rotate(${player.tank.rotation}deg)`,
      };
      return (
        <div className={classes}
          key={player._id}
          style={tankStyles}>
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
