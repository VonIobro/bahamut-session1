import React, { Component } from 'react';
import LoginForm from './LoginForm';

export default class UnloggedPlayArea extends Component {
  render() {
    return (
      <div className="container">
        <LoginForm />
      </div>
    );
  }
}
