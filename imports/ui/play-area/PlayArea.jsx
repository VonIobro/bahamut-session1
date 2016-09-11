import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {composeWithTracker} from 'react-komposer';
import UnloggedPlayArea from './unlogged-play-area/UnloggedPlayArea';
import LoggedPlayArea from './logged-play-area/LoggedPlayArea';

class PlayArea extends Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        {user ? <LoggedPlayArea/> : <UnloggedPlayArea />}
      </div>
    );
  }
}

export default composeWithTracker((props, onData) => {
  var user = Meteor.user();
  onData(null, {
    user
  });
})(PlayArea);
