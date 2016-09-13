import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import './PlayerControls.scss';

export default class PlayerControls extends Component {
  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleFireClick = this.handleFireClick.bind(this);
    this.handleFwdClick = this.handleFwdClick.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }
  handleBackClick() {
    const {user} = this.props;
    Meteor.call('tank.moveBack', user._id, user.tank.rotation);
  }
  handleFireClick() {
    const {user} = this.props;
    Meteor.call('tank.fireWeapon', user._id, true);
  }
  handleFwdClick() {
    const {user} = this.props;
    Meteor.call('tank.moveFwd', user._id, user.tank.rotation);
  }
  handleLeftClick() {
    const {user} = this.props;
    Meteor.call('tank.rotateLeft', user._id, user.tank.rotation);
  }
  handleRightClick() {
    const {user} = this.props;
    Meteor.call('tank.rotateRight', user._id, user.tank.rotation);
  }
  render() {
    return (
      <Row id="playercontrols">
        <Col sm={6} id="direction">
          <Row>
            <Col sm={4} smOffset={4}>
              <Button className="dir-btn"
                onClick={this.handleFwdClick}>FWD</Button>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Button className="dir-btn"
                onClick={this.handleLeftClick}>&lt;</Button>
            </Col>
            <Col sm={4}>
              <Button className="dir-btn"
                onClick={this.handleBackClick}>BACK</Button>
            </Col>
            <Col sm={4}>
              <Button className="dir-btn"
                onClick={this.handleRightClick}>&gt;</Button>
            </Col>
          </Row>
        </Col>
        <Col sm={6} id="actions">
          <ButtonGroup className="action-group">
            <Button className="action-btn"
              onClick={this.handleFireClick}>Fire</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}

PlayerControls.propTypes = {
  user: React.PropTypes.object,
};
