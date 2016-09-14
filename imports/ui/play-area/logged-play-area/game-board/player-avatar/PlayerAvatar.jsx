import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {composeWithTracker} from 'react-komposer';
import Tank from './Tank';
import Weapon from './Weapon';
import './PlayerAvatar.scss';

class PlayerAvatar extends Component {
  avatarNodes() {
    // for general position
    const {players} = this.props;
    return players.map(player => {
      const styles = {
        position: 'absolute',
        left: `${player.tank.position.y}px`,
        top: `${player.tank.position.x}px`,
      };
      return (
        <span key={player._id}
          style={styles}>
          <Tank player={player}/>
          <Weapon player={player}/>
        </span>
      );
    });
  }
  render() {
    return (
      <span id='avatar-collection'>
        {this.avatarNodes()}
      </span>
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
