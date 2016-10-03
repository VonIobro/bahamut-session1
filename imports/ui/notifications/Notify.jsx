import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {TweenMax} from 'gsap';
import {Alert} from 'react-bootstrap';
import './Notify.scss';

class NotifyMessage extends Component {
  constructor() {
    super();
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    this.setTimer();
    this.node = ReactDOM.findDOMNode(this);
    // animEnter
    TweenMax.from(this.node, 0.3, {opacity: 0, scale: 0});
  }
  componentWillUnmount() {
    clearTimeout(this._timer);
  }
  handleClose() {
    const {message, onHandleClose} = this.props;
    // animLeave
    TweenMax.to(this.node, 0.1, {
      opacity: 0, scale: 0,
      onComplete: onHandleClose,
      onCompleteParams: [ message._id ]
    });
  }
  setTimer() {
    const {message} = this.props;
    // dont add a timer, keep notification open until dismissed
    if (!message.delay) {
      return;
    }
    // clear any existing timer
    this._timer != null ? clearTimeout(this._timer) : null;
    // hide after 'delay' miliseconds
    this._timer = setTimeout(() => {
      this.handleClose();
      this._timer = null;
    }, message.delay);
  }
  render() {
    const {message} = this.props;
    return (
      <Alert bsStyle={message.style ? message.style : 'warning'}>
        {message.text}
        <a href="#" onClick={() => this.handleClose()}> &times;</a>
      </Alert>
    );
  }
}

export default class Notify extends Component {
  constructor() {
    super();
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
        {this.alertNodes()}
      </span>
    );
  }
}

Notify.propTypes = {
  message: React.PropTypes.object,
};
