import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
import './DebugControls.scss';

export default class PlayerControls extends Component {
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
      <li>debugMode: {user.debugMode}</li>
    </ul>
  );
};

PlayerControls.propTypes = {
  user: React.PropTypes.object,
};
