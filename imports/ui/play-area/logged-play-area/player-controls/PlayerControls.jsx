import React, {Component} from 'react';
import {Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import './PlayerControls.scss';

export default class PlayerControls extends Component {
  constructor(props) {
    super(props);
    this.handleDownClick = this.handleDownClick.bind(this);
    this.handleFireClick = this.handleFireClick.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handlePushClick = this.handlePushClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleUpClick = this.handleUpClick.bind(this);
  }
  handleDownClick() {
    console.log('down');
  }
  handleFireClick() {
    console.log('fire');
  }
  handleLeftClick() {
    console.log('left');
  }
  handlePushClick() {
    console.log('push');
  }
  handleRightClick() {
    console.log('right');
  }
  handleUpClick() {
    console.log('up');
  }
  render() {
    // const {user} = this.props;
    return (
      <Row id="playercontrols">
        <Col sm={6} id="direction">
          <Row>
            <Col sm={4} smOffset={4}>
              <Button className="dir-btn"
                onClick={this.handleUpClick}>up</Button>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Button className="dir-btn"
                onClick={this.handleLeftClick}>&lt;</Button>
            </Col>
            <Col sm={4}>
              <Button className="dir-btn"
                onClick={this.handleDownClick}>down</Button>
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
            <Button className="action-btn"
              onClick={this.handlePushClick}>Push</Button>
          </ButtonGroup>
        </Col>
      </Row>
    );
  }
}

// PlayerControls.propTypes = {
//   user: React.PropTypes.object,
// };
