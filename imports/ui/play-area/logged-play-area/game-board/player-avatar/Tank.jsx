import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {TweenMax} from 'gsap';
import './Tank.scss';

export default class Tank extends Component {
  constructor() {
    super();
    this.state = {
      prevRotation: null,
    };
  }
  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    this.animate();
  }
  componentDidUpdate() {
    this.animate();
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
  animate() {
    const {player} = this.props;
    TweenMax.to(this.node, 0, {
      x: player.tank.position.x,
      y: player.tank.position.y
    });
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
    let nextRotation = player.tank.rotation;
    let tankStyle = {
      transform: `rotate(${nextRotation}deg)`,
      animation: `tank${prevRotation}-${nextRotation} 0.6s linear 0s`,
    };
    return tankStyle;
  }
  render() {
    return (
      <div
        className={this.tankClass()}
        ref="thisDiv"
        style={this.tankStyle()}>
      </div>
    );
  }
}

Tank.propTypes = {
  player: React.PropTypes.object,
};
