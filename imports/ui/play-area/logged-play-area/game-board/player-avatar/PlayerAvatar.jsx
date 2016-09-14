import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {composeWithTracker} from 'react-komposer';
import Tank from './Tank';
import Weapon from './Weapon';
import './PlayerAvatar.scss';

class PlayerAvatar extends Component {
  tankNodes() {
    const {players} = this.props;
    return players.map(player => {
      return (
        <Tank
          key={`tnk-${player._id}`}
          player={player}
        />
      );
    });
  }
  weaponNodes() {
    const {players} = this.props;
    return players.map(player => {
      return (
        <Weapon
          key={`wpn-${player._id}`}
          player={player}
        />
      );
    });
  }
  render() {
    return (
      <div>
        {this.tankNodes()}
        {this.weaponNodes()}
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
