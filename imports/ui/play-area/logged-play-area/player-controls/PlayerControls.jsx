import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
import './PlayerControls.scss';

export default class PlayerControls extends Component {
  render() {
    const {user} = this.props;
    return (
      <Row id="playercontrols">
        {user.username} Controls
      </Row>
    );
  }
}

PlayerControls.propTypes = {
  user: React.PropTypes.object,
};
