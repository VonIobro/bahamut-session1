import _ from 'lodash';
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Alert} from 'react-bootstrap';
import './Notify.scss';

class NotifyMessage extends Component {
  componentDidMount() {
    this.setTimer();
  }
  setTimer() {
    const {message, onHandleClose} = this.props;
    // dont add a timer, keep notification open until dismissed
    if (!message.delay) {
      return;
    }
    // clear any existing timer
    this._timer != null ? clearTimeout(this._timer) : null;
    // hide after 'delay' miliseconds
    this._timer = setTimeout(() => {
      onHandleClose(message._id);
      this._timer = null;
    }, message.delay);
  }
  componentWillUnmount() {
    clearTimeout(this._timer);
  }
  render() {
    const {message, onHandleClose} = this.props;
    return (
      <Alert bsStyle={message.style ? message.style : 'warning'}>
        {message.text}
        <a href="#" onClick={() => onHandleClose(message._id)}> &times;</a>
      </Alert>
    );
  }
}

export default class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curMessages: [],
    };
    this.onHandleClose = this.onHandleClose.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const {message} = this.props;
    const {curMessages} = this.state;
    // return if no new messages
    if (!nextProps.message) {
      return;
    }
    // ensure unique messages
    const msgId = nextProps.message._id;
    if (!_.includes(message, msgId)) {
      curMessages.push(nextProps.message);
      this.setState({curMessages});
    }
  }
  onHandleClose(msgId) {
    // remove dismissedMsgs from array
    const {curMessages} = this.state;
    const indexToRemove = _.findIndex(curMessages, {_id: msgId});
    curMessages.splice(indexToRemove, 1);
    this.setState({curMessages});
  }
  alertNodes() {
    const {curMessages} = this.state;
    return curMessages.map(message => {
      // add message.delay to autoclose notification
      return (
        <NotifyMessage
          key={message._id}
          message={message}
          onHandleClose={this.onHandleClose}>
        </NotifyMessage>
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
  message: React.PropTypes.object,
};
