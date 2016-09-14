import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Weapon.scss';

export default class Weapon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weaponUsed: false,
    };
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleRemove() {
    this.setState({weaponUsed: false});
  }
  weaponClass() {
    const {player} = this.props;
    // weapon type
    let weaponClass = 'explosion';
    return weaponClass;
  }
  weaponStyle() {
    const {player} = this.props;
    // weapon style
    let weaponStyle = {
      position: 'absolute',
      // transform: `rotate(90deg)`,
    };
    return weaponStyle;
  }
  renderWeapon() {
    const {player} = this.props;
    if (player.tank.weaponReady === true) {
      return (
        <span
          onClick={() => this.handleRemove()}
          style={this.weaponStyle()}>
          BOOM!
        </span>
      );
    }
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName={this.weaponClass()}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        {this.renderWeapon()}
      </ReactCSSTransitionGroup>
    );
  }
}

Weapon.propTypes = {
  user: React.PropTypes.object,
};
