import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {composeWithTracker} from 'react-komposer';
import {Row} from 'react-bootstrap';
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
          <PlayArea user={user}/>
        </Row>
      </div>
    );
  }
}

import {ServerMessages} from '/imports/ui/lib/serverMessages';

export default composeWithTracker((props, onData) => {
  const subscription = Meteor.subscribe('users.player1');
  if (subscription.ready()) {
    const user = Meteor.user();
    onData(null, {user});
  }

  Meteor.subscribe('serverMessagesPublication');
  // Handling new messages from the server
  ServerMessages.find().observeChanges({
    added: (id, fields) => {
      HandleServerMessage(fields);
    }
  });

  function HandleServerMessage(fields) {
    console.log('hello ', fields);
  }
})(App);
