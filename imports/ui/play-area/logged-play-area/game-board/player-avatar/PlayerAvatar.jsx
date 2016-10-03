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
      return (
        <span key={player._id}>
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

export default composeWithTracker((props, onData) => {
  const subscription = Meteor.subscribe('users.tanks');
  if (subscription.ready()) {
    const players = Meteor.users.find({}).fetch();
    onData(null, {players});
  }
})(PlayerAvatar);
