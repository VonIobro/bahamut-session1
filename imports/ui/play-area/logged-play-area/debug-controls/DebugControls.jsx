import React, {Component} from 'react';
import {Panel, Row} from 'react-bootstrap';
import './DebugControls.scss';

export default class DebugControls extends Component {
  render() {
    const {user} = this.props;
    return (
      <Row id="debugcontrols">
        {user.debugMode ? <Debug user={user}/> : null}
      </Row>
    );
  }
}

const Debug = ({user}) => {
  const renderWeapon = () => {
    const weapon = user.tank.weapon;
    if (weapon) {
      return (
        <ul>
          <li>count: {weapon.count}</li>
          <li>positionX: {weapon.position.x}</li>
          <li>positionY: {weapon.position.y}</li>
          <li>rotation: {weapon.rotation}</li>
          <li>area: {weapon.area}</li>
        </ul>
      );
    }
    return (
      <span>
        <li>None yet</li>
      </span>
    );
  };
  return (
    <div id="debug-panel">
      <p>TANK</p>
      <ul>
        <li>debugMode: {user.debugMode.toString()}</li>
        <li>x from left: {user.tank.position.x}</li>
        <li>y from top: {user.tank.position.y}</li>
        <li>rotation: {user.tank.rotation}</li>
        <li>health: {user.tank.health}</li>
      </ul>
      <br/>
      <p>WEAPON</p>
      {renderWeapon()}
    </div>
  );
};

DebugControls.propTypes = {
  user: React.PropTypes.object,
};
