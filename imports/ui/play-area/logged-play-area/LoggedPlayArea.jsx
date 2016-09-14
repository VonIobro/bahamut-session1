import React, { Component } from 'react';
import GameBoard from './game-board/GameBoard';
import PlayerControls from './player-controls/PlayerControls';
import DebugControls from './debug-controls/DebugControls';

export default class LoggedPlayArea extends Component {
  render() {
    const {user} = this.props;
    return (
      <div className="container">
        <GameBoard user={user}/>
        <PlayerControls user={user}/>
        <DebugControls user={user}/>
      </div>
    );
  }
}

LoggedPlayArea.propTypes = {
  user: React.PropTypes.object,
};
