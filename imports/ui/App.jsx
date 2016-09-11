import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';

import LoginForm from './info-bar/LoginForm';
import PlayArea from './play-area/PlayArea';

export default class App extends Component {
  render() {
    return (
      <Row>
        <Col xs={2}>
          <LoginForm />
        </Col>
        <Col xs={10}>
          <PlayArea />
        </Col>
      </Row>
    );
  }
}
