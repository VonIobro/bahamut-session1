import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {TimelineMax} from 'gsap';
import './Weapon.scss';

export default class Weapon extends Component {
  componentDidMount() {
    this.animInit();
  }
  componentWillReceiveProps(nextProps) {
    const {player} = this.props;
    if (nextProps.player.weapon) {
      const nextCount = nextProps.player.weapon.count;
      const prevCount = player.weapon.count;
      // only update state if props changed
      if (nextCount > prevCount) {
        this.animFire();
      }
    }
  }
  animInit() {
    this.tl = new TimelineMax();
    this.node = ReactDOM.findDOMNode(this);
    this.tl.to(this.node, 0, {opacity: 0, left: -10});
  }
  animFire() {
    this.tl.to(this.node, 0.7, {opacity: 1, top: -60, rotation: 180, scale: 1.2})
      .to(this.node, 0.3, {opacity: 0, scale: 0.5, rotation: 90})
      .to(this.node, 0, {top: 0, rotation: 0});
  }
  render() {
    return <span className="explosion"></span>;
  }
}

Weapon.propTypes = {
  player: React.PropTypes.object,
};
