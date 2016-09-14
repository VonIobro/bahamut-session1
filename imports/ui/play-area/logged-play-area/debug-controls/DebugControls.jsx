import React, {Component} from 'react';
import {Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import './DebugControls.scss';

export default class PlayerControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDebugMode: false,
    };
    this.handleDebugClick = this.handleDebugClick.bind(this);
  }
  handleDebugClick() {
    const {showDebugMode} = this.state;
    this.setState({showDebugMode: !showDebugMode});
  }
  render() {
    const {user} = this.props;
    const {showDebugMode} = this.state;
    return (
      <Row id="debugcontrols">
        {showDebugMode ? <Debug user={user}/> : null}
        <Button id="debug-btn"
          onClick={this.handleDebugClick}>
          Debug
        </Button>
      </Row>
    );
  }
}

const Debug = ({user}) => {
  return (
    <ul id="debug-panel">
      <li>x: {user.tank.position.x}</li>
      <li>y: {user.tank.position.y}</li>
      <li>fired: {user.tank.weaponCount}</li>
    </ul>
  );
};

PlayerControls.propTypes = {
  user: React.PropTypes.object,
};
