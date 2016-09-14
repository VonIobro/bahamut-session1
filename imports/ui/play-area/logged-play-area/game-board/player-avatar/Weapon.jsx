import React, {Component} from 'react';
import './Weapon.scss';

export default class Weapon extends Component {
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

Weapon.propTypes = {
  user: React.PropTypes.object,
};
