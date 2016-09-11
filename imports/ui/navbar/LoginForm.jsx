import {Accounts} from 'meteor/accounts-base';
import React, {Component} from 'react';
import {Button, FormControl, Navbar} from 'react-bootstrap';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
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
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Bahamut Attack!</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight>
            <FormControl
              onChange={this.handleInputChange}
              placeholder="Name">
            </FormControl>
            {' '}
            <Button
              onClick={this.handleStartClick}>Start!
            </Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
