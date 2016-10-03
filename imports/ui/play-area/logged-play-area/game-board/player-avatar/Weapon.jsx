import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {TimelineMax, TweenLite} from 'gsap';
import './Weapon.scss';

export default class Weapon extends Component {
  componentDidMount() {
    this.animInit();
  }
  componentWillReceiveProps(nextProps) {
    const {player} = this.props;
    if (nextProps.player.tank.weapon) {
      const nextCount = nextProps.player.tank.weapon.count;
      const prevCount = player.tank.weapon.count;
      // only update state if props changed
      if (nextCount > prevCount) {
        this.animFire(player.tank.position, player.tank.rotation);
      }
    }
  }
  animInit() {
    this.tl = new TimelineMax();
    this.node = ReactDOM.findDOMNode(this);
    TweenLite.to(this.node, 0, {opacity: 0});
  }
  animFire(pos, rotation) {
    /*
      TODO Dup an object, w/o changing the original object
      let endPos = pos; // this doesn't work
    */
    let endPos = {x: pos.x, y: pos.y};
    if (rotation === 0) {endPos.y -= 60;}
    if (rotation === 90) {endPos.x += 60;}
    if (rotation === 180) {endPos.y += 60;}
    if (rotation === 270) {endPos.x -= 60;}
    this.tl.to(this.node, 0, {opacity: 0, x: pos.x, y: pos.y})
      .to(this.node, 0.8, { opacity: 1, x: endPos.x, y: endPos.y})
      .to(this.node, 0.1, {opacity: 0});
  }
  render() {
    return <span className="explosion"></span>;
  }
}

Weapon.propTypes = {
  player: React.PropTypes.object,
};
