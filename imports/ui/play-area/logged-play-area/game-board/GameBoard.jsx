import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
import './GameBoard.scss';
import PlayerAvatar from './player-avatar/PlayerAvatar';

export default class GameBoard extends Component {
  render() {
    return (
      <Row id="gameboard">
        <PlayerAvatar />
      </Row>
    );
  }
}
