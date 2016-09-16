import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
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
  return (
    <ul id="debug-panel">
      <li>x: {user.tank.position.x}</li>
      <li>y: {user.tank.position.y}</li>
      <li>rotation: {user.tank.rotation}</li>
      <li>fired: {user.tank.weaponCount}</li>
      <li>health: {user.tank.health}</li>
      <li>debugMode: {user.debugMode.toString()}</li>
    </ul>
  );
};

DebugControls.propTypes = {
  user: React.PropTypes.object,
};
