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
    Meteor.call('tank.moveBack', (err) => {
      if (err && err.reason) {
        console.log(err.reason);
      }
    });
  }
  handleFireClick() {
    Meteor.call('tank.fireWeapon');
  }
  handleFwdClick() {
    Meteor.call('tank.moveFwd', (err) => {
      if (err && err.reason) {
        console.log(err.reason);
      }
    });
  }
  handleLeftClick() {
    Meteor.call('tank.rotateLeft');
  }
  handleRightClick() {
    Meteor.call('tank.rotateRight');
  }
  render() {
    const {user} = this.props;
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
        <Col sm={3}>
          <Well id="health">
            {user.tank.health}
          </Well>
        </Col>
      </Row>
    );
  }
}

PlayerControls.propTypes = {
  user: React.PropTypes.object,
};
