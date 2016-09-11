import React, { Component } from 'react';

export default class LoginForm extends Component {
  composer() {
    this.state = {
      name: ''
    };
  }
  handleInputChange(event) {
    console.log(event.target.value);
    this.setState({name: event.target.value});
  }
  handleStartClick(event) {
    event.preventDefault();
    const {name} = this.state;
    Accounts.createUser({username: name, password: 'password'});
  }
  render() {
    return (
      <div className="container">
        <div className="Nav">
          <form id="login-form">
            <input onChange={(event) => this.handleInputChange(event)} placeholder="Name"></input>
            <button onClick={(event) => this.handleStartClick(event)}>Start</button>
          </form>
        </div>
      </div>
    );
  }
}
