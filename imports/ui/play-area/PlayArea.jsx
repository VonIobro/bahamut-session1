import React, { Component } from 'react';
import UnloggedPlayArea from './unlogged-play-area/UnloggedPlayArea';
import LoggedPlayArea from './logged-play-area/LoggedPlayArea';
import './PlayArea.scss';

export default class PlayArea extends Component {
  render() {
    const {user} = this.props;
    return (
      <div id="playarea">
        {user ? <LoggedPlayArea user={user} /> : <UnloggedPlayArea />}
      </div>
    );
  }
}

PlayArea.propTypes = {
  user: React.PropTypes.object,
};
