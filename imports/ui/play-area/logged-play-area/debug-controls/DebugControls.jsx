import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Button, Panel, Row} from 'react-bootstrap';
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

class Debug extends Component {
  constructor(props) {
    super(props);
    this.handleNewuser = this.handleNewuser.bind(this);
  }
  handleNewuser() {
    const {user} = this.props;
    console.log('handlenewuser clicked');
    Meteor.call('serverMessages.newUser', user.username);
  }
  renderWeapon() {
    const {user} = this.props;
    const weapon = user.tank.weapon;
    if (weapon) {
      return (
        <span>
          <ul>
            <li>count: {weapon.count}</li>
            <li>positionX: {weapon.position.x}</li>
            <li>positionY: {weapon.position.y}</li>
            <li>rotation: {weapon.rotation}</li>
            <li>area: {weapon.area}</li>
          </ul>
          <p>Remember to refresh UI</p>
          <Button onClick={this.handleNewuser}>
            New User
          </Button>
        </span>
      );
    }
    return (
      <span>
        <li>None yet</li>
      </span>
    );
  }
  render() {
    const {user} = this.props;
    return (
      <Panel id="debug-panel">
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
        {this.renderWeapon()}
      </Panel>
    );
  }
}

DebugControls.propTypes = {
  user: React.PropTypes.object,
};
