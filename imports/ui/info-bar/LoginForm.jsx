import {Accounts} from 'meteor/accounts-base';
import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';

export default class LoginForm extends Component {
  composer() {
    this.state = {
      name: ''
    };
  }
  handleInputChange(event) {
    this.setState({name: event.target.value});
  }
  handleStartClick(event) {
    event.preventDefault();
    const {name} = this.state;
    Accounts.createUser({username: name, password: 'password'});
  }
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Bahamut Attack!</a>
          </Navbar.Brand>
          <input onChange={(event) => this.handleInputChange(event)} placeholder="Name"></input>
          <button onClick={(event) => this.handleStartClick(event)}>Start</button>
        </Navbar.Header>
      </Navbar>
    );
  }
}
