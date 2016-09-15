import React, { Component } from 'react';
import {Col} from 'react-bootstrap';
import LoginForm from './LoginForm';

export default class UnloggedPlayArea extends Component {
  render() {
    return (
      <Col xs={12}>
        <LoginForm />
      </Col>
    );
  }
}
