import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {composeWithTracker} from 'react-komposer';
import {Col, Row} from 'react-bootstrap';
import NavbarMain from './navbar/NavbarMain';
import PlayArea from './play-area/PlayArea';

class App extends Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        <Row>
          <NavbarMain user={user}/>
        </Row>
        <Row>
          <Col>
            <PlayArea user={user}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default composeWithTracker((props, onData) => {
  var user = Meteor.user();
  onData(null, {
    user
  });
})(App);
