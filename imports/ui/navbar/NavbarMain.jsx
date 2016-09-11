import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import LoginForm from './LoginForm';

export default class NavbarMain extends Component {
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
            <LoginForm/>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
