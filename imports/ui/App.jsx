import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';

import LoginForm from './navbar/LoginForm';
import PlayArea from './play-area/PlayArea';

export default class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <LoginForm />
        </Row>
        <Row>
          <Col>
            <PlayArea />
          </Col>
        </Row>
      </div>
    );
  }
}
