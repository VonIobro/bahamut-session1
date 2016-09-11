import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';

import NavbarMain from './navbar/NavbarMain';
import PlayArea from './play-area/PlayArea';

export default class App extends Component {
  render() {
    return (
      <div>
        <Row>
          <NavbarMain />
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
