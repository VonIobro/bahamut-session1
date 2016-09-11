import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {composeWithTracker} from 'react-komposer';
import './PlayerAvatar.scss';

class PlayerAvatar extends Component {
  render() {
    const {tank} = this.props;
    const style = {
      top: `${tank.position.x}px`,
      left: `${tank.position.y}px`,
    };
    return (
      <div className="player1" style={style}>Hello</div>
    );
  }
}

export default composeWithTracker((props, onData) => {
  const subscription = Meteor.subscribe('userData');
  if (subscription.ready()) {
    const tank = Meteor.user().tank;
    onData(null, {tank});
  }
})(PlayerAvatar);
