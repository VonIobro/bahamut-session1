import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {Button, FormControl} from 'react-bootstrap';
import Notify from '/imports/ui/notifications/Notify';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        const newMessage = {
          _id: Meteor.uuid(),
          text: err.reason,
          style: 'warning',
        };
        this.setState({cbMessages: newMessage});
      }
    });
    this.setState({username: ''});
  }
  render() {
    const {cbMessages, username} = this.state;
    return (
      <span>
        <Notify message={cbMessages}/>
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
