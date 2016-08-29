import React, { Component } from 'react';
import LoggedPlayArea from './logged-play-area/LoggedPlayArea.jsx';
import UnloggedPlayArea from './unlogged-play-area/UnloggedPlayArea.jsx';

export default class PlayArea extends Component { 
  render() {
    return (
      <div className="play-area">
          {Meteor.user() ? <LoggedPlayArea /> : <UnloggedPlayArea />}
      </div>
    );
  }
}
