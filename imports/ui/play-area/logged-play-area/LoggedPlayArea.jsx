import React, { Component } from 'react';
import DebugControls from './debug-controls/DebugControls';
import GameBoard from './game-board/GameBoard';
import Notify from '/imports/ui/notifications/Notify';
import PlayerControls from './player-controls/PlayerControls';
import {system} from '/imports/client/handleServerMessages';

export default class LoggedPlayArea extends Component {
  render() {
    const {user} = this.props;
    return (
      <div className="container">
        <Notify messages={system.messages}/>
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
