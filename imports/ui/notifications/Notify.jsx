import _ from 'lodash';
import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';
import './Notify.scss';

export default class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dismissedMsgs: [],
    };
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose(msgId) {
    // update dismissedMsgs array with new messageID
    const {dismissedMsgs} = this.state;
    const newArray = dismissedMsgs;
    newArray.push(msgId);
    this.setState({dismissedMsgs: newArray});
  }
  computeStyle(index, msgId) {
    const {dismissedMsgs} = this.state;
    const MARGIN = 60;
    const SPACING = 60; // no margin or padding
    const topPos = MARGIN + (SPACING * index);
    let style = {
      position: 'fixed',
      top: `${topPos}px`,
      right: '40px',
    };
    if (dismissedMsgs.indexOf(msgId) !== -1) {
      _.assignIn(style, {visibility: 'hidden',})
    }
    return style;
  }
  notifyStyle() {
    return 'warning';
  }
  alertNodes() {
    const {messages} = this.props;
    return messages.map((message, i) => {
      return (
        <Alert bsStyle={this.notifyStyle()}
          key={message._id}
          style={this.computeStyle(i, message._id)}>
          {message.text}
          <a href="#" onClick={() => this.handleClose(message._id)}> &times;</a>
        </Alert>
      );
    });
  }
  render() {
    return (
      <span id="notifications">
        {this.alertNodes()}
      </span>
    );
  }
}

Notify.propTypes = {
  messages: React.PropTypes.array,
};
