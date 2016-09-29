import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {TimelineMax} from 'gsap';
import './Tank.scss';

export default class Tank extends Component {
  constructor() {
    super();
    this.state = {
      prevRotation: null,
      prevLocation: null,
    };
  }
  componentDidMount() {
    this.tl = new TimelineMax();
    this.node = ReactDOM.findDOMNode(this);
    this.animate();
  }
  componentWillReceiveProps(nextProps) {
    const {player} = this.props;
    // compare rotation
    const nextRotation = nextProps.player.tank.rotation;
    const prevRotation = player.tank.rotation;
    // only update state if props changed
    if (nextRotation !== prevRotation) {
      this.setState({prevRotation});
    }
    // compare location
    const nextLocation = nextProps.player.tank.position;
    const prevLocation = player.tank.position;
    if (nextLocation) {
      if (nextLocation !== prevLocation) {
        this.setState({prevLocation});
        this.animMove();
      }
    }
  }
  animate() {
    const {player} = this.props;
    const posX = player.tank.position.x;
    const posY = player.tank.position.y;
    this.tl.to(this.node, 0, {x: posX, y: posY});
  }
  animMove() {
    const {player} = this.props;
    const {prevLocation} = this.state;
    // wait for state to be set...
    if (prevLocation) {
      const fromX = prevLocation.x;
      const fromY = prevLocation.y;
      const toX = player.tank.position.x;
      const toY = player.tank.position.y;
      this.tl.from(this.node, 0, {x: fromX, y: fromY})
      .to(this.node, 0.2, {x: toX, y: toY});
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
        style={this.tankStyle()}>
      </div>
    );
  }
}

Tank.propTypes = {
  player: React.PropTypes.object,
};
