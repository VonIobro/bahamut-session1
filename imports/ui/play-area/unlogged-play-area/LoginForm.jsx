import {Accounts} from 'meteor/accounts-base';
import React, {Component} from 'react';
import {Button, FormControl} from 'react-bootstrap';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
  }
  handleInputChange(event) {
    this.setState({username: event.target.value});
  }
  handleStartClick(event) {
    event.preventDefault();
    const {username} = this.state;
    Accounts.createUser({username, password: 'password'});
    this.setState({username: ''});
  }
  render() {
    const {username} = this.state;
    return (
      <span>
        <FormControl
          onChange={this.handleInputChange}
          placeholder="Name Your Tank"
          value={username}>
        </FormControl>
        {' '}
        <Button
          disabled={username === ''}
          onClick={this.handleStartClick}>
          Start!
        </Button>
      </span>
    );
  }
}
