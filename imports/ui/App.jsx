import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {composeWithTracker} from 'react-komposer';
import {Col, Row} from 'react-bootstrap';
import NavbarMain from './navbar/NavbarMain';
import PlayArea from './play-area/PlayArea';
import Test from './play-area/logged-play-area/game-board/player-avatar/test';

class App extends Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        <Test/>
      </div>
    );
  }
}
        // <Row>
        //   <NavbarMain user={user}/>
        // </Row>
        // <Row>
        //   <Col>
        //     <PlayArea user={user}/>
        //   </Col>
        // </Row>

export default composeWithTracker((props, onData) => {
  var user = Meteor.user();
  onData(null, {
    user
  });
})(App);
