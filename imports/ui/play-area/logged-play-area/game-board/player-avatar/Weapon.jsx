import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Weapon.scss';

export default class Weapon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weaponCount: null,
      shouldFireWeapon: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    const {player} = this.props;
    const curWeaponCount = nextProps.player.tank.weaponCount;
    const prevWeaponCount = player.tank.weaponCount;
    // only update state if props changed
    if (curWeaponCount > prevWeaponCount) {
      this.setState({shouldFireWeapon: true});
    } else {
      this.setState({shouldFireWeapon: false});
    }
  }
  weaponClass() {
    const {player} = this.props;
    // weapon type
    let weaponClass = 'explosion';
    return weaponClass;
  }
  renderWeapon() {
    const {shouldFireWeapon} = this.state;
    const style = {
      // transform: 'translate3d(0,-30px,0)',
      animation: 'boom 1s ease-in',
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
