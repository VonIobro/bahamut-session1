import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import UnloggedPlayArea from './unlogged-play-area/UnloggedPlayArea';
import LoggedPlayArea from './logged-play-area/LoggedPlayArea';

export default class PlayArea extends Component {
  render() {
    return (
      <div>
        {Meteor.user() ? <LoggedPlayArea/> : <UnloggedPlayArea />}
      </div>
    );
  }
}
