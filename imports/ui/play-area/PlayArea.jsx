import React, { Component } from 'react';
import UnloggedPlayArea from './unlogged-play-area/UnloggedPlayArea';
// import LoggedPlayArea from './logged-play-area/UnloggedPlayArea';

export default class PlayArea extends Component {
  render() {
    return (
      <div>
        <UnloggedPlayArea />
      </div>
    );
  }
}
