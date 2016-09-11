import React, {Component} from 'react';
import {MenuItem, Nav, NavDropdown} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';

export default class UserControls extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    Meteor.logout((err) => {
      if (err && err.reason) {
        console.log(err.reason);
      }
    });
  }
  render() {
    const {user} = this.props;
    return (
      <Nav pullRight>
        <NavDropdown
          eventKey={1}
          title={user.username}
          id="user-controls"
        >
          <MenuItem
            eventKey={1.1}
            onClick={this.handleLogout}
          >
            Quit Game
          </MenuItem>
        </NavDropdown>
      </Nav>
    );
  }
}

UserControls.propTypes = {
  user: React.PropTypes.object,
};
