import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {TimelineMax, TweenLite} from 'gsap';
import './Tank.scss';

export default class Tank extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.animInit();
  }
  componentWillReceiveProps(nextProps) {
    const {player} = this.props;
    // look for update by comparing location
    const nextLoc = nextProps.player.tank;
    const prevLoc = player.tank;
    if (nextLoc) {
      if (!_.isEqual(nextLoc, prevLoc)) {
        this.animMove(nextLoc.position, nextLoc.rotation, prevLoc.rotation);
      }
    }
  }
  animInit() {
    this.tl = new TimelineMax();
    this.node = ReactDOM.findDOMNode(this);
    const {player} = this.props;
    const posX = player.tank.position.x;
    const posY = player.tank.position.y;
    const rotation = player.tank.rotation;
    TweenLite.to(this.node, 0, {x: posX, y: posY, rotation});
  }
  animMove(pos, nextRot, prevRot) {
    TweenLite.to(this.node, 0.2, {x: pos.x, y: pos.y});
    // custom rotation rules
    if (prevRot === 270 && nextRot === 0) {
      this.tl.to(this.node, 0, {rotation: prevRot})
        .to(this.node, 0.5, {rotation: 360});
      return;
    }
    if (prevRot === 0 && nextRot === 270) {
      this.tl.to(this.node, 0, {rotation: 360})
        .to(this.node, 0.5, {rotation: nextRot});
      return;
    }
    this.tl.to(this.node, 0, {rotation: prevRot})
      .to(this.node, 0.5, {rotation: nextRot});
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
  render() {
    return (
      <div className={this.tankClass()}></div>
    );
  }
}

Tank.propTypes = {
  player: React.PropTypes.object,
};
