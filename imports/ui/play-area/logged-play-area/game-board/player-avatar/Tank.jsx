import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {TweenMax} from 'gsap';
import './Tank.scss';

export default class Tank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevRotation: null,
    };
  }
  componentDidMount() {
    var node = ReactDOM.findDOMNode(this);
    console.log(node)
    TweenMax.to(node, 5, {x: 60});
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
    let nextRotation = player.tank.rotation;
    let tankStyle = {
      transform: `rotate(${nextRotation}deg)`,
      animation: `tank${prevRotation}-${nextRotation} 0.6s linear 0s`,
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
  player: React.PropTypes.object,
};
