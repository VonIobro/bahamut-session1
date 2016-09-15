import {Accounts} from 'meteor/accounts-base';
import React, {Component} from 'react';
import {Button, FormControl} from 'react-bootstrap';
import Notify from '/imports/ui/notifications/Notify';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotify: false,
      notifyMsg: '',
      username: '',
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
    Accounts.createUser({username, password: 'password'}, (err) => {
      if (err && err.reason) {
        this.setState({notifyMsg: err.reason});
        this.setState({showNotify: true});
      }
    });
    this.setState({username: ''});
  }
  render() {
    const {
      notifyMsg,
      username,
    } = this.state;
    return (
      <span>
        <Notify
          message={notifyMsg}/>
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
