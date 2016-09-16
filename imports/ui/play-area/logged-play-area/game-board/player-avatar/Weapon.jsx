import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Weapon.scss';

export default class Weapon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldFireWeapon: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const {player} = this.props;
    if (nextProps.player.tank.weapon) {
      const nextCount = nextProps.player.tank.weapon.count;
      const prevCount = player.tank.weapon.count;
      // only update state if props changed
      if (nextCount > prevCount) {
        this.setState({shouldFireWeapon: true});
      } else {
        this.setState({shouldFireWeapon: false});
      }
    }
  }
  weaponClass() {
    const {player} = this.props;
    // weapon type
    let weaponClass = 'explosion';
    return weaponClass;
  }
  renderWeapon() {
    const {player} = this.props;
    const {shouldFireWeapon} = this.state;
    const rotation = player.tank.rotation;
    const style = {
      animation: `boom${rotation} 1s ease-in`,
    };
    if (shouldFireWeapon === true) {
      return <span style={style}></span>;
    }
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName={this.weaponClass()}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={500}>
        {this.renderWeapon()}
      </ReactCSSTransitionGroup>
    );
  }
}

Weapon.propTypes = {
  player: React.PropTypes.object,
};
