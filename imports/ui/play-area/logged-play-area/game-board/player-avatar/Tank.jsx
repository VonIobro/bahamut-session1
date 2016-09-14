import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import './Tank.scss';

export default class Tank extends Component {
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

Tank.propTypes = {
  user: React.PropTypes.object,
};
