import React, { Component } from 'react';
import GameBoard from './game-board/GameBoard';
import PlayerControls from './player-controls/PlayerControls';

export default class LoggedPlayArea extends Component {
  render() {
    return (
      <div className="container">
        <GameBoard />
        <PlayerControls />
      </div>
    );
  }
}
