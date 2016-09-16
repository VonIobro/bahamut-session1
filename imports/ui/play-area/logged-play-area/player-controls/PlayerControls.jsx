import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {Button, Col, Row, Well} from 'react-bootstrap';
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
    const rot = user.tank.rotation;
    const posX = user.tank.position.x;
    const posY = user.tank.position.y;
    if (rot === 0 && posX >= 430) {
      return console.log('bottom!');
    }
    if (rot === 90 && posY <= 0) {
      return console.log('left!');
    }
    if (rot === 180 && posX <= 0) {
      return console.log('top!');
    }
    if (rot === 270 && posY >= 580) {
      return console.log('right!');
    }
    Meteor.call('tank.moveBack', user._id, rot);
  }
  handleFireClick() {
    const {user} = this.props;
    Meteor.call('tank.fireWeapon', user._id, true);
  }
  handleFwdClick() {
    const {user} = this.props;
    const rot = user.tank.rotation;
    const posX = user.tank.position.x;
    const posY = user.tank.position.y;
    if (rot === 0 && posX <= 0) {
      return console.log('top!');
    }
    if (rot === 90 && posY >= 580) {
      return console.log('right!');
    }
    if (rot === 180 && posX >= 430) {
      return console.log('bottom!');
    }
    if (rot === 270 && posY <= 0) {
      return console.log('left!');
    }
    Meteor.call('tank.moveFwd', user._id, rot);
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
    const {user} = this.props;
    console.log(user.tank.health);
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
        <Col sm={3} id="actions">
          <Button className="action-btn"
            onClick={this.handleFireClick}>
            Fire
          </Button>
        </Col>
        <Col sm={3} id="health">
          <Well>
            3
          </Well>
        </Col>
      </Row>
    );
  }
}

PlayerControls.propTypes = {
  user: React.PropTypes.object,
};
