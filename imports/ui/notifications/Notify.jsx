import _ from 'lodash';
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
    dismissedMsgs.push(msgId);
    this.setState({dismissedMsgs});
  }
  alertNodes() {
    const {messages} = this.props;
    const {dismissedMsgs} = this.state;
    // only show messages that have not been dismissed
    let msgToShow = [];
    messages.map(message => {
      if (!_.includes(dismissedMsgs, message._id)) {
        msgToShow.push(message);
      }
    });
    return msgToShow.map(message => {
      return (
        <Alert bsStyle={message.style ? message.style : 'warning'}
          key={message._id}>
          {message.text}
          <a href="#" onClick={() => this.handleClose(message._id)}> &times;</a>
        </Alert>
      );
    });
  }
  render() {
    return (
      <span id="notifications">
        <ReactCSSTransitionGroup
          transitionName="note"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.alertNodes()}
        </ReactCSSTransitionGroup>
      </span>
    );
  }
}

Notify.propTypes = {
  messages: React.PropTypes.array,
};
