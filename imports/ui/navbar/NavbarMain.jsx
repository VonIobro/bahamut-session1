import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import LoginForm from './LoginForm';
import UserControls from './UserControls';

export default class NavbarMain extends Component {
  render() {
    const {user} = this.props;
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Bahamut Attack!</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          {user ? <UserControls user={user}/> : <LoginForm/>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavbarMain.propTypes = {
  user: React.PropTypes.object,
};
