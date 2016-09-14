import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {composeWithTracker} from 'react-komposer';
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

class Tank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevRotation: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    const {player} = this.props;
    const nextRotation = nextProps.player.tank.rotation;
    const prevRotation = player.tank.rotation;
    // only update state if props changed
    if (nextRotation !== prevRotation) {
      this.setState({prevRotation});
    }
  }
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
    const {prevRotation} = this.state;
    // tank rotation
    let nextRotation = player.tank.rotation;
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
  constructor(props) {
    super(props);
    this.state = {
      weaponUsed: false,
    };
  }
  weaponClass() {
    const {player} = this.props;
    // weapon type
    let weaponClass = 'weapon';
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
    if (player.tank.weaponReady === true) {
      return (
        <div className={this.weaponClass()}
          style={this.weaponStyle()}>
          BOOM!
        </div>
      );
    }
    return (
      <div></div>
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
